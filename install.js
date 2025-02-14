module.exports = {
  run: [
    // Paso 1: Instala LibreOffice según el sistema operativo
    {
      method: "script.run",
      params: {
        uri: "installLibreoffice.js"
      }
    },
    // Paso 2: Clonar repositorio
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/elloza/slides2video-pinokio app",
        ]
      }
    },
    // Paso 3: Iniciar torch (si se utiliza)
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app"
        }
      }
    },
    // Paso 4: Instalar dependencias de la aplicación
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install gradio devicetorch",
          "uv pip install -r requirements.txt",
          "uv pip install transformers"
        ]
      }
    },
    // Paso 5: Enlazar el entorno virtual
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    }
  ]
}
