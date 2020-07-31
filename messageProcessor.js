/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';


const SimulatedSensor = require('./simulatedSensor.js');
const Zigbee = require('./zigbee.js');
var axios = require('axios');
const moment = require('moment');
//configuración de la clase
function MessageProcessor(option) {
  option = Object.assign({
    deviceId: '[Unknown device] node',
    temperatureAlert: 30
  }, option);
  //this.sensor = option.simulatedData ? new SimulatedSensor() : new Bme280Sensor(option.i2cOption);
  this.sensor = option.simulatedData ? new SimulatedSensor() : new Zigbee();
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

   /* var x={
      Lora: data.Lora,
      Bluetooth: data.Bluetooth,
      Particle: data.Particle,
      rssiParticle:data.rssiParticle,
      rssiLora:data.rssiLora,
      rssiBluetooth:data.rssiBluetooth,
      timeCapbluetooth:data.timeCapbluetooth,
      timeCapLora:data.timeCapLora,
      timeCapParticle:data.timeCapParticle,
      Led:data.Led,
      exprimento:option.exprimento
       };
      defobjpost(x);*/

    cb(JSON.stringify({
      messageId: messageId,
      deviceId: this.deviceId,
      Lora: data.Lora,
      Bluetooth: data.Bluetooth,
      Particle: data.Particle,
      rssiParticle:data.rssiParticle,
      rssiLora:data.rssiLora,
      rssiBluetooth:data.rssiBluetooth,
      timeCapbluetooth:data.timeCapbluetooth,
      timeCapLora:data.timeCapLora,
      timeCapParticle:data.timeCapParticle,
      Led:data.Led,
      modelo:data.Modelo,
      fabricante:data.Fabricante,
      CSQ:data.CSQ,
      operador:data.Operador,
      tecnologia:data.Tecnologia,
      lat:data.Lat,
      lng:data.Long,
      exprimento:this.experimento
      
      //rssiICSQ:option.rssiICSQ
      }
    ), data.temperature > this.temperatureAlert);
  });
}

/*function defobjpost (x){
  try{
  var date = date || Date.now();
  Object.assign(x, { date: moment(date).format('YYYY-MM-DD') });
  Object.assign(x, {time: moment(date).format('hh:mm:ss') });

  }

  catch (err) {
    console.log(x);
    console.error(err);
  }


  var temperatura= {
    id: '1',
    fecha:x.date,
    hora:x.time,
    variable: 'Temperatura',
    valor: x.temperature,
    unidad: 'C',
  };
  var humedad= {
    id: '1',
    fecha:x.date,
    hora:x.time,
    variable: 'Humedad',
    valor: x.humidity,
    unidad: '%',
  };
  var voltaje= {
    id: '1',
    fecha:x.date,
    hora:x.time,
    variable: 'Voltaje',
    valor: x.voltaje,
    unidad: 'V',
  }
  var corriente= {
    id: '1',
    fecha:x.date,
    hora:x.time,
    variable: 'Corriente',
    valor: x.corriente,
    unidad: 'A',
  }

//ejecutpost(temperatura);
//ejecutpost(humedad);
//ejecutpost(corriente);
//ejecutpost(voltaje);
}



function ejecutpost(x){
  axios.post('http://labsolar.azurewebsites.net/index2.php/api/sensores/add', x)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

}*/






module.exports = MessageProcessor;
