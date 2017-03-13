import io from 'socket.io-client';

const socket = io('http://localhost:8085');

let splittedPath = window.location.pathname.split('/');

socket.roomId = splittedPath[splittedPath.length - 1];

socket.on('connect', function() {
    socket.emit('joinRoom', socket.roomId);
    socket.emit('stateRequest', socket.roomId);
});

export default socket;