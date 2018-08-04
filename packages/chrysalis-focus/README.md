chrysalis-focus
===============

This is the heart of the Chrysalis libraries, the one thing that binds
everything together. It implements the `Focus` protocol used by
[Kaleidoscope][k:focus] for bi-directional communication, and on top of that, it
provides hooks and methods to build complex applications on top.

 [k:focus]: https://github.com/keyboardio/Kaleidoscope-Focus

```js
import Focus from "chrysalis-focus"
import Keymap from "chrysalis-keymap"
import { Model01 } from "chrysalis-hardware-keyboardio-model01"

let focus = new Focus(),
    keymap = new Keymap()

focus.open(Model01)
keymap.setLayerSize(Model01)

focus.command("help").then((response) => {
  console.log(response)
})
```

[Full API documentation][api-docs]

 [api-docs]: https://lepidopterarium.github.io/chrysalis-focus/
