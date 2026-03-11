<p align="center">
  <a href="https://vite.dev" target="blank"><img src="https://vitejs.dev/logo.svg" width="120" alt="Vite Logo" /></a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" /></a>
</p>

<p align="center">A modern full-stack starter template combining <a href="https://vitejs.dev" target="_blank">Vite</a> on the frontend and <a href="https://nestjs.com" target="_blank">NestJS</a> on the backend — fast, scalable, and production-ready.</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/vite.svg" alt="Vite Version" />
  <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NestJS Version" />
  <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="License" />
  <img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord" />
</p>

---

## Description

This template provides a minimal full-stack setup with:

- ⚡ **Vite** – Lightning-fast frontend tooling with HMR (Hot Module Replacement) and ESLint rules out of the box.
- 🚀 **NestJS** – A progressive Node.js framework for building efficient and scalable server-side applications.

---

## Project Structure

```
root/
├── frontend/       # Vite + React application
└── backend/        # NestJS application
```

---

## Project Setup

```bash
# Install frontend dependencies
$ cd frontend && npm install

# Install backend dependencies
$ cd backend && npm install
```

---

## Compile and Run

### Frontend (Vite)

```bash
# development with HMR
$ npm run dev

# production build
$ npm run build

# preview production build
$ npm run preview
```

### Backend (NestJS)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

---

## Run Tests

### Frontend

```bash
$ npm run test
```

### Backend

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

## Vite Plugins

Two official Vite React plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) — uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used with [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) — uses [SWC](https://swc.rs/) for Fast Refresh

### React Compiler

The React Compiler is not enabled by default due to its impact on dev & build performance. To enable it, refer to the [React Compiler installation docs](https://react.dev/learn/react-compiler/installation).

---

## ESLint Configuration

For production applications, it is recommended to use TypeScript with type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) and [`typescript-eslint`](https://typescript-eslint.io) for integration details.

---

## Deployment

### Frontend
Build the Vite app and serve the `dist/` folder via any static hosting (Vercel, Netlify, AWS S3, etc.):

```bash
$ npm run build
```

### Backend
Deploy your NestJS app using [Mau](https://mau.nestjs.com) — the official NestJS platform for AWS:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

---

## Resources

### Vite
- [Vite Documentation](https://vitejs.dev/guide/)
- [Vite GitHub](https://github.com/vitejs/vite)

### NestJS
- [NestJS Documentation](https://docs.nestjs.com)
- [NestJS Discord](https://discord.gg/G7Qnnhy)
- [NestJS Courses](https://courses.nestjs.com/)
- [NestJS Devtools](https://devtools.nestjs.com)
- [NestJS Jobs Board](https://jobs.nestjs.com)

---

## Stay in Touch

- Vite – [@vite_js](https://twitter.com/vite_js)
- NestJS – [@nestframework](https://twitter.com/nestframework) | [LinkedIn](https://linkedin.com/company/nestjs)

---

## License

This project is [MIT licensed](./LICENSE).