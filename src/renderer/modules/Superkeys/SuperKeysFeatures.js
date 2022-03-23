import React from "react";
import Styled from "styled-components";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import i18n from "../../i18n";

import IconCheckmarkSm from "../../../../static/base/icon-checkmark-green.svg";

const Style = Styled.div`
.card-header:hover {
  cursor: pointer;
}
h5 {
  color: ${({ theme }) => theme.colors.gray400};
  font-size: 14px;
  margin-bottom: 32px;
  text-transform: none;
  letter-spacing: -0.03em;
}
.gridSuperKeys {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 32px;
}
.gridSuperKeysItem {
    padding: 14px 16px;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.styles.collpase.gridItemBackground};
    h6 {
        text-transform: uppercase;
        letter-spacing: 0.04em;
        font-size: 11px;
        color: ${({ theme }) => theme.styles.collpase.gridItemTitle};
        font-weight: 700;
    }
    ul {
        padding-left: 26px;
        list-style: none;
        line-height: 1.35em;
        margin-bottom: 0;
        color:  ${({ theme }) => theme.styles.collpase.gridItemBody};
    }
    li {
        font-size: 11px;
        font-weight: 600;
        position: relative;
        &:before {
            content: '';
            width: 8px;
            height:1px;
            position:absolute;
            left: -24px;
            top: 50%;
            transform: translate3d(0,-50%,0);
            background-color:  ${({ theme }) => theme.styles.collpase.gridItemCaret};
        }
    }
    li.active {
        color: ${({ theme }) => theme.colors.brandSuccess};
        &:before {
            width: 16px;
            height:16px;
            left: -26px;
            background-color: transparent;
            background-image: url(${IconCheckmarkSm}); 
        }
    }
}
`;

const SuperKeysFeatures = () => {
  return (
    <Style>
      <Accordion className="simpleAccordion" defaultActiveKey="0">
        <Card className="simpleAccordionHeader">
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <div className="accordionHeader">
              <div className="accordionTitle">{i18n.editor.superkeys.collapse.title}</div>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div className="cardContent">
                <div className="versionContent">
                  <div className="gridSuperKeys">
                    <div className="gridSuperKeysItem">
                      <h6>Tap</h6>
                      <ul>
                        <li className="active">Keys</li>
                        <li>Modifiers</li>
                        <li className="active">Macros</li>
                        <li className="active">Media & LED</li>
                        <li className="active">Mouse</li>
                        <li className="active">Layer Lock</li>
                        <li>Layer Switch</li>
                        <li>Dual-function</li>
                        <li>OneShot</li>
                        <li>Superkeys</li>
                      </ul>
                    </div>
                    <div className="gridSuperKeysItem">
                      <h6>Hold</h6>
                      <ul>
                        <li className="active">Keys</li>
                        <li className="active">Modifiers</li>
                        <li className="active">Macros</li>
                        <li className="active">Media & LED</li>
                        <li className="active">Mouse</li>
                        <li className="active">Layer Lock</li>
                        <li>Layer Switch</li>
                        <li>Dual-function</li>
                        <li>OneShot</li>
                        <li>Superkeys</li>
                      </ul>
                    </div>
                    <div className="gridSuperKeysItem">
                      <h6>Tap & Hold</h6>
                      <ul>
                        <li className="active">Keys</li>
                        <li className="active">Modifiers</li>
                        <li className="active">Macros</li>
                        <li className="active">Media & LED</li>
                        <li className="active">Mouse</li>
                        <li className="active">Layer Lock</li>
                        <li>Layer Switch</li>
                        <li>Dual-function</li>
                        <li>OneShot</li>
                        <li>Superkeys</li>
                      </ul>
                    </div>
                    <div className="gridSuperKeysItem">
                      <h6>2Tap</h6>
                      <ul>
                        <li className="active">Keys</li>
                        <li>Modifiers</li>
                        <li className="active">Macros</li>
                        <li className="active">Media & LED</li>
                        <li className="active">Mouse</li>
                        <li className="active">Layer Lock</li>
                        <li>Layer Switch</li>
                        <li>Dual-function</li>
                        <li>OneShot</li>
                        <li>Superkeys</li>
                      </ul>
                    </div>
                    <div className="gridSuperKeysItem">
                      <h6>2Tap & Hold</h6>
                      <ul>
                        <li className="active">Keys</li>
                        <li className="active">Modifiers</li>
                        <li className="active">Macros</li>
                        <li className="active">Media & LED</li>
                        <li className="active">Mouse</li>
                        <li className="active">Layer Lock</li>
                        <li>Layer Switch</li>
                        <li>Dual-function</li>
                        <li>OneShot</li>
                        <li>Superkeys</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Style>
  );
};

export default SuperKeysFeatures;
