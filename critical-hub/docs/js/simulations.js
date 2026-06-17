// ============================================================================
// [ES] MÓDULO DE SIMULACIONES: MOTOR ASÍNCRONO DE TELEMETRÍA TÁCTICA
// [EN] SIMULATIONS MODULE: ASYNCHRONOUS TACTICAL TELEMETRY ENGINE
// ============================================================================
// [ES] Este script gestiona los hilos de ejecución de los paneles del Hub.
// [ES] Simula tráfico de red, validación de credenciales (CyberArk Conjur)
// [ES] e inyecciones de ataques en entornos aislados.
// [EN] This script manages the execution threads of the Hub's panels.
// [EN] It simulates network traffic, credential validation (CyberArk Conjur)
// [EN] and attack injections in isolated environments.
// ============================================================================

// [ES] Importamos la base de datos de incidentes del Runbook (Requisito ES6 Modules)
// [EN] We import the incident database from the Runbook (ES6 Modules requirement)
import { infrastructureIncidents } from './runbook.js';

// ============================================================================
// [ES] VARIABLES DE ESTADO Y CONTROLADORES DE HILOS (Timers)
// [EN] STATE VARIABLES AND THREAD CONTROLLERS (Timers)
// ============================================================================
// [ES] Almacenamos los IDs de los setInterval para poder matarlos al reiniciar.
// [EN] We store the setInterval IDs to be able to kill them upon reset.
let modbusTimer = null;
let iamTimer = null;
let honeypotTimer = null;
let runbookTimer = null;
let isRunning = false;

// ============================================================================
// [ES] FUNCIÓN PRINCIPAL: INICIAR MONITORIZACIÓN
// [EN] MAIN FUNCTION: START MONITORING
// ============================================================================
export function startSimulation() {
    // [ES] Evita que se lancen múltiples hilos si ya está corriendo (Evita fugas de memoria).
    // [EN] Prevents multiple threads from launching if already running (Prevents memory leaks).
    if (isRunning) return;
    isRunning = true;

    // [ES] Actualización visual de estado en los paneles.
    // [EN] Visual state update on the panels.
    document.getElementById('status-p1').innerText = '[ACTIVO]';
    document.getElementById('status-p2').innerText = '[ACTIVO]';
    document.getElementById('status-p3').innerText = '[ALERTA]';
    document.getElementById('status-p4').innerText = '[AUDITANDO]';

    // [ES] Inyección inicial en consola para confirmar arranque.
    // [EN] Initial console injection to confirm boot.
    logToPanel('feed-p1', '>>> INICIANDO ESCÁNER DE TRAMAS MODBUS TCP...', 'log-blue');
    logToPanel('feed-p2', '>>> CONECTANDO AL PROVIDER DE CYBERARK CONJUR...', 'log-blue');
    logToPanel('feed-p3', '>>> LEVANTANDO SENSORES KIPPO EN DMZ...', 'log-yellow');
    logToPanel('feed-p4', '>>> CARGANDO INCIDENTES HISTÓRICOS DESDE RUNBOOK...', 'log-white');

    // [ES] Ejecución de simuladores con intervalos asíncronos (Milisegundos).
    // [EN] Execution of simulators with asynchronous intervals (Milliseconds).
    modbusTimer = setInterval(simulateModbus, 1800);
    iamTimer = setInterval(simulateIAM, 2500);
    honeypotTimer = setInterval(simulateHoneypot, 3000);
    
    // [ES] El Runbook se carga un poco más lento para simular la extracción de BBDD.
    // [EN] The Runbook loads slightly slower to simulate DB extraction.
    setTimeout(populateRunbook, 1500);
}

