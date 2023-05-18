import React, { Component } from "react";
import KeyMacro from "./KeyMacro";
import { PreviewMacroModal } from "../../component/Modal";

import Styled from "styled-components";

import { MdUnfoldLess, MdKeyboardArrowUp, MdKeyboardArrowDown, MdTimer } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { IconStopWatchXs } from "../../component/Icon";

const Styles = Styled.div`
.root {
  display: flex;
  flexWrap: wrap;
}
.margin {
  margin: 1rem;
}
.padding {
  padding-top: 0.2rem;
  padding-bottom: 1rem;
}
.textField {
  flex-basis: 444px;
  margin: 0px;
  margin-right: 2rem;
},
.code {
  width: -webkit-fill-available;
}
.button {
  float: right;
}
.buttonAdd {
  marginLeft: 25%;
}
.list {
  max-height: 429px;
  min-height: 429px;
  overflow: auto;
}
.list::-webkit-scrollbar {
  display: none;
}
.border {
  border: solid 1px #bbbbbb;
  border-radius: 4px;
}
.flex {
  display: flex;
  position: relative;
  place-content: space-between;
  margin: 1rem;
}

&.trackingWrapper {
    position: relative;
    z-index: 1;
    
    background-color: ${({ theme }) => theme.styles.macro.trackingBackground};
    overflow-x: hidden;
    position: relative;
    > div {
      width: inherit;
      overflow-x: auto; 
      padding-left: 32px;
    }
}
.timelinetracking {
    display: flex; 
    flex-wrap: nowrap;
    flex-direction: row;
    width: fit-content;
    padding-right: 62px;
}
`;

class TimelineEditorMacroTable extends Component {
  constructor(props) {
    super(props);

    this.horizontalWheel = React.createRef();

    this.state = {
      addText: "",
      rows: [],
      macro: props.macro
    };
    this.keymapDB = props.keymapDB;
    this.modifiers = [
      { name: "LEFT SHIFT", keyCode: 225, color: "#e1f3f7" },
      { name: "RIGHT SHIFT", keyCode: 229, color: "#e1f3f7" },
      { name: "LEFT CTRL", keyCode: 224, color: "#f5e4e4" },
      { name: "RIGHT CTRL", keyCode: 228, color: "#f5e4e4" },
      { name: "LEFT ALT", keyCode: 226, color: "#faf8e1" },
      { name: "RIGHT ALT", keyCode: 230, color: "#f2e7f5" },
      { name: "LEFT OS", keyCode: 227, color: "#e6f0e4" },
      { name: "RIGHT OS", keyCode: 231, color: "#e6f0e4" }
    ];
    this.actionTypes = [
      {
        enum: "MACRO_ACTION_END",
        name: "End macro",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_INTERVAL",
        name: "Delay",
        icon: <MdTimer fontSize="large" />,
        smallIcon: <MdTimer />
      },
      {
        enum: "MACRO_ACTION_STEP_WAIT",
        name: "Delay",
        icon: <MdTimer fontSize="large" />,
        smallIcon: <MdTimer />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYDOWN",
        name: "Function Key Press",
        icon: <MdKeyboardArrowDown fontSize="large" />,
        smallIcon: <MdKeyboardArrowDown />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYUP",
        name: "Function Key Release",
        icon: <MdKeyboardArrowUp fontSize="large" />,
        smallIcon: <MdKeyboardArrowUp />
      },
      {
        enum: "MACRO_ACTION_STEP_TAP",
        name: "Fn. Press & Release",
        icon: <MdUnfoldLess fontSize="large" />,
        smallIcon: <MdUnfoldLess />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYCODEDOWN",
        name: "Key Press",
        icon: <MdKeyboardArrowDown fontSize="large" />,
        smallIcon: <MdKeyboardArrowDown />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYCODEUP",
        name: "Key Release",
        icon: <MdKeyboardArrowUp fontSize="large" />,
        smallIcon: <MdKeyboardArrowUp />
      },
      {
        enum: "MACRO_ACTION_STEP_TAPCODE",
        name: "Key Press & Rel.",
        icon: <MdUnfoldLess fontSize="large" />,
        smallIcon: <MdUnfoldLess />
      },
      {
        enum: "MACRO_ACTION_STEP_EXPLICIT_REPORT",
        name: "Explicit Report",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_IMPLICIT_REPORT",
        name: "Implicit Report",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      { enum: "MACRO_ACTION_STEP_SEND_REPORT", id: 11, name: "Send Report" },
      {
        enum: "MACRO_ACTION_STEP_TAP_SEQUENCE",
        name: "Intervaled Special Keys",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_TAP_CODE_SEQUENCE",
        name: "Intervaled Key Press & Release",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      }
    ];

    this.onDragEnd = this.onDragEnd.bind(this);
    this.addModifier = this.addModifier.bind(this);
    this.updateRows = this.updateRows.bind(this);
    this.createConversion = this.createConversion.bind(this);
    this.assignColor = this.assignColor.bind(this);
  }

  componentDidMount() {
    if (this.props.macro !== null && this.props.macro.actions !== null && this.props.macro.actions.length > 0) {
      let conv = this.createConversion(this.props.macro.actions);
      let texted = conv.map(k => this.keymapDB.parse(k.keyCode).label).join(" ");
      let newRows = conv.map((item, index) => {
        let aux = item;
        aux.id = index;
        return aux;
      });
      this.setState({
        rows: newRows,
        macro: texted
      });
    }
    if (this.state.rows.length !== 0) {
      const scrollContainer = this.horizontalWheel.current.firstChild;
      // console.log("comparing values of scrollpos in mount", this.props.scrollPos, scrollContainer.scrollLeft);
      scrollContainer.addEventListener("wheel", this.scrollUpdate);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.horizontalWheel.current === null) return;
    const scrollContainer = this.horizontalWheel.current.firstChild;
    if (this.state.rows.length !== 0 && prevState.rows.length === 0) {
      scrollContainer.addEventListener("wheel", this.scrollUpdate);
    }
    if (this.state.rows.length === 0 && prevState.rows.length !== 0) {
      scrollContainer.removeEventListener("wheel", this.scrollUpdate);
    }
    // console.log("comparing values of scrollpos in update", this.props.scrollPos, scrollContainer.scrollLeft);
    if (scrollContainer.scrollLeft !== this.props.scrollPos) {
      scrollContainer.scrollLeft = this.props.scrollPos;
    }
    if (this.props.macro !== prevProps.macro) {
      let rows = this.createConversion(this.props.macro.actions);
      console.log("TiEMTa CompDidUpdate", rows);
      let texted = rows.map(k => this.keymapDB.parse(k.keyCode).label).join(" ");
      let newRows = rows.map((item, index) => {
        let aux = item;
        aux.id = index;
        return aux;
      });
      this.setState({
        rows: newRows,
        macro: texted
      });
    }
  }

  componentWillUnmount() {
    if (this.state.rows.length !== 0) {
      const scrollContainer = this.horizontalWheel.current.firstChild;
      scrollContainer.removeEventListener("wheel", this.scrollUpdate);
    }
  }

  scrollUpdate = evt => {
    const scrollContainer = this.horizontalWheel.current.firstChild;
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
    this.props.updateScroll(scrollContainer.scrollLeft);
  };

  createConversion(actions) {
    let converted = actions.map((action, i) => {
      const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
      let km, txt;
      switch (action.type) {
        case 1:
          return {
            symbol: `${action.keyCode[0]} - ${action.keyCode[1]}`,
            keyCode: action.keyCode,
            action: action.type,
            id: i,
            color: "#faf0e3",
            uid: randID,
            ucolor: "transparent"
          };
        case 2:
          return {
            symbol: action.keyCode,
            keyCode: action.keyCode,
            action: action.type,
            id: i,
            color: "#faf0e3",
            uid: randID,
            ucolor: "transparent"
          };
        case 3:
        case 4:
        case 5:
          km = this.keymapDB.parse(action.keyCode);
          if (km.extraLabel !== undefined) {
            txt = km.extraLabel + " " + km.label;
          } else {
            txt = km.label;
          }
          return {
            symbol: txt,
            keyCode: action.keyCode,
            action: action.type,
            id: i,
            color: this.assignColor(action.keyCode),
            uid: randID,
            ucolor: "transparent"
          };
        case 6:
        case 7:
        case 8:
          return {
            symbol: this.keymapDB.parse(action.keyCode).label,
            keyCode: action.keyCode,
            action: action.type,
            id: i,
            color: this.assignColor(action.keyCode),
            uid: randID,
            ucolor: "transparent"
          };
        default:
          break;
      }
    });
    return converted;
  }

  revertConversion(actions) {
    let converted = actions.map(({ keyCode, action, id }) => {
      return {
        keyCode: keyCode,
        type: action,
        id: id
      };
    });
    return converted;
  }

  assignColor(keyCode) {
    let color = this.modifiers.filter(x => x.keyCode === keyCode);
    if (color === undefined || color.length == 0) {
      color = "#ededed";
    } else {
      color = color[0].color;
    }
    return color;
  }

  updateRows(rows) {
    console.log("TiEMTa updaterows", rows);
    let texted = rows.map(k => this.keymapDB.parse(k.keyCode).label).join(" ");
    let newRows = rows.map((item, index) => {
      let aux = item;
      aux.id = index;
      return aux;
    });
    this.setState({
      rows: newRows,
      macro: texted
    });
    let revConv = this.revertConversion(rows);
    // console.log("TiEMTa revConv", revConv);
    this.props.updateActions(revConv);
  }

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  addModifier(rowID, modifierID) {
    console.log("Called addModifier", rowID, modifierID);
    const { name, keyCode, color } = this.modifiers[modifierID];
    const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
    const randColor = "#" + Math.floor(Math.abs(Math.sin(randID) * 16777215) % 16777215).toString(16);
    let newRows = this.state.rows;
    newRows.splice(rowID + 1, 0, {
      symbol: name,
      keyCode,
      action: 7,
      id: rowID + 1,
      color,
      uid: randID,
      ucolor: randColor
    });
    newRows.splice(rowID, 0, {
      symbol: name,
      keyCode,
      action: 6,
      id: rowID,
      color,
      uid: randID,
      ucolor: randColor
    });
    this.updateRows(newRows);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const rows = this.reorder(this.state.rows, result.source.index, result.destination.index);

    this.updateRows(rows);
  }

  onDeleteRow = id => {
    let uid = this.state.rows.filter(x => x.id === id)[0].uid;
    let aux = this.state.rows.filter(x => x.uid !== uid);
    this.updateRows(aux);
  };

  onCloneRow = id => {
    let uid = this.state.rows.filter(x => x.id === id)[0];
    let preAux = this.state.rows.slice(0, id);
    let postAux = this.state.rows.slice(id);
    preAux.push(uid);
    this.updateRows(preAux.concat(postAux));
  };

  updateAction = (id, action) => {
    let aux = this.state.rows;
    aux[id].action = action;
    this.updateRows(aux);
  };

  updateScrollPos = () => {
    console.log(this.trackingWidth.current.scrollLeft);
  };

  render() {
    // const {} = this.props;
    const cssObjectWidth = {
      width: this.props.componentWidth
    };
    // console.log("Timeline.ed.M.Table Rows", this.state.rows);
    if (this.state.rows.length === 0) {
      return <></>;
    }
    return (
      <Styles className="trackingWrapper" style={cssObjectWidth} ref={this.horizontalWheel}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {provided => (
              <div ref={provided.innerRef}>
                <div className={"timelinetracking"}>
                  {this.state.rows.map((item, index) => (
                    <Draggable key={index} draggableId={String(index)} index={index}>
                      {(provided, snapshot) => (
                        <KeyMacro
                          provided={provided}
                          snapshot={snapshot}
                          item={item}
                          modifiers={this.modifiers}
                          actionTypes={this.actionTypes}
                          updateAction={this.updateAction}
                          onDeleteRow={this.onDeleteRow}
                          onCloneRow={this.onCloneRow}
                          addModifier={this.addModifier}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Styles>
    );
  }
}

export default TimelineEditorMacroTable;
