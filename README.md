# José Vaz — Creative Services

Official website and creative portfolio built with **Gatsby**, focused on performance, smooth animations, and a carefully crafted visual experience.

Includes a protected projects area with lightweight authentication and an optimized production build deployed on **Netlify**.

---

## Tech Stack

- Gatsby (React)
- Framer Motion (animations)
- SCSS (Dart Sass) using `@use` / `@forward`
- Netlify (Hosting + Functions)
- ESLint (linting & auto-fix)
- Yarn v1

---

## Authentication

The projects area is protected by a simple access code.

### Production
- Server-side validation via Netlify Functions
- Password stored as a bcrypt hash
- Session handled via HttpOnly cookies

### Development
- Simplified local authentication

No plaintext passwords are shipped in the client bundle.

---

## Local Development

```bash
yarn install
yarn develop
```

The site will be available at:  
http://localhost:8000

---

## Production Build

```bash
yarn build
```

---

## Linting

```bash
yarn lint
yarn lint:fix
```

- Automatically removes unused imports
- Rules tailored for Gatsby and modern React patterns

---

## Styling (SCSS)

- Modular SCSS architecture using `@use` and `@forward`
- No deprecated `@import` usage
- Organized structure with `base/` and `components/` layers

---

## Project Structure (simplified)

```text
src/
  components/
  pages/
  templates/
  styles/
netlify/
  functions/
```

---

## Environment Variables (Netlify)

Required in production:

- CREATIVE_VAZ_PASSWORD_HASH
- SESSION_SECRET

---

## Dependency Maintenance

Tools used:
- depcheck
- knip

Recommended flow:

```bash
yarn depcheck
yarn build
```

---

## Deployment

Automatic deployment via Netlify on every push to the `main` branch.

---

## License

Private project.  
All rights reserved.
