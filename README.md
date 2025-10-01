# Midiplus-SPY-Bitwig
A compatibility script for using the Midiplus SPY with bitwig.

The midiplus SPY is a conversion box, which takes an expression pedal or a 2-switch pedal input, and converts it into USB compatible MIDI CC signals for use with a PC music DAW such as bitwig. The expression pedal input works as expected and sends a generic MIDI CC command, which can be mapped as you see fit. Unfortunately, they have hard wired the 2-switch pedal input to use a very specific Program Change incremental counter rather than a generic, mappable MIDI CC command, because they had some specific use case in mind instead of leaving it generic and for the user to map themselves.

# Quirks
This script leaves the expression pedal MIDI alone, but reads the Program Change signals from the 2 switch pedal input and instead converts them into two generic button toggles. There are some limitations:

* It will only work on the currently selected bitwig device. You cannot permanently map a switch to a particular parameter through the usual method.
* You must have the last two slots of your selected device's current remote control page set as buttons.

These two are because of limitations with bitwig's scripting interface- you cannot send a MIDI signal that bitwig will interpret, the best I could do was set it to toggle the last two buttons exposed by the remote control page.

* The Program Change signals are still being sent, which may possibly cause some problems with some devices.

Again the scripting interface does not allow a script to actually filter out or remove a signal.

* The first button press on first loading bitwig will do nothing.

Since the signal that's being sent is an incremental counter, the first button press just sets the start point- every button press after that will either increase or decrease the counter, which can be interpreted as one button or the other.

* If you press both buttons at once, it may not register the correct button for a press or two.

Pressing both buttons at once resets the midiplus spy to the set value, which messes with the count. The script will fix itself after pressing a button once or twice.

* The buttons are latching.

Since the midiplus spy only sends one signal when a button is first pressed, there's no way to do non-latching buttons.

# Installation

Put the .control.js script into your Controller Scripts folder. Look under the locations tab to find where it is.

If the script isn't automatically mapped to your Midiplus SPY, you can find the script under the 'midiplus' vendor.
