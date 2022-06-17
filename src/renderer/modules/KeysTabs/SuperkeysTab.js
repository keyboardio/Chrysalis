import React, { Component } from "react";
import ReactDOM from "react-dom";
import Styled from "styled-components";

import i18n from "../../i18n";

import Title from "../../component/Title";
import Callout from "../../component/Callout";
import Dropdown from "react-bootstrap/Dropdown";

import ListModifiers from "../../component/ListModifiers/ListModifiers";

import Keymap, { KeymapDB } from "../../../api/keymap";

const Styles = Styled.div`
display: flex;
flex-wrap: wrap;
height: inherit;
h4 {
    font-size: 16px;
    flex: 0 0 100%;
    width: 100%;
    margin-top: 24px;
}
.callOut {
    width: 100%;
    flex: 0 0 100%;
}
.w100 {
    width: 100%;
    flex: 0 0 100%;
}
.description {
    font-size: 14px;
    color: ${({ theme }) => theme.styles.macro.descriptionColor};
    flex: 0 0 100%;
    width: 100%;
}
.superKeyGroup {
    display: grid;
    grid-template-columns: minmax(220px, 290px) 1fr;
    grid-gap: 24px;
}
.superkeyHint {
    border-radius: 6px;
    margin-top: -12px;
    padding: 16px;
    max-width: 762px;
    background-color: ${({ theme }) => theme.styles.standardView.superkeys.info.background};
    position: relative;
}
.superkeyHint:after {
  content: "";
  position: absolute;
  top: 28px;
  left: -12px;
  background-color: ${({ theme }) => theme.styles.standardView.superkeys.info.background};
  width: 24px;
  height: 24px;
  border-radius: 3px;
  transform: rotate(45deg);
}
.superkeyHint h3 {
  font-size: 16px;
  margin-top: 10px;
}
.superkeyItem {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-radius: 3px;
  padding: 12px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.styles.standardView.superkeys.item.background};
}

.superkeyItem + .superkeyItem  {
  margin-top: 1px;
}
.superkeyTitle {
  flex: 0 0 calc(100% - 180px);
  padding-right: 24px;
}
.superkeyTitle h5.actionTitle {
  font-size: 11px; 
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin: 4px 0 1px 0;
  color: ${({ theme }) => theme.styles.standardView.superkeys.item.titleColor};
}
.superkeyTitle p {
  font-size: 13px; 
  font-weight: 401;
  margin: 0;
  line-height: 1.2em;
  color: ${({ theme }) => theme.styles.standardView.superkeys.item.descriptionColor};
}
.superKey {
  position: relative;
  align-self: center;
  padding: 8px 0;
  flex: 0 0 180px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.styles.standardView.superkeys.key.border};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.styles.standardView.superkeys.key.background};
}
.superKey > div{
  position: absolute;
  bottom: -12px;
  left: 12px;
}

`;

class SuperkeysTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyContent: "Loading..."
    };
    this.keymapDB = new KeymapDB();
  }

  translateSuperKeyAction = superkeysSelected => {
    if (superkeysSelected === undefined) {
      return null;
    }
    let aux = this.keymapDB.parse(superkeysSelected);
    let translatedAction = "";
    console.log("Try to translate superkey actions inside SuperKeiItem: ", aux);

    if (aux.extraLabel == "MACRO") {
      if (this.props.macros.length > parseInt(aux.label) && this.props.macros[parseInt(aux.label)].name.substr(0, 5) != "") {
        translatedAction = aux.label = this.props.macros[parseInt(aux.label)].name.substr(0, 5).toLowerCase();
      }
    }
    if (aux.label) {
      translatedAction = (aux.extraLabel != undefined ? aux.extraLabel + " " : "") + aux.label;
    }
    return translatedAction;
  };

  render() {
    const { keyCode, isStandardView, actions, onKeySelect, superkeys, macros } = this.props;
    const KC = keyCode;

    const superk = Array(superkeys.length)
      .fill()
      .map((_, i) => i + 53916);

    let adjactions = actions;
    if (adjactions.length < 5) {
      while (adjactions.length < 5) {
        adjactions.push(0);
      }
    }

    const superKeysActions = [
      {
        title: i18n.editor.superkeys.actions.tapLabel,
        description: i18n.editor.superkeys.actions.tap
      },
      {
        title: i18n.editor.superkeys.actions.holdLabel,
        description: i18n.editor.superkeys.actions.hold
      },
      {
        title: i18n.editor.superkeys.actions.tapAndHoldLabel,
        description: i18n.editor.superkeys.actions.tapAndHold
      },
      {
        title: i18n.editor.superkeys.actions.doubleTapLabel,
        description: i18n.editor.superkeys.actions.doubleTap
      },
      {
        title: i18n.editor.superkeys.actions.doubleTapAndHoldLabel,
        description: i18n.editor.superkeys.actions.doubleTapAndHold
      }
    ];

    return (
      <Styles className={`${isStandardView ? "standardViewTab" : ""} tabsSuperkeys`}>
        <div className="tabContentWrapper">
          <Title text={i18n.editor.standardView.superkeys.title} headingLevel={3} />
          <Callout content={i18n.editor.standardView.superkeys.callOut} />

          <Title text={i18n.editor.standardView.superkeys.label} headingLevel={4} />
          <div className="superKeyGroup">
            <div className="superKeySelect">
              <Dropdown
                value={superkeys[superk.indexOf(KC)] != undefined ? superk[superk.indexOf(KC)] : ""}
                onSelect={value => {
                  onKeySelect(parseInt(value));
                }}
                className={`custom-dropdown ${superkeys[superk.indexOf(KC)] != undefined ? "active" : ""}`}
              >
                <Dropdown.Toggle id="dropdown-custom">
                  <div className="dropdownItemSelected">
                    <div className="dropdownItem">
                      {superkeys[superk.indexOf(KC)] != undefined
                        ? `${superk.indexOf(KC) + 1}. ${superkeys[superk.indexOf(KC)].name}`
                        : "Select superkey"}
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {superk.map((x, id) => {
                    return (
                      <Dropdown.Item eventKey={x} key={`super-${id}`} disabled={x == -1}>
                        <div className="dropdownInner">
                          <div className="dropdownItem">{`${id + 1}. ${superkeys[id].name}`}</div>
                        </div>
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className={`superKeyInfo ${superkeys[superk.indexOf(KC)] != undefined ? "animRight" : "animHide"}`}>
              {superkeys[superk.indexOf(KC)] != undefined ? (
                <div className="superkeyHint">
                  <Title text={superkeys[superk.indexOf(KC)].name} headingLevel={3} />
                  {superKeysActions.map((item, index) => (
                    <div className="superkeyItem" key={`superHint-${index}`}>
                      <div className="superkeyTitle">
                        <h5 className="actionTitle">{item.title}</h5>
                        <p>{item.description}</p>
                      </div>
                      <div className="superKey">
                        {this.translateSuperKeyAction(superkeys[superk.indexOf(KC)].actions[index])}
                        <ListModifiers keyCode={superkeys[superk.indexOf(KC)].actions[index]} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}

export default SuperkeysTab;
