import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-url";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_IMAGE_COUNT = 6;

type BackendError = {
  error?: string;
};

type UploadedImage = {
  url?: string;
};

function getTokenUserId(token: string) {
  try {
    const payloadPart = token.split(".")[1];

    if (!payloadPart) {
      return undefined;
    }

    const payload = JSON.parse(
      Buffer.from(payloadPart, "base64url").toString("utf8"),
    ) as { id?: unknown };

    return typeof payload.id === "number" ? payload.id : undefined;
  } catch {
    return undefined;
  }
}

function getText(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function getTextList(formData: FormData, name: string) {
  return formData
    .getAll(name)
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean);
}

async function getBackendError(response: Response) {
  try {
    const result = (await response.json()) as BackendError;

    if (result.error === "insufficient role") {
      return "Votre compte doit avoir le rôle hôte pour ajouter un logement";
    }

    return result.error;
  } catch {
    return undefined;
  }
}

async function deleteUploadedImages(token: string, urls: string[]) {
  if (urls.length === 0) {
    return;
  }

  // Nettoie les fichiers si la création échoue après leur envoi
  await fetch(getApiUrl("/api/uploads/images"), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls }),
    cache: "no-store",
  }).catch(() => undefined);
}

export async function POST(request: Request) {
  const token = (await cookies()).get("kasa-token")?.value;
  const userId = token ? getTokenUserId(token) : undefined;

  if (!token || !userId) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour ajouter un logement" },
      { status: 401 },
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Le formulaire envoyé est invalide" },
      { status: 400 },
    );
  }

  const title = getText(formData, "title");
  const description = getText(formData, "description");
  const location = getText(formData, "location");
  const postalCode = getText(formData, "postalCode");
  const pricePerNight = Number(getText(formData, "pricePerNight"));
  const hostName = getText(formData, "hostName");
  const coverImage = formData.get("coverImage");
  const galleryImages = formData.getAll("propertyImages");
  const hostPictureValue = formData.get("hostPicture");
  const hostPicture =
    hostPictureValue instanceof File && hostPictureValue.size > 0
      ? hostPictureValue
      : null;
  const images = [coverImage, ...galleryImages].filter(
    (image): image is File => image instanceof File && image.size > 0,
  );

  if (!title || !description || !hostName) {
    return NextResponse.json(
      {
        error:
          "Le titre, la description et le nom de l’hôte sont obligatoires",
      },
      { status: 400 },
    );
  }

  if (images.length === 0) {
    return NextResponse.json(
      { error: "Ajoutez au moins une photo du logement" },
      { status: 400 },
    );
  }

  if (images.length > MAX_IMAGE_COUNT) {
    return NextResponse.json(
      { error: `Vous pouvez ajouter au maximum ${MAX_IMAGE_COUNT} photos` },
      { status: 400 },
    );
  }

  if (
    images.some(
      (image) =>
        !image.type.startsWith("image/") || image.size > MAX_IMAGE_SIZE,
    ) ||
    (hostPicture &&
      (!hostPicture.type.startsWith("image/") ||
        hostPicture.size > MAX_IMAGE_SIZE))
  ) {
    return NextResponse.json(
      { error: "Chaque fichier doit être une image de 10 Mo maximum" },
      { status: 400 },
    );
  }

  const uploadedUrls: string[] = [];
  const propertyImageUrls: string[] = [];

  try {
    for (const [index, image] of images.entries()) {
      const uploadData = new FormData();
      uploadData.set("file", image);
      uploadData.set(
        "purpose",
        index === 0 ? "property-cover" : "property-picture",
      );

      const uploadResponse = await fetch(getApiUrl("/api/uploads/image"), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: uploadData,
        cache: "no-store",
      });

      if (!uploadResponse.ok) {
        const message = await getBackendError(uploadResponse);
        throw new Error(message ?? "L’envoi d’une image a échoué");
      }

      const uploadedImage = (await uploadResponse.json()) as UploadedImage;

      if (!uploadedImage.url) {
        throw new Error("Le serveur n’a pas renvoyé l’adresse de l’image");
      }

      uploadedUrls.push(uploadedImage.url);
      propertyImageUrls.push(uploadedImage.url);
    }

    let hostPictureUrl: string | undefined;

    if (hostPicture) {
      const hostPictureData = new FormData();
      hostPictureData.set("file", hostPicture);
      hostPictureData.set("purpose", "user-picture");

      const hostPictureResponse = await fetch(getApiUrl("/api/uploads/image"), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: hostPictureData,
        cache: "no-store",
      });

      if (!hostPictureResponse.ok) {
        const message = await getBackendError(hostPictureResponse);
        throw new Error(message ?? "L’envoi de la photo de profil a échoué");
      }

      const uploadedHostPicture =
        (await hostPictureResponse.json()) as UploadedImage;

      if (!uploadedHostPicture.url) {
        throw new Error(
          "Le serveur n’a pas renvoyé l’adresse de la photo de profil",
        );
      }

      hostPictureUrl = uploadedHostPicture.url;
      uploadedUrls.push(hostPictureUrl);
    }

    const hostResponse = await fetch(getApiUrl(`/api/users/${userId}`), {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: hostName,
        picture: hostPictureUrl,
      }),
      cache: "no-store",
    });

    if (!hostResponse.ok) {
      const message = await getBackendError(hostResponse);
      throw new Error(message ?? "La mise à jour du profil a échoué");
    }

    const customCategory = getText(formData, "customCategory");
    const tags = getTextList(formData, "categories");

    if (customCategory) {
      tags.push(customCategory);
    }

    const propertyResponse = await fetch(getApiUrl("/api/properties"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        // Utilise le compte identifié par le cookie de connexion
        host_id: userId,
        cover: propertyImageUrls[0],
        pictures: propertyImageUrls.slice(1),
        location: [postalCode, location].filter(Boolean).join(" "),
        price_per_night:
          Number.isFinite(pricePerNight) && pricePerNight > 0
            ? pricePerNight
            : undefined,
        equipments: getTextList(formData, "equipments"),
        tags,
      }),
      cache: "no-store",
    });

    if (!propertyResponse.ok) {
      const message = await getBackendError(propertyResponse);
      await deleteUploadedImages(token, uploadedUrls);

      return NextResponse.json(
        { error: message ?? "La création du logement a échoué" },
        { status: propertyResponse.status },
      );
    }

    return NextResponse.json(await propertyResponse.json(), { status: 201 });
  } catch (error) {
    await deleteUploadedImages(token, uploadedUrls);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Impossible de joindre le serveur Kasa",
      },
      { status: 503 },
    );
  }
}
