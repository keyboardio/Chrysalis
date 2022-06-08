// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

const Dutch = {
  language: "Dutch",
  errors: {
    deviceDisconnected: "Verbinding met toetsenbord verbroken",
    saveFile: "Fout tijdens opslaan van bestand: {{ error }}",
  },
  components: {
    layer: "Laag {{index}}",
    layerRaw: "Laag",
    none: "Geen",
    type: "Type",
    save: {
      success: "Opgeslaan!",
      saveChanges: "Aanpassingen Opslaan",
    },
    pickerColorButton: "Verander kleur",
    loading: "Data lezen van toestel...",
    logo: {
      altText: "Chrysalis logo",
    },
  },
  dialog: {
    ok: "Ok",
    cancel: "Annuleer",
    close: "Sluiten",
  },
  app: {
    menu: {
      "focus-not-detected": "Welkom",
      systemInfo: "Probleem melden",
      editor: "Layout & Kleurmap Editor",
      layoutEditor: "Layout Editor",
      colormapEditor: "Kleurmap Editor",
      macroEditor: "Macro Editor",
      firmwareUpdate: "Firmware Update",
      keyboardSettings: "Toetsenbord Instellingen",
      preferences: "Voorkeuren",
      selectAKeyboard: "Selecteer een toetsenbord",
      layoutCard: "Layout Kaart",
      selectAnotherKeyboard: "Selecteer nog een toetsenbord",
      chat: "Discord chat",
      feedback: "Verstuur feedback",
      exit: "Afsluiten",
      keyboardSection: "Toetsenbord",
      chrysalisSection: "Chrysalis",
      miscSection: "Diversen",
      upgradeAvailable: "Een upgrade is beschikbaar!",
    },
    deviceMenu: {
      Homepage: "Homepagina",
      Forum: "Forum",
      Chat: "Chat",
    },
    cancelPending: {
      title: "Niet-opgeslagen veranderingen weggooien?",
      content: `Je hebt niet-opgeslagen veranderingen. Indien je doorgaat zullen ze verloren gaan.`,
    },
    actionRequired: "Actie noodzakelijk",
  },
  editor: {
    keyType: "Toets type",
    keyCode: "Toetsencode",
    legacy: {
      migrate: "Migreren",
      warning: `We hebben oude toetsen gevonden op de keymap die niet langer ondersteund worden. Om te migreren naar nieuwe codes, klik op de Migreren knop.`,
    },
    sharing: {
      title: "Backup & Terugzetten",
      loadFromLibrary: "Laden van Bibliotheek",
      loadFromBackup: "Laden van backups",
      loadFromFile: "Laden van bestand...",
      exportToFile: "Exporteren naar bestand...",
      import: "Importeren",
      selectLoadFile: `Selecteer bestand vanwaar een layout geladen moet worden`,
      selectExportFile: `Selecteer een bestand waarnaar de layout moet geëxporteerd worden`,
      dialog: {
        layoutFiles: "Layout bestanden",
        allFiles: "Alle bestanden",
      },
      errors: {
        unableToLoad: "Onmogelijk om layout te laden uit geselecteerd bestand.",
        parseFail: "Parsen van layout data gefaald.",
        invalidLayoutData: "Bestand bevatte geen geldige layout data.",
        saveFail: "Fout tijdens opslaan van geëxporteerde layout.",
      },
      importConfirm: {
        title: "Importeer de geselecteerde layout?",
        contents: `Dit zal de huidige layout overschrijven, en alle niet-opgeslagen veranderingen zullen verloren gaan. Ben je zeker dat je wil verdergaan?`,
      },
    },
    sidebar: {
      custom: {
        title: "Aangepaste toetsencode",
        help: `Laat je een aangepaste toetsencode toewijzen aan een toets, of een code die op dit moment niet gekend is door Chrysalis.`,
        label: "Aangepaste toetsencode",
      },
      blanks: {
        title: "Blankos",
        help: "Blocked & transparante toetsen.",
      },
      overview: {
        key: "Toets #{{index}}",
        color: "Kleur",
        hideEmptyLayers: "Verberg lege lagen...",
        showEmptyLayers: "Toon lege lagen...",
        sharing: "Backup & Terugzetten",
        help: `Een overzicht van de mappings voor de huidige geselecteerde toets. Om de getoonde laag te veranderen, klik op de overeenkomstige rij.`,
      },
      secondary: {
        title: "Secundaire actie",
        help: `Laat je een secundaire functionaliteit toekennen aan een toets. Wanneer je deze uitgebreide toetsen indrukt en loslaat, krijg je de primaire functie. Wanneer je hen ingedrukt houdt zal de secundaire actie worden uitgevoerd.`,
        whenHeld: "Wanneer ingedrukt gehouden",
        type: {
          none: "Geen secundaire actie",
          layer: "Laag veranderen",
        },
        targetLayer: "Laag",
      },
      colors: {
        title: "Kleuren",
        help: `Ken kleuren toe door te selecteren van het pallet en op een toets te klikken. Om de kleur van een pallet element te veranderen, gebruik de kleurpipet.`,
      },
      consumer: {
        title: "Verbruikers controle",
        help: "Toetsen om volume, helderheid en media te controleren.",
        volume: "Volume",
        media: "Media controle",
        brightness: "Helderheid",
      },
      keypicker: {
        title: "Standard toetsen",
        pickAKey: "Kies een toets",
        help: `Letters, cijfers, symbolen, en modifier - de toetsen die je vindt op een standaard toetsenbord layout.`,
        mods: "Modifiers",
        modsHelp: `Kies modifier toetsen die automatisch ingedrukt worden wanneer je deze toets indrukt.`,
        oneshot: {
          label: "Sticky",
          tooltip: `Kort indrukken om de volgende toetsindruk te activeren, ingedrukt houden om zich te gedragen als een gewone modifier, dubbel indrukken om de modifier te toggelen.`,
        },
      },
      layer: {
        title: "Lagen and keymaps",
        help: "Toetsen die je van laag laten wisselen.",
      },
      leader: {
        title: "Leader",
        help: `Leader toetsen toekennen. Om deze feature te configureren kan je de Arduino IDE gebruiken om het Kaleidoscope 'Sketch' bestand voor je toetsenbord aan te passen.`,
      },
      oneshot: {
        title: "One-shot",
        help: `Klik knop hieronder om een specifieke toets te kiezen om one-shot toetsen te annuleren.`,
      },
      ledcontrol: {
        title: "LED controle",
        help: "Controleer de LED thema's en effecten van je toetsenbord.",
      },
      macros: {
        title: "Macros",
        help: `Ken macros toe aan toetsen. Om macros aan te maken of aan te passen kan je de Arduino IDE gebruiken om het Kaleidoscope 'Sketch' bestand voor je toetsenbord aan te passen.`,
      },
      dynmacros: {
        title: "Dynamische Macros",
        help: `Ken dynamische macros toe aan toetsen en pas ze aan.`,
        usage_overview: {
          label: "Macro ruimte gebruikt:",
          usage: "{{ used }}/{{ size }}",
          bytes: "bytes",
        },
      },
      mousekeys: {
        title: "Muis controle",
        help: `Emuleer een muis met de toetsen van je toetsenbord.`,
        movement: "Beweging",
        buttons: "Knoppen",
        wheel: "Wiel",
        warp: "Warp",
      },
      spacecadet: {
        title: "SpaceCadet",
        help: `SpaceCadet verandert je linker en rechter shift toetsen in je linker en rechter haakjes, wanneer deze ingedrukt worden zonder andere toetsen. Met behulp van de Arduino IDE, kan je nog bijkomend SpaceCadet mappings toevoegen.`,
      },
      steno: {
        title: "Steno",
        help: `Je toetsenbord ondersteunt het GeminiPR protocol voor Stenografische invoer. Deze toetsen gebruiken in plaats van Plover's QWERTY invoer biedt een vlekkelozere Steno ervaring aan.`,
      },
      tapdance: {
        title: "TapDance",
        help: `Tap-dance toetsen zijn general purpose, multi-use toetsen, die een verschillende actie laten gebeuren, gebaseerd op het aantal keer dat je ze ingedrukt hebt.`,
      },
    },
    layerswitch: {
      type: "Type",
      shiftTo: "Verander naar Laag",
      lockTo: "Vastmaken aan Laag",
      moveTo: "Verplaatsen naar Laag",
      oneshot: "Laag verandering voor volgende actie",
      target: "Laag",
      dualuse: "Laag veranderen wanneer ingedrukt gehouden",
    },
    clearLayer: "Laag leegmaken...",
    clearLayerQuestion: "Laag leegmaken?",
    clearLayerPrompt: `Dit zal de laag terugzetten naar zijn standaard toestand.`,
    copyFrom: "Kopieer van laag...",
    pleaseSelectLayer: "Selecteer een laag...",
    dualUse: "Modifier wanneer ingedrukt gehouden, anders een normale toets",
    dualUseLayer: `Laag verandering wanneer ingedrukt gehouden, anders een normale toets`,
    layoutMode: "Pas de toetsenbord layout aan",
    colormapMode: "Pas de kleurmap aan",
    importExport: "Importeer/Exporteer de huidige laag",
    importExportDescription: `De data hieronder kan vrij aangepast worden of gekopieerd naar elders om terug te plakken voor ze geïmporteerd wordt. Dit is de interne representatie van de Chrysalis state, behandel met zorg.`,
    loadDefault: "Laad een default:",
    loadDefaultSuccess: "Default ingeladen!",
    copyToClipboard: "Kopieer naar klipbord",
    copySuccess: "Gekopieerd!",
    pasteFromClipboard: "Plakken van klipbord",
    pasteSuccess: "Geplakt!",
    onlyCustom: {
      warning: `Chrysalis ondersteunt niet langer configuraties die een mix van hardcoded and EEPROM lagen bevat. Als dit een feature is die je nodig hebt, dan horen we graag over jouw use case. In de meeste gevallen raden we echter aan om over te schakelen naar enkel aangepaste lagen, wat Chrysalis voor jou kan doen. Wanneer je de switch maakt zullen hardcoded lagen niet gebruikt worden, en de standaard laag die gezet wordt (als er een gezet wordt) is laag nul.`,
      fixItButton: "Verander naar enkel aangepaste lagen",
      openFR: "Open een feature request",
    },
    macros: {
      title: "Macro #{{ index }}",
      edit: "Macro aanpassen",
      out_of_space: `Dynamische macros nemen te veel ruimte in, maak aub {{ overflow }} bytes vrij.`,
      test: {
        button: "Test",
        placeholder: "Klik 'Test', en de macro zal hier afspelen.",
      },
      steps: {
        time_ms: "{{ value }}ms",
        in_ms: "ms",
        unknown: "<onbekend>",
        INTERVAL: "Vertraging tussen stappen",
        WAIT: "Wacht",
        KEYDOWN: "Hou toets ingedrukt",
        KEYUP: "Laat toets los",
        TAP: "Toets kort indrukken",
        EXPLICIT_REPORT: "Zend geen rapport tussen stappen",
        IMPLICIT_REPORT: "Zend een rapport tussen stappen",
        SEND_REPORT: "Zend nu een rapport",
        unsupported: "Niet ondersteund",
      },
    },
  },
  preferences: {
    interface: "Gebruikersinterface",
    advanced: "Geavanceerd",
    verboseFocus: "Verbose logging",
    devtools: {
      main: {
        label: "Ontwikkelaars tools",
        description: `Deze voorkeuren helpen voornamelijk ontwikkelaars. Het kan zijn dat je gevraagd wordt om deze aan te zetten om meer informatie te kunnen verzamelen over een fout.`,
      },
      verboseLogging: {
        label: "Verbose logging aanzetten",
        help: "Zet een goede hoeveelheid extra logging aan, handig tijdens het debuggen.",
      },
      console: {
        label: "Open de ontwikkelaarsconsole",
        help: "De ontwikkelaarsconsole laat je kijken binnenin Chrysalis. Pas op met het gebruik hiervan.",
      },
    },
    ui: {
      layoutEditor: {
        label: "Layout Editor aanpassen",
      },
      layoutCards: {
        label: "Layout Kaarten aanpassen",
      },
      hideUnavailableFeatures: {
        label: `Verberg features die niet worden ondersteund door de huidige firmware van je toetsenbord`,
        help: `Wanneer aangezet zal Chrysalis configuratieopties verbergen van features die niet ondersteund worden door de huidige firmware van je toetsenbord.`,
      },
      lookNFeel: {
        label: "Pas uitzicht aan",
      },
      theme: {
        label: "Algemeen uitzicht",
        system: "Systeem default",
        dark: "Donker",
        light: "Licht",
      },
      language: {
        label: "Taal",
        help: "Kies de taal die door Chrysalis gebruikt moet worden",
      },
      coloredLayoutCards: {
        label: "Laat kleuren toe op de layout kaarten",
        help: `Wanneer aangezet zullen de layout kaarten niet alleen toetsenlabels tonen maar, indien beschikbaar, ook kleuren.`,
      },
      host: {
        label: "Toetsenbord layout",
        help: "Selecteer de toetsenbord layout die je gebruikt op je computer",
      },
    },
    keyboard: {
      title: "Mijn toetsenbord",
      advanced: {
        label: "Geavanceerde Tools & Voorkeuren",
        description: `Dit zijn gevaarlijke tools, zorg ervoor dat je weet wat ze doen voordat je ze gebruikt.`,
      },
      layers: {
        label: "Laag voorkeuren",
      },
      defaultLayer: {
        label: "Default laag",
        noDefault: "Geen default",
        help: `De default laag waarmee het toetsenbord zal opstarten.`,
      },
      factoryReset: {
        button: "Reset EEPROM naar fabrieksinstellingen",
        dialog: {
          title: "Reset EEPROM naar fabrieksinstellingen",
          contents: `Dit zal de EEPROM resetten naar de fabrieksinstellingen. Je zal al je aanpassingen verliezen.`,
        },
      },
      flash: {
        preferExternal: {
          label: "Gebruik een extern programma om te flashen",
        },
      },
      led: {
        label: "LED voorkeuren",
        idle: {
          label: "Inactieve tijd voordat LEDs afgezet worden",
          help: `Tenzij dit uitgezet is, zullen de LEDs uitgaan na een ingestelde tijd.`,
          disabled: "Uit",
          oneMinute: "1 minuut",
          twoMinutes: "2 minuten",
          threeMinutes: "3 minuten",
          fourMinutes: "4 minuten",
          fiveMinutes: "5 minuten",
          tenMinutes: "10 minuten",
          fifteenMinutes: "15 minuten",
          twentyMinutes: "20 minuten",
          thirtyMinutes: "30 minuten",
          sixtyMinutes: "60 minuten",
        },
        brightness: {
          label: "LED Helderheid",
          help: "Pas de helderheid van de LEDs op het toetsenbord aan.",
        },
        default: {
          autoSave: {
            label: "Zet het automatisch opslaan van de default LED mode aan",
            help: `Wanneer dit is aangezet, wordt de LED mode automatisch als default opgeslaan elke keer ze wordt aangepast.`,
          },
          label: "Default LED mode",
          help: "Selecteer de LED mode waarmee het toetsenbord moet opstarten.",
        },
      },
      plugins: {
        label: "Plugin voorkeuren",
        escOneShot: {
          label: `Laat Escape one-shot toetsen annuleren`,
          help: `Wanneer dit is aangezet zal de "Escape" toets one-shot toetsen annuleren, anders kan een specifiek ingestelde "annuleer" toets dit doen.`,
        },
      },
    },
  },
  keyboardSelect: {
    unknown: "Onbekend",
    selectPrompt: "Selecteer een toetsenbord:",
    noDevices: `Geen toetsenborden gevonden.`,
    connect: "Verbinding maken",
    disconnect: "Verbinding verbreken",
    scan: "Zoeken",
    installUdevRules: "Installeer udev regels",
    permissionError: `Je computer laat Chrysalis niet spreken met je toetsenbord. (Je hebt geen lees/schrijf rechten naar {{path}}.)`,
    permissionErrorSuggestion: `Chrysalis kan dit oplossen door een bestand met udev regels te installeren in /etc/udev/rules.d/`,
  },
  firmwareUpdate: {
    calloutTitle: "Belangrijk!",
    dialog: {
      selectFirmware: "Selecteer een firmware",
      firmwareFiles: "Firmware bestanden",
      allFiles: "Alle bestanden",
    },
    options: {
      onFlash: "Zet terug naar fabrieksinstellengen wanneer geflasht wordt",
      title: "Firmware update opties",
    },
    flashing: {
      error: "Fout bij het flashen van de firmware",
      releasePROG: `Bootloader gedetecteerd. Als je een toets ingedrukt houdt, laat hem dan los.`,
      troubleshooting: "Probleemoplossing",
      success: "Firmware successvol geflasht!",
      button: "Update",
      buttonSuccess: "Updated!",
      steps: {
        factoryRestore: "Terugzetten naar fabrieksinstellingen",
        bootloaderTrigger: "Bootloader triggeren",
        bootloaderWait: "Wachten op bootloader",
        saveEEPROM: "EEPROM inhoud opslaan",
        restoreEEPROM: "EEPROM inhoud terugzetten",
        reconnect: "Opnieuw verbinden",
        flash: "Flashen",
        reboot: "Opnieuw opstarten",
      },
    },
    confirmDialog: {
      title: "Firmware vervangen en terugzetten naar fabrieksinstellingen?",
      contents: `Dit zal de firmware op het toestel vervangen en alle instelling terugzetten naar de fabrieksinstellingen. Je zal alle gemaakte aanpassingen verliezen.`,
    },
    defaultFirmware: "Chrysalis {{version}} default",
    defaultFirmwareDescription: "Minimaal, zonder toeters en bellen",
    experimentalFirmware: "Chrysalis {{version}} experimenteel",
    experimentalFirmwareDescription: "Experimenteel, met meer plugins aangezet",
    selected: "Geselecteerde firmware",
    custom: "Custom firmware",
    description: `Updaten of "flashen" van de firmware van je toetsenbord is hoe we het nieuwe kunstjes leren. Chrysalis zal een nieuwe versie van de firmware van je toestenbord installeren. Dit zorgt voor ondersteuning van een aangepaste toetsen layout, naast andere features. Indien je hiervoor al de firmware van je toetsenbord hebt aangepast, zal dit de aangepaste firmware overschrijven. Je kan de broncode van de firmware die Chrysalis aan het installeren is hier vinden:`,
    postUpload: `Wanneer de upload gedaan is, zal Chrysalis je terugbrengen naar het selectiescherm voor je toetsenbord.`,
  },
  "focus-not-detected": {
    title: "Welkom bij Chrysalis",
    contents: `Chrysalis herkent je toetsenbord maar moet de firmware updaten voordat je verder kan doen.`,
    gotoUpdate: "Update Firmware",
    reconnect: "Opnieuw verbinden",
    reconnectDescription: `Er is een kans dat we de mogelijkheden van je toetsenbord fout gedetecteerd hebben, of dat je toetsenbord nog aan het opstarten was terwijl we verbinding gemaakt hebben. In dat geval kan je proberen om te klikken op de "{{buttonName}}" knop om opnieuw te proberen verbinden en nogmaals te zoeken naar de nodige features. Opnieuw verbinden is normaal enkel nuttig als je zeker bent dat er een tijdelijk probleem was tijdens vorige pogingen dat in de tussentijd is opgelost.`,
  },
  systeminfo: {
    title: "Rapporteer een probleem",
    intro: `Als je een probleem hebt met Chrysalis kan het ontwikkelteam je vragen om hen wat debug informatie door te sturen. Chrysalis kan je helpen om alles dat je eventueel moet delen te verzamelen en in te pakken. Dit omvat error logs en informatie over het besturingssysteem, verbonden toestellen en Chrysalis zelf. Toetsenbord informatie omvat info over de huidige firmware, de toets layouts en de LED configuratie van je toetsenbord.`,
    bugTracker: `Je kan een lijst van gekende problemen vinden op GitHub (of een bug rapporteren)`,
    privacyNote: `We doen ons best om geen gevoelige informatie te includeren in deze bundel, maar we raden je aan om erdoor te lezen alvorens hem te delen.`,
    createBundle: "Maak bundel aan",
    viewBundle: "Bekijk bundel",
    saveBundle: "Bundel opslaan",
    dialog: {
      title: "Chrysalis Debug Bundel opslaan",
      bundleFiles: "Debug bundel bestanden",
    },
    bundleSaved: `Chrysalis debug bundel opgeslaan.`,
  },
  devices: {
    Dygma: {
      Raise: {
        updateInstructions: `Om de firmware te updaten heeft je toestenbord nood aan een speciale reset. Wanneer je het licht op de Neuron ziet uitgaan, blijf dan de Escape toets ingedrukt houden. Het licht van de Neuron zou een blauw pulserend patroon moeten opstarten.`,
      },
    },
    "SOFT/HRUF": {
      Splitography: {
        updateInstructions: `Na het klikken op de Update knop moet je je toetsenbord herstarten binnen de 10 seconden om het in programmeerbare modus te zetten. Dit kan door de kleine reset knop naast de USB poort kort in te drukken.`,
      },
    },
    Keyboardio: {
      Atreus: {
        updateInstructions: `Hou de toets in linker onderhoek van het toetsenbord ingedrukt (in de standaard layout is dit de ESC toets). Blijf de toets ingedrukt houden terwijl je op de Update knop klikt.`,
      },
      Model01: {
        updateInstructions: `Hou de toets in linker bovenhoek van het toetsenbord ingedrukt (in de standaard layout is dit de PROG toets). Blijf de toets ingedrukt houden terwijl je op de Update knop klikt. Eens de toetsen rood beginnen te knipperen over het hele bord mag je de toets loslaten.`,
      },
      Model100: {
        updateInstructions: `Hou de toets in linker bovenhoek van het toetsenbord ingedrukt (in de standaard layout is dit de PROG toets). Blijf de toets ingedrukt houden terwijl je op de Update knop klikt. Eens de toetsen van de eerste kolom groen beginnen te knipperen moet je de toets loslaten aangezien het flashen kan falen indien je de toets te lang ingedrukt houdt.`,
      },
    },
    PJRC: {
      Teensy: {
        updateInstructions: `Aangezien dit een Teensy-powered toestel is dat reeds in programmeerbare mode staat, heeft Chrysalis geen manier om te detecteren welk type toetsenbord het is. Selecteer a.u.b. een aangepaste firmware die gemaakt is voor je toetsenbord en ga verder.`,
      },
    },
  },
};

export { Dutch as default };
