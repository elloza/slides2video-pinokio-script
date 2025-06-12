module.exports = {
  run: [
    /* ───────────── WINDOWS ────────────── */

    // Windows + GPU NVIDIA (CUDA 12.6)
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args?.venv ?? null}}",
        "path": "{{args?.path ?? '.'}}",
        "message": "uv pip install torch==2.6.0 torchvision==0.21.0 torchaudio==2.6.0 {{args?.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/cu126"
      }
    },

    // Windows + GPU AMD (DirectML)
    {
      "when": "{{platform === 'win32' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args?.venv ?? null}}",
        "path": "{{args?.path ?? '.'}}",
        /* Torch-DirectML todavía publica releases independientes; dejamos
           la versión sin anclar para obtener la más reciente disponible. */
        "message": "uv pip install torch-directml torchvision==0.21.0 torchaudio==2.6.0 numpy==1.26.4"
      }
    },

    // Windows CPU-only
    {
      "when": "{{platform === 'win32' && (gpu !== 'nvidia' && gpu !== 'amd')}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args?.venv ?? null}}",
        "path": "{{args?.path ?? '.'}}",
        "message": "uv pip install torch==2.6.0 torchvision==0.21.0 torchaudio==2.6.0 --index-url https://download.pytorch.org/whl/cpu"
      }
    },

    /* ───────────── macOS ─────────────── */

    {
      "when": "{{platform === 'darwin'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args?.venv ?? null}}",
        "path": "{{args?.path ?? '.'}}",
        "message": "uv pip install torch==2.6.0 torchvision==0.21.0 torchaudio==2.6.0"
      }
    },

    /* ───────────── LINUX ─────────────── */

    // Linux + GPU NVIDIA (CUDA 12.6)
    {
      "when": "{{platform === 'linux' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args?.venv ?? null}}",
        "path": "{{args?.path ?? '.'}}",
        "message": "uv pip install torch==2.6.0 torchvision==0.21.0 torchaudio==2.6.0 {{args?.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/cu126"
      }
    },

    // Linux + GPU AMD (ROCm 6.2.4)
    {
      "when": "{{platform === 'linux' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args?.venv ?? null}}",
        "path": "{{args?.path ?? '.'}}",
        "message": "uv pip install torch==2.6.0 torchvision==0.21.0 torchaudio==2.6.0 --index-url https://download.pytorch.org/whl/rocm6.2.4"
      }
    },

    // Linux CPU-only
    {
      "when": "{{platform === 'linux' && (gpu !== 'amd' && gpu !== 'nvidia')}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args?.venv ?? null}}",
        "path": "{{args?.path ?? '.'}}",
        "message": "uv pip install torch==2.6.0 torchvision==0.21.0 torchaudio==2.6.0 --index-url https://download.pytorch.org/whl/cpu"
      }
    }
  ]
};
