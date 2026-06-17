🛡️ Critical Hop W2 (formerly Kronos Operational Hub)
Tactical Accessibility & Industrial Cybersecurity Lab
Descripción
Critical Hop W2 es la evolución táctica del entorno de investigación industrial Kronos. Diseñado para cerrar la brecha entre la Telemetría de Procesos (Biomédica), los Sistemas de Control OT y la Arquitectura de Seguridad IT. Este repositorio es un sandbox diseñado para la modelización de la resiliencia ciberfísica.

🌐 La Convergencia de Tres Mundos
Esta arquitectura unifica tres disciplinas técnicas distintas en un ecosistema resiliente:

Capa Biomédica y de Procesos (Safety & Physics): Monitoreo de variables críticas, preservación de cadena de frío y fronteras químicas. Se definen las restricciones de seguridad físicas que la capa de software nunca debe violar.

Capa de Software y Control (Logic & OT): Simulación de estados PLC y vectores de automatización. Orquestación de pipelines de datos mediante scripts deterministas.

Capa de Base de Datos y Red (IT & Identity): Gestión de endpoints, seguridad de API y manejo de credenciales de alta entropía.

🚀 Evolución W2: Módulo de Accesibilidad Premium
La versión W2 integra el Módulo de Control Externo (Kronos-Premium), diseñado para garantizar la operatividad táctica en condiciones adversas:

TTS (Text-to-Speech): Síntesis de voz para telemetría crítica sin necesidad de mirar el display.

Modo Daltonismo/Alto Contraste: Filtrado dinámico CSS para visibilidad en entornos de baja luz o fatiga visual.

Atajos Tácticos: Interacción optimizada sin periféricos complejos.

🛡️ Filosofía de Defensa Operativa
En Critical Hop, la seguridad es la base, no una capa añadida:

Aislamiento Determinista: La lógica de control opera independiente de entradas externas.

Perímetro Engañoso: Lógica honeypot.py activa para detectar reconocimiento no autorizado en tiempo real.

Telemetría Fail-Safe: Los umbrales de seguridad física se fuerzan en el núcleo lógico.

🛠️ Estructura del Proyecto
Plaintext
📁 python/
├── 📁 critical-hub/            # Entorno operativo principal
│   ├── index.html              # UI de Control Táctico (Dashboard)
│   ├── kronos-premium.js       # Módulo de accesibilidad inyectado
│   ├── plc_sim.py              # Motor de simulación OT / PLC
│   ├── honeypot.py             # Defensa activa y señuelos
│   └── attack.py               # Herramienta de simulación de amenazas
└── README.md                   # Documentación del proyecto