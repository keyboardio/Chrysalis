import React, { Component } from "react";
import Key from "./Key";

class Layer extends React.Component {
  render() {
    let _ = 0,
      getLabel = (row, col) => {
        let keyIndex = parseInt(row) * 16 + parseInt(col),
          keyCode = this.props.keymap[keyIndex];
        return keyCode;
      },
      isActive = (row, col) => {
        let keyIndex = parseInt(row) * 16 + parseInt(col);
        return this.props.selectedKey == keyIndex;
      };

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        strokeLinecap="round"
        clipRule="evenodd"
        viewBox="0 0 833 425"
        className="layer"
      >
        <g transform="matrix(1,0,0,1,-90.5869,-55.1936)">
          <Key
            row="3"
            col="15"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 15)}
            active={isActive(3, 15)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.898734,0.047723,-0.0530256,0.998593,806.052,113.617)"
            extraLabelTransform="matrix(0.998593,0.0530256,-0.0530256,0.998593,798.755,102.062)"
            shape="M912.341 270.4l-45.597-2.104c-2.65-.123-3.286.416-3.427 3.067l-2.609 48.858c-.14 2.651.113 3.53 3.413 3.968 16.188 1.489 32.476 1.529 39.875-6.141 8.676-8.096 11.9-44.397 11.9-44.397.687-2.566-.901-3.128-3.555-3.252z"
          />
          <Key
            row="3"
            col="14"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 14)}
            active={isActive(3, 14)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.898852,0.0454426,-0.0504917,0.998724,747.949,111.208)"
            extraLabelTransform="matrix(0.998724,0.0504917,-0.0504917,0.998724,740.622,99.6718)"
            shape="M847.069 321.993s-20.053-3.071-39.291-8.608c-2-.575-2.869-1.224-2.804-3.878l1.015-41.037c.067-2.654.716-3.48 3.368-3.345l39.986 2.047c2.652.137 3.549.95 3.412 3.603l-2.476 48.296c-.179 3.483-.666 3.245-3.21 2.922z"
          />
          <Key
            row="3"
            col="13"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 13)}
            active={isActive(3, 13)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899972,0.00706251,-0.00784723,0.999969,683.842,83.4691)"
            extraLabelTransform="matrix(0.999969,0.00784723,-0.00784723,0.999969,676.03,72.2559)"
            shape="M791.753 307.24L751.01 288.5c-1.89-.868-2.22-1.115-2.248-3.769l-.467-46.066c-.026-2.654.361-3.367 3.017-3.371l42.26-.065c2.655-.004 2.76.09 2.693 2.744l-1.647 66.54c-.086 3.486-.678 3.487-2.866 2.725z"
          />
          <Key
            row="3"
            col="12"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 12)}
            active={isActive(3, 12)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899852,-0.0163275,0.0181417,0.999835,621.133,73.2385)"
            extraLabelTransform="matrix(0.999835,-0.0181417,0.0181417,0.999835,613.032,62.2322)"
            shape="M735.417 283.139c-12.27-3.325-27.236-5.457-40.988-6.282-1.448-.086-2.802-.614-2.878-3.268l-1.317-47.718c-.073-2.654.723-3.012 3.378-3.062l40.71-.771c2.655-.05 3.33.002 3.357 2.658L738.24 280c.035 3.488-1.463 3.509-2.824 3.14z"
          />
          <Key
            row="3"
            col="11"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 11)}
            active={isActive(3, 11)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899447,-0.0315391,0.0350435,0.999386,561.36,79.7391)"
            extraLabelTransform="matrix(0.999386,-0.0350435,0.0350435,0.999386,553.074,68.8713)"
            shape="M678.442 277.004c-7.848.272-28.663 2.427-41.064 4.922-1.422.286-2.607.03-2.705-2.624l-1.739-47.852c-.096-2.653.288-3.093 2.943-3.188l40.924-1.493c2.653-.096 2.983.093 3.056 2.747l1.199 43.439c.096 3.485-1.207 4-2.614 4.05z"
          />
          <Key
            row="3"
            col="10"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 10)}
            active={isActive(3, 10)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899399,-0.0328901,0.0365445,0.999332,504.642,93.5118)"
            extraLabelTransform="matrix(0.999332,-0.0365445,0.0365445,0.999332,497.311,109.223)"
            shape="M622.085 285.104c-8.526 1.6-28.445 7.612-40.832 12.305-1.358.514-2.81.384-2.905-2.272l-1.794-49.369c-.097-2.653.425-3.378 3.078-3.476l39.957-1.458c2.653-.096 3.218.335 3.314 2.99l1.333 36.727c.126 3.486-.767 4.294-2.15 4.553z"
          />
          <Key
            row="3"
            col="9"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 9)}
            active={isActive(3, 9)}
            onClick={this.props.onKeySelect}
            palmKey="1"
            primaryLabelTransform="matrix(0.872421,-0.221093,0.245659,0.969356,520.161,285.476)"
            extraLabelTransform="matrix(0.969356,-0.245659,0.245659,0.969356,509.763,276.607)"
            shape="matrix(-0.15531,-0.579624,-0.579624,0.15531,1297.24,637.947)"
          />
          <Key
            row="3"
            col="8"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 8)}
            active={isActive(3, 8)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.788746,-0.433451,0.481612,0.876385,385.56,263.116)"
            extraLabelTransform="matrix(0.876385,-0.481612,0.481612,0.876385,373.266,257.148)"
            shape="M553.763 340.12c-13.836 6.396-26.241 13.35-38.202 20.933-1.47.934-2.602 2.766-.997 5.186l28.128 42.455c1.604 2.422 3.249 1.757 4.687.8 9.563-6.364 19.696-11.544 30.37-16.619 1.438-.682 3.245-1.781 2.065-4.436l-20.951-47.147c-1.18-2.655-3.668-1.835-5.1-1.171z"
          />
          <Key
            row="3"
            col="7"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 7)}
            active={isActive(3, 7)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.788746,0.433451,-0.481612,0.876385,443.053,161.774)"
            extraLabelTransform="matrix(0.876385,0.481612,-0.481612,0.876385,438.258,146.414)"
            shape="M460.083 340.12c13.836 6.396 26.241 13.35 38.202 20.933 1.47.934 2.602 2.766.997 5.186l-28.128 42.455c-1.604 2.422-3.249 1.757-4.687.8-9.563-6.364-19.696-11.544-30.37-16.619-1.438-.682-3.245-1.781-2.065-4.436l20.951-47.147c1.18-2.655 3.668-1.835 5.1-1.171z"
          />
          <Key
            row="3"
            col="6"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 6)}
            active={isActive(3, 6)}
            onClick={this.props.onKeySelect}
            palmKey="1"
            primaryLabelTransform="matrix(0.872421,0.221093,-0.245659,0.969356,287.696,233.273)"
            extraLabelTransform="matrix(0.969356,0.245659,-0.245659,0.969356,279.191,219.614)"
            shape="matrix(0.15531,-0.579624,0.579624,0.15531,-283.396,637.947)"
          />
          <Key
            row="3"
            col="5"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 5)}
            active={isActive(3, 5)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899399,0.0328901,-0.0365445,0.999332,296.845,85.7461)"
            extraLabelTransform="matrix(0.999332,0.0365445,-0.0365445,0.999332,285.661,74.1781)"
            shape="M391.758 285.104c8.526 1.6 28.445 7.612 40.831 12.305 1.359.514 2.81.384 2.905-2.272l1.795-49.369c.096-2.653-.425-3.378-3.078-3.476l-39.957-1.458c-2.653-.096-3.218.335-3.314 2.99l-1.333 36.727c-.127 3.486.767 4.294 2.15 4.553z"
          />
          <Key
            row="3"
            col="4"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 4)}
            active={isActive(3, 4)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899447,0.0315391,-0.0350435,0.999386,239.646,72.2924)"
            extraLabelTransform="matrix(0.999386,0.0350435,-0.0350435,0.999386,228.444,60.7412)"
            shape="M335.401 277.004c7.848.272 28.662 2.427 41.064 4.922 1.422.286 2.607.03 2.705-2.624l1.738-47.852c.096-2.653-.287-3.093-2.943-3.188l-40.924-1.493c-2.652-.096-2.982.093-3.055 2.747l-1.199 43.439c-.097 3.485 1.207 4 2.614 4.05z"
          />
          <Key
            row="3"
            col="3"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 3)}
            active={isActive(3, 3)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899852,0.0163275,-0.0181417,0.999835,179.833,69.3834)"
            extraLabelTransform="matrix(0.999835,0.0181417,-0.0181417,0.999835,168.437,58.0233)"
            shape="M278.425 283.139c12.27-3.325 27.237-5.457 40.989-6.282 1.448-.086 2.802-.614 2.878-3.268l1.317-47.718c.072-2.654-.723-3.012-3.378-3.062l-40.71-.771c-2.656-.05-3.33.002-3.357 2.658L275.601 280c-.034 3.488 1.464 3.509 2.824 3.14z"
          />
          <Key
            row="3"
            col="2"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 2)}
            active={isActive(3, 2)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899972,-0.00706251,0.00784723,0.999969,116.816,85.1367)"
            extraLabelTransform="matrix(0.999969,-0.00784723,0.00784723,0.999969,105.128,74.0765)"
            shape="M222.09 307.24l40.742-18.739c1.89-.868 2.22-1.115 2.248-3.769l.466-46.066c.027-2.654-.36-3.367-3.016-3.371l-42.26-.065c-2.655-.004-2.76.09-2.693 2.744l1.647 66.54c.086 3.486.678 3.487 2.866 2.725z"
          />
          <Key
            row="3"
            col="1"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 1)}
            active={isActive(3, 1)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.898852,-0.0454426,0.0504917,0.998724,53.6672,121.938)"
            extraLabelTransform="matrix(0.998724,-0.0504917,0.0504917,0.998724,41.519,111.386)"
            shape="M166.774 321.993s20.053-3.071 39.291-8.608c1.999-.575 2.869-1.224 2.804-3.878l-1.015-41.037c-.067-2.654-.716-3.48-3.369-3.345l-39.985 2.047c-2.652.137-3.549.95-3.412 3.603l2.476 48.296c.179 3.483.666 3.245 3.21 2.922z"
          />
          <Key
            row="3"
            col="0"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(3, 0)}
            active={isActive(3, 0)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.898734,-0.047723,0.0530256,0.998593,-4.4081,124.885)"
            extraLabelTransform="matrix(0.998593,-0.0530256,0.0530256,0.998593,-16.5831,114.364)"
            shape="M101.501 270.4l45.597-2.104c2.652-.123 3.287.416 3.428 3.067l2.609 48.858c.14 2.651-.113 3.53-3.413 3.968-16.188 1.489-32.476 1.529-39.875-6.141-8.676-8.096-11.9-44.397-11.9-44.397-.687-2.566.901-3.128 3.554-3.252z"
          />

          <Key
            row="2"
            col="15"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 15)}
            active={isActive(2, 15)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.898866,0.0451617,-0.0501797,0.99874,809.161,58.8284)"
            extraLabelTransform="matrix(0.99874,0.0501797,-0.0501797,0.99874,801.831,47.2945)"
            shape="M916.19 216.668l-46.081-2.359c-2.652-.137-4.013.892-4.149 3.542l-1.846 36.009c-.137 2.652 1.182 3.616 3.833 3.75l45.44 2.327c2.65.136 4.017.445 4.174-2.205l2.179-37.172c.156-2.649-.899-3.755-3.55-3.892z"
          />
          <Key
            row="2"
            col="14"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 14)}
            active={isActive(2, 14)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.898935,0.0437677,-0.0486308,0.998817,749.273,56.3083)"
            extraLabelTransform="matrix(0.998817,0.0486308,-0.0486308,0.998817,741.925,44.7858)"
            shape="M852.158 213.39l-41.443-2.123c-2.65-.136-3.36.413-3.427 3.067l-.928 36.398c-.068 2.653.27 3.739 2.922 3.873l41.039 2.102c2.652.138 3.193-.693 3.328-3.346l1.88-36.643c.137-2.65-.718-3.194-3.37-3.329z"
          />
          <Key
            row="2"
            col="13"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 13)}
            active={isActive(2, 13)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899998,-0.0017242,0.00191578,0.999998,681.374,29.3429)"
            extraLabelTransform="matrix(0.999998,-0.00191578,0.00191578,0.999998,673.453,18.2065)"
            shape="M794.087 181.315l-43.342.088c-2.656.007-3.022.64-2.995 3.294l.372 36.816c.027 2.656.108 3.31 2.764 3.305l42.29-.064c2.654-.004 3.437-.72 3.5-3.374l.923-37.238c.066-2.654-.858-2.834-3.512-2.827z"
          />
          <Key
            row="2"
            col="12"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 12)}
            active={isActive(2, 12)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899835,-0.017257,0.0191745,0.999816,620.111,18.0479)"
            extraLabelTransform="matrix(0.999816,-0.0191745,0.0191745,0.999816,611.999,7.04994)"
            shape="M734.249 168.132l-42.512.8c-2.655.05-3.055.712-2.98 3.367l1.02 37.036c.074 2.654.542 3.057 3.198 3.008l41.739-.793c2.653-.05 2.827-.51 2.8-3.166l-.379-37.21c-.026-2.657-.231-3.092-2.886-3.042z"
          />
          <Key
            row="2"
            col="11"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 11)}
            active={isActive(2, 11)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899393,-0.0330486,0.0367206,0.999326,559.684,24.9224)"
            extraLabelTransform="matrix(0.999326,-0.0367206,0.0367206,0.999326,551.38,14.0684)"
            shape="M674.5 172.934l-40.422 1.458c-2.655.096-3.19.772-3.091 3.426l1.331 36.688c.096 2.654.674 3.282 3.328 3.191l40.491-1.389c2.654-.09 3.33-.853 3.258-3.507l-1.025-37.133c-.075-2.655-1.215-2.83-3.87-2.734z"
          />
          <Key
            row="2"
            col="10"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 10)}
            active={isActive(2, 10)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.89936,-0.0339334,0.0377038,0.999289,502.394,39.0343)"
            extraLabelTransform="matrix(0.999289,-0.0377038,0.0377038,0.999289,494.08,28.1886)"
            shape="M617.18 187.008l-39.303 1.433c-2.656.097-3.377.835-3.279 3.488l1.343 37.003c.098 2.653.853 2.98 3.506 2.883l39.58-1.445c2.655-.095 3.348-1.017 3.252-3.67l-1.339-36.86c-.095-2.655-1.107-2.928-3.76-2.832z"
          />
          <Key
            row="2"
            col="9"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 9)}
            active={isActive(2, 9)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899368,-0.0337152,0.0374614,0.999298,447.175,101.276)"
            extraLabelTransform="matrix(0.999298,-0.0374614,0.0374614,0.999298,438.863,90.4284)"
            shape="M566.01 303.523c-8.56 3.415-29.865 14.053-41.357 21.337-2.38 1.508-2.875-1.114-2.971-3.767l-2.504-68.911c-.096-2.653.366-3.103 3.019-3.2l40.433-1.475c2.653-.096 3.518.375 3.614 3.028l1.742 47.904c.126 3.486-.668 4.564-1.975 5.084z"
          />
          <Key
            row="2"
            col="8"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 8)}
            active={isActive(2, 8)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.851721,-0.290811,0.323124,0.946357,457.758,213.893)"
            extraLabelTransform="matrix(0.946357,-0.323124,0.323124,0.946357,446.679,205.893)"
            shape="M611.744 318.842c-14.734 3.898-28.535 8.77-41.632 14.164-1.61.663-3.23 2.135-2.068 4.795l20.206 46.208c1.164 2.658 3.066 2.981 4.648 2.288 10.522-4.606 21.642-8.109 33.035-11.253 1.533-.424 3.22-1.236 2.52-4.056l-12.45-50.067c-.703-2.82-2.732-2.482-4.259-2.079z"
          />
          <Key
            row="2"
            col="7"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 7)}
            active={isActive(2, 7)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.851721,0.290811,-0.323124,0.946357,354.986,145.23)"
            extraLabelTransform="matrix(0.946357,0.323124,-0.323124,0.946357,347.612,130.928)"
            shape="M402.102 318.842c14.734 3.898 28.535 8.77 41.632 14.164 1.61.663 3.23 2.135 2.068 4.795l-20.206 46.208c-1.164 2.658-3.066 2.981-4.648 2.288-10.522-4.606-21.642-8.109-33.035-11.253-1.533-.424-3.22-1.236-2.52-4.056l12.45-50.067c.703-2.82 2.732-2.482 4.259-2.079z"
          />
          <Key
            row="2"
            col="6"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 6)}
            active={isActive(2, 6)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899368,0.0337152,-0.0374614,0.999298,353.651,93.3157)"
            extraLabelTransform="matrix(0.999298,0.0374614,-0.0374614,0.999298,342.476,81.7374)"
            shape="M447.832 303.523c8.562 3.415 29.866 14.053 41.357 21.337 2.381 1.508 2.876-1.114 2.972-3.767l2.504-68.911c.096-2.653-.366-3.103-3.02-3.2l-40.432-1.475c-2.653-.096-3.519.375-3.615 3.028l-1.741 47.904c-.126 3.486.668 4.564 1.975 5.084z"
          />
          <Key
            row="2"
            col="5"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 5)}
            active={isActive(2, 5)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.89936,0.0339334,-0.0377038,0.999289,299.102,31.0223)"
            extraLabelTransform="matrix(0.999289,0.0377038,-0.0377038,0.999289,287.931,19.4413)"
            shape="M396.662 187.008l39.304 1.433c2.656.097 3.377.835 3.279 3.488l-1.343 37.003c-.098 2.653-.853 2.98-3.507 2.883l-39.579-1.445c-2.655-.095-3.349-1.017-3.252-3.67l1.339-36.86c.095-2.655 1.106-2.928 3.76-2.832z"
          />
          <Key
            row="2"
            col="4"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 4)}
            active={isActive(2, 4)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899393,0.0330486,-0.0367206,0.999326,241.619,17.1192)"
            extraLabelTransform="matrix(0.999326,0.0367206,-0.0367206,0.999326,230.436,5.54926)"
            shape="M339.343 172.934l40.421 1.458c2.656.096 3.19.772 3.092 3.426l-1.332 36.688c-.096 2.654-.673 3.282-3.327 3.191l-40.491-1.389c-2.654-.09-3.33-.853-3.258-3.507l1.024-37.133c.075-2.655 1.216-2.83 3.871-2.734z"
          />
          <Key
            row="2"
            col="3"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 3)}
            active={isActive(2, 3)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899835,0.017257,-0.0191745,0.999816,180.736,13.9734)"
            extraLabelTransform="matrix(0.999816,0.0191745,-0.0191745,0.999816,169.352,2.60146)"
            shape="M279.594 168.132l42.512.8c2.655.05 3.055.712 2.98 3.367l-1.021 37.036c-.073 2.654-.542 3.057-3.197 3.008l-41.739-.793c-2.653-.05-2.827-.51-2.8-3.166l.378-37.21c.027-2.657.232-3.092 2.887-3.042z"
          />
          <Key
            row="2"
            col="2"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 2)}
            active={isActive(2, 2)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899998,0.0017242,-0.00191578,0.999998,118.119,28.9358)"
            extraLabelTransform="matrix(0.999998,0.00191578,-0.00191578,0.999998,106.54,17.7621)"
            shape="M219.756 181.315l43.342.088c2.656.007 3.022.64 2.995 3.294l-.372 36.816c-.027 2.656-.108 3.31-2.764 3.305l-42.29-.064c-2.655-.004-3.437-.72-3.5-3.374l-.923-37.238c-.067-2.654.858-2.834 3.512-2.827z"
          />
          <Key
            row="2"
            col="1"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 1)}
            active={isActive(2, 1)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.898935,-0.0437677,0.0486308,0.998817,51.5348,66.6423)"
            extraLabelTransform="matrix(0.998817,-0.0486308,0.0486308,0.998817,39.4062,56.0681)"
            shape="M161.685 213.39l41.442-2.123c2.65-.136 3.362.413 3.428 3.067l.928 36.398c.068 2.653-.27 3.739-2.922 3.873l-41.04 2.102c-2.651.138-3.192-.693-3.327-3.346l-1.88-36.643c-.137-2.65.718-3.194 3.37-3.329z"
          />
          <Key
            row="2"
            col="0"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(2, 0)}
            active={isActive(2, 0)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.898866,-0.0451617,0.0501797,0.99874,-7.54853,69.4916)"
            extraLabelTransform="matrix(0.99874,-0.0501797,0.0501797,0.99874,-19.6935,58.9362)"
            shape="M97.654 216.668l46.08-2.359c2.652-.137 4.012.892 4.149 3.542l1.846 36.009c.137 2.652-1.182 3.616-3.833 3.75l-45.441 2.327c-2.65.136-4.016.445-4.173-2.205l-2.18-37.172c-.155-2.649.9-3.755 3.552-3.892z"
          />

          <Key
            row="1"
            col="15"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 15)}
            active={isActive(1, 15)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.898866,0.0451617,-0.0501797,0.99874,811.933,4.92264)"
            extraLabelTransform="matrix(0.99874,0.0501797,-0.0501797,0.99874,804.603,-6.61125)"
            shape="M916.25 162.695l-43.04-2.205c-2.652-.137-4.353.884-4.488 3.535l-1.846 35.993c-.137 2.652.447 3.658 3.1 3.792l46.474 2.381c2.653.135 3.656-.797 3.61-3.453l-.614-36.417c-.044-2.654-.544-3.492-3.196-3.626z"
          />
          <Key
            row="1"
            col="14"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 14)}
            active={isActive(1, 14)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.89896,0.0432529,-0.0480588,0.998845,751.11,2.28101)"
            extraLabelTransform="matrix(0.998845,0.0480588,-0.0480588,0.998845,743.755,-9.2373)"
            shape="M854.743 159.544l-42.473-2.175c-2.653-.135-3.544.505-3.61 3.159l-.927 36.275c-.066 2.653.508 3.845 3.16 3.983l42.089 2.155c2.652.135 3.284-.575 3.42-3.225l1.879-36.643c.137-2.652-.886-3.394-3.538-3.529z"
          />
          <Key
            row="1"
            col="13"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 13)}
            active={isActive(1, 13)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899998,-0.0017242,0.00191578,0.999998,681.282,-24.6434)"
            extraLabelTransform="matrix(0.999998,-0.00191578,0.00191578,0.999998,673.361,-35.7798)"
            shape="M795.516 127.43l-44.896.069c-2.655.004-3.44 1.11-3.413 3.765l.371 36.525c.026 2.657 1.093 3.142 3.748 3.135l43.59-.09c2.656-.004 3.027-.53 3.09-3.184l.92-37.095c.066-2.653-.755-3.13-3.41-3.126z"
          />
          <Key
            row="1"
            col="12"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 12)}
            active={isActive(1, 12)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899835,-0.017257,0.0191745,0.999816,618.535,-35.8131)"
            extraLabelTransform="matrix(0.999816,-0.0191745,0.0191745,0.999816,610.422,-46.8111)"
            shape="M733.276 114.243l-42.625.81c-2.655.053-3.45.893-3.377 3.547l1.018 36.882c.073 2.655.805 3.022 3.46 2.972l42.124-.794c2.655-.05 3.118-.43 3.09-3.084l-.38-37.42c-.026-2.653-.655-2.965-3.31-2.913z"
          />
          <Key
            row="1"
            col="11"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 11)}
            active={isActive(1, 11)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.89968,-0.0239904,0.026656,0.999645,559.413,-29.6255)"
            extraLabelTransform="matrix(0.999645,-0.026656,0.026656,0.999645,551.219,-40.5624)"
            shape="M673.47 119.483l-40.984 1.138c-2.655.073-3.55.81-3.453 3.463l1.328 36.53c.095 2.655 1.042 3.407 3.694 3.311l41.038-1.496c2.653-.099 2.893-.686 2.818-3.34l-1.01-36.7c-.076-2.656-.777-2.979-3.431-2.906z"
          />
          <Key
            row="1"
            col="10"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 10)}
            active={isActive(1, 10)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899448,-0.0315052,0.0350057,0.999387,500.899,-14.9371)"
            extraLabelTransform="matrix(0.999387,-0.0350057,0.0350057,0.999387,492.614,-25.8053)"
            shape="M615.26 133.155l-39.304 1.432c-2.653.099-3.412.835-3.315 3.491l1.336 36.79c.096 2.653.951 3.196 3.606 3.1l39.71-1.448c2.654-.098 3.116-1.32 3.018-3.974l-1.327-36.532c-.096-2.653-1.068-2.955-3.724-2.86z"
          />
          <Key
            row="1"
            col="9"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 9)}
            active={isActive(1, 9)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899401,-0.0328385,0.0364872,0.999334,445.079,39.2222)"
            extraLabelTransform="matrix(0.999334,-0.0364872,0.0364872,0.999334,436.778,28.3664)"
            shape="M560.456 178.938l-40.841 1.491c-2.653.096-3.025.509-2.93 3.161l1.894 52.068c.096 2.654.838 2.941 3.492 2.843l40.69-1.482c2.656-.098 2.964-.758 2.869-3.413l-1.884-51.805c-.096-2.653-.635-2.958-3.29-2.863z"
          />
          <Key
            row="1"
            col="8"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 8)}
            active={isActive(1, 8)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.889818,-0.134996,0.149995,0.988687,540.033,177.119)"
            extraLabelTransform="matrix(0.988687,-0.149995,0.149995,0.988687,530.55,167.279)"
            shape="M672.548 307.815c-15.19 1.245-29.634 3.613-43.476 6.617-1.698.369-3.554 1.532-2.877 4.358l11.761 49.04c.676 2.822 2.494 3.476 4.173 3.073 11.168-2.686 22.73-4.176 34.498-5.267 1.584-.146 3.387-.65 3.195-3.549l-3.448-51.477c-.194-2.899-2.252-2.925-3.826-2.795z"
          />
          <Key
            row="1"
            col="7"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 7)}
            active={isActive(1, 7)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.889818,0.134996,-0.149995,0.988687,263.716,145.245)"
            extraLabelTransform="matrix(0.988687,0.149995,-0.149995,0.988687,253.92,132.48)"
            shape="M341.298 307.815c15.19 1.245 29.634 3.613 43.476 6.617 1.698.369 3.554 1.532 2.877 4.358l-11.761 49.04c-.676 2.822-2.494 3.476-4.173 3.073-11.168-2.686-22.73-4.176-34.498-5.267-1.584-.146-3.387-.65-3.195-3.549l3.448-51.477c.194-2.899 2.252-2.925 3.826-2.795z"
          />
          <Key
            row="1"
            col="6"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 6)}
            active={isActive(1, 6)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899401,0.0328385,-0.0364872,0.999334,355.407,31.4687)"
            extraLabelTransform="matrix(0.999334,0.0364872,-0.0364872,0.999334,344.222,19.9014)"
            shape="M453.387 178.938l40.84 1.491c2.654.096 3.026.509 2.93 3.161l-1.893 52.068c-.096 2.654-.838 2.941-3.492 2.843l-40.69-1.482c-2.656-.098-2.964-.758-2.869-3.413l1.884-51.805c.096-2.653.635-2.958 3.29-2.863z"
          />
          <Key
            row="1"
            col="5"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 5)}
            active={isActive(1, 5)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899448,0.0315052,-0.0350057,0.999387,300.576,-22.3758)"
            extraLabelTransform="matrix(0.999387,0.0350057,-0.0350057,0.999387,289.374,-33.9266)"
            shape="M398.582 133.155l39.304 1.432c2.654.099 3.413.835 3.316 3.491l-1.336 36.79c-.096 2.653-.951 3.196-3.607 3.1l-39.71-1.448c-2.653-.098-3.115-1.32-3.017-3.974l1.327-36.532c.096-2.653 1.068-2.955 3.723-2.86z"
          />
          <Key
            row="1"
            col="4"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 4)}
            active={isActive(1, 4)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.89968,0.0239904,-0.026656,0.999645,241.325,-35.2899)"
            extraLabelTransform="matrix(0.999645,0.026656,-0.026656,0.999645,230.027,-46.7467)"
            shape="M340.373 119.483l40.984 1.138c2.654.073 3.55.81 3.453 3.463l-1.328 36.53c-.095 2.655-1.042 3.407-3.695 3.311l-41.037-1.496c-2.653-.099-2.893-.686-2.818-3.34l1.01-36.7c.076-2.656.777-2.979 3.431-2.906z"
          />
          <Key
            row="1"
            col="3"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 3)}
            active={isActive(1, 3)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899835,0.017257,-0.0191745,0.999816,181.284,-39.8876)"
            extraLabelTransform="matrix(0.999816,0.0191745,-0.0191745,0.999816,169.9,-51.2595)"
            shape="M280.567 114.243l42.624.81c2.656.053 3.45.893 3.378 3.547l-1.019 36.882c-.072 2.655-.804 3.022-3.459 2.972l-42.124-.794c-2.655-.05-3.118-.43-3.09-3.084l.379-37.42c.027-2.653.655-2.965 3.311-2.913z"
          />
          <Key
            row="1"
            col="2"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 2)}
            active={isActive(1, 2)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899998,0.0017242,-0.00191578,0.999998,117.422,-25.0505)"
            extraLabelTransform="matrix(0.999998,0.00191578,-0.00191578,0.999998,105.844,-36.2243)"
            shape="M218.327 127.43l44.895.069c2.655.004 3.44 1.11 3.414 3.765l-.371 36.525c-.027 2.657-1.093 3.142-3.748 3.135l-43.59-.09c-2.656-.004-3.027-.53-3.09-3.184l-.92-37.095c-.066-2.653.755-3.13 3.41-3.126z"
          />
          <Key
            row="1"
            col="1"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 1)}
            active={isActive(1, 1)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.89896,-0.0432529,0.0480588,0.998845,49.228,12.4935)"
            extraLabelTransform="matrix(0.998845,-0.0480588,0.0480588,0.998845,37.1055,1.91234)"
            shape="M159.1 159.544l42.473-2.175c2.653-.135 3.543.505 3.61 3.159l.926 36.275c.067 2.653-.507 3.845-3.159 3.983l-42.089 2.155c-2.653.135-3.285-.575-3.42-3.225l-1.879-36.643c-.137-2.652.885-3.394 3.538-3.529z"
          />
          <Key
            row="1"
            col="0"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(1, 0)}
            active={isActive(1, 0)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.898866,-0.0451617,0.0501797,0.99874,-10.3571,15.5858)"
            extraLabelTransform="matrix(0.99874,-0.0501797,0.0501797,0.99874,-22.502,5.03044)"
            shape="M97.593 162.695l43.04-2.205c2.651-.137 4.353.884 4.487 3.535l1.847 35.993c.137 2.652-.447 3.658-3.1 3.792l-46.474 2.381c-2.653.135-3.656-.797-3.611-3.453l.615-36.417c.043-2.654.543-3.492 3.196-3.626z"
          />

          <Key
            row="0"
            col="15"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 15)}
            active={isActive(0, 15)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.898948,0.0434984,-0.0483315,0.998831,812.704,-48.9935)"
            extraLabelTransform="matrix(0.998831,0.0483315,-0.0483315,0.998831,805.353,-60.5139)"
            shape="M875.834 82.024c8.03 2.594 18.807 6.055 25.214 9.573 11.787 6.465 14.678 14.842 15.14 22.023l2.267 35.37c.17 2.648-.486 3.276-3.139 3.14l-42.87-2.17c-2.65-.135-2.944-1.182-2.805-3.834l3.213-61.916c.136-2.65 1.509-2.66 2.98-2.186z"
          />
          <Key
            row="0"
            col="14"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 14)}
            active={isActive(0, 14)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.898858,0.0453278,-0.0503642,0.998731,753.366,-54.0866)"
            extraLabelTransform="matrix(0.998731,0.0503642,-0.0503642,0.998731,746.038,-65.6219)"
            shape="M859.417 77.174s-24.139-5.795-45.676-8.967c-2.057-.303-2.741.508-2.81 3.163l-1.844 72.323c-.066 2.654.307 3.038 2.96 3.173l43.964 2.251c2.65.137 3.035-.929 3.171-3.581l3.308-64.47c.135-2.652-.007-3.167-3.073-3.892z"
          />
          <Key
            row="0"
            col="13"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 13)}
            active={isActive(0, 13)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899998,-0.0017242,0.00191578,0.999998,681.242,-79.5663)"
            extraLabelTransform="matrix(0.999998,-0.00191578,0.00191578,0.999998,673.321,-90.7027)"
            shape="M797.442 65.871s-26.37-3.75-47.906-5.273c-2.073-.148-3.037.867-3.01 3.521l.502 49.605c.027 2.656.703 3.3 3.358 3.296l45.469-.069c2.655-.004 3.43-.942 3.497-3.598l1.087-43.9c.065-2.657-.198-3.44-2.997-3.582z"
          />
          <Key
            row="0"
            col="12"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 12)}
            active={isActive(0, 12)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899835,-0.017257,0.0191745,0.999816,617.437,-89.6613)"
            extraLabelTransform="matrix(0.999816,-0.0191745,0.0191745,0.999816,609.325,-100.659)"
            shape="M732.785 59.424s-22.417-1.509-44.188-.886c-2.077.059-2.949 1.172-2.876 3.827l1.084 39.253c.073 2.654 1.024 3.012 3.68 2.96l42.401-.807c2.656-.052 3.557-.943 3.53-3.597l-.38-37.21c-.026-2.655-.453-3.399-3.25-3.54z"
          />
          <Key
            row="0"
            col="11"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 11)}
            active={isActive(0, 11)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899644,-0.0252947,0.0281052,0.999605,557.038,-84.3739)"
            extraLabelTransform="matrix(0.999605,-0.0281052,0.0281052,0.999605,548.828,-95.2989)"
            shape="M672.299 59.189s-21.87 1.1-42.946 4.61c-2.052.342-2.459 1.425-2.363 4.08l1.418 39.031c.098 2.654.898 3.317 3.552 3.244l41.202-1.142c2.654-.073 3.337-1.134 3.264-3.788l-1.183-42.783c-.073-2.654-.377-3.93-2.944-3.252z"
          />
          <Key
            row="0"
            col="10"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 10)}
            active={isActive(0, 10)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899448,-0.0315052,0.0350057,0.999387,499.328,-68.9256)"
            extraLabelTransform="matrix(0.999387,-0.0350057,0.0350057,0.999387,491.043,-79.7938)"
            shape="M612.706 66.798s-25.768 5.252-38.426 10.124c-1.941.744-3.775 2.381-3.68 5.035l1.394 38.338c.096 2.656.926 3.92 3.58 3.823l39.71-1.449c2.653-.096 3.178-1.018 3.082-3.671l-1.78-48.982c-.096-2.652-1.314-3.896-3.88-3.218z"
          />
          <Key
            row="0"
            col="9"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 9)}
            active={isActive(0, 9)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899448,-0.0315052,0.0350057,0.999387,443.056,-23.4824)"
            extraLabelTransform="matrix(0.999387,-0.0350057,0.0350057,0.999387,434.77,-34.3506)"
            shape="M555.86 84.026c-9.046 4.27-19.125 8.977-26.885 15.927-12.498 11.192-14.077 21.999-14.093 31.743-.02 11.64 1.187 34.899 1.187 34.899.09 2.653.83 3.403 3.484 3.307l40.086-1.462c2.653-.098 3.57-1.43 3.475-4.084l-2.866-78.835c-.096-2.652-2.991-2.155-4.387-1.495z"
          />
          <Key
            row="0"
            col="8"
            x="79"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 8)}
            active={isActive(0, 8)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.89979,0.0194631,-0.0216256,0.999766,625.543,155.938)"
            extraLabelTransform="matrix(0.999766,0.0216256,-0.0216256,0.999766,617.886,144.619)"
            shape="M733.865 307.748c-15.175-1.416-29.81-1.592-43.963-1.039-1.739.07-3.766.892-3.591 3.79l3.063 50.339c.174 2.899 1.85 3.857 3.573 3.75 11.465-.703 23.113-.164 34.891.808 1.586.131 3.449-.052 3.76-2.94l5.55-51.292c.312-2.888-1.71-3.27-3.283-3.416z"
          />
          <Key
            row="0"
            col="7"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 7)}
            active={isActive(0, 7)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.89979,-0.0194631,0.0216256,0.999766,176.22,160.534)"
            extraLabelTransform="matrix(0.999766,-0.0216256,0.0216256,0.999766,164.381,149.636)"
            shape="M279.981 307.748c15.175-1.416 29.81-1.592 43.963-1.039 1.739.07 3.766.892 3.591 3.79l-3.063 50.339c-.174 2.899-1.85 3.857-3.573 3.75-11.465-.703-23.113-.164-34.891.808-1.586.131-3.449-.052-3.76-2.94l-5.55-51.292c-.312-2.888 1.71-3.27 3.283-3.416z"
          />
          <Key
            row="0"
            col="6"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 6)}
            active={isActive(0, 6)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899448,0.0315052,-0.0350057,0.999387,357.632,-30.9212)"
            extraLabelTransform="matrix(0.999387,0.0350057,-0.0350057,0.999387,346.429,-42.4719)"
            shape="M457.982 84.026c9.047 4.27 19.126 8.977 26.885 15.927 12.5 11.192 14.077 21.999 14.094 31.743.02 11.64-1.187 34.899-1.187 34.899-.09 2.653-.831 3.403-3.484 3.307l-40.086-1.462c-2.654-.098-3.57-1.43-3.475-4.084l2.866-78.835c.096-2.652 2.99-2.155 4.387-1.495z"
          />
          <Key
            row="0"
            col="5"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 5)}
            active={isActive(0, 5)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899448,0.0315052,-0.0350057,0.999387,302.147,-76.3643)"
            extraLabelTransform="matrix(0.999387,0.0350057,-0.0350057,0.999387,290.945,-87.9151)"
            shape="M401.137 66.798s25.768 5.252 38.426 10.124c1.941.744 3.775 2.381 3.68 5.035l-1.395 38.338c-.095 2.656-.925 3.92-3.579 3.823l-39.71-1.449c-2.653-.096-3.178-1.018-3.082-3.671l1.78-48.982c.096-2.652 1.314-3.896 3.88-3.218z"
          />
          <Key
            row="0"
            col="4"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 4)}
            active={isActive(0, 4)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899644,0.0252947,-0.0281052,0.999605,243.74,-90.3462)"
            extraLabelTransform="matrix(0.999605,0.0281052,-0.0281052,0.999605,232.458,-101.819)"
            shape="M341.544 59.189s21.87 1.1 42.946 4.61c2.052.342 2.458 1.425 2.363 4.08l-1.418 39.031c-.098 2.654-.898 3.317-3.552 3.244l-41.202-1.142c-2.655-.073-3.337-1.134-3.264-3.788l1.183-42.783c.073-2.654.377-3.93 2.944-3.252z"
          />
          <Key
            row="0"
            col="3"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 3)}
            active={isActive(0, 3)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899835,0.017257,-0.0191745,0.999816,182.132,-93.7359)"
            extraLabelTransform="matrix(0.999816,0.0191745,-0.0191745,0.999816,170.748,-105.108)"
            shape="M281.058 59.424s22.417-1.509 44.188-.886c2.077.059 2.949 1.172 2.876 3.827l-1.084 39.253c-.073 2.654-1.024 3.012-3.68 2.96l-42.401-.807c-2.656-.052-3.557-.943-3.53-3.597l.379-37.21c.027-2.655.454-3.399 3.252-3.54z"
          />
          <Key
            row="0"
            col="2"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 2)}
            active={isActive(0, 2)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.899998,0.0017242,-0.00191578,0.999998,117.422,-79.9734)"
            extraLabelTransform="matrix(0.999998,0.00191578,-0.00191578,0.999998,105.844,-91.1471)"
            shape="M216.4 65.871s26.37-3.75 47.907-5.273c2.073-.148 3.037.867 3.01 3.521l-.502 49.605c-.027 2.656-.703 3.3-3.358 3.296l-45.469-.069c-2.655-.004-3.43-.942-3.498-3.598l-1.086-43.9c-.065-2.657.198-3.44 2.997-3.582z"
          />
          <Key
            row="0"
            col="1"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 1)}
            active={isActive(0, 1)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.898858,-0.0453278,0.0503642,0.998731,47.1874,-43.323)"
            extraLabelTransform="matrix(0.998731,-0.0503642,0.0503642,0.998731,35.0405,-53.8762)"
            shape="M154.425 77.174s24.14-5.795 45.677-8.967c2.057-.303 2.741.508 2.81 3.163l1.844 72.323c.066 2.654-.307 3.038-2.96 3.173l-43.964 2.251c-2.65.137-3.035-.929-3.171-3.581l-3.308-64.47c-.135-2.652.007-3.167 3.072-3.892z"
          />
          <Key
            row="0"
            col="0"
            x="116"
            y="177.877"
            layer={this.props.index}
            label={getLabel(0, 0)}
            active={isActive(0, 0)}
            onClick={this.props.onKeySelect}
            primaryLabelTransform="matrix(0.898948,-0.0434984,0.0483315,0.998831,-10.1108,-38.7231)"
            extraLabelTransform="matrix(0.998831,-0.0483315,0.0483315,0.998831,-22.2362,-49.3009)"
            shape="M138.01 82.024c-8.03 2.594-18.808 6.055-25.215 9.573-11.787 6.465-14.678 14.842-15.14 22.023l-2.267 35.37c-.17 2.648.486 3.276 3.139 3.14l42.869-2.17c2.65-.135 2.945-1.182 2.806-3.834l-3.214-61.916c-.136-2.65-1.508-2.66-2.979-2.186z"
          />
        </g>
      </svg>
    );
  }
}
export default Layer;
