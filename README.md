Chrysalis API
=============

This is a collection of libraries to make it easier to work with keyboards that support [Kaleidoscope][kaleidoscope]'s [Focus][kaleidoscope:focus] protocol.

 [kaleidoscope]: https://github.com/keyboardio/Kaleidoscope
 [kaleidoscope:focus]: https://github.com/keyboardio/Kaleidoscope/blob/master/doc/plugin/FocusSerial.md

```javascript
import Focus from "@chrysalis-api/focus";
import { Model01 } from "@chrysalis-api/hardware-keyboardio-model01";

let focus = new Focus();
focus.open(Model01).then(() => {
  focus.command("help").then((response) => {
    console.log(response);
  });
});
```

[Documentation](https://lepidopterarium.github.io/chrysalis-api/)
