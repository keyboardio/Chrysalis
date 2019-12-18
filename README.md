Bazecor API
=============

This is a collection of libraries to make it easier to work with keyboards that support [Dygmalab][Dygmalab]'s [Focus][Dygmalab:focus] protocol.

 [Dygmalab]: https://github.com/Dygmalab/Bazecor
 [Dygmalab:focus]: https://github.com/Dygmalab/Bazecor/blob/master/doc/plugin/FocusSerial.md

```javascript
import Focus from "@bazecor-api/focus";
import { Model01 } from "@bazecor-api/hardware-keyboardio-model01";

let focus = new Focus();
focus.open(Model01).then(() => {
  focus.command("help").then((response) => {
    console.log(response);
  });
});
```

[Documentation](https://github.com/Dygmalab/Bazecor)
