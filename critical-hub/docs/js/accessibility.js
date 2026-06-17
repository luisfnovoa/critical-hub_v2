// ============================================================================
// [ES] MÓDULO DE ACCESIBILIDAD: MOTOR DE CONFORMIDAD WCAG / W3C (A11Y)
// [EN] ACCESSIBILITY MODULE: WCAG / W3C COMPLIANCE ENGINE (A11Y)
// ============================================================================
// [ES] Este script inyecta capacidades de alta disponibilidad visual, filtros
// [ES] cromáticos para daltonismo, y un motor de lectura de pantalla (TTS) dinámico.
// [EN] This script injects high visual availability features, chromatic filters
// [EN] for colorblindness, and a dynamic text-to-speech (TTS) screen reader engine.
// ============================================================================

// [ES] Variables globales del subsistema de audio nativo del navegador
// [EN] Global variables for the browser's native audio subsystem
let ttsSynthesizer = window.speechSynthesis;
let ttsUtterance = null;

// ============================================================================
// [ES] INICIALIZADOR DEL SUBSISTEMA ACCESIBILIDAD
// [EN] ACCESSIBILITY SUBSYSTEM INITIALIZER
// ============================================================================
export function initAccessibility() {
    const btnDaltonismo = document.getElementById('btn-daltonismo');
    const btnTTS = document.getElementById('btn-tts');
    const btnCheckContrast = document.getElementById('btn-check-contrast');

    // [ES] Asignación de manejadores de eventos con comprobación defensiva (Failsafe)
    // [EN] Event handler assignment with defensive check (Failsafe)
    if (btnDaltonismo) btnDaltonismo.addEventListener('click', toggleFiltroDaltonismo);
    if (btnTTS) btnTTS.addEventListener('click', toggleLecturaDinamica);
    if (btnCheckContrast) btnCheckContrast.addEventListener('click', analizarContrasteInterfaz);
    
    console.log("[ES] Submódulo A11Y acoplado con éxito. | [EN] A11Y sub-module successfully attached.");
}

// ============================================================================
// [ES] CONTROL DE DALTONISMO MEDIANTE BANDERA DE ESTADO (STATE FLAGS)
// [EN] COLORBLINDNESS CONTROL VIA STATE FLAGS
// ============================================================================
// [ES] Conmuta las variables CSS entre la paleta OT estándar y la de alta visibilidad.
// [EN] Toggles CSS variables between standard OT palette and high visibility palette.
function toggleFiltroDaltonismo() {
    const root = document.documentElement;
    // [ES] Leemos el atributo personalizado del DOM para evitar fallos de lectura de strings RGB
    // [EN] We read the custom DOM attribute to avoid RGB string reading failures
    const estaActivo = root.getAttribute('data-a11y-daltonismo') === 'true';

    if (!estaActivo) {
        // [ES] ACTIVAR: Inyección de la paleta de contraste corregida por la W3C (Protanopía/Deuteranopía)
        // [EN] ACTIVATE: Injection of the W3C corrected contrast palette (Protanopia/Deuteranopia)
        root.setAttribute('data-a11y-daltonismo', 'true');
        root.style.setProperty('--accent-blue', '#f59e0b');   // [ES] Ámbar / [EN] Amber
        root.style.setProperty('--accent-warn', '#3b82f6');   // [ES] Azul Cobalto / [EN] Cobalt Blue
        root.style.setProperty('--accent-danger', '#ffffff'); // [ES] Blanco Puro / [EN] Pure White
        console.log("[ES] Modo daltonismo: ACTIVADO. | [EN] Colorblind mode: ACTIVATED.");
    } else {
        // [ES] DESACTIVAR: Restaurar colores por defecto del HUD táctico original
        // [EN] DEACTIVATE: Restore default colors of the original tactical HUD
        root.setAttribute('data-a11y-daltonismo', 'false');
        root.style.setProperty('--accent-blue', '#38bdf8');   // [ES] Cian / [EN] Cyan
        root.style.setProperty('--accent-warn', '#fb923c');   // [ES] Naranja / [EN] Orange
        root.style.setProperty('--accent-danger', '#f87171'); // [ES] Coral / [EN] Coral
        console.log("[ES] Modo daltonismo: DESACTIVADO. | [EN] Colorblind mode: DEACTIVATED.");
    }
}

