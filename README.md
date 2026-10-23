# Space for You

> *A platform to create personalized digital spaces for someone special.*

---

## 📖 Acerca del Proyecto

**Space for You** es una plataforma web íntima con diseño editorial contemporáneo orientada a crear espacios digitales personalizados para personas especiales. Desarrollado con una arquitectura moderna escalable (Feature-Sliced Design) en React 19, TypeScript y Tailwind CSS v4.

---

## 🛠️ Stack Tecnológico

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Lenguaje**: [TypeScript 6](https://www.typescriptlang.org/) (Strict typing, `verbatimModuleSyntax`)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) con tokens de diseño personalizados y modo claro/oscuro
- **Enrutamiento**: [React Router 8](https://reactrouter.com/)
- **Linter & Calidad**: [Oxlint](https://oxc.rs/) + TypeScript compiler check (`tsc -b`)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) + [Commitlint](https://commitlint.js.org/) (Conventional Commits)
- **Despliegue**: [Vercel](https://vercel.com/) (configuración SPA rewrites con cero errores de recarga)

---

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 20+
- npm 10+

### Instalación
```bash
npm install
```

### Servidor de Desarrollo
```bash
npm run dev
```
La aplicación web se ejecutará en `http://localhost:5173`.

### Verificación de Calidad
```bash
# Análisis estático
npm run lint

# Verificación de tipos
npm run typecheck

# Compilación de producción
npm run build
```

---

## 🌿 Flujo de Trabajo y Contribución

Este proyecto utiliza el flujo de trabajo de dos ramas principales:
- **`main`**: Rama de **producción**.
- **`develop`**: Rama activa de **desarrollo**.

Para conocer las normas de ramas, el estándar de mensajes de commit (Conventional Commits) y los git hooks configurados, consulta la **[Guía de Contribución](CONTRIBUTING.md)**.
