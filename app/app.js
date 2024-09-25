const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { spawn } = require('child_process');
const port = 7777

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');  
});

// Executar o script Python
const pythonProcess = spawn('python', ['../script/monitor.py']);  // Substitua pelo nome do seu script

pythonProcess.stdout.on('data', (data) => {
    const usage = JSON.parse(data.toString());
    io.emit('usage', usage);  // Envia os dados para todos os clientes conectados
    console.log(usage)
});

pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

pythonProcess.on('close', (code) => {
    console.log(`Processo Python finalizado com o código ${code}`);
});

server.listen(port, () => {
    console.log('Servidor HTTP escutando em http://localhost:' + port);
});