// ============================================================================
// [ES] MOTOR LECTOR DE PANTALLA INTELLIGENT TEXT-TO-SPEECH (TTS)
// [EN] INTELLIGENT TEXT-TO-SPEECH SCREEN READER ENGINE (TTS)
// ============================================================================
// [ES] Detecta el contexto del DOM. Si está en el HUD, lee los paneles; si está en Dox, lee la tesis.
// [EN] Detects DOM context. If in the HUD, reads panels; if in Dox, reads the thesis.
function toggleLecturaDinamica() {
    // [ES] Si el motor ya está emitiendo voz, el botón actúa como un interruptor de parada (Mute)
    // [EN] If the engine is already speaking, the button acts as a kill-switch (Mute)
    if (ttsSynthesizer.speaking) {
        ttsSynthesizer.cancel();
        console.log("[ES] TTS: Audio detenido por interrupción de usuario. | [EN] TTS: Audio stopped by user interruption.");
        return;
    }

    // [ES] Contexto 1: Intentar capturar el bloque de la tesis (docs.html)
    // [EN] Context 1: Attempt to capture the thesis block (docs.html)
    let textoALeer = document.getElementById('tesis-content')?.innerText;
    
    // [ES] Fallback / Contexto 2: Si no existe, estamos en index.html, lee la telemetría viva de los 4 paneles
    // [EN] Fallback / Contexto 2: If it doesn't exist, we are in index.html, read live telemetry from the 4 panels
    if (!textoALeer) {
        const paneles = document.querySelector('.dashboard-grid');
        textoALeer = paneles ? paneles.innerText : "Consola operativa de Kronos en espera.";
    }

    // [ES] SANITIZACIÓN: Eliminamos caracteres especiales de la consola para no confundir al sintetizador
    // [EN] SANITIZATION: We remove special console characters to avoid confusing the synthesizer
    const textoLimpio = textoALeer.replace(/[\[\]\-\#\=\|]/g, ' ');

    // [ES] Configuración del paquete de datos de voz (Instancia de Utterance)
    // [EN] Voice data packet configuration (Utterance Instance)
    ttsUtterance = new SpeechSynthesisUtterance(textoLimpio);
    ttsUtterance.lang = 'es-ES'; // [ES] Forzado en castellano / [EN] Forced to Castilian Spanish
    ttsUtterance.rate = 1.05;    // [ES] Velocidad ligeramente incrementada / [EN] Slightly accelerated pace

    ttsSynthesizer.speak(ttsUtterance);
    console.log("[ES] TTS: Iniciando lectura del entorno activo... | [EN] TTS: Starting active environment reading...");
}

// ============================================================================
// [ES] ALGORITMO DE LUMINANCIA RELATIVA W3C Y ANÁLISIS DE CONTRASTE
// [EN] W3C RELATIVE LUMINANCE ALGORITHM AND CONTRAST ANALYSIS
// ============================================================================
// [ES] Aplica las fórmulas de la WCAG para validar matemáticamente el ratio de contraste.
// [EN] Applies WCAG formulas to mathematically validate the contrast ratio.
function analizarContrasteInterfaz() {
    const estilos = getComputedStyle(document.documentElement);
    // [ES] Captura los valores hexadecimales de las variables CSS de fondo y texto
    // [EN] Captures hex values from CSS variables for background and text
    const bgHex = estilos.getPropertyValue('--bg-panel').trim() || '#222530';
    const textHex = estilos.getPropertyValue('--text-main').trim() || '#e2e8f0';

    // [ES] Ejecución del cálculo espectral de luminancia
    // [EN] Execution of spectral luminance calculation
    const lumBG = calcularLuminanciaHex(bgHex);
    const lumText = calcularLuminanciaHex(textHex);

    // [ES] Fórmula matemática WCAG: (L1 + 0.05) / (L2 + 0.05)
    // [EN] WCAG Mathematical Formula: (L1 + 0.05) / (L2 + 0.05)
    const ratio = (Math.max(lumBG, lumText) + 0.05) / (Math.min(lumBG, lumText) + 0.05);
    
    // [ES] Renderizado dinámico de resultados en el contenedor flotante del HUD
    // [EN] Dynamic rendering of results in the HUD's floating container
    const resultadoDiv = document.getElementById('contrast-result');
    if (resultadoDiv) {
        resultadoDiv.style.display = 'block';
        resultadoDiv.innerHTML = `
            <strong>Contrast Ratio:</strong> ${ratio.toFixed(2)}:1 <br>
            <strong>WCAG AA (Min 4.5:1):</strong> ${ratio >= 4.5 ? '<span style="color:#38bdf8">✅ PASSED</span>' : '<span style="color:#f87171">❌ FAILED</span>'}<br>
            <strong>WCAG AAA (Min 7:1):</strong> ${ratio >= 7.0 ? '<span style="color:#38bdf8">✅ EXCELLENT</span>' : '<span style="color:#fb923c">⚠️ ADJUSTED</span>'}
        `;
    }
}

// ============================================================================
// [ES] FUNCIÓN MATEMÁTICA: COMPRESIÓN GAMMA DE COLOR HEX A LUMINANCIA
// [EN] MATHEMATICAL FUNCTION: GAMMA COMPRESSION FROM HEX COLOR TO LUMINANCE
// ============================================================================
function calcularLuminanciaHex(hex) {
    let c = hex.substring(1);
    // [ES] Soporte para formatos taquigráficos de 3 caracteres (ej: #FFF)
    // [EN] Support for short-hand 3-character hex formats (e.g., #FFF)
    if (c.length === 3) c = c.split('').map(char => char + char).join('');
    
    // [ES] Conversión de canales sRGB a escala flotante (0.0 a 1.0)
    // [EN] Conversion of sRGB channels to floating scale (0.0 to 1.0)
    const r = parseInt(c.substr(0, 2), 16) / 255;
    const g = parseInt(c.substr(2, 2), 16) / 255;
    const b = parseInt(c.substr(4, 2), 16) / 255;
    
    // [ES] Aplicación de la fórmula de descompresión Gamma inversa de la W3C
    // [EN] Application of the W3C Inverse Gamma Decompression formula
    const R = (r <= 0.03928) ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const G = (g <= 0.03928) ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const B = (b <= 0.03928) ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    // [ES] Retorno del cálculo de coeficientes de luminancia para el ojo humano
    // [EN] Return of the luminance coefficients calculation for the human eye
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}