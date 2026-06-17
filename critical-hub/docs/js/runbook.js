// ============================================================================
// [ES] MÓDULO RUNBOOK: BASE DE CONOCIMIENTO Y RESPUESTA A INCIDENTES (IR)
// [EN] RUNBOOK MODULE: KNOWLEDGE BASE AND INCIDENT RESPONSE (IR)
// ============================================================================
// [ES] Este archivo contiene la matriz inmutable de todos los vectores de ataque, 
// errores de infraestructura y problemas de configuración históricos del Hub.
// [EN] This file contains the immutable matrix of all attack vectors, 
// infrastructure errors, and historical configuration issues of the Hub.
// ============================================================================

// [ES] Exportamos la constante que almacena el array de incidentes para ser consumida por app.js
// [EN] We export the constant storing the incidents array to be consumed by app.js
export const infrastructureIncidents = [
    {
        id: "INC-2026-001",
        component: "Docker-Daemon-Socket",
        platform: "Docker Enterprise / Portainer Core",
        error: "ERR_DOCKER_SOCK_EXPOSED - Privileged Container Escape Detected",
        // [ES] CAUSA: Montura insegura del socket de Docker que permite escalada a root en el host.
        // [EN] CAUSE: Insecure Docker socket mount allowing privilege escalation to host root.
        cause: "[ES] Inyección de exploits en contenedor expuesto perimetralmente con montura directa de /var/run/docker.sock. El atacante obtuvo capacidades SYS_ADMIN. | [EN] Exploit injection on perimetral container with direct /var/run/docker.sock mount. Attacker gained SYS_ADMIN capabilities.",
        // [ES] SOLUCIÓN: Aislar e implementar AppArmor.
        // [EN] SOLUTION: Isolate and implement AppArmor.
        solution: "[ES] Aislar contenedor afectado (docker stop), desplegar políticas de AppArmor restrictivas y migrar la comunicación del demonio a sockets TLS tcp:// protegidos por CyberArk PAM. | [EN] Isolate affected container, deploy restrictive AppArmor profiles and migrate daemon communication to TLS tcp:// sockets protected by CyberArk PAM."
    },
    {
        id: "INC-2026-002",
        component: "PLC-Subestacion-Alfa",
        platform: "Modbus TCP Protocol / Schneider Electric",
        error: "ERR_MODBUS_FRAME_INJECTION - Coil State Anomalous Rewrite",
        // [ES] CAUSA: Fuerza bruta sobre el protocolo Modbus en texto plano.
        // [EN] CAUSE: Brute force over plaintext Modbus protocol.
        cause: "[ES] Ataque DDoS combinado con reinyección de tramas Modbus (FC05). Intento de conmutación forzada en el interruptor de seguridad. | [EN] DDoS attack combined with Modbus frame reinjection (FC05). Attempted forced switching on the safety breaker.",
        // [ES] SOLUCIÓN: Purgar sockets y filtrar en firewall.
        // [EN] SOLUTION: Purge sockets and filter at firewall level.
        solution: "[ES] Desplegar el script defensivo 'Modbus-FW' para purgar la cola de sockets comprometidos y reconfigurar la tabla de enrutamiento perimetral. | [EN] Deploy 'Modbus-FW' defensive script to purge compromised sockets queue and reconfigure perimeter routing table."
    },
    {
        id: "INC-2026-003",
        component: "Honeypot-DMZ-01",
        platform: "Kali Linux Simulation Node / Kippo-Cowrie",
        error: "WARN_HONEYPOT_STAGE_5_BREACH - Threat Actor Vertical Progression",
        // [ES] CAUSA: Movimiento lateral inminente desde la DMZ.
        // [EN] CAUSE: Imminent lateral movement from the DMZ.
        cause: "[ES] Actor de amenazas (APT) superó el anillo 4 mediante credenciales débiles y buscaba pivotar a la red OT corporativa. | [EN] Threat actor (APT) bypassed ring 4 via weak credentials and attempted to pivot to the corporate OT network.",
        // [ES] SOLUCIÓN: Protocolo Lockdown y volcado de memoria.
        // [EN] SOLUTION: Lockdown protocol and memory dump.
        solution: "[ES] Activar protocolo Lockdown automático. Aislamiento físico de interfaz virtual y volcado inmediato del archivo .log a la sandbox. | [EN] Activate automatic Lockdown protocol. Physical isolation of virtual interface and immediate memory .log dump to sandbox."
    },
    {
        id: "INC-2026-004",
        component: "CyberArk-Conjur-Provider",
        platform: "Conjur Enterprise / IAM Engine",
        error: "ERR_CONJUR_TOKEN_SYNC_LAG - Dynamic Secret Invalidation",
        // [ES] CAUSA: Fallo de sincronización en las políticas declarativas de secretos no humanos.
        // [EN] CAUSE: Synchronization failure in declarative non-human secret policies.
        cause: "[ES] Desalineación síncrona en políticas YAML. Un pod intermedio intentó consumir un secreto JIT con un token revocado. | [EN] Synchronous misalignment in YAML policies. An intermediate pod attempted to consume a JIT secret with a revoked token.",
        // [ES] SOLUCIÓN: Recarga manual de políticas.
        // [EN] SOLUTION: Manual policy reload.
        solution: "[ES] Forzar recarga de manifiesto mediante 'conjur policy update' y re-autenticar el Host Factory con token efímero. | [EN] Force manifest reload via 'conjur policy update' and re-authenticate Host Factory with ephemeral token."
    },
    {
        id: "INC-2026-005",
        component: "DOM-Core-Engine",
        platform: "Vanilla JS / Browser Security Policy",
        error: "ERR_CORS_POLICY_BLOCK - Cross-Origin Request Blocked",
        // [ES] CAUSA: Intento de cargar módulos JS locales usando el protocolo file://. (Historial de desarrollo)
        // [EN] CAUSE: Attempted to load local JS modules using the file:// protocol. (Development history)
        cause: "[ES] El navegador bloqueó la ejecución de 'app.js' porque los módulos de ES6 requieren un servidor HTTP para cumplir la política CORS. | [EN] Browser blocked 'app.js' execution because ES6 modules require an HTTP server to comply with CORS policy.",
        // [ES] SOLUCIÓN: Levantar servidor local Python/Node.
        // [EN] SOLUTION: Boot up local Python/Node server.
        solution: "[ES] Abandonar la ejecución por doble clic. Instanciar un servidor local (python -m http.server 8080) y acceder mediante localhost. | [EN] Abandon double-click execution. Instantiate a local server (python -m http.server 8080) and access via localhost."
    },
    {
        id: "INC-2026-006",
        component: "Windows-Registry-MIME",
        platform: "Windows 10 / Python HTTP Server",
        error: "ERR_MIME_TYPE_MISMATCH - text/plain delivered instead of application/javascript",
        // [ES] CAUSA: Bug crónico del registro de Windows que corrompe las extensiones .js. (Historial de desarrollo)
        // [EN] CAUSE: Chronic Windows registry bug corrupting .js extensions. (Development history)
        cause: "[ES] El servidor Python leyó la extensión .js como 'text/plain' por una clave de registro corrupta en Windows, bloqueando la carga. | [EN] Python server read .js extension as 'text/plain' due to a corrupted registry key in Windows, blocking the load.",
        // [ES] SOLUCIÓN: Parchear en código o cambiar a Node.js.
        // [EN] SOLUTION: Patch in code or switch to Node.js.
        solution: "[ES] Ejecutar 'npx serve' para saltar el registro local, o inyectar un parche MIME en el script de Python. | [EN] Execute 'npx serve' to bypass local registry, or inject a MIME patch into the Python script."
    }
];

// [ES] Función pura para buscar soluciones rápidas por ID de error.
// [EN] Pure function to quick-search solutions by error ID.
export function getRunbookSolution(incidentId) {
    // [ES] Filtramos la matriz buscando coincidencias exactas.
    // [EN] We filter the matrix looking for exact matches.
    const incident = infrastructureIncidents.find(inc => inc.id === incidentId);
    return incident ? incident.solution : "[ES] Incidente no clasificado. | [EN] Unclassified incident.";
}