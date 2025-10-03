# landingtm-v3

Landing page construida con React + Vite + TypeScript. Código simple, mantenible y listo para deploy en hosting tradicional.

## Tech stack
- React 18
- Vite 5
- TypeScript
- pnpm

## Requisitos
- Node.js 18+ (LTS recomendado)
- pnpm 8+

Verifica versiones:
    node -v
    pnpm -v

## Instalación y desarrollo
Clonar e instalar dependencias:
    pnpm install

Ambiente de desarrollo:
    pnpm dev
Abrirá en http://localhost:5173

Build de producción:
    pnpm build
Genera la carpeta dist/

Previsualizar el build:
    pnpm preview

## Estructura del proyecto (base)
- public/: estáticos sin procesamiento
- src/
  - main.tsx: entrada de la app
  - App.tsx: componente raíz
  - assets/: imágenes, fuentes, etc.
- index.html
- vite.config.ts
- tsconfig*.json

## Variables de entorno
Usar archivos .env y prefijo VITE_ para exponer variables al cliente.
Ejemplo:
    VITE_API_BASE_URL=https://api.midominio.com

Archivos soportados: .env, .env.local, .env.development, .env.production

## Flujo de ramas
- main: versión estable desplegable
- feature/<nombre>: ramas de trabajo por componente/funcionalidad

Comandos útiles:
    git checkout -b feature/header
    git add .
    git commit -m "feat(header): estructura inicial"
    git checkout main
    git merge --no-ff feature/header -m "merge: feature/header"

Convención de commits sugerida: Conventional Commits (feat, fix, chore, docs, refactor, style, test).

## Deploy al hosting
1) Compilar:
    pnpm build
2) Subir el contenido de dist/ a tu hosting (FTP/Panel).
3) Si es SPA, habilitar fallback a index.html para rutas internas (opción “SPA/Rewrite” en el panel o regla de servidor).

## Calidad y mantenimiento
- TypeScript para tipado de props y contratos de componentes.
- Mantener componentes pequeños y reutilizables.
- Evitar lógica compleja en JSX; extraer a funciones/ hooks cuando sea necesario.

## Licencia
Sin licencia especificada (privado por defecto). Agrega una licencia si se requiere.# landingtm-v3
