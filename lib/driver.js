"use strict";

var Cylon = require("cylon");

var Driver = module.exports = function Driver(opts) {
  Driver.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  // Include a list of commands that will be made available to external APIs.
  this.commands = {
    // This is how you register a command function for the API;
    // the command should be added to the prototype, see below.
    hello: this.hello,
    forward : this.forward,
    backward : this.backward,
    left : this.left,
    right : this.right,
    up : this.up,
    down : this.down,
    light : this.light,
    fire : this.fire,
    
  };
  
  this.commandData = {
      forward : "7100028080808001",
      backward : "7100828080808002",
      left : "7100808280808008",
      right : "7100800280808004",

      down : "7100808002808010",
      up : "7100808082808020",

      light : "7100808080800240",
      fire : "7100808080808280"
  };
  
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};

Driver.prototype.hello = function() {
  Cylon.Logger.info("Hello World!");
};

Driver.prototype.forward = function(callback) {
  this.connection.sendCommand(this.commandData.forward);
  callback();
};

Driver.prototype.backward = function(callback) {
  this.connection.sendCommand(this.commandData.backward);
  callback();
};

Driver.prototype.left = function(callback) {
  this.connection.sendCommand(this.commandData.left);
  callback();
};

Driver.prototype.right = function(callback) {
  this.connection.sendCommand(this.commandData.right);
  callback();
};

Driver.prototype.up = function(callback) {
  this.connection.sendCommand(this.commandData.up);
  callback();
};

Driver.prototype.down = function(callback) {
  this.connection.sendCommand(this.commandData.down);
  callback();
};

Driver.prototype.fire = function(callback) {
  this.connection.sendCommand(this.commandData.fire);
  callback();
};

Driver.prototype.light = function(callback) {
  this.connection.sendCommand(this.commandData.light);
  callback();
};