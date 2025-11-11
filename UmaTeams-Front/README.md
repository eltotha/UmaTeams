# UmaTeams Frontend

Este directorio contiene el frontend de [UmaTeams](https://github.com/eltotha/UmaTeams), la plataforma para la gestión y creacion de equipos de los personajes de UmaMusume.

## Características

- Interfaz moderna y responsiva para la gestión de equipos, proyectos y tareas.
- Integración con una API backend para persistencia de datos.
- Gestión de usuarios y roles.
- Listados dinámicos, formularios y componentes personalizados.

## Tecnologías utilizadas

- **React**
- **JavaScript/TypeScript**
- **CSS/Styled Components**

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/eltotha/UmaTeams.git
   cd UmaTeams/UmaTeams-Front
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

## Uso en desarrollo

Para iniciar la aplicación en modo desarrollo ejecuta:

```bash
npm start
# o
yarn start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000) (o el puerto que corresponda).

## Script comunes

- `npm run start`: Inicia el servidor de desarrollo.
- `npm run build`: Genera una versión de producción en la carpeta `build`.
- `npm run test`: Ejecuta los tests definidos.

## Estructura de carpetas

```
UmaTeams-Front/
 │
 ├── public/
 ├── src/
 │    ├── components/
 │    ├── pages/
 │    ├── services/
 │    └── App.js
 ├── package.json
 └── README.md
```
