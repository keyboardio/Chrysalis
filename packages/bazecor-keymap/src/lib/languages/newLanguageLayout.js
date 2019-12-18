/* bazecor-keymap -- Bazecor keymap library
 * Copyright (C) 2019  DygmaLab SE
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Is a JavaScript function that changes language layout
 * @param {Array} baseKeyCodeTable Default language layout (english)
 * @param {string} language Select language
 * @param {newKeyCodeTable} newKeyCodeTable Key codes for new language
 */
function newLanguageLayout(
  baseKeyCodeTable,
  language = "english",
  newKeyCodeTable
) {
  if (language === "english") {
    return baseKeyCodeTable;
  } else {
    return baseKeyCodeTable.map(group => {
      const newArray = group.keys.reduce((acc, key) => {
        const newKey = newKeyCodeTable.find(item => item.code === key.code);
        const isDeleteNewKey =
          newKey &&
          newKey.newGroupName &&
          newKey.newGroupName !== group.groupName;
        if (!isDeleteNewKey) {
          newKey ? acc.push(newKey) : acc.push(key);
        }
        return acc;
      }, []);
      const arrayFromAnotherGroup = newKeyCodeTable.filter(
        keys => keys.newGroupName === group.groupName
      );

      return {
        ...group,
        keys: [...newArray, ...arrayFromAnotherGroup]
      };
    });
  }
}

export default newLanguageLayout;
