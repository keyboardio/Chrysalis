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

import Container from "@mui/material/Container";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import React from "react";
import { useTranslation } from "react-i18next";

const FlashSteps = (props) => {
  const { t } = useTranslation();

  if (props.activeStep < 0) return null;

  const steps = props.steps.map((step) => {
    return t("firmwareUpdate.flashing.steps." + step);
  });

  return (
    <Container>
      <Stepper activeStep={props.activeStep} alternativeLabel>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Container>
  );
};

export default FlashSteps;
