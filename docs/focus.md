@chrysalis-api/focus
====================

This is the heart of the Chrysalis libraries, the one thing that binds
everything together. It implements the `Focus` protocol used by
[Kaleidoscope][k:focus] for bi-directional communication, and on top of that, it
provides hooks and methods to build complex applications on top.

 [k:focus]: https://github.com/keyboardio/Kaleidoscope-Focus

```
yarn add @chrysalis-api/focus
```

# Focus

The module provides a singleton, `Focus`, which implements the Focus protocol,
and provides hooks to extend it. Unless otherwise noted, all methods except the constructor return their result wrapped in a `Promise`.

```javascript
import Focus from "@chrysalis-api/focus";

let focus = new Focus();
```

The constructor either returns an existing singleton object, or creates a new
one.

## Methods

### .find(...devices)

Find devices that match certain criteria.

Given a list of supported devices, look through the system and find matching
ones. Each argument must be an object with an `usb` property, which in turn must
have `productId` and `vendorId` properties. The method will match these with USB
devices on the system, and return a list of matches.

For example, a `device` descriptor may look like this:

```javascript
const Model01 = {
  usb: {
    vendorId: 0x1209,
    productId: 0x2301
  },
  keyboard: {
    rows: 4,
    columns: 16
  }
};
```

**Returns** A list of port descriptors for matching devices, or an empty list.

> ```javascript
> focus.find(Model01).then(devices => {
>   console.log("Found the following devices:", devices);
> });
> ```

### .open(device[, info])

Opens a device, where `device` is either a device descriptor (see above), a
`SerialPort` object, or a path to the device file, or port name. In the last two
cases, the `info` argument becomes required, and must be a device descriptor.

The descriptor of the opened device will be available as the `device` property
of the `Focus` singleton.

If `device` is a descriptor, then the first device found will be opened.

**Returns** A `SerialPort` object, not wrapped in a `Promise`.

**Note**: All methods below require an opened device.

> ```javascript
> focus.open(Model01);
> focus.open(new SerialPort("/dev/model01"), Model01);
> focus.open("/dev/model01", Model01);
> ```

### .close()

Close the connection to the device, if there was any open.

> ```javascript
> focus.close();
> ```

### .probe()

Probes the device for Focus support.

**Returns** the result of the `help` command, or an exception if Focus is not
supported by the opened device.

> ```javascript
> focus.probe()
>   .then(() => {
>     console.log("Focus support detected!");
>   })
>   .catch(e => {
>     console.error("Focus not found.");
>   })
> ```

### .request(command[, ...args])

Sends a low-level command (with optional arguments, and returns the result
as-is. There is no post-processing done on the result.

**Returns** the raw, unprocessed response as a string.

> ```javascript
> focus.request("help").then(result => {
>   console.log("help:", result);
> });
>
> focus.request("settings.defaultLayer", "0").then(() => {
>   console.log("Default layer set to 0.");
> });
> ```

### .addCommands(commands)

Register new commands with the `Focus` singleton. Commands allow one to extend
Focus, and do some processing with data read from the keyboard, and on data sent
to it. This in turn allows us to convert the raw data into a format that's more
convenient to work with in JavaScript and vice-versa.

The `commands` argument is an object, whose keys are the command names, and the
values are either functions, or objects themselves. Using an object allows one
to create a focus command that keeps state. In case of functions, the function
will be called with the same arguments as the command was (save for the command
name). In case of objects, the `.focus()` method of the object will be called
the same way.

In either case, the callback must return a `Promise`, wrapping whatever data
structure is most convenient for the command in question.

> ```javascript
> async function testCommand(s, arg) {
>   if (arg) {
>     return s.request("test", arg + 1);
>   } else {
>     let data = await s.request("test");
>     data = parseInt(data) - 1;
>     return data;
>   }
> }
>
> focus.addCommands({
>   test: testCommand
> });
> ```

### .command(command[, ...args])

The high-level interface to talk with the connected keyboard. Sends a command -
with optional arguments - and returns processed results. Both the request and
the response is processed by any hooks registered for the given `command` (see
`.addCommands()` above).

**Returns** The processed response.

> ```javascript
> focus.command("help").then(commands => {
>   console.log(commands[0]);
> });
> ```
