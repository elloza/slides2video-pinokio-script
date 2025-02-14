// installLibreoffice.js
const { execSync } = require('child_process');
const os = require('os');
const platform = os.platform();

function getSofficeVersion() {
  try {
    return execSync('soffice --version').toString();
  } catch (e) {
    if (platform === 'darwin') {
      const librePath = "/Applications/LibreOffice.app/Contents/MacOS";
      process.env.PATH = librePath + ":" + process.env.PATH;
      return execSync('soffice --version').toString();
    } else if (platform === 'win32') {
      const altPath = '"C:\\Program Files\\LibreOffice\\program\\soffice.exe"';
      return execSync(`${altPath} --version`).toString();
    }
    throw e;
  }
}

console.log("Verificando instalación de LibreOffice...");
let installed;
try {
  installed = getSofficeVersion();
} catch (e) {
  installed = false;
}

if (installed) {
  console.log("LibreOffice ya está instalado. Versión:", installed.trim());
  process.exit(0);
} else {
  console.log("LibreOffice no detectado. Procediendo con la instalación...");
}

try {
  if (platform === 'linux') {
    console.log("Instalando LibreOffice en Linux...");
    execSync("sudo apt-get update && sudo apt-get install libreoffice -y", { stdio: 'inherit' });
  } else if (platform === 'win32') {
    console.log("Instalando LibreOffice en Windows...");
    const installerUrl = "https://download.documentfoundation.org/libreoffice/stable/7.5.0/win/x86_64/LibreOffice_7.5.0_Win_x64.msi";
    console.log("Descargando instalador desde:", installerUrl);
    execSync(`powershell -Command "Invoke-WebRequest -Uri '${installerUrl}' -OutFile 'LibreOffice.msi'"`, { stdio: 'inherit' });
    console.log("Ejecutando instalador en modo silencioso...");
    execSync('msiexec /i LibreOffice.msi /quiet /qn', { stdio: 'inherit' });
  } else if (platform === 'darwin') {
    console.log("Instalando LibreOffice en macOS...");
    execSync('brew install --cask libreoffice', { stdio: 'inherit' });
    const libreDir = "/Applications/LibreOffice.app/Contents/MacOS";
    if (!process.env.PATH.includes(libreDir)) {
      process.env.PATH = libreDir + ":" + process.env.PATH;
      console.log(`PATH actualizado temporalmente para incluir: ${libreDir}`);
    }
  } else {
    console.log("Plataforma no soportada. Instale LibreOffice manualmente.");
    process.exit(1);
  }
  
  console.log("Verificando instalación post-proceso...");
  const version = getSofficeVersion();
  console.log("LibreOffice instalado. Versión:", version.trim());
} catch (error) {
  console.error("Error durante la instalación o verificación de LibreOffice:", error);
  process.exit(1);
}
