/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';


const fs = require('fs');
const path = require('path');
const wpi = require('wiringpi-node');
const chalk = require('chalk');
const Client = require('azure-iot-device').Client;
const ConnectionString = require('azure-iot-device').ConnectionString;
const Message = require('azure-iot-device').Message;
const Protocol = require('azure-iot-device-mqtt').Mqtt;





const bi = require('az-iot-bi');


const MessageProcessor = require('./messageProcessor.js');
var sendingMessage = true;
var messageId = 0;
var client, config, messageProcessor;



function sendMessage() {
  if (!sendingMessage) { return; }
  messageId++;
  messageProcessor.getMessage(messageId, (content, temperatureAlert) => {
    var message = new Message(content);
    message.properties.add('temperatureAlert', temperatureAlert ? 'true' : 'false');
    console.log('Sending message: ' + content);
    client.sendEvent(message, (err) => {
      if (err) {
        console.error('Failed to send message to Azure IoT Hub');
      } else {
        blinkLED();
        console.log('Message sent to Azure IoT Hub');
      }
      setTimeout(sendMessage, config.interval);
    });
  });
}






function onStart(request, response) {
  console.log('Try to invoke method start(' + request.payload || '' + ')');
  sendingMessage = true;

  response.send(200, 'Successully start sending message to cloud', function (err) {
    if (err) {
      console.error('[IoT hub Client] Failed sending a method response:\n' + err.message);
    }
  });
}


function onStop(request, response) {
  console.log('Try to invoke method stop(' + request.payload || '' + ')')
  sendingMessage = false;

  response.send(200, 'Successully stop sending message to cloud', function (err) {
    if (err) {
      console.error('[IoT hub Client] Failed sending a method response:\n' + err.message);
    }
  });
}

function receiveMessageCallback(msg) {
  blinkLED();
  var message = msg.getData().toString('utf-8');
   if(message=='red'){
   wpi.digitalWrite(config.LEDPinblue, 0);
   wpi.digitalWrite(config.LEDPinred, 1);
   wpi.digitalWrite(config.LEDPingreen, 0);
   }else if (message=='blue') {
  wpi.digitalWrite(config.LEDPinblue, 1);
  wpi.digitalWrite(config.LEDPinred, 0);
  wpi.digitalWrite(config.LEDPingreen, 0);
}else if (message=='green') {
  wpi.digitalWrite(config.LEDPinblue, 0);
  wpi.digitalWrite(config.LEDPinred, 0);
  wpi.digitalWrite(config.LEDPingreen, 1);
}else if (message=='off') {
  wpi.digitalWrite(config.LEDPinblue, 0);
  wpi.digitalWrite(config.LEDPinred, 0);
  wpi.digitalWrite(config.LEDPingreen, 0);
}

    client.complete(msg, () => {
      messageProcessor.setMessage(message);
    //console.log('Receive message: ' + message);
  });
}

function blinkLED() {
  // Light up LED for 500 ms
  wpi.digitalWrite(config.LEDPin, 1);
  setTimeout(function () {
    wpi.digitalWrite(config.LEDPin, 0);
  }, 500);
}

function initClient(connectionStringParam, credentialPath) {
  var connectionString = ConnectionString.parse(connectionStringParam);
  var deviceId = connectionString.DeviceId;

  // fromConnectionString must specify a transport constructor, coming from any transport package.
  client = Client.fromConnectionString(connectionStringParam, Protocol);

  // Configure the client to use X509 authentication if required by the connection string.
  if (connectionString.x509) {
    // Read X.509 certificate and private key.
    // These files should be in the current folder and use the following naming convention:
    // [device name]-cert.pem and [device name]-key.pem, example: myraspberrypi-cert.pem
    var connectionOptions = {
      cert: fs.readFileSync(path.join(credentialPath, deviceId + '-cert.pem')).toString(),
      key: fs.readFileSync(path.join(credentialPath, deviceId + '-key.pem')).toString()
    };

    client.setOptions(connectionOptions);

    console.log('[Device] Using X.509 client certificate authentication');
  }
  return client;
}


// Function to handle the SetColor direct method call from IoT hub
function onSetColor(request, response) {
  // Function to send a direct method reponse to your IoT hub.
  function directMethodResponse(err) {
    if(err) {
      console.error(chalk.red('An error ocurred when sending a method response:\n' + err.toString()));
    } else {
        console.log(chalk.green('Response to method \'' + request.methodName + '\' sent successfully.' ));
    }
  }

  console.log(chalk.green('Direct method payload received:'));
  console.log(chalk.green(request.payload));

  if(request.payload=='red'){
    wpi.digitalWrite(config.LEDPinblue, 0);
    wpi.digitalWrite(config.LEDPinred, 1);
    wpi.digitalWrite(config.LEDPingreen, 0);
    // Report success back to your hub.
     response.send(200, 'Color seleccionado: ' + request.payload, directMethodResponse);
    }
    messageProcessor.setMessage(request.payload);

}



(function (connectionString) {
  // read in configuration in config.json
  try {
    config = require('./config.json');
  } catch (err) {
    console.error('Failed to load config.json: ' + err.message);
    return;
  }

  // set up wiring
  wpi.setup('wpi');
  wpi.pinMode(config.LEDPin, wpi.OUTPUT);
  wpi.pinMode(config.LEDPinred, wpi.OUTPUT);
  wpi.pinMode(config.LEDPinblue, wpi.OUTPUT);
  wpi.pinMode(config.LEDPingreen, wpi.OUTPUT);
  messageProcessor = new MessageProcessor(config);

  bi.start();
  var deviceInfo = {device:"RaspberryPiSolar",language:"NodeJS"};
  if(bi.isBIEnabled()) {
    bi.trackEventWithoutInternalProperties('yes', deviceInfo);
    bi.trackEvent('success', deviceInfo);
  }
  else
  {
    bi.trackEventWithoutInternalProperties('no', deviceInfo);
  }
  bi.flush();

  // create a client
  // read out the connectionString from process environment
// connectionString = connectionString || process.env['AzureIoTHubDeviceConnectionString'];
  connectionString ='HostName=labsolarrasp.azure-devices.net;DeviceId=raspberrySolar;SharedAccessKey=5qHz6i6EEwwc3x/cN2bzd4xuwTY2Y9H0TYKF/e+0eoo=';
  client = initClient(connectionString, config);

  client.open((err) => {
    if (err) {
      console.error('[IoT hub Client] Connect error: ' + err.message);
      return;
    }

    // set C2D and device method callback
    client.onDeviceMethod('start', onStart);
    client.onDeviceMethod('stop', onStop);
    // Set up the handler for the SetColor direct method call.
    client.onDeviceMethod('SetColor', onSetColor);

    client.on('message', receiveMessageCallback);
    setInterval(() => {
      client.getTwin((err, twin) => {
        if (err) {
          console.error("get twin message error");
          return;
        }
        config.interval = twin.properties.desired.interval || config.interval;
      });
    }, config.interval);
    sendMessage();
  });
})(process.argv[2]);
