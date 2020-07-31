/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';


const SimulatedSensor = require('./simulatedSensor.js');
const sensor = require('./sensor.js');
var axios = require('axios');
const moment = require('moment');
//configuración de la clase
function MessageProcessor(option) {
  option = Object.assign({
    deviceId: '[Unknown device] node',
    temperatureAlert: 30
  }, option);

  this.sensor = option.simulatedData ? new SimulatedSensor() : new sensor();
  this.deviceId = option.deviceId;
  this.temperatureAlert = option.temperatureAlert
  this.experimento = option.exprimento
  this.sensor.init(() => {
    this.inited = true;
  });
}

MessageProcessor.prototype.setMessage=function (data){
console.log('Receive message data: ' + data);
this.sensor.write(data);

}

MessageProcessor.prototype.getMessage = function (messageId, cb) {
  if (!this.inited) { return; }
  this.sensor.read((err, data) => {
    if (err) {
      console.log('[Sensor] Read data failed: ' + err.message);
      return;
    }


    cb(JSON.stringify({
      messageId: messageId,
      deviceId: this.deviceId,
      Lora: data.Lora,
      rssiLora:data.rssiLora,
      timeCapLora:data.timeCapLora
   
      }
    ), data.temperature > this.temperatureAlert);
  });
}




module.exports = MessageProcessor;
