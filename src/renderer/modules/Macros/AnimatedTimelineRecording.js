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
import PropTypes from "prop-types";
import Styled from "styled-components";

const Styles = Styled.div`
.marquee {
    position: relative;
    overflow: hidden;
    --offset: 20vw;
    --move-initial: calc(-25% + var(--offset));
    --move-final: calc(-50% + var(--offset));
    z-index: 2;
}
.marqueeInner {
    width: fit-content;
    display: flex;
    position: relative;
    transform: translate3d(var(--move-initial), 0, 0);
    animation: marquee 8s linear infinite;
    animation-play-state: paused;
}
.blockRect {
    display: flex;
    align-items: center;
    height: 24px;
}
.recBar {
    background-color:  ${({ theme }) => theme.styles.macro.timelineBarBackground};;
    width: 2px;
    height: 4px;
    border-radius: 2px;
    margin: auto 2px;
    transition: 300ms height;
    transition-timing-function: cubic-bezier(.95,0,.17,1);
    
}
&.isRecording {
    .marquee .marqueeInner {
        animation-play-state: running;
    }
    .recBar {
      height: 8px;
    }
    .recBar.recBarSeparator {
        height: 16px;
    }
}


@keyframes marquee {
    0% {
        transform: translate3d(var(--move-initial), 0, 0);
    }

    100% {
        transform: translate3d(var(--move-final), 0, 0);
    }
}
`;

const AnimatedTimelineRecording = ({ isRecording }) => {
  let generateBars = "";
  for (let i = 1; i < 30; i++) {
    for (let i = 1; i < 5; i++) {
      generateBars = `${generateBars}<div class="recBar"></div>`;
    }
    generateBars = `${generateBars}<div class="recBar recBarSeparator"></div>`;
  }

  if (generateBars === undefined) return null;
  return (
    <Styles className={`AnimatedTimelineRecording ${isRecording ? "isRecording" : "noRecording"}`}>
      <div className="marquee">
        <div className="marqueeInner">
          <div className={"blockRect"} dangerouslySetInnerHTML={{ __html: generateBars }} />
          <div className={"blockRect"} dangerouslySetInnerHTML={{ __html: generateBars }} />
          <div className={"blockRect"} dangerouslySetInnerHTML={{ __html: generateBars }} />
          <div className={"blockRect"} dangerouslySetInnerHTML={{ __html: generateBars }} />
        </div>
      </div>
    </Styles>
  );
};

AnimatedTimelineRecording.propTypes = {
  isRecording: PropTypes.bool
};

export default AnimatedTimelineRecording;
