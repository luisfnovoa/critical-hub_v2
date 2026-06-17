import socket
import sys
import msvcrt

def run_honeypot():
    host = '127.0.0.1'
    port = 2323
    
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.setblocking(0)
    
    try:
        server.bind((host, port))
        server.listen(5)
    except Exception as e:
        print(f"[X] Error al arrancar el señuelo: {e}")
        return

    print("\n======================================")
    print("🚨 KRONOS INTRUSION DETECTION - HONEYPOT 🚨")
    print("======================================")
    print(f"[*] Trampa activa en {host}:{port}")
    print("[*] Presiona ENTER en cualquier momento para CERRAR el Honeypot.")
    print("-" * 38)

    while True:
        if msvcrt.kbhit():
            if msvcrt.getch() == b'\r':
                print("\n[!] Desactivando trampa. Cerrando terminal...")
                server.close()
                sys.exit()

        try:
            conn, addr = server.accept()
            conn.setblocking(1)
            print(f"\n[⚠️ ALERTA] ¡Conexión sospechosa desde {addr[0]}!")
            
            banner = "\r\n====================================\r\nKRONOS FLEET GATEWAY\r\nLOGIN: "
            conn.send(banner.encode('utf-8'))
            usuario = conn.recv(1024).decode('utf-8').strip()
            
            conn.send("PASSWORD: ".encode('utf-8'))
            password = conn.recv(1024).decode('utf-8').strip()
            
            print(f"[FORENSE] Credenciales probadas -> U: {usuario} | P: {password}")
            
            menu = "\r\n[ACCESS GRANTED]\r\n[1] Camión Autónomo #04 (CARGANDO)\r\n[2] Puerta Empleados (CERRADO)\r\nkronos-fleet> "
            conn.send(menu.encode('utf-8'))
            
            comando = conn.recv(1024).decode('utf-8').strip()
            print(f"[🔥 ALERTA] Comando intruso capturado: '{comando}'")
            
            conn.send("\r\n[ERROR] Connection timed out.\r\n".encode('utf-8'))
            conn.close()
        except BlockingIOError:
            pass
        except Exception:
            pass

if __name__ == "__main__":
    run_honeypot()