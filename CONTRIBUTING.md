# Guía de Contribución (CONTRIBUTING)

Gracias por ser parte del desarrollo de **Space for You**. Para mantener un flujo de trabajo profesional, trazabilidad en el historial y máxima estabilidad en el despliegue continuo, este repositorio sigue estrictas normas de ramas, estándares de commit y validaciones automatizadas.

---

## 1. Estrategia de Ramas (Branching Model)

El repositorio opera con un modelo basado en dos ramas principales:

```text
 ┌──────────────┐          Pull Request / Merge          ┌──────────┐
 │   develop    │  ───────────────────────────────────>  │   main   │
 │ (desarrollo) │                                        │(producción)
 └──────────────┘                                        └──────────┘
        ▲
        │ Feature / Fix / Chore
        │
 ┌──────────────────────┐
 │ feature/<nombre>     │
 │ fix/<nombre>         │
 └──────────────────────┘
```

### 🌿 `main` (Producción)
- Representa el código en estado de producción desplegado en Vercel.
- **Regla estricta:** Está prohibido hacer commits directos en `main`.
- La única forma de actualizar `main` es mediante un **Pull / Merge desde la rama `develop`** tras haber completado y validado las fases de desarrollo y pruebas.

### 🌿 `develop` (Desarrollo)
- Es la rama central de desarrollo e integración activa.
- Todos los nuevos módulos, componentes, configuraciones y arreglos convergen en `develop`.
- Permite la ejecución de pruebas continuas antes de sincronizar con producción.

### 🌿 Ramas Auxiliares (Opcional para tareas específicas)
Para cambios de gran tamaño o trabajo en equipo, crea ramas auxiliares partiendo desde `develop`:
- `feature/<nombre>`: Nuevas funcionalidades o páginas.
- `fix/<nombre>`: Corrección de fallos o regresiones.
- `chore/<nombre>`: Actualizaciones de herramientas, configuración o dependencias.
- Una vez finalizada la tarea, se reintegran a `develop`.

---

## 2. Convención de Commits (Conventional Commits)

Este proyecto implementa y hace cumplir la especificación [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/). Cada commit debe ser atómico y autodocumentado.

### Formato Requerido
```text
<type>(<scope>): <descripción imperativa breve>

[cuerpo explicativo opcional]

[pie de página opcional: referencias o BREAKING CHANGE]
```

### Tipos Permitidos (`<type>`)
| Tipo | Propósito |
| :--- | :--- |
| `feat` | Nueva característica o capacidad para el usuario. |
| `fix` | Corrección de un bug o comportamiento anómalo. |
| `docs` | Cambios exclusivos en documentación (`README`, `CONTRIBUTING`, etc.). |
| `style` | Cambios de formato, espaciado o estética sin afectar la lógica del código. |
| `refactor` | Reestructuración de código que no altera el comportamiento funcional. |
| `perf` | Mejoras de rendimiento o tiempos de carga. |
| `test` | Incorporación o ajuste de pruebas automatizadas. |
| `build` | Cambios en el sistema de compilación, empaquetado o dependencias npm. |
| `ci` | Modificaciones en pipelines, scripts de despliegue o flujos CI/CD. |
| `chore` | Tareas de mantenimiento general o configuración de herramientas. |
| `revert` | Reversión de un commit previo. |

### Scopes Comunes (`<scope>`)
- `web`: Aplicación web principal en `apps/web`.
- `ui`: Componentes atómicos de interfaz (botones, tarjetas, modales).
- `layout`: Estructura general de navegación, header o footer.
- `theme`: Tokens de color, modo oscuro o tipografía.
- `seo`: Metadatos, etiquetas Open Graph o favicons.
- `assets`: Iconografía, gráficos SVG o imágenes.
- `config`: Archivos de configuración de herramientas (Vite, Vercel, TS).
- `deps`: Actualización o agregado de paquetes npm.
- `root`: Configuraciones a nivel raíz del monorepo.

### Reglas de Formato
1. **Límite de caracteres:** La primera línea (encabezado) no debe exceder los **72 caracteres**.
2. **Minúsculas:** El tipo y el alcance siempre van en minúsculas (`feat(ui): ...`, no `Feat(UI): ...`).
3. **Modo imperativo:** Usa el presente imperativo en inglés o español claro (`add navigation bar`, `fix route reload`).
4. **Sin punto final:** El resumen del encabezado no debe terminar con punto (`.`).
5. **Separación con línea en blanco:** Si incluyes cuerpo o footer, debes dejar una línea en blanco tras el encabezado.

### Plantilla de Commit Local
Se ha provisto un archivo `.gitmessage`. Puedes activarlo en tu entorno local con:
```bash
git config commit.template .gitmessage
```
Al ejecutar `git commit` sin `-m`, tu editor abrirá la plantilla con todas las instrucciones y recordatorios.

---

## 3. Automatización de Calidad (Git Hooks con Husky)

El repositorio tiene configurados hooks de Git mediante **Husky** que se ejecutan automáticamente en tu máquina:

### 🛡️ Hook `pre-commit`
Antes de crear cualquier commit, se ejecutan en secuencia:
1. `npm run lint`: Análisis estático ultrarrápido con **oxlint**.
2. `npm run typecheck`: Validación estricta de tipos con el compilador de TypeScript (`tsc -b`).

> ⚠️ Si el linter detecta problemas o TypeScript arroja errores de tipado, el commit se detendrá inmediatamente para evitar subir código defectuoso.

### 🛡️ Hook `commit-msg`
Valida con **Commitlint** que el mensaje cumpla con la especificación de Conventional Commits y las reglas definidas en `commitlint.config.mjs`.

---

## 4. Flujo de Trabajo Local (Paso a Paso)

1. **Asegúrate de estar en `develop`:**
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Realiza tus cambios y pruébalos:**
   ```bash
   npm run dev
   ```

3. **Verifica la calidad del código antes de commitear:**
   ```bash
   npm run lint
   npm run typecheck
   ```

4. **Haz commits modulares y atómicos:**
   ```bash
   git add <archivos-relacionados>
   git commit -m "feat(ui): add space preview cards"
   ```

5. **Actualizar Producción (`main`):**
   - Una vez que los cambios en `develop` están aprobados y listos para producción:
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```
   *(O mediante un Pull Request desde `develop` hacia `main` en la plataforma de Git remota).*

---

Siguiendo estas pautas garantizamos un código limpio, un historial de cambios profesional y despliegues sin interrupciones en **Space for You**.