// ============================================================================
// [ES] FUNCIÓN DE REINICIO (RESET TÁCTICO)
// [EN] RESET FUNCTION (TACTICAL RESET)
// ============================================================================
export function resetSimulation() {
    // [ES] Matamos todos los procesos asíncronos.
    // [EN] We kill all asynchronous processes.
    clearInterval(modbusTimer);
    clearInterval(iamTimer);
    clearInterval(honeypotTimer);
    clearTimeout(runbookTimer);
    isRunning = false;

    // [ES] Vaciamos el DOM de los contenedores de logs.
    // [EN] We empty the DOM of the log containers.
    document.getElementById('feed-p1').innerHTML = '';
    document.getElementById('feed-p2').innerHTML = '';
    document.getElementById('feed-p3').innerHTML = '';
    document.getElementById('feed-p4').innerHTML = '';

    // [ES] Restauramos los estados a [ESPERA].
    // [EN] We restore the states to [STANDBY].
    document.getElementById('status-p1').innerText = '[ESPERA]';
    document.getElementById('status-p2').innerText = '[ESPERA]';
    document.getElementById('status-p3').innerText = '[ESPERA]';
    document.getElementById('status-p4').innerText = '[ESPERA]';

    console.log("[ES] Simulaciones abortadas y memoria purgada. | [EN] Simulations aborted and memory purged.");
}

// ============================================================================
// [ES] FUNCIÓN AUXILIAR: INYECTOR DE LOGS EN EL DOM
// [EN] HELPER FUNCTION: LOG INJECTOR INTO THE DOM
// ============================================================================
// [ES] Agrega líneas de texto al panel correspondiente y hace scroll automático al fondo.
// [EN] Appends text lines to the corresponding panel and auto-scrolls to the bottom.
function logToPanel(panelId, message, colorClass) {
    const feed = document.getElementById(panelId);
    if (!feed) return; // [ES] Fallback si el DOM no está listo / [EN] Fallback if DOM is not ready.

    // [ES] Generamos un timestamp ISO para realismo táctico.
    // [EN] We generate an ISO timestamp for tactical realism.
    const time = new Date().toISOString().split('T')[1].slice(0, -1);
    
    // [ES] Construimos el elemento div con la clase de color solicitada.
    // [EN] We build the div element with the requested color class.
    const logLine = document.createElement('div');
    logLine.className = colorClass;
    logLine.textContent = `[${time}] ${message}`;
    
    feed.appendChild(logLine);
    
    // [ES] Autoscroll forzado: Mantiene la vista en el último log.
    // [EN] Forced autoscroll: Keeps the view on the latest log.
    feed.scrollTop = feed.scrollHeight;
}

// ============================================================================
// [ES] LÓGICA DEL PANEL 1: SCADA MODBUS TCP
// [EN] PANEL 1 LOGIC: MODBUS TCP SCADA
// ============================================================================
function simulateModbus() {
    // [ES] Generador pseudoaleatorio de eventos normales y ataques de inyección.
    // [EN] Pseudorandom generator of normal events and injection attacks.
    const rand = Math.random();
    if (rand > 0.8) {
        // [ES] ERROR SIMULADO: Inyección FC05 detectada (Fuerza bruta al PLC).
        // [EN] SIMULATED ERROR: FC05 injection detected (Brute force to PLC).
        logToPanel('feed-p1', 'ERR: TRAMA ANÓMALA DETECTADA - INYECCIÓN FC05 (OVERRIDE)', 'log-red');
    } else if (rand > 0.4) {
        // [ES] ESTADO NORMAL: Lectura de registros de temperatura/presión.
        // [EN] NORMAL STATE: Reading temperature/pressure holding registers.
        logToPanel('feed-p1', 'INFO: Lectura de Registro [Holding Reg: 40012] - OK', 'log-blue');
    } else {
        // [ES] ESTADO NORMAL: Verificación de latencia de red.
        // [EN] NORMAL STATE: Network latency verification.
        logToPanel('feed-p1', 'SYS: Ping a Subestación Alfa - Latencia 12ms', 'log-white');
    }
}

// ============================================================================
// [ES] LÓGICA DEL PANEL 2: INTEGRIDAD CYBERARK CONJUR (IAM)
// [EN] PANEL 2 LOGIC: CYBERARK CONJUR INTEGRITY (IAM)
// ============================================================================
function simulateIAM() {
    const rand = Math.random();
    if (rand > 0.85) {
        // [ES] ERROR SIMULADO: Caducidad de token dinámico (JIT). Requiere rotación de políticas.
        // [EN] SIMULATED ERROR: Dynamic token expiration (JIT). Requires policy rotation.
        logToPanel('feed-p2', 'WARN: TOKEN EXPIRADO EN POD INT-03 (DESINCRONIZACIÓN YAML)', 'log-yellow');
    } else if (rand > 0.5) {
        // [ES] ESTADO NORMAL: Rotación exitosa de contraseña privilegiada.
        // [EN] NORMAL STATE: Successful privileged password rotation.
        logToPanel('feed-p2', 'SEC: Bóveda Central -> Rotación de credencial DB_PROD completada.', 'log-blue');
    } else {
        // [ES] ESTADO NORMAL: Validación de identidad mediante Host Factory.
        // [EN] NORMAL STATE: Identity validation via Host Factory.
        logToPanel('feed-p2', 'INFO: Autenticación mTLS validada por API Gateway.', 'log-white');
    }
}

// ============================================================================
// [ES] LÓGICA DEL PANEL 3: HONEYPOT DMZ (KIPPO)
// [EN] PANEL 3 LOGIC: DMZ HONEYPOT (KIPPO)
// ============================================================================
function simulateHoneypot() {
    const rand = Math.random();
    if (rand > 0.7) {
        // [ES] ERROR SIMULADO/ALERTA CRÍTICA: Intento de escalada de privilegios en nodo falso.
        // [EN] SIMULATED ERROR/CRITICAL ALERT: Privilege escalation attempt on dummy node.
        const ips = ["185.150.89.x", "45.33.22.x", "92.118.38.x"];
        const attackerIP = ips[Math.floor(Math.random() * ips.length)];
        logToPanel('feed-p3', `CRITICAL: INTENTO SSH ROOT DESDE ${attackerIP} (BLOQUEADO)`, 'log-red');
    } else {
        // [ES] ESTADO NORMAL: Escaneo de puertos pasivo detectado en el perímetro.
        // [EN] NORMAL STATE: Passive port scanning detected at the perimeter.
        logToPanel('feed-p3', 'AUDIT: Drop de paquete ICMP genérico en el perímetro.', 'log-white');
    }
}

// ============================================================================
// [ES] LÓGICA DEL PANEL 4: CARGA DEL RUNBOOK DE INCIDENTES
// [EN] PANEL 4 LOGIC: INCIDENT RUNBOOK LOADING
// ============================================================================
function populateRunbook() {
    // [ES] Simulamos el retardo de extraer datos leyendo el array de infrastructureIncidents.
    // [EN] We simulate the delay of data extraction by reading the infrastructureIncidents array.
    
    // [ES] Cabecera del informe.
    // [EN] Report header.
    logToPanel('feed-p4', '=== INFORME DE INCIDENTES HISTÓRICOS (IR) ===', 'log-yellow');
    
    let index = 0;
    
    // [ES] Función recursiva con setTimeout para imprimir los incidentes uno a uno (efecto máquina de escribir).
    // [EN] Recursive function with setTimeout to print incidents one by one (typewriter effect).
    function renderNextIncident() {
        if (index < infrastructureIncidents.length) {
            const inc = infrastructureIncidents[index];
            
            logToPanel('feed-p4', `[ID]: ${inc.id}`, 'log-blue');
            logToPanel('feed-p4', `[ERROR]: ${inc.error}`, 'log-red');
            // [ES] Aquí se extrae la causa y la solución bilingüe desde runbook.js
            // [EN] Here the bilingual cause and solution are extracted from runbook.js
            logToPanel('feed-p4', `[CAUSE]: ${inc.cause}`, 'log-white');
            logToPanel('feed-p4', `[SOL]: ${inc.solution}`, 'log-white');
            logToPanel('feed-p4', '----------------------------------------', 'log-white');
            
            index++;
            // [ES] Inyecta el siguiente incidente tras 800ms.
            // [EN] Injects the next incident after 800ms.
            runbookTimer = setTimeout(renderNextIncident, 800);
        } else {
            // [ES] Fin de la carga del documento.
            // [EN] End of document loading.
            logToPanel('feed-p4', '=== FIN DEL REPORTE ===', 'log-yellow');
        }
    }
    
    // [ES] Disparo inicial de la cascada de logs del Runbook.
    // [EN] Initial trigger of the Runbook log cascade.
    renderNextIncident();
}