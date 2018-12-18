@chrysalis-api/hardware-keyboardio-model01
==========================================

[Keyboardio Model01][m01] hardware descriptor.

 [m01]: https://shop.keyboard.io/

Can be used with `Focus.find()`, `Focus.open()`, and so on.

```
yarn add @chrysalis-api/hardware-keyboardio-model01
```

# { Model01 }

Provides a hardware description to be used by other Chrysalis modules ([`@chrysalis-api/focus`](focus.md)) and the Chrysalis UI itself.

```javascript
import Focus from "@chrysalis-api/focus";
import { Model01 } from "@chrysalis-api/hardware-keyboardio-model01";

let focus = new Focus();
focus.open(Model01);
```
