// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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
import * as ReactDOM from "react-dom";

// For some reason, the regular Portal component doesn't clear out previous data
// this hack based on https://stackoverflow.com/questions/53895291/createportal-does-not-overwrite-div-contents-like-reactdom-render
// works around that issue.
// It does not make me happy
const Portal = ({ Component, container }) => {
  const [innerHtmlEmptied, setInnerHtmlEmptied] = React.useState(false);
  React.useEffect(() => {
    if (!innerHtmlEmptied) {
      container.innerHTML = "";
      setInnerHtmlEmptied(true);
    }
  }, [innerHtmlEmptied]);
  if (!innerHtmlEmptied) return null;
  return ReactDOM.createPortal(Component, container);
};

export function PageTitle({ title }) {
  const container = document.querySelector("#page-title");
  if (!container) return null;
  const component = <>{title}</>;
  return <Portal Component={component} container={container} />;
}
