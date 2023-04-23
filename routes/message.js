var express = require('express');
var router = express.Router();
const  io= require('socket.io')();
const socketApi={
    io:io
}
io.on('connection', (socket) => {
    console.log('called')
    socket.on('disconnect', function () {
      io.emit('usersActivity', {
        user: socket.username,
        event: 'chatLeft'
      });
    });
  
    socket.on('setUserName', (name) => {
      socket.username = name;
      io.emit('usersActivity', {
        user: name,
        event: 'chatJoined'
      });
    });
  
    socket.on('sendTheMessage', (message) => {
      io.emit('message', {
        msg: message.text,
        user: socket.username,
        createdAt: new Date()
      });
    });
  });

module.exports =socketApi 