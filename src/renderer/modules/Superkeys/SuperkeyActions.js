import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

// Components
import { SuperkeyPicker } from "../../component/Button";

// Icons
import { IconKeysPress, IconKeysTapHold, IconKeysHold, IconKeys2Tap, IconKeys2TapHold } from "../../component/Icon";

// API's
import i18n from "../../i18n";

const Style = Styled.div` 
.keyWrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 4px;
    margin-top: 32px;
}
`;

const SuperkeyActions = ({
  isStandardViewSuperkeys,
  superkeys,
  selected,
  selectedAction,
  changeSelected,
  updateSuper,
  macros,
  updateAction,
  changeAction,
  keymapDB
}) => {
  const rows = [
    {
      icon: <IconKeysPress />,
      title: i18n.editor.superkeys.actions.tapLabel,
      description: i18n.editor.superkeys.actions.tap
    },
    {
      icon: <IconKeysHold />,
      title: i18n.editor.superkeys.actions.holdLabel,
      description: i18n.editor.superkeys.actions.hold
    },
    {
      icon: <IconKeysTapHold />,
      title: i18n.editor.superkeys.actions.tapAndHoldLabel,
      description: i18n.editor.superkeys.actions.tapAndHold
    },
    {
      icon: <IconKeys2Tap />,
      title: i18n.editor.superkeys.actions.doubleTapLabel,
      description: i18n.editor.superkeys.actions.doubleTap
    },
    {
      icon: <IconKeys2TapHold />,
      title: i18n.editor.superkeys.actions.doubleTapAndHoldLabel,
      description: i18n.editor.superkeys.actions.doubleTapAndHold
    }
  ];

  return (
    <Style>
      <div className="keyWrapper">
        {superkeys != undefined && superkeys.length > 0
          ? rows.map((item, index) => (
              <SuperkeyPicker
                index={index}
                selected={selected}
                selectedAction={selectedAction}
                superkeys={superkeys}
                icon={item.icon}
                key={`skA-${index}`}
                title={item.title}
                description={item.description}
                elementActive={selectedAction == index ? true : false}
                isStandardViewSuperkeys={isStandardViewSuperkeys}
                changeSelected={changeSelected}
                onClick={changeAction}
                updateSuper={updateSuper}
                macros={macros}
                keymapDB={keymapDB}
                updateAction={updateAction}
              />
            ))
          : ""}
      </div>
    </Style>
  );
};

SuperkeyActions.propTypes = {
  isStandardViewSuperkeys: PropTypes.bool.isRequired
};

export default SuperkeyActions;
