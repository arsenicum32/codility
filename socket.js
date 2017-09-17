var io = require('socket.io')(1280);

io.sockets.on( 'connection', function( socket ) {
  console.log('socket connect');
  socket.on('leave', function(room) {
      socket.leave(room);
      console.log("User Leave the room: "+socket.room);
      io.sockets.in(room).emit('log', {
        users: io.sockets.adapter.rooms[room]
      });
  });
  socket.on('join', function(room) {
      socket.join(room);
      socket.room = room;
      console.log("User Joined the room: "+socket.room);
      io.sockets.in(room).emit('log', {
        users: io.sockets.adapter.rooms[room]
      });
  });
  socket.on('snd', function (data) {
      data.room?
      io.sockets.in(data.room).emit('res', data):
      void(0);
  });
  socket.on('disconnect',function(){
    console.log('disconnect');
    io.sockets.in(socket.room).emit('log', {
      users: io.sockets.adapter.rooms[socket.room],
      disconnect: true
    });
  })
});
