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
    }
  },
  layoutEditor: {
    defaultLayer: "Alapértelmezett réteg"
  },
  settings: {
    devtools: "Fejlesztői eszközök"
  },
  keyboardSelect: {
    unknown: "Ismeretlen",
    selectPrompt: "Kérem válasszon billentyűzetet:",
    noDevices: "Nincs ismert eszköz csatlakoztatva!",
    connect: "Kapcsolódás",
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
    defaultFirmware: "Alapértelmezett vezérlő",
    updatingTitle: "Vezérlő frissítés",
    selected: "Kiválasztott vezérlő",
    custom: "Egyedi vezérlő",
    description: `A vezérlő frissítés egy biztonságos folyamat, nagyon nehéz téglásítani a billentyűzetet, még akkor is, ha hibás vezérlőt töltünk rá. A legtöbb billentyűzettel megoldható, hogy programozható módban maradjon csatlakozáskor, függetlenül attól, milyen vezérlő van rajta. A vezérlő frissítése azzal jár, hogy a meglévő program felülíródik. Ha testre szabta a programját, kérjük győződjön meg róla, hogy amire frissíteni akar, megfelelő.`,
    postUpload: `Amint a feltöltés befejeződött - sikeresen, vagy sikertelenül -, visszatérünk a kezdeti billentyűzet választó oldalra. Ez az elvárt működés.`
  },
  welcome: {
    title: "Üdvözöljük!",
    contents: `A billentyűzetét támogatja ugyan a Chrysalis, de a rajta lévő vezérlőből a jelek szerint hiányzik néhány elengedhetetlen funkcionalitás. Van lehetőség azonban egy ésszerű alapértelmezett, Chrysalis használatát lehetővé tevő funkciókkal ellátott vezérlőre frissíteni. Ehhez látogasson el a "{0}" oldalra.`,
    gotoUpdate: "Irány a {0} oldal"
  }
};

export { Hungarian as default };
