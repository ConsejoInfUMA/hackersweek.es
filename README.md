# https://hackersweek.es

Sitio web de la Hackers Week, escrito en SvelteKit

# Setup

- Instala [Node.js](https://nodejs.org) 26 o superior
- Instala [pnpm](https://pnpm.io)
- Instala las dependencias necesarias:
  ```sh
  pnpm i
  ```

Ejecutar servidor de desarrollo:

```sh
node --run dev
```

# Subiendo cambios

Una vez hayas terminado tus cambios, ejecuta el siguiente comando para asegurarte
que el código esté bien:

```sh
node --run check
```

Este comando se ejecuta automáticamente en GitHub Actions en cada commit y pull request.
