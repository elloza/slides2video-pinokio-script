// installLibreoffice.js
const { execSync } = require('child_process');
const os = require('os');

const platform = os.platform();

function getSofficeVersion() {
  try {
    // Intenta obtener la versión usando "soffice" del PATH
    return execSync('soffice --version').toString();
  } catch (e) {
    // Si falla, intenta con rutas conocidas según el SO
    if (platform === 'darwin') {
      // En macOS, añade la ruta de LibreOffice al PATH temporalmente
      const librePath = "/Applications/LibreOffice.app/Contents/MacOS";
      process.env.PATH = librePath + ":" + process.env.PATH;
      return execSync('soffice --version').toString();
    } else if (platform === 'win32') {
      // En Windows, intenta con la ruta por defecto
      const altPath = '"C:\\Program Files\\LibreOffice\\program\\soffice.exe"';
      return execSync(`${altPath} --version`).toString();
    }
    throw e;
  }
}

try {
  if (platform === 'linux') {
    console.log("Instalando LibreOffice en Linux...");
    // Ajusta el comando según la distribución; aquí se usa apt-get como ejemplo
    execSync("sudo apt-get update && sudo apt-get install libreoffice -y", { stdio: 'inherit' });
  } else if (platform === 'win32') {
    console.log("Instalando LibreOffice en Windows...");
    const installerUrl = "https://download.documentfoundation.org/libreoffice/stable/7.5.0/win/x86_64/LibreOffice_7.5.0_Win_x64.msi";
    // Descarga el instalador (requiere PowerShell)
    execSync(`powershell -Command "Invoke-WebRequest -Uri '${installerUrl}' -OutFile 'LibreOffice.msi'"`, { stdio: 'inherit' });
    // Ejecuta el instalador en modo silencioso
    execSync('msiexec /i LibreOffice.msi /quiet /qn', { stdio: 'inherit' });
  } else if (platform === 'darwin') {
    console.log("Instalando LibreOffice en macOS...");
    // Se asume que Homebrew está instalado
    execSync('brew install --cask libreoffice', { stdio: 'inherit' });
    // Actualiza el PATH temporalmente para este proceso si no está incluido
    const libreDir = "/Applications/LibreOffice.app/Contents/MacOS";
    if (!process.env.PATH.includes(libreDir)) {
      process.env.PATH = libreDir + ":" + process.env.PATH;
      console.log(`PATH actualizado temporalmente para incluir: ${libreDir}`);
    }
  } else {
    console.log("Plataforma no soportada. Instale LibreOffice manualmente.");
  }
  
  // Verificar que 'soffice' esté disponible
  const version = getSofficeVersion();
  console.log("LibreOffice instalado. Versión:", version.trim());
} catch (error) {
  console.error("Error durante la instalación o verificación de LibreOffice:", error);
}
