import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { AddPropertyForm } from "@/components/property/add-property-form";

afterEach(() => {
  cleanup();
});

test("sélectionne et désélectionne une catégorie", () => {
  render(<AddPropertyForm equipments={[]} categories={["Nature"]} />);

  const categoryButton = screen.getByRole("button", { name: "Nature" });

  fireEvent.click(categoryButton);
  expect(categoryButton.getAttribute("aria-pressed")).toBe("true");

  const selectedCategory = document.querySelector(
    'input[name="categories"]',
  );
  expect(selectedCategory?.getAttribute("value")).toBe("Nature");

  fireEvent.click(categoryButton);
  expect(categoryButton.getAttribute("aria-pressed")).toBe("false");
  expect(document.querySelector('input[name="categories"]')).toBeNull();
});

test("ajoute une catégorie personnalisée et la sélectionne", () => {
  render(<AddPropertyForm equipments={[]} categories={[]} />);

  fireEvent.change(screen.getByLabelText("Ajouter une catégorie personnalisée"), {
    target: { value: "Montagne" },
  });
  fireEvent.click(
    screen.getByRole("button", {
      name: "Ajouter la catégorie personnalisée",
    }),
  );

  expect(
    screen.getByRole("button", { name: "Montagne" }).getAttribute(
      "aria-pressed",
    ),
  ).toBe("true");
  expect(
    document.querySelector('input[name="categories"]')?.getAttribute("value"),
  ).toBe("Montagne");
});
