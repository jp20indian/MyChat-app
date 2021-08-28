// const { append } = require("express/lib/response");

const socket = io();

// Prompt to input user-name
let username;
do{
    username = prompt('Enter your name : ');
}
while(!username);

// Take message input
let textarea = document.querySelector('#textarea');
textarea.addEventListener('keyup',(e)=>{

    if(e.key==='Enter')
    {
         sendmessage(e.target.value);
        console.log(e.target.value);
    }

});


// send the input message to server
function sendmessage(message)
{
    let msg = {
        user:username,
        message:message.trim()
    }
 
    // appends the message to the message area
    appendmessage(msg,'outgoing');
    textarea.value='';
    scrollToBottom() 

    // send the message to server
    // sends msg object as 'message' to server
    socket.emit('message',msg);
}

// append the input message to the message area
let messagearea = document.querySelector('.messagearea');
function appendmessage(msg,type)
{
    let maindiv = document.createElement('div');
    maindiv.classList.add(type,'message');

    maindiv.innerHTML=
    `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `;

    messagearea.appendChild(maindiv);
}

// receive messages from server and append it to message area
socket.on('message',(msg)=>
{
    console.log(msg);
    appendmessage(msg,'incoming');
    scrollToBottom() 
});

// autoscroll function
function scrollToBottom() {
    messagearea.scrollTop = messagearea.scrollHeight
}