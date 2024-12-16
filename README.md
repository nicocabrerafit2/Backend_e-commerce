# Backend E-commerce Node.js

Backend de un e-commerce desarrollado con Node.js y Express, implementando diversos patrones de arquitectura.

## Características

- Implementación de patrones de arquitectura
- Sistema de autenticación con JWT y Passport
- Capa de persistencia con patrón Factory
- Tests unitarios y de carga con Artillery

## Tests

El proyecto incluye:
- Tests unitarios
- Tests de carga utilizando Artillery para pruebas de rendimiento
  - Pruebas de usuarios
  - Pruebas generales del sistema

## Tecnologías Principales

- Node.js
- Express
- JWT para autenticación
- Passport.js
- Artillery para testing

## Instalación
- Clonar el repositorio
git clone [url-del-repositorio]
- Instalar dependencias
npm install
- Ejecutar el proyecto
npm start

## Tests
- Ejecutar tests unitarios
npm test
- Ejecutar tests de carga
npm run test:artillery

## Estructura de Carpetas

- `src/`: Código fuente principal
  - `config/`: Configuraciones del proyecto
  - `controllers/`: Controladores de la aplicación
  - `middlewares/`: Middlewares personalizados
  - `persistence/`: Capa de persistencia
  - `utils/`: Utilidades y helpers
- `test/`: Tests del proyecto
  - `artillery/`: Tests de carga
