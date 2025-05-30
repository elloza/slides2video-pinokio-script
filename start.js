// start.js
module.exports = {
  daemon: true,
  run: [
    /* 1 · Crea (si no existe) y abastece el entorno ----------- */
    {
      method: "shell.run",
      params: {
        venv: "slides2video",          // ➜  La carpeta del venv
        path: "app",          // ➜  Ejecuta todo desde /app
        message: [
          // A) Garantiza que exista el venv
          "python -m venv env || echo venv listo",
          // B) Actualiza pip
          "python -m pip install --upgrade pip",
          // C) Instala dependencias; si no hay requirements.txt, instala Streamlit “pelado”
          "if exist requirements.txt (pip install -r requirements.txt) else (pip install streamlit)"
        ],
        /* Espera a ver la palabra “Successfully installed” o “Requirement already satisfied”
           antes de pasar al siguiente paso */
        on: [{ event: /(Successfully installed|Requirement already satisfied)/, done: true }]
      }
    },

    /* 2 · Arranca Streamlit dentro del mismo venv -------------- */
    {
      method: "shell.run",
      params: {
        venv: "slides2video",
        path: "app",
        message: [
          // Usamos SIEMPRE el python del venv ─ así evitamos que Windows busque streamlit.exe
          "python -m streamlit run app.py --server.headless true"
        ],
        on: [{ event: /http:\/\/\S+/, done: true }]
      }
    },

    /* 3 · Expone la URL en la UI de Pinokio -------------------- */
    {
      method: "local.set",
      params: { url: "{{input.event[0]}}" }
    }
  ]
};
