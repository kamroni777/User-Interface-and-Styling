io.on('connection', (socket) => {
  
  socket.on('joinRoom', async (roomId) => {
    socket.join(roomId);
    
    const messages = await Message.find({ room: roomId })
      .populate('sender', 'username avatar');
    socket.emit('previousMessages', messages);
  });

  
  socket.on('sendMessage', async ({ roomId, content }) => {
    const message = new Message({
      content,
      sender: socket.userId,
      room: roomId
    });
    await message.save();
    
    const populatedMsg = await message.populate('sender', 'username avatar');
    io.to(roomId).emit('newMessage', populatedMsg);
  });
});
io.on('connection', (socket) => {
 
  socket.on('typingStart', (roomId) => {
    socket.to(roomId).emit('userTypingStart', {
      id: socket.userId,
      username: socket.username,
      avatar: socket.avatar
    });
    typingUsers.set(socket.userId, roomId);
  });

  socket.on('typingStop', () => {
    if (typingUsers.has(socket.userId)) {
      const roomId = typingUsers.get(socket.userId);
      socket.to(roomId).emit('userTypingStop', socket.userId);
      typingUsers.delete(socket.userId);
    }
  });

  socket.on('disconnect', () => {
    if (typingUsers.has(socket.userId)) {
      const roomId = typingUsers.get(socket.userId);
      socket.to(roomId).emit('userTypingStop', socket.userId);
      typingUsers.delete(socket.userId);
    }
  });
});