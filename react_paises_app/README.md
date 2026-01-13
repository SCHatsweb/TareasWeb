# Instrucciones de Ejecución

Este es un proyecto React creado con Vite. Para ejecutarlo en tu computadora, sigue estos pasos:

## Prerrequisitos
Debes tener **Node.js** instalado en tu computadora. Puedes descargarlo aquí: [https://nodejs.org/](https://nodejs.org/)

## Pasos para Ejecutar
1.  Abre una terminal (CMD, PowerShell o Terminal de VS Code).
2.  Navega a la carpeta del proyecto:
    ```bash
    cd react_paises_app
    ```
3.  Instala las dependencias necesarias:
    ```bash
    npm install
    ```
4.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
5.  Abre el enlace que aparecerá en la terminal (usualmente `http://localhost:5173`) en tu navegador web.

## Funcionalidades
*   **Inicio:** Pantalla de bienvenida.
*   **Lista de Países:** Muestra todos los países obtenidos de la API `restcountries.com` con un buscador integrado en tiempo real.
*   **Navegación:** Usa React Router para cambiar entre vistas sin recargar la página.

## Subir a GitHub
1.  Crea un nuevo repositorio en GitHub.
2.  Ejecuta estos comandos en la terminal (dentro de la carpeta del proyecto):
    ```bash
    git init
    git add .
    git commit -m "Proyecto Países React"
    git branch -M main
    git remote add origin <TU_LINK_DEL_REPOSITORIO>
    git push -u origin main
    ```
