<div align="center">

[![ReForged Icon](https://user-images.githubusercontent.com/57194920/216773020-10a50af0-91f2-4956-9598-c10a3f61a355.svg)](https://github.com/SpacingBat3/ReForged#readme)

# NOTE

This fork exists to allow keyboardio to customize the shell script launcher used for the AppImage we build for Chrysalis.

You should be using the upstream repo

# ReForged

A set of [Electron Forge][forge] tools, makers and publishers.

</div>

## Status

Currently, this project is still very inmature and some details are undecided
yet about this project. The currently planned and implemented parts of this
project are:

- [X] [`@reforged/maker-appimage`][maker1] – a simple yet performant AppImage
  maker, written mostly asynchroniously. Unlike many Electron Forge maker, this
  one directly implements Electron Forge packaging, rather than wrapping another
  Node.js package.

  - [ ] Emit / show current task and its progress.
  - [ ] Support passing and generating update information to AppImages (`zsync`).
  - [ ] Support AppImage signing (`gpg`).

- [ ] `@reforged/maker-flatpak` – an improved version of Flatpak maker, with
  similar concepts to `maker-appimage`: be asynchronious and directly implement
  maker rather than using other Node modules. It also aims to fix some bugs with
  the current implementation, optimally supporting
  `@electron-forge/publisher-github`.

- [ ] `@reforged/maker-alpm` – maker for Arch Linux `pacman` packages. Might use
  `makepkg` under-the-hood, unless I'll get myself to analyse package format
  itself and want from maker to create packages without any essential toolkit.

## License

This project is distributed under terms of [ISC license](./LICENSE):

    Permission to use, copy, modify, and/or distribute this software for any purpose
    with or without fee is hereby granted, provided that the above copyright notice
    and this permission notice appear in all copies.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
    FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
    OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
    TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
    THIS SOFTWARE.

(Note: the above text should be treated as a preview, not the actual software license)

[forge]: https://github.com/electron/forge
[maker1]: https://www.npmjs.com/package/@reforged/maker-appimage
