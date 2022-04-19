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
import Styled from "styled-components";
import Title from "../../component/Title";
import i18n from "../../i18n";
import NeuronTitle from "../NeuronTitle";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { IconPlus } from "../../component/Icon";
import { IconRobot } from "../../component/Icon";
import { IconLayers } from "../../component/Icon";
import { IconThunder } from "../../component/Icon";

const Style = Styled.div`
.cardContentNeuronData {
  border-radius: 6px;
  padding: 24px;
  background: ${({ theme }) => theme.styles.neuronData.neuronInfoBackground};
  box-shadow: ${({ theme }) => theme.styles.neuronData.neuronInfoBoxShadow};
}
.accordionNeuronData {
  margin-top: 24px;
}
.accordion .card {
  border: 1px solid ${({ theme }) => theme.styles.neuronData.accordionBorder};
  background: ${({ theme }) => theme.styles.neuronData.accordionCardBackground};
}
.accordion .card .card-header{
  padding: 16px 24px 16px 16px;
  background-color: transparent;
  color: ${({ theme }) => theme.styles.neuronData.accordionCardHeaderColor};
  border-bottom: 1px solid ${({ theme }) => theme.styles.neuronData.accordionCardHeaderBorderColor};
}
.accordion .card .card-body {
  padding: 1.25rem;
  background: ${({ theme }) => theme.styles.neuronData.accordionCardBodyBackground};
}
.accordion .card .card-body ol,
.accordion .card .card-body ul{
  margin-bottom: 0;
}
.accordion .card + .card {
  margin-top: -1px;
}
.accordionHeader {
  display: flex;
  position: relative;
  .plus {
    position: absolute;
    top: 50%;
    right: -12px;
    opacity: ${({ theme }) => theme.styles.neuronData.plusOpacity};
    transform: translate3d(0, -50%, 0);
  }
}
.accordionIcon + .accordionTitle {
  padding-left: 12px;
}
`;
const NeuronData = ({ neurons, selectedNeuron }) => {
  return (
    <Style>
      <div className="cardContentNeuronData">
        <NeuronTitle neuronName={neurons[selectedNeuron].name} neuronID={neurons[selectedNeuron].id} />
        <Accordion className="accordionNeuronData" defaultActiveKey="0">
          <Card className="neuronDataCard">
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <div className="accordionHeader">
                <div className="accordionIcon">
                  <IconLayers />
                </div>
                <div className="accordionTitle">Layers</div>
                <span className="plus">
                  <IconPlus />
                </span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <ol>
                  {neurons[selectedNeuron].layers.map((layer, id) => (
                    <li key={`${id}-${layer.name}`}>{layer.name}</li>
                  ))}
                </ol>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="neuronDataCard">
            <Accordion.Toggle as={Card.Header} eventKey="2">
              <div className="accordionHeader">
                <div className="accordionIcon">
                  <IconRobot />
                </div>
                <div className="accordionTitle">Macro</div>
                <span className="plus">
                  <IconPlus />
                </span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <ol>
                  {neurons[selectedNeuron].macros.map((macro, id) => (
                    <li key={`${id}-${macro.name}`}>{macro.name}</li>
                  ))}
                </ol>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="neuronDataCard">
            <Accordion.Toggle as={Card.Header} eventKey="3">
              <div className="accordionHeader">
                <div className="accordionIcon">
                  <IconThunder />
                </div>
                <div className="accordionTitle">Superkeys</div>
                <span className="plus">
                  <IconPlus />
                </span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <ol>
                  {neurons[selectedNeuron].superkeys.map((superkey, id) => (
                    <li key={`${id}-${superkey.name}`}>{superkey.name}</li>
                  ))}
                </ol>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </Style>
  );
};

export default NeuronData;
