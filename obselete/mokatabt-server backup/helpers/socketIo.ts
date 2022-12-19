const emitSocketEvent = (eventName: string, data: any = Date.now()) => {
  // console.log('will emit socket event')
  // io.on("connection", (socket) => {
  //   // socket.emit(eventName, data) // emit an event to the socket
  //   io.emit(eventName, data); // emit an event to all connected sockets
  //   // socket.on('reply', () => { /* … */ }); // listen to the event
  // });
  io.emit(eventName, data);
};
export default emitSocketEvent;
