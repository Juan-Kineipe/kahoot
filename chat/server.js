const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);// informar o websocket, protocolo HTTP
const io = require('socket.io')(server);//protocolo  websocket

app.use(express.static(path.join(__dirname,'Public')));//pasta para ficar os arquivos publicos acessado pela aplicação, ver com Jonas, juan e augusto como manter em uma pasta só todas as aplicações
app.set('views', path.join(__dirname,'Public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

app.use('/', (req, res) => {
    res.render('index.html');
});

let messages = []; // array para armazenar as mensagens 

//socket tem 3 eventos: emit, on e broadcast.emit
io.on('connection', socket => {//toda vez que um novo cliente conectar ao socket
     console.log(`Socket conectado: ${socket.id}`);
     socket.emit('previousMessages',messages); // ao se conectar, mostrar as mensagens anteriores
     
     socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage',data);//enviar mensagem para todos que estão conectados
     })
});

server.listen(3000);

// código desenvolvido com o auxílio dos seguintes vídeos: 
//https://www.youtube.com/watch?v=-jXfKDYJJvo
//https://www.youtube.com/watch?v=bQ7NNSyGV2U&t=517s
