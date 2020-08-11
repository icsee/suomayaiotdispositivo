var Feather = require("feather-ble");

var possible_feather = "Bluefruit52";
 
// Check is peripheral is an adafruit feather
if (new Feather().isFeather(possible_feather)) {
  // possible_feather is an adafruit feather device
  
  // Create settings
  var instanceSettings = {
    peripheral: possible_feather,     // REQUIRED: A Noble Peripheral Instance to use
    verbose: Bool,                    // OPTIONAL: If instance should print out logs to console (default FALSE)
    rssi: Bool,                       // OPTIONAL: If instance should request/trigger RSSI updates (default FALSE)
    rssi_update_rate: Int             // OPTIONAL: Rate (in ms) at which RSSI updates should be requested/triggered (default 5000)
  };
  
  // Create instance
  var feather = new Feather(instanceSettings);
  
  // Add event listeners
  feather.on("ready", function(err){
    if (!err) {
      // feather is connected and ready
      
      // Can send strings over to adafruit device
      feather.sendMessage("Hello World!");
      feather.sendMessage("This is a really long string that works just as well :)");
    }
  });
  
  feather.on("message", function(msg){
    // Message recieved from adafruit device
  });
  
  feather.on("rssi", function(err, rssi){
    if (!err) {
      // RSSI was updated
    }
  });
  
  feather.on("disconnect", function(){
    // feather was disconnected
  });
  
  // Start feather process
  feather.setup();
 
}