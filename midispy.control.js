var SCRIPT_API_VERSION = 12;
var SCRIPT_UUID = "7582a173-64c1-4719-b891-248e2839e1be";

loadAPI(SCRIPT_API_VERSION);
host.defineController("Midiplus", "MidiSpy", "1.0", SCRIPT_UUID, "mostghost");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["SPY MIDI 1"], ["SPY MIDI 1"]);


var lastValue = 555;
var input;


function init() {
    input = host.getMidiInPort(0);
    input.setMidiCallback(onMidi);

    cursorTrack = host.createCursorTrack("Track", "Track", 0, 0, true);
    cursorDevice = cursorTrack.createCursorDevice();
    remoteControls = cursorDevice.createCursorRemoteControlsPage(8);
    remoteControls.getParameter(6).markInterested();
    remoteControls.getParameter(7).markInterested();
}

function exit() {}

function onMidi(status, data1, data2) {
    var midiChannel = status & 0x0F;
    var midiType = status & 0xF0;

    // Check for Program Change on channel 1
    if (midiType === 0xC0 && midiChannel === 0) {
        var newValue = data1;
        if (lastValue != 555) {
            if (lastValue === 127 && newValue === 0) {
                sendSwitch(0); 
            } else if (lastValue === 0 && newValue === 127) {
                sendSwitch(1);
            } else if (newValue > lastValue) {
                sendSwitch(0); 
            } else if (newValue < lastValue) {
                sendSwitch(1);
            }
        }
        lastValue = newValue;
    }
}

function sendSwitch(side) {
    // 'Side' will be 0 or 1. 0 is left, 1 is right.

    if (side === 0) {
    var remoteControl = remoteControls.getParameter(6); // 0-based: 7 = 8th
    } else if (side === 1) {
    var remoteControl = remoteControls.getParameter(7); // 0-based: 7 = 8th
    }

    // Simple toggle implementation
    var currentValue = remoteControl.get();
    if (currentValue > 0.5) {
        remoteControl.set(0);
    } else {
        remoteControl.set(1);
    }

}

