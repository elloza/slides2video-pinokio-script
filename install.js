module.exports = {
  run: [
    // (Paso de instalación de LibreOffice removido)
    // Paso 1: Clonar repositorio
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/elloza/slides2video-pinokio app",
        ]
      }
    },
    // Paso 2: Iniciar torch (si se utiliza)
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "slides2video",
          path: "app"
        }
      }
    },
    // Paso 3: Instalar dependencias de la aplicación
    {
      method: "shell.run",
      params: {
        venv: "slides2video",
        path: "app",
        message: [
          "uv pip install gradio devicetorch",
          "uv pip install -r requirements.txt",
          "uv pip install transformers"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "slides2video",
        path: "app",
        message: [
          "pip install -r requirements.txt"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "slides2video",
        path: "app",
        message: [
          "uv pip install git+https://github.com/elloza/pptx2pdfwasm.git",
          "playwright install",
        ]
      }
    },
    // Paso 4: Enlazar el entorno virtual
    {
      method: "fs.link",
      params: {
        venv: "app/slides2video"
      }
    }
  ]
}
