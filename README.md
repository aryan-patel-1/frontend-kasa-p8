This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Data source

La constante `USE_MOCK` dans `src/lib/config.ts` choisit la source :

- `true` utilise les données locales de `src/mocks`
- `false` utilise le backend défini par la variable `API_URL`

L’API des logements alimente la page d’accueil et la fiche détail. Les favoris
sont synchronisés avec le compte connecté. Les messages et les options du
formulaire restent alimentés par les mocks en attendant la connexion de leurs
routes API.

## Variables d’environnement

Next.js charge automatiquement le fichier correspondant à la commande :

- `npm run dev` utilise `.env.development`
- `npm run build` et `npm run start` utilisent `.env.production`
- `npm test` utilise `.env.test`

`API_URL` contient l’origine du backend, sans chemin de route. La valeur locale
est `http://localhost:3000`. Avant un déploiement, remplacez la valeur d’exemple
de `.env.production` par l’URL réelle du backend. Le fichier `.env.example`
documente la variable à créer sans contenir de secret.

## Connexion

Lancez aussi le backend sur `http://localhost:3000`, puis ouvrez la page
`http://localhost:3001/sign-up` pour créer un compte. L’utilisateur est
enregistré dans la base SQLite du backend et peut ensuite se connecter sur
`http://localhost:3001/login`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
