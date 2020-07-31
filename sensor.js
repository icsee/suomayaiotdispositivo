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





//parser.on(leerZigbee);
port.write('ROBOT PLEASE RESPOND\n');

function Sensor(/* options */) {
    // nothing todo
  }
  
  Sensor.prototype.init = function (callback) {
    // nothing todo
    callback();
  }
  
  Sensor.prototype.read = function (callback) {
    
    callback(null, {
      Lora: Temp,
      rssiLora:rssiLo,       
      timeCapLora:timeLora,
    });
  }
  
  Sensor.prototype.write=function (data) {
    // nothing todo
    port.write(data, function(err) {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
      console.log(data)
    })
  }
 
    
  
   
    parser.on('data', function (data) {
     
      const res = data.split(" ")
      const temp = res[1]
      rssiLo = res[3]
      console.log(temp)
      console.log(rssiLo)
      Temp=temp
      var date = date || Date.now();
      timeLora= moment(date).format('YYYY-MM-DD') +" "+ moment(date).format('hh:mm:ss.SSS');
      //io.emit('getNum', temp)*/
    });
  
    

    
    
 
  
  
  
  
  module.exports = Sensor;

