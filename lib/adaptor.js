"use strict";

var Cylon = require("cylon");
var bluetoothserial = require('bluetooth-serial-port');
var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);
  opts = opts || {};
  //this.attacknidDriver = new bluetoothserial();
  this.address = opts.address;
  this.command = {};
  this.command.forward = "7100028080808001";
  this.command.backward = "7100828080808002";
  this.command.left = "7100808280808008";
  this.command.right = "7100800280808004";

  this.command.down = "7100808002808010";
  this.command.up = "7100808082808020";

  this.command.light = "7100808080800240";
  this.command.fire = "7100808080808280";
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {
  var self = this;
  self.connection = new (require('bluetooth-serial-port')).BluetoothSerialPort();
  self.connection.on('found', function(address, name) {
      console.log(address);
      if (self.address == null || self.address == address) {  
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