/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';

function Sensor(/* options */) {
  // nothing todo
}

Sensor.prototype.init = function (callback) {
  // nothing todo
  callback();
}

Sensor.prototype.read = function (callback) {
  callback(null, {
    Lora: random(20, 30),
    rssiLora: random(60, 80)
    
  });
}

Sensor.prototype.write=function (data) {
  // nothing todo
  port.write(data, function(err) {
    if (err) {
      return console.log('Error en escritura ', err.message)
    }
    console.log(data)
  })
}



function random(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = Sensor;
