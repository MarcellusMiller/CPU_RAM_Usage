import time
import psutil
import json
import sys

while True:
    cpu_usage = psutil.cpu_percent()
    mem_usage = psutil.virtual_memory().percent
    
    # Criação do dicionário com os dados
    data = {'cpu_usage': cpu_usage, 'mem_usage': mem_usage}
    
    # Envio dos dados como JSON para stdout
    sys.stdout.write(json.dumps(data) + '\n')
    sys.stdout.flush()  # Garante que os dados sejam enviados imediatamente

    time.sleep(0.5)
