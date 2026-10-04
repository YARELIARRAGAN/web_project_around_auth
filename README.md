# Around the U.S. (con autenticación)

Esta es la versión del proyecto *Around the U.S.* a la que le agregué registro e inicio de sesión de usuarios. Cada persona puede crear su cuenta, entrar, y ver y gestionar sus tarjetas de lugares. Lo hice con React como parte del bootcamp de TripleTen.

## Qué se puede hacer

- Registrarse e iniciar sesión (el token se guarda en `localStorage`, así que la sesión se mantiene al recargar).
- Ver las tarjetas, añadir nuevas, borrarlas y darles like.
- Abrir la imagen de una tarjeta en grande.
- Editar el nombre, la descripción y la foto de perfil.
- Cerrar sesión desde el menú de arriba.

Si intentas entrar a la página principal sin haber iniciado sesión, te redirige a `/signin`. Los formularios tienen validación y el botón no se activa hasta que los datos son correctos. También se adapta a móvil, donde el encabezado pasa a un menú de hamburguesa.

## Tecnologías

React 19, React Router, Vite, ESLint y CSS con metodología BEM.

## Cómo correrlo en local

Necesitas tener Node.js instalado.

```bash
git clone https://github.com/YARELIARRAGAN/web_project_around_auth.git
cd web_project_around_auth
npm install
npm run dev
```

Se abre solo en `http://localhost:3000`.

Otros comandos que uso:

- `npm run build` para generar la versión de producción
- `npm run lint` para revisar el código con ESLint

## Cómo está organizado

web_project_around_auth/
├── public/                    # favicon e iconos
├── src/
│   ├── blocks/                # estilos CSS separados por bloque (BEM)
│   ├── components/
│   │   ├── App/               # componente principal: estado y rutas
│   │   ├── Header/            # logo, menú y botones de sesión
│   │   ├── Footer/
│   │   ├── Login/             # formulario de inicio de sesión
│   │   ├── Register/          # formulario de registro
│   │   ├── InfoTooltip/       # aviso de éxito o error
│   │   ├── ProtectedRoute.jsx # protege las rutas privadas
│   │   └── Main/              # perfil y tarjetas
│   │       └── components/
│   │           ├── Card/
│   │           ├── ImagePopup/
│   │           ├── Popup/
│   │           └── form/      # EditAvatar, EditProfile y NewCard
│   ├── contexts/
│   │   └── CurrentUserContext.js  # datos del usuario actual
│   ├── images/                # iconos e imágenes
│   ├── utils/
│   │   ├── api.js             # tarjetas y perfil
│   │   ├── auth.js            # registro y login
│   │   └── useFormValidation.js   # hook para validar formularios
│   ├── vendor/                # normalize.css y fuentes
│   ├── index.css
│   └── main.jsx               # punto de entrada
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json

## APIs

Uso dos APIs que da TripleTen:

- Autenticación: `https://se-register-api.en.tripleten-services.com/v1`
- Tarjetas y perfil: `https://around-api.es.tripleten-services.com/v1/`

## Lo que practiqué

Rutas protegidas con React Router, Context API, hooks personalizados, manejo de tokens JWT y consumo de APIs con `fetch`.

## Pendiente

- Sacar el token de la API del código y pasarlo a una variable de entorno.
- Mostrar mensajes de error más claros en los formularios.
- Subir el proyecto a algún hosting para tener una demo.