---
services: iot-hub
platforms: Nodejs
author: Juan Amezquita
---

# IoT Hub Raspberry Pi 3 aplicacion cliente
[![Build Status](https://travis-ci.com/Azure-Samples/iot-hub-node-raspberrypi-client-app.svg?token=5ZpmkzKtuWLEXMPjmJ6P&branch=master)](https://travis-ci.com/Azure-Samples/iot-hub-node-raspberrypi-client-app)

> This repo contains the source code to help you get familiar with Azure IoT using the Microsoft IoT Pack for Raspberry Pi 3 Starter Kit. You will find the [lesson-based tutorials on Azure.com](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-raspberry-pi-kit-node-get-started).


## configuración de raspberry
### Enable SSH on your Pi
Follow [this page](https://www.raspberrypi.org/documentation/remote-access/ssh/) to enable SSH on your Pi.



### Instalación de node.js
Check your nodejs version on your Pi:

```bash
node -v
```

If your nodejs' version is below v4.x, please follow the instruction to install a new version of nodejs

```bash
curl -sL http://deb.nodesource.com/setup_4.x | sudo -E bash
sudo apt-get -y install nodejs
```


### Si no se cuenta con sensor puede simular los datos
En el archivo config.json puede decidir si quiere datos simulados o va a utilziar un sensor
1. Open the `config.json` file.
2. Change the `simulatedData` value from `false` to `true`.


## Running this sample
### Install package
Install all packages by the following command:

```bash
npm install
```

### ejecutar la aplicación
Run the client application with root priviledge, and you also need provide your Azure IoT hub device connection string, note your connection should be quoted in the command.

```bash
sudo node index.js 
```


