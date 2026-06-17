import socket
import sys
import msvcrt

def run_plc():
    host = '127.0.0.1'
    port = 5020
    
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.setblocking(0) # Modo no bloqueante para escuchar el teclado
    
    try:
        server.bind((host, port))
        server.listen(1)
    except Exception as e:
        print(f"[X] Error al arrancar el PLC: {e}")
        return

    print("\n==========================================")
    print("⚡ SIMULADOR PLC INDUSTRIAL KRONOS - ONLINE ⚡")
    print("==========================================")
    print(f"[*] Escuchando comandos Modbus en {host}:{port}")
    print("[*] Presiona ENTER en cualquier momento para CERRAR el PLC.")
    print("-" * 42)

    interruptor_principal = 1 # 1 = ONLINE, 0 = OFFLINE

    while True:
        # Comprobar si el Magister pulsa ENTER para cerrar
        if msvcrt.kbhit():
            if msvcrt.getch() == b'\r':
                print("\n[!] Apagado controlado por el operador. Cerrando...")
                server.close()
                sys.exit()

        try:
            conn, addr = server.accept()
            conn.setblocking(1)
            data = conn.recv(1024).decode().strip()
            
            if data == "READ_STATUS":
                estado = "STATUS:1 (ONLINE)" if interruptor_principal == 1 else "STATUS:0 (OFFLINE)"
                conn.send(estado.encode())
            
            elif data == "WRITE_COIL:0:FALSE":
                interruptor_principal = 0
                print("\n[!!!] ALERTA CRÍTICA DE SEGURIDAD [!!!]")
                print(f"[!] Inyección de comandos detectada desde {addr[0]}")
                print("============= APAGÓN EN SUBESTACIÓN KRONOS =============")
                print("[*] Nuevo estado del nodo: INTERRUPTOR = 0 (OFFLINE)\n")
                
            conn.close()
        except BlockingIOError:
            pass 
        except Exception:
            pass

if __name__ == "__main__":
    run_plc()