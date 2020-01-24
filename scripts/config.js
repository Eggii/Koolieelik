
//requirejs config file
requirejs.config({
  paths: {
    jquery: "lib/jquery-3.4.1",
    popper: "lib/popper.min",
    bootstrap: "lib/bootstrap.bundle.min",
    nav: "nav",
    carousel: "carousel",
    audio: "modules/audio",
    constants: "../constants", 
    calculations: "modules/calculations", 
    validation: "modules/validation"
  },
  "shim": {
    "bootstrap": ["jquery", "popper"]
  }
});

define("initBootstrap", ["popper"], function (popper) {
  // set popper as required by Bootstrap
  window.Popper = popper;
  require(["bootstrap"], function (bootstrap) {
    // do nothing - just let Bootstrap initialise itself
  });
  require(["constants"], function(CONSTANTS){
    
  });
});
require(["config", "initBootstrap"], function () {
  require(["jquery"]);
});



