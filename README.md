# NextTemplates

NextTemplates is a Next.js App Router starter for building service templates with the Agriculture Design System.

## Stack

- Next.js 16
- React 19
- TypeScript
- Agriculture Design System: `@ag.ds-next/react`
- Emotion App Router style registry

## Template routes

- `/` - template gallery
- `/templates/home-page` - service home page template
- `/templates/content-page` - long-form content page template
- `/templates/single-page-form` - single-page transaction form template

## Getting started

```bash
npm run dev
```

Open `http://localhost:3000`.

## Useful files

- `src/components/App/index.tsx` wraps the app with AgDS `Core`, the Agriculture branding theme and Emotion style support.
- `src/components/LinkComponent/index.tsx` connects AgDS links to Next.js routing.
- `src/components/AppShell.tsx` provides the shared AgDS header, navigation and footer.

AgDS documentation: https://design-system.agriculture.gov.au/
