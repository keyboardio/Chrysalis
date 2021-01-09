// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
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
import { CustomPicker } from "react-color";

import Avatar from "@material-ui/core/Avatar";
import CropSquareIcon from "@material-ui/icons/CropSquare";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  swatchContainer: {
    display: "flex",
    flexWrap: "wrap"
  },
  colorSwatch: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: theme.spacing(0.75)
  }
});

/*
export const Circle = ({ width, onChange, onSwatchHover, colors, hex, circleSize,
                         styles: passedStyles = {}, circleSpacing, className = '' }) => {
                           const styles = reactCSS(merge({
                             'default': {
                               card: {
                                 width,
                                 display: 'flex',
                                 flexWrap: 'wrap',
                                 marginRight: -circleSpacing,
                                 marginBottom: -circleSpacing,
                               },
                             },
                           }, passedStyles))

                           const handleChange = (hexCode, e) => onChange({ hex: hexCode, source: 'hex' }, e)

                           return (
                             <div style={ styles.card } className={ `circle-picker ${ className }` }>
                               { map(colors, c => (
                                 <CircleSwatch
                                   key={ c }
                                   color={ c }
                                   onClick={ handleChange }
                                   onSwatchHover={ onSwatchHover }
                                   active={ hex === c.toLowerCase() }
                                   circleSize={ circleSize }
                                   circleSpacing={ circleSpacing }
                                   />
                               )) }
                             </div>
                           )
                         }
*/

class SwatchBase extends React.Component {
  render() {
    const { classes, color, active, onClick } = this.props;

    return (
      <Avatar
        className={classes.colorSwatch}
        variant="square"
        style={{
          color: color.rgb,
          background: active ? "transparent" : color.rgb
        }}
        onClick={onClick}
      >
        <CropSquareIcon />
      </Avatar>
    );
  }
}
const Swatch = withStyles(styles, { withTheme: true })(SwatchBase);

class PalettePickerBase extends React.Component {
  render() {
    const { classes, colors, color, onClick } = this.props;

    return (
      <div className={classes.swatchContainer}>
        {colors.map((c, i) => (
          <Swatch
            key={`palette-swatch-${i}`}
            color={colors[i]}
            active={i == color}
            onClick={() => onClick(i)}
          />
        ))}
      </div>
    );
  }
}
const PalettePicker = withStyles(styles, { withTheme: true })(
  PalettePickerBase
);

export default CustomPicker(PalettePicker);
