// -*- mode: js-jsx -*-
/* Bazecor
 * Copyright (C) 2022  Dygmalab, Inc.
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

import React from "react";

// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Tooltip from "react-bootstrap/Tooltip";

const ListModifiersKey = ({ altApplied, altGrApplied, osApplied, shiftApplied, ctrlApplied, mehApplied, hyperApplied }) => {
  return (
    <div xmlns="http://www.w3.org/1999/xhtml" className={`keyContentModifiers`}>
      <ul
        className={`labelModifier ${
          (altApplied && altGrApplied && osApplied && shiftApplied) || (ctrlApplied && altGrApplied && osApplied && shiftApplied)
            ? "extraBottom"
            : ""
        }`}
      >
        {mehApplied ? <li className="badge-modifier meh">Meh</li> : ""}
        {hyperApplied ? <li className="badge-modifier hyper">Hyper</li> : ""}
        {altApplied ? <li className="badge-modifier alt">a</li> : ""}
        {altGrApplied ? <li className="badge-modifier altGr">ag</li> : ""}
        {ctrlApplied ? <li className="badge-modifier ctrl">c</li> : ""}
        {shiftApplied ? <li className="badge-modifier shift">s</li> : ""}
        {osApplied ? <li className="badge-modifier os">os</li> : ""}
      </ul>
    </div>
  );
};

export default ListModifiersKey;
