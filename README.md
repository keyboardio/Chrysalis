Bazecor API
=============

This is a collection of libraries to make it easier to work with keyboards that support [Kaleidoscope][kaleidoscope]'s [Focus][kaleidoscope:focus] protocol.

 [kaleidoscope]: https://github.com/keyboardio/Kaleidoscope
 [kaleidoscope:focus]: https://github.com/keyboardio/Kaleidoscope/blob/master/doc/plugin/FocusSerial.md

```javascript
import Focus from "@bazecor-api/focus";
import { Raise } from "@bazecor-api/hardware-dygma-raise";

let focus = new Focus();
focus.open(Raise).then(() => {
  focus.command("help").then((response) => {
    console.log(response);
  });
});
```

