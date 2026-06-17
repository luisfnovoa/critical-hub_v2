import time
import random
import sys
import os
import msvcrt

ESCENARIOS = [
    {
        "titulo": "☣️  KRONOS CORES - ESCENARIO AMENAZA QUÍMICA",
        "zona6": "🚨 LABORATORIO DE BIOMEDICINA (Material Inflamable y Virus Mutágenos) 🚨",
        "accion": "[✓] ABLACIÓN POR CO2 CORRIENTE, CIERRE DE VÁLVULAS Y BLOQUEO NEUMÁTICO.",
        "eficiencia": {1: 0.35, 2: 0.45, 3: 0.60, 4: 0.75, 5: 0.85}
    },
    {
        "titulo": "🦠 KRONOS CORES - ESCENARIO CRISIS VIROLÓGICA CRIOGÉNICA",
        "zona6": "🚨 CÁMARA DE AISLAMIENTO CEPAS ALTA VIRULENCIA (Nivel 4) 🚨",
        "accion": "[✓] AISLAMIENTO DE FLUIDOS, CONGELACIÓN RÁPIDA DE CONDUCTOS Y FILTROS HEPA.",
        "eficiencia": {1: 0.50, 2: 0.50, 3: 0.50, 4: 0.80, 5: 0.95}
    },
    {
        "titulo": "⚡ KRONOS CORES - ESCENARIO APAGÓN MÁXIMO EN RED ELÉCTRICA",
        "zona6": "🚨 BÚNKER DE REFACTOR INDUSTRIAL Y GENERADORES NUCLEARES 🚨",
        "accion": "[✓] BLACKOUT PREVENTIVO DE CAPA FÍSICA Y BAJADA DE BARRERAS DE PLOMO.",
        "eficiencia": {1: 0.40, 2: 0.60, 3: 0.55, 4: 0.70, 5: 0.90}
    }
]

def generar_empleados():
    nombres = ["Luis", "Carlos", "Elena", "Sofia", "Mateo", "Laura", "Diego", "Ana", "Javier", "Valeria"]
    apellidos = ["Gomez", "Rodriguez", "Fernandez", "Lopez", "Martinez", "Sanchez", "Perez", "Galan", "Navarro", "Ruiz"]
    db = set()
    while len(db) < 50:
        db.add(f"ID-{random.randint(1000, 9999)}:{random.choice(nombres)} {random.choice(apellidos)}")
    return list(db)

def limpiar_pantalla():
    os.system('cls' if os.name == 'nt' else 'clear')

def simular():
    limpiar_pantalla()
    escenario = random.choice(ESCENARIOS)
    empleados = generar_empleados()
    
    zonas = {
        1: "Perímetro Exterior (Acceso Vehicular)",
        2: "Logística y Flota AGV (Camiones Autónomos)",
        3: "Red Corporativa IT (Oficinas Generales)",
        4: "Sala de Control DMZ (Pasarela PAM/MFA)",
        5: "Red de Procesos OT (Sistemas PLC)",
        6: escenario["zona6"]
    }
    
    hackers = {"Apt29_Shadow": 1, "NetWrecker_v4": 1, "ZeroDay_User": 1}
    blacklist = set()
    running = False
    enter_count = 0
    
    print("="*70)
    print(escenario["titulo"])
    print("="*70)
    print(f"[*] Base de datos: {len(empleados)} empleados autorizados cargados.")
    print("[*] CONTROLES INTERACTIVOS:")
    print("    ▶ Presiona 'W' para INICIAR la simulación automática.")
    print("    ▶ Presiona 'ENTER' DOS VECES SEGUIDAS para RESETEAR con otro escenario.")
    print("="*70)
    print("\n[ESTADO] Esperando orden de inicio (Presiona 'W')...\n")

    while True:
        if msvcrt.kbhit():
            tecla = msvcrt.getch()
            if tecla in (b'w', b'W') and not running:
                running = True
                print("▶ [SISTEMA] Iniciando monitorización en tiempo real...\n")
                time.sleep(1)
            
            if tecla == b'\r':
                enter_count += 1
                if enter_count >= 2:
                    print("\n🔄 [RESET] Cargando nuevos parámetros tácticos...\n")
                    time.sleep(0.5)
                    return True

        if running:
            if enter_count == 1 and random.random() < 0.05: 
                enter_count = 0
                
            print(f"--- [TICK DE RED TÁCTICO] " + "-"*40)
            
            if random.random() < 0.65:
                emp = random.choice(empleados)
                z = random.randint(1, 5)
                print(f"🟩 [OK] {emp} accedió a Zona {z}: {zonas[z]}")
            
            time.sleep(0.5)
            
            for hacker, zona in list(hackers.items()):
                if hacker in blacklist:
                    continue
                    
                print(f"💥 [ALERTA] Intruso '{hacker}' atacando la Zona {zona}...")
                time.sleep(0.5)
                
                if random.random() < escenario["eficiencia"][zona]:
                    print(f"🛡️  [BLOQUEADO] Firewall industrial neutralizó a '{hacker}' en Zona {zona}.")
                    blacklist.add(hacker)
                else:
                    print(f"⚠️  [BRECHA] '{hacker}' escaló con éxito a la Zona {zona}!")
                    hackers[hacker] += 1
                    
                    if hackers[hacker] == 6:
                        print("\n" + "🚨"*25)
                        print("🔥 COMPROMISO CRÍTICO: INTENTO DE ACCESO NO AUTORIZADO A LA ÚLTIMA CAPA 🔥")
                        print(f"[!] El vector '{hacker}' ha superado los perímetros y entra en Zona 6.")
                        print("🚨" * 25)
                        time.sleep(1)
                        
                        print("\n======================================================================")
                        print("🛑 PROTOCOLO DE DEFENSA FÍSICA AUTOMÁTICA ACTIVO (HARDWARE ISOLATION) 🛑")
                        print("======================================================================")
                        print(escenario["accion"])
                        print("[✓] ALIMENTACIÓN ELÉCTRICA INTERRUMPIDA EN LA ZONA PARA EVITAR TRAGEDIA.")
                        print("======================================================================\n")
                        print("[*] Presiona ENTER dos veces seguidas para generar otro escenario de red.")
                        running = False
                        
            if len(blacklist) == len(hackers) and running:
                print("\n🎉 [SOC] ¡Oleada de amenazas neutralizada por completo!")
                blacklist.clear()
                hackers = {"Apt29_Shadow": 1, "NetWrecker_v4": 1, "ZeroDay_User": 1}
                time.sleep(1)

        time.sleep(0.1)

if __name__ == "__main__":
    try:
        while simular():
            pass
    except KeyboardInterrupt:
        print("\n\n[INFO] Consola cerrada de forma segura.")