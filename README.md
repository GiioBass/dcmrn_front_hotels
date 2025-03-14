# Guía de Instalación y Configuración - Proyecto React con Vite

Este documento detalla los pasos para instalar y configurar tu proyecto React utilizando Vite.

## Requisitos previos
Antes de comenzar, asegúrate de tener instalado en tu sistema:

- [Node.js](https://nodejs.org/) (versión recomendada: 16 o superior)
- [Yarn](https://yarnpkg.com/) (opcional, pero recomendado)

## Instalación del Proyecto

Sigue estos pasos para instalar y configurar el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```sh
   https://github.com/GiioBass/dcmrn_front_hotels.git
   cd nombre-del-proyecto
   ```

2. **Instalar dependencias:**
   ```sh
   # Si usas npm
   npm install
   
   # Si usas Yarn
   yarn install
   
   # Si usas pnpm
   pnpm install
   ```

3. **Configurar el entorno:**
   
   No se requiere un archivo `.env` ya que se está utilizando Vite para la configuración del proyecto.
   
   Si en el futuro es necesario agregar variables de entorno, se pueden definir en un archivo `.env` en la raíz del proyecto:
   
   por defecto los endpoints apuntan a http://127.0.0.1:8000
   ```sh
   VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
   ```

4. **Iniciar el servidor de desarrollo:**
   
   ```sh
   # Con npm
   npm run dev

   # Con yarn
   yarn dev
   ```
   La aplicación estará disponible por defecto en `http://localhost:5173/`.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```
/text_adventure_game/
│── node_modules/
│── public/
│── src/
│   ├── components/
│   ├── routes/
│   │   ├── routes/
│   │   ├── Home.tsx
│   │   ├── Rooms.tsx
│   │   ├── ...
│   ├── App.tsx
│   ├── main.tsx
│── package.json
│── tsconfig.json
│── vite.config.ts
│── README.md
```

## Ejecución de la Aplicación

Para correr la aplicación en modo desarrollo:
```sh
npm run dev  # O usa yarn dev
```
Esto iniciará el servidor en `http://localhost:5173/`.

## Construcción para Producción

Para generar los archivos estáticos optimizados para producción:
```sh
# Con npm
npm run build

# Con yarn
yarn build
```
Los archivos generados estarán en la carpeta `dist/`.

## Despliegue en Producción

Puedes servir la carpeta `dist/` con cualquier servidor HTTP estático o usar un servicio como Vercel, Netlify o Cloudflare Pages para el despliegue.
Si prefieres usar un servidor local como Nginx, puedes seguir estos pasos:

1. Construye el proyecto:
   ```sh
   npm run build
   ```

2. Sirve los archivos en `dist/` con un servidor estático:
   
   ```sh
   npx serve -s dist
   ```

## Dependencias Principales

- **React** (Librería principal)
- **React Router DOM** (Manejo de rutas en el frontend)
- **Axios** (Para realizar solicitudes HTTP)
- **Vite** (Herramienta de desarrollo y build)
- **Bootstrap React** (Componentes de UI)

## API

Este proyecto se comunica con una API en Laravel. La URL base de la API se debe configurar en el entorno.

### Endpoints utilizados:

#### **Crear habitaciones**

- **Método:** `POST`
- **URL:** `/api/v1/hotels/:hotel_id/rooms`
- **Ejemplo de JSON enviado:**
  
  ```json
  {
    "rooms": [
      {"type": "standard", "accommodation": "sencilla", "qty_rooms": 2},
      {"type": "junior_suite", "accommodation": "triple", "qty_rooms": 1}
    ]
  }
  ```
  
- **Posibles errores de respuesta:**
  
  ```json
  {
    "error": "La acomodación 'sencilla' ya existe en este hotel."
  }
  ```

Si este error ocurre, la aplicación mostrará un mensaje de error indicando que la combinación ya existe en el hotel.

## Próximos Pasos

- Mejorar la validación en el frontend para evitar enviar combinaciones de habitación-acomodación duplicadas.
- Implementar la opción de edición de habitaciones.
- Agregar confirmaciones antes de eliminar habitaciones.
- Implementar tests para asegurar el correcto funcionamiento de la funcionalidad.

Si tienes más detalles o quieres que agregue algo, dime. 😉

