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
sont synchronisés avec le compte connecté. Les conversations et les messages
sont enregistrés dans la base SQLite du backend. Les options du formulaire
restent alimentées par les mocks.

## Variables d’environnement

Next.js charge automatiquement le fichier correspondant à la commande :

- `npm run dev` utilise `.env.development`
- `npm run build` et `npm run start` utilisent `.env.production`
- `npm test` utilise `.env.test`

`API_URL` contient l’origine du backend, sans chemin de route. La valeur locale
est `http://localhost:3000`. Avant un déploiement, remplacez la valeur d’exemple
de `.env.production` par l’URL réelle du backend. Le fichier `.env.example`
documente les variables à créer sans contenir de secret.

`SITE_URL` contient l’origine publique du frontend utilisée pour les URL
canoniques et les données SEO. En local, sa valeur est
`http://localhost:3001`. Sur Vercel, le projet utilise automatiquement
`VERCEL_PROJECT_PRODUCTION_URL` lorsque `SITE_URL` n’est pas définie.

## SEO

Les pages publiques possèdent des métadonnées, des URL canoniques et des
aperçus Open Graph. Les fiches logement exposent leurs informations en JSON-LD
Schema.org afin que Google reconnaisse le logement, son prix et sa note. Le
sitemap est disponible sur `/sitemap.xml` et les règles d’exploration sur
`/robots.txt`.

## Storybook

Storybook documente les composants principaux de Kasa sans lancer toutes les
pages de l’application. Les stories sont rangées à côté des composants dans
`src/components` et leurs pages de documentation sont générées automatiquement.

```bash
npm run storybook
```

Ouvrez ensuite [http://localhost:6006](http://localhost:6006). Les groupes
`Layout`, `Logements`, `Messagerie` et `Authentification` présentent les états
importants des composants. `npm run build-storybook` vérifie que la
documentation peut être générée pour un déploiement statique.

## Connexion

Lancez aussi le backend sur `http://localhost:3000`, puis ouvrez la page
`http://localhost:3001/sign-up` pour créer un compte. L’utilisateur est
enregistré dans la base SQLite du backend et peut ensuite se connecter sur
`http://localhost:3001/login`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
