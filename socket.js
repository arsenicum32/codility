var io = require('socket.io')(1280);


var TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
var token = '244772236:AAF8Bx9B4kTBX2uDqIymaJS9d0lgbBMRd0I';

// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Received your message');

  io.sockets.in('test').emit('res', {obj: parseFloat(msg.text) } );
});


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
