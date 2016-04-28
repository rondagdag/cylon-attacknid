"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    attacknid: { adaptor: "attacknid" }
  },

  devices: {
    spider: { driver: "spider", pin: 1 }
  },

  work: function(my) {
    every((1).seconds(), function() { my.spider.forward(); });
  }
}).start();
