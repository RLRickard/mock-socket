
function Protocol(subject) {
  this.subject = subject;
  this.subject.observe('clientAttemptingToConnect', this.clientAttemptingToConnect, this);
}

Protocol.prototype = {
  server: null,
  clientAttemptingToConnect: function() {
    // If the server is not ready and the client tries to connect this results in a the onerror method
    // being invoked.
    if(!this.server) {
      this.subject.notify('updateReadyState', MockSocks.CLOSED);
      this.subject.notify('clientOnError');
      return false;
    }

    this.subject.notify('updateReadyState', MockSocks.OPEN);
    this.subject.notify('clientHasJoined', this.server);
  }
};

module.exports = Protocol;