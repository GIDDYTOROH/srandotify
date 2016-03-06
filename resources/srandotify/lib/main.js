var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");

var button = ToggleButton({
  id: "my-button",
  label: "sRandotify",
  icon: {
    "16": "./spotify_autoplay_logo1_16.png",
    "32": "./spotify_autoplay_logo1_32.png",
    "64": "./spotify_autoplay_logo1_64.png"
  },
  onChange: handleChange
});

var panel = panels.Panel({
  contentURL: self.data.url("spotifyrandom_V1.53a.html"),
  contentScriptFile: self.data.url("my_contentscriptfile.js"),
  onHide: handleHide,
  height: 280
});

panel.port.on("console.log",function(log){
	console.error(log);
});

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}