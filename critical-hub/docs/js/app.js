// ============================================================================
// [ES] MÓDULO CORE: ORQUESTADOR CENTRAL DE LA INTERFAZ TÁCTICA (APP)
// [EN] CORE MODULE: CENTRAL ORGHESTRATOR OF THE TACTICAL INTERFACE (APP)
// ============================================================================
// [ES] Este script actúa como el Init de la arquitectura. Captura eventos de 
// teclado globales, inicializa los módulos y gestiona el flujo de ejecución.
// [EN] This script acts as the Init of the architecture. It captures global 
// keyboard events, initializes modules, and manages the execution flow.
// ============================================================================

// [ES] Importaciones de subsistemas modulares mediante ES6 Standard
// [EN] Modular subsystem imports via ES6 Standard
import { startSimulation, resetSimulation } from './simulations.js';
import { initAccessibility } from './accessibility.js';

// ============================================================================
// [ES] CONFIGURACIÓN DE ESTADOS PARA EVENTOS DE TECLADO
// [EN] STATE CONFIGURATION FOR KEYBOARD EVENTS
// ============================================================================
// [ES] Controlamos el doble tap de ENTER mediante una ventana de tiempo (milisegundos).
// [EN] We control the ENTER double tap via a time window (milliseconds).
let lastEnterPress = 0;
const DOUBLE_TAP_DELAY = 300; 

// ============================================================================
// [ES] EVENTO: CARGA DEL DOM (DOCUMENT READY)
// [EN] EVENT: DOM LOAD (DOCUMENT READY)
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log("[ES] Inicializando subsistemas Kronos Core... | [EN] Initializing Kronos Core subsystems...");
    
    // [ES] 1. Disparar el motor de accesibilidad (Daltonismo, TTS, Contraste)
    // [EN] 1. Trigger the accessibility engine (Colorblindness, TTS, Contrast)
    initAccessibility();

    // [ES] 2. Enlazar los listeners de los botones físicos del HUD
    // [EN] 2. Bind listeners for the HUD physical buttons
    setupInterfaceButtons();

    // [ES] 3. Enlazar los atajos de teclado globales (Modo Hacker / Terminal)
    // [EN] 3. Bind global keyboard shortcuts (Hacker / Terminal Mode)
    setupKeyboardShortcuts();
});

// ============================================================================
// [ES] FUNCIÓN: ENLAZAR BOTONES DE LA INTERFAZ
// [EN] FUNCTION: BIND INTERFACE BUTTONS
// ============================================================================
function setupInterfaceButtons() {
    const btnStart = document.getElementById('btnStart');
    const btnReset = document.getElementById('btnReset');

    // [ES] Mapeo de clicks del ratón hacia el motor asíncrono de simulaciones
    // [EN] Mapping mouse clicks to the asynchronous simulation engine
    if (btnStart) {
        btnStart.addEventListener('click', () => {
            console.log("[ES] Gatillo manual: Iniciar. | [EN] Manual trigger: Start.");
            startSimulation();
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            console.log("[ES] Gatillo manual: Reset. | [EN] Manual trigger: Reset.");
            resetSimulation();
        });
    }
}

// ============================================================================
// [ES] FUNCIÓN: CAPTURA DE INTERRUPCIONES POR TECLADO
// [EN] FUNCTION: KEYBOARD INTERRUPTION CAPTURE
// ============================================================================
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
        // [ES] Ignorar atajos si el usuario está escribiendo en un input (Failsafe)
        // [EN] Ignore shortcuts if the user is typing in an input field (Failsafe)
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        const key = event.key.toUpperCase();

        // [ES] CONTROL DE CASOS: Tecla W (Iniciar Monitorización)
        // [EN] CASE CONTROL: W Key (Start Monitoring)
        if (key === 'W' || key === '∑') { // [ES] '∑' contempla teclados con mapeos alternativos
            event.preventDefault(); // [ES] Evita scroll accidental / [EN] Prevents accidental scrolling
            console.log("[ES] Atajo detectado: [W] -> Lanzando hilos OT. | [EN] Shortcut detected: [W] -> Launching OT threads.");
            startSimulation();
        }

        // [ES] CONTROL DE CASOS: Doble Enter (Forzar caída / Reset)
        // [EN] CASE CONTROL: Double Enter (Force Teardown / Reset)
        if (event.key === 'Enter') {
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - lastEnterPress;

            if (timeDiff < DOUBLE_TAP_DELAY && timeDiff > 0) {
                // [ES] Se ha confirmado el doble toque rápido
                // [EN] Quick double tap confirmed
                event.preventDefault();
                console.log("[ES] Atajo detectado: [ENTER x2] -> Purgando entorno. | [EN] Shortcut detected: [ENTER x2] -> Purging environment.");
                resetSimulation();
                lastEnterPress = 0; // [ES] Reseteamos la marca de tiempo / [EN] Reset timestamp flag
            } else {
                // [ES] Primer toque registrado, guardamos el timestamp
                // [EN] First tap registered, store timestamp
                lastEnterPress = currentTime;
            }
        }
    });
}