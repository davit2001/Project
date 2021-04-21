import {server} from '../loaders'
import socket from 'socket.io'

const io = socket(server)

io.on('connection', (socket) => {
  socket.emit('connect', "Socket.io connected to client ")
  socket.on('data', (data) => {
    console.log(data)
  })
})