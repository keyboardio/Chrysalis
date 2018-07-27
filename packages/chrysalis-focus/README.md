chrysalis-focus
===============

```js
import Focus from "chrysalis-focus"
import SerialPort from "serialport"

let port = new SerialPort("/dev/ttyACM0"),
    focus = new Focus(port)

focus.command("help").then((data) => {
  console.log(data)
})
```
