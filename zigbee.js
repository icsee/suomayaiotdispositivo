'use strict';

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
//Comunicacion lora
const port = new SerialPort('/dev/ttyACM0',{baudRate:115200});

// comunicacion Módulo USB sistema 4G
const port2 = new SerialPort('/dev/ttyUSB2',{baudRate:115200});
const parser2 = new Readline();
port2.pipe(parser2);

//const port = new SerialPort('/dev/ttyUSB0');
//const port = new SerialPort('/dev/ttyS0');
const parser = new Readline();
var rssiPart,rssiLo,Temp,Luxo,adc,rssiBean,timeBluetooth,timeLora,timeParticle,led,fabricante,modelo,csq,qgps,cops;
port.pipe(parser);
var async = require('async');
const moment = require('moment');

//código Fabio
const Bean = require('ble-bean')
var intervalId, connectedBean, lat, long, operador, tecnologia
var count=0;
//const express = require('express');
//const app = express();
//const http = require('http').Server(app)
//const io = require('socket.io')(http)





const Particle = require('particle-api-js')
const particle = new Particle()
const token = '77228bcaa34360fce83a2b69d3a739772232bcb5'
const deviceID = '450028000851363136363935'




setTimeout(comando1, 300);
setTimeout(comando2, 300);
setTimeout(comando3, 300);


function comando1() {
  // stuff you want to happen right away
  port2.write('AT\r\n');
  console.log("comado AT");
}


function comando2() {
  port2.write('ATV1\r\n');
  console.log("comado ATV1");
}

function comando3() {
  port2.write('AT+QGPS=1\r\n');
  console.log("comado AT+QGPS=1");
}

function comando4() {
  // stuff you want to happen right away
  port2.write('ATI\r\n');
  console.log("comado ATI");
}

function comando5() {
  // stuff you want to happen right away
  port2.write('AT+CSQ\r\n');
  console.log("comado AT+CSQ");
}

function comando6() {
  // stuff you want to happen right away
  port2.write('AT+QGPSLOC?\r\n');
  console.log("comado AT+QGPSLOC?");
}

function comando7() {
  // stuff you want to happen right away
  port2.write('AT+COPS?\r\n');
  console.log("comado AT+COPS?");
}


