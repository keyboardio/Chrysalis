/* chrysalis-keymap -- Chrysalis keymap library
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

import { withModifiers } from "./utils";

import LetterTable from "./letters";
import DigitTable from "./digits";
import PunctuationTable from "./punctuation";
import SpacingTable from "./spacing";
import NavigationTable from "./navigation";
import FunctionKeyTable from "./fxs";
import NumpadTable from "./numpad";

const DualUseModifierTables = [
  withModifiers(LetterTable, "Control /", "CTRL/", 49169),
  withModifiers(DigitTable, "Control /", "CTRL/", 49169),
  withModifiers(PunctuationTable, "Control /", "CTRL/", 49169),
  withModifiers(SpacingTable, "Control /", "CTRL/", 49169),
  withModifiers(NavigationTable, "Control /", "CTRL/", 49169),
  withModifiers(FunctionKeyTable, "Control /", "CTRL/", 49169),
  withModifiers(NumpadTable, "Control /", "CTRL/", 49169),

  withModifiers(LetterTable, "Shift /", "SHIFT/", 49425),
  withModifiers(DigitTable, "Shift /", "SHIFT/", 49425),
  withModifiers(PunctuationTable, "Shift /", "SHIFT/", 49425),
  withModifiers(SpacingTable, "Shift /", "SHIFT/", 49425),
  withModifiers(NavigationTable, "Shift /", "SHIFT/", 49425),
  withModifiers(FunctionKeyTable, "Shift /", "SHIFT/", 49425),
  withModifiers(NumpadTable, "Shift /", "SHIFT/", 49425),

  withModifiers(LetterTable, "Alt /", "ALT/", 49681),
  withModifiers(DigitTable, "Alt /", "ALT/", 49681),
  withModifiers(PunctuationTable, "Alt /", "ALT/", 49681),
  withModifiers(SpacingTable, "Alt /", "ALT/", 49681),
  withModifiers(NavigationTable, "Alt /", "ALT/", 49681),
  withModifiers(FunctionKeyTable, "Alt /", "ALT/", 49681),
  withModifiers(NumpadTable, "Alt /", "ALT/", 49681),

  withModifiers(LetterTable, "Gui /", "GUI/", 49937),
  withModifiers(DigitTable, "Gui /", "GUI/", 49937),
  withModifiers(PunctuationTable, "Gui /", "GUI/", 49937),
  withModifiers(SpacingTable, "Gui /", "GUI/", 49937),
  withModifiers(NavigationTable, "Gui /", "GUI/", 49937),
  withModifiers(FunctionKeyTable, "Gui /", "GUI/", 49937),
  withModifiers(NumpadTable, "Gui /", "GUI/", 49937),

  withModifiers(LetterTable, "AltGr /", "ALTGR/", 50705),
  withModifiers(DigitTable, "AltGr /", "ALTGR/", 50705),
  withModifiers(PunctuationTable, "AltGr /", "ALTGR/", 50705),
  withModifiers(SpacingTable, "AltGr /", "ALTGR/", 50705),
  withModifiers(NavigationTable, "AltGr /", "ALTGR/", 50705),
  withModifiers(FunctionKeyTable, "AltGr /", "ALTGR/", 50705),
  withModifiers(NumpadTable, "AltGr /", "ALTGR/", 50705)
];

const DualUseLayerTables = [
  withModifiers(LetterTable, "Layer #0 /", "L#0/", 51218),
  withModifiers(DigitTable, "Layer #0 /", "L#0/", 51218),
  withModifiers(PunctuationTable, "Layer #0 /", "L#0/", 51218),
  withModifiers(SpacingTable, "Layer #0 /", "L#0/", 51218),
  withModifiers(NavigationTable, "Layer #0 /", "L#0/", 51218),
  withModifiers(FunctionKeyTable, "Layer #0 /", "L#0/", 51218),
  withModifiers(NumpadTable, "Layer #0 /", "L#0/", 51218),

  withModifiers(LetterTable, "Layer #1 /", "L#1/", 51474),
  withModifiers(DigitTable, "Layer #1 /", "L#1/", 51474),
  withModifiers(PunctuationTable, "Layer #1 /", "L#1/", 51474),
  withModifiers(SpacingTable, "Layer #1 /", "L#1/", 51474),
  withModifiers(NavigationTable, "Layer #1 /", "L#1/", 51474),
  withModifiers(FunctionKeyTable, "Layer #1 /", "L#1/", 51474),
  withModifiers(NumpadTable, "Layer #1 /", "L#1/", 51474),

  withModifiers(LetterTable, "Layer #2 /", "L#2/", 51730),
  withModifiers(DigitTable, "Layer #2 /", "L#2/", 51730),
  withModifiers(PunctuationTable, "Layer #2 /", "L#2/", 51730),
  withModifiers(SpacingTable, "Layer #2 /", "L#2/", 51730),
  withModifiers(NavigationTable, "Layer #2 /", "L#2/", 51730),
  withModifiers(FunctionKeyTable, "Layer #2 /", "L#2/", 51730),
  withModifiers(NumpadTable, "Layer #2 /", "L#2/", 51730),

  withModifiers(LetterTable, "Layer #3 /", "L#3/", 51986),
  withModifiers(DigitTable, "Layer #3 /", "L#3/", 51986),
  withModifiers(PunctuationTable, "Layer #3 /", "L#3/", 51986),
  withModifiers(SpacingTable, "Layer #3 /", "L#3/", 51986),
  withModifiers(NavigationTable, "Layer #3 /", "L#3/", 51986),
  withModifiers(FunctionKeyTable, "Layer #3 /", "L#3/", 51986),
  withModifiers(NumpadTable, "Layer #3 /", "L#3/", 51986),

  withModifiers(LetterTable, "Layer #4 /", "L#4/", 52242),
  withModifiers(DigitTable, "Layer #4 /", "L#4/", 52242),
  withModifiers(PunctuationTable, "Layer #4 /", "L#4/", 52242),
  withModifiers(SpacingTable, "Layer #4 /", "L#4/", 52242),
  withModifiers(NavigationTable, "Layer #4 /", "L#4/", 52242),
  withModifiers(FunctionKeyTable, "Layer #4 /", "L#4/", 52242),
  withModifiers(NumpadTable, "Layer #4 /", "L#4/", 52242),

  withModifiers(LetterTable, "Layer #5 /", "L#5/", 52498),
  withModifiers(DigitTable, "Layer #5 /", "L#5/", 52498),
  withModifiers(PunctuationTable, "Layer #5 /", "L#5/", 52498),
  withModifiers(SpacingTable, "Layer #5 /", "L#5/", 52498),
  withModifiers(NavigationTable, "Layer #5 /", "L#5/", 52498),
  withModifiers(FunctionKeyTable, "Layer #5 /", "L#5/", 52498),
  withModifiers(NumpadTable, "Layer #5 /", "L#5/", 52498),

  withModifiers(LetterTable, "Layer #6 /", "L#6/", 52754),
  withModifiers(DigitTable, "Layer #6 /", "L#6/", 52754),
  withModifiers(PunctuationTable, "Layer #6 /", "L#6/", 52754),
  withModifiers(SpacingTable, "Layer #6 /", "L#6/", 52754),
  withModifiers(NavigationTable, "Layer #6 /", "L#6/", 52754),
  withModifiers(FunctionKeyTable, "Layer #6 /", "L#6/", 52754),
  withModifiers(NumpadTable, "Layer #6 /", "L#6/", 52754),

  withModifiers(LetterTable, "Layer #7 /", "L#7/", 53010),
  withModifiers(DigitTable, "Layer #7 /", "L#7/", 53010),
  withModifiers(PunctuationTable, "Layer #7 /", "L#7/", 53010),
  withModifiers(SpacingTable, "Layer #7 /", "L#7/", 53010),
  withModifiers(NavigationTable, "Layer #7 /", "L#7/", 53010),
  withModifiers(FunctionKeyTable, "Layer #7 /", "L#7/", 53010),
  withModifiers(NumpadTable, "Layer #7 /", "L#7/", 53010)
];

export { DualUseModifierTables, DualUseLayerTables };
