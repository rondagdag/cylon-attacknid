"use strict";

var Cylon = require("cylon");
var bluetoothserial = require('bluetooth-serial-port');
var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);
  opts = opts || {};
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {
  var self = this;
  self.connection = new (require('bluetooth-serial-port')).BluetoothSerialPort();
  self.connection.on('found', function(address, name) {
      console.log(address);
      console.log(name);
      if (self.address == address || self.name == name) {  
        self.connection.findSerialPortChannel(address, function(channel) {
            self.connection.connect(address, channel, function() {
                //console.log(address);
                //console.log('connected');
                Cylon.Logger.debug("Connected " + address, err);
                self.connection.on('data', function(buffer) {
                    //console.log(buffer);
                     self.emit("message", buffer);
                });
            }, function () {
                //console.log('cannot connect');
                Cylon.Logger.debug("Cannot connect", err);
            });

            // close the connection when you're ready
            self.connection.close();
        }, function() {
            console.log('found nothing');
        });
      }
  });
 
  self.connection.inquire();
  callback();
};

Adaptor.prototype.disconnect = function(callback) {
  this.connection.close();
  callback();
};

Adaptor.prototype.sendCommand = function(command) {
    if (this.connection.isOpen()) {
        this.connection.write(new Buffer(command, 'hex'),
         function (err, bytesWritten) {
            if (err) 
              //console.log(err);
              Cylon.Logger.debug(err);
            });
    } 
  }