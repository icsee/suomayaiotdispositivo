/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
//Comunicacion lora
const port = new SerialPort('/dev/ttyACM0',{baudRate:115200});


const parser = new Readline();
var rssiLo,Temp,timeLora;
port.pipe(parser);
var async = require('async');
const moment = require('moment');

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
