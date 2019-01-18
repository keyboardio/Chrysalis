// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2019  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const Hungarian = {
  language: "Magyar",
  errors: {
    deviceDisconnected: "Az eszköz lecsatlakozott"
  },
  components: {
    layer: "#{0}. réteg",
    save: {
      success: "Elmentve!",
      saveChanges: "Mentés"
    }
  },
  app: {
    device: "Eszköz",
    menu: {
      welcome: "Üdvözlet",
      layoutEditor: "Kiosztás szerkesztő",
      colormapEditor: "Színtérkép szerkesztő",
      firmwareUpdate: "Vezérlő frissítés",
      settings: "Beállítások",
      selectAKeyboard: "Billentyűzet választás",
      selectAnotherKeyboard: "Másik billentyűzet választás",
      chat: "Csevegőszoba",
      feedback: "Visszajelzés küldése",
      exit: "Kilépés"
    },
    deviceMenu: {
      Homepage: "Honlap",
      Forum: "Fórum",
      Chat: "Csevegőszoba"
    }
  },
  layoutEditor: {
    keyType: "Gomb tipus",
    keyCode: "Gomb kód",
    groups: {
      Letters: "Betűk",
      Digits: "Számok",
      Punctuation: "Központozás",
      Spacing: "Szóközök",
      Modifiers: "Módosítók",
      Navigation: "Navigáció",
      "Fx keys": "Fx gombok",
      Numpad: "Numerikus billentyűzet",
      Miscellaneous: "Egyebek",
      "Shift to layer": "Ideiglenese réteg váltás",
      "Lock layer to": "Réteg váltás",
      "LED Effect": "LED gombok",
      Macros: "Makrók",
      Media: "Média",
      "Mouse movement": "Egér mozgatás",
      "Mouse button": "Egér gombok",
      "Mouse wheel": "Egér görgő",
      "Mouse warp": "Egér ugrás",
      "OneShot modifiers": "Egyszeri módosítók",
      "OneShot layers": "Egyszeri réteg váltók",
      TapDance: "TapDance",
      Leader: "Vezérgomb",
      Steno: "Steno",
      SpaceCadet: "SpaceCadet",
      Blank: "Üres gombok",
      "Unknown keycodes": "Ismeretlen kódok"
    },
    defaultLayer: "Alapértelmezett réteg",
    clearLayer: "Réteg ürítése...",
    copyTo: "Réteg másolás...",
    dualUse: "Nyomvatartáskor módosító, normál gomb egyébként",
    dualUseLayer: "Nyomvatartáskor réteg váltó, normál gomb egyébként"
  },
  colormapEditor: {
    clearLayer: "Réteg ürítése...",
    copyTo: "Réteg másolás..."
  },
  settings: {
    devtools: "Fejlesztői eszközök",
    language: "Nyelv",
    interface: "Felhasználói felület",
    advanced: "Haladó beállítások"
  },
  keyboardSelect: {
    unknown: "Ismeretlen",
    selectPrompt: "Kérem válasszon billentyűzetet:",
    noDevices: "Nincs ismert eszköz csatlakoztatva!",
    connect: "Kapcsolódás",
    disconnect: "Lecsatlakozás",
    scan: "Eszköz keresés"
  },
  firmwareUpdate: {
    dialog: {
      selectFirmware: "Válasszon vezérlőt",
      firmwareFiles: "Vezérlő állományok",
      allFiles: "Minden állomány"
    },
    flashing: {
      error: "Hiba a vezérlő frissítése közben",
      success: "Vezérlő sikeresen frissítve!",
      button: "Frissítés",
      buttonSuccess: "Frissítve!"
    },
    defaultFirmware: "Chrysalis {0} alapértelmezett",
    selected: "Kiválasztott vezérlő",
    custom: "Egyedi vezérlő",
    description: `A billentyűzet vezérlő frissítésevel tanítjuk új trükkökre. A Chrysalis olyan új vezérlőt fog telepíteni, mely tartalmazza az eszközöket melyek lehetővé teszik a kiosztás szerkesztését, és még más dolgokat is. Ha korábban már testreszabta a vezérlőt, akkor ez a művelet felül fogja azt írni. A Chrysalis által telepíthető vezérlő forrása mindig megtalálható az alábbi címen:`,
    postUpload: `Amint a frissítés befejeződött, a Chrysalis vissza fogja vinni a billentyűzet választó képernyőre.`,
    tooling: `A billentyűzet vezérlőjének frissítéséhez külső programra ({0}) van szükség. Kérjük tegye a programot elérhetővé a Chrysalis számára, különben nem fog tudni vezérlő frissítést feltölteni.`
  },
  welcome: {
    title: "Üdvözöljük!",
    contents: `A billentyűzetét támogatja ugyan a Chrysalis, de a rajta lévő vezérlőből a jelek szerint hiányzik néhány elengedhetetlen funkcionalitás. Van lehetőség azonban egy ésszerű alapértelmezett, Chrysalis használatát lehetővé tevő funkciókkal ellátott vezérlőre frissíteni. Ehhez látogasson el a "{0}" oldalra.`,
    gotoUpdate: "Irány a {0} oldal",
    reconnect: "Újracsatlakozás",
    reconnectDescription: `Elképzelhető, hogy hibásan ismertük fel a billentyűzet által kínált funkcionalitást, vagy az is, hogy a billentyűzet még nem állt teljesen rendelkezésre mikor csatlakozni próbáltunk. Ebben az esetben az "{0}" gombra kattintva újra megpróbálunk csatlakozni.`
  }
};

export { Hungarian as default };
