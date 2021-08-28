const express = require ('express');
const app = express();
const http = require ('http').createServer(app);
// const server = http.createServer()

// const app = express();
// const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.get('/', (req,res)=>{
    // res.send("hello world");
    res.sendFile(__dirname+'/index.html')
})

http.listen(PORT, ()=>{

    console.log(`Listen on port ${PORT}`);

});

// app.use(express.static('public'));
// app.get('/', (req,res)=>{
//     // res.send("hello world");
//     res.sendFile(__dirname+'/index.html')
// })

const io = require('socket.io')(http)

io.on('connection', (socket)=>{

    console.log('CONNECTED');

    socket.on('message',(msg)=>
    {
        socket.broadcast.emit('message',msg);
    }
    );

});