parser2.on('data', function (data) {
 
    if(data.charAt (0)==='Q'){
        fabricante=data.replace('\r','');
         console.log("fabricante es igual:"+fabricante);
      }
      else if(data.charAt (0)==='E'){
        modelo=data.replace('\r','');
        console.log("modelo es igual:"+modelo);
        }
        else if(data.charAt (0)==='+'){
             if(data.charAt (2)==='S'){
              csq=data.split(":");
              csq=csq[1].replace('\r','').replace(' ','');
              csq=csq.replace(',','.');
              console.log("CSQ es igual:"+csq);
             }
             else if(data.charAt (2)==='G'){
              qgps=data.split(",");
              lat=qgps[1].replace('\r','');
              var grados=lat.charAt (0)+lat.charAt (1)
              var minutos=lat.charAt (2)+lat.charAt (3)
              var segundos=lat.charAt (5)+lat.charAt (6)+'.'+lat.charAt (7)+lat.charAt (8)
              if(lat.charAt (9)==='S'){
              lat=-1*(((segundos/60)/60)+(minutos/60)+(grados*1))}
              else{ lat=((segundos/60)/60)+(minutos/60)+(grados*1);
                    
                   }
              //lat=lat.charAt (0)+lat.charAt (1)+'°'+lat.charAt (2)+lat.charAt (3)+"'"+lat.charAt (5)+lat.charAt (6)+'.'+lat.charAt (7)+lat.charAt (8)+lat.charAt (9);
              long=qgps[2].replace('\r','');
              grados=long.charAt (1)+long.charAt (2)
              minutos=long.charAt (3)+long.charAt (4)
              segundos=long.charAt (6)+long.charAt (7)+'.'+long.charAt (8)+long.charAt (9)
              //long=long.charAt (1)+long.charAt (2)+'°'+long.charAt (3)+long.charAt (4)+"'"+long.charAt (6)+long.charAt (7)+'.'+long.charAt (8)+long.charAt (9)+long.charAt (10);
              if(long.charAt (10)==='W'){
                long=-1*(((segundos/60)/60)+(minutos/60)+(grados*1))}
                else{ long=((segundos/60)/60)+(minutos/60)+(grados*1);
                    }
              console.log("latitud:"+lat+" Long "+long);
              console.log("gps: "+data);
             }
             else if(data.charAt (2)==='O'){
              cops=data.split(",");
              operador=cops[2].replace('\r','');
              tecnologia=cops[3].replace('\r','');
              console.log("COPS es igual:"+operador+" "+tecnologia);
              
             }
         
          }
        else {console.log("la respuesta es "+data);

  }

});



  /*const BeaconScanner = require('node-beacon-scanner');
  const scanner = new BeaconScanner();

  // Set an Event handler for becons
scanner.onadvertisement = (ad) => {
  console.log(JSON.stringify(ad, null, '  '));
};


// Start scanning
scanner.startScan().then(() => {
  console.log('Started to scan.')  ;
}).catch((error) => {
  console.error(error);
});*/

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
    
    if(count===1){
     setTimeout(comando4, 300);}
     else if(count===2){   
    setTimeout(comando3, 300);}
    else if(count===3){
    setTimeout(comando6, 300);}
    else if(count===4){
    setTimeout(comando5, 300);}
    else if(count===5){
    setTimeout(comando7, 300);
     count=1; }
  count++;
    callback(null, {
      Lora: Temp,
      Particle:adc,
      Bluetooth:Luxo,
      rssiParticle:rssiPart,
      rssiLora:rssiLo,
      rssiBluetooth:rssiBean,
      timeCapbluetooth:timeBluetooth,
      timeCapLora:timeLora,
      timeCapParticle:timeParticle,
      Led:led,
      Modelo:modelo,
      Fabricante:fabricante,
      Lat:lat,
      Long:long,
      CSQ:csq,
      Operador:operador,
      Tecnologia:tecnologia
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



  
    async function fetchFromParticle (variable){
      const response = await particle.getVariable({ deviceId: deviceID, name: variable, auth: token })
      return response.body.result
    }
  
    async function getData(){
      try {
        const sensor = await fetchFromParticle(`analogvalue`)
    const rssi = await fetchFromParticle(`rssi`)
  
      //console.log(sensor)
      console.log(rssi)
      rssiPart=rssi
      //io.emit('getPote', sensor)
      console.log('Potenciometro: ' + sensor)
      adc=sensor
      var date = date || Date.now();
      timeParticle= moment(date).format('YYYY-MM-DD') +" "+ moment(date).format('hh:mm:ss.SSS');
       } catch (error) {
        console.log('There was an error: ' + error)
      }
    }
  
    setInterval(getData, 3000)
  
   
    parser.on('data', function (data) {
      const res = data.split(" ")
      const temp = res[1]
      rssiLo = res[3]
      console.log(temp)
      console.log(rssiLo)
      Temp=temp
      var date = date || Date.now();
      timeLora= moment(date).format('YYYY-MM-DD') +" "+ moment(date).format('hh:mm:ss.SSS');
      //io.emit('getNum', temp)
    });
  
    Bean.discover(function(bean){
     
      
      connectedBean = bean;
      process.on('SIGINT', exitHandler.bind(this));
  
      bean.on("serial", function(data, valid){
        const lux = parseInt(data.toString());
        var date = date || Date.now();
        timeBluetooth= moment(date).format('YYYY-MM-DD') +" "+ moment(date).format('hh:mm:ss.SSS');
        Luxo=lux
        rssiBean=bean.rssi
        console.log('Lux: ' + lux)
        console.log('rssi ' + bean.rssi);
        console.log('timeStamp ' + timeBluetooth);
      });
      
        
      bean.on("disconnect", function(){
        process.exit();
      });
  
      bean.connectAndSetup(function(){
        //Here goes data send over scratch caracteristic

        var readData = function() {

          //set random led colors between 0-255. I find red overpowering so red between 0-64
          bean.setColor(new Buffer([getRandomInt(0,64),getRandomInt(0,255),getRandomInt(0,255)]),
            function(){
              var date = date || Date.now();
              led= moment(date).format('YYYY-MM-DD') +" "+ moment(date).format('hh:mm:ss.SSS');
            });
                
        }
    
        intervalId = setInterval(readData,10000);
      });

         
      
    });

   


    var getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };


    
    process.stdin.resume();//so the program will not close instantly
    var triedToExit = false;
  
    //turns off led before disconnecting
    var exitHandler = function exitHandler() {
  
      var self = this;
      if (connectedBean && !triedToExit) {
        triedToExit = true;
        console.log('Turning off led...');
        clearInterval(intervalId);
        connectedBean.setColor(new Buffer([0x0,0x0,0x0]), function(){});
        //no way to know if succesful but often behind other commands going out, so just wait 2 seconds
        console.log('Disconnecting from Device...');
        setTimeout(connectedBean.disconnect.bind(connectedBean, function(){}), 2000);
      } else {
        process.exit();
      }
    };
  
 
  
  
  
  
  module.exports = Sensor;

