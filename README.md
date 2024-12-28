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

```plaintext
DTO/: Contiene objetos de transferencia de datos.
  - productDTO.js
  - userDTO.js

memory/: Contiene implementaciones de DAO en memoria.
  - dao/userDao.js

models/: Contiene los modelos de datos.
  - cartModel.js
  - productModel.js
  - ticketModel.js
  - userModel.js

mongoDB/: Contiene implementaciones de DAO para MongoDB.
  - dao/basicDao.js
  - dao/cartDao.js
  - dao/connection.js
  - dao/productDao.js
  - dao/ticketDao.js
  - dao/userDao.js

otherDB/: (Vacío por ahora, para futuras implementaciones de otras bases de datos)

repositories/: Contiene los repositorios que interactúan con los DAOs.
  - cartRepository.js
  - index.js
  - productRepository.js
  - ticketRepository.js
  - userRepository.js

routes/: Contiene las rutas de la API.
  - basicRouter.js
  - cartsRoutes.js
  - index.js
  - productsRoutes.js
  - userRoutes.js

services/: Contiene la lógica de negocio.
  - basicServices.js
  - cartServices.js
  - productServices.js
  - ticketServices.js
  - userServices.js

utils/: Contiene utilidades y funciones auxiliares.
  - utils.js

test/: Contiene scripts y configuraciones para pruebas.
  - artillery/: Pruebas de rendimiento.
    - testprueba.yml
    - userTest.yml
  - faker/: Scripts para generar datos de prueba.
    - faker-script.cjs

Archivos de configuración y otros:
  - .env: Variables de entorno.
  - .gitignore: Archivos y carpetas a ignorar por Git.
  - package-lock.json: Archivo de bloqueo de dependencias de npm.
  - package.json: Archivo de configuración de npm.
  - README.md: Documentación del proyecto.
  - app.js: Archivo principal de la aplicación.
```
