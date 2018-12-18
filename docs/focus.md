@chrysalis-api/focus
====================

This is the heart of the Chrysalis libraries, the one thing that binds
everything together. It implements the `Focus` protocol used by
[Kaleidoscope][k:focus] for bi-directional communication, and on top of that, it
provides hooks and methods to build complex applications on top.

 [k:focus]: https://github.com/keyboardio/Kaleidoscope-Focus

The module provides a singleton, `Focus`, which implements the Focus protocol,
and provides hooks to extend it.
