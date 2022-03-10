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
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import i18n from "../../i18n";

import Title from "../../component/Title";

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
`;

const WhatsNew = () => {
  const [contentRelease, setContentRelease] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [datePublished, setDatePublished] = React.useState(null);
  let dateOptions = { year: "numeric", month: "long", day: "numeric" };

  const fetchContentOnClick = () => {
    async function fetchContent(url) {
      try {
        const response = await fetch(url);
        const json = await response.json();
        let d = new Date(json.published_at);
        setDatePublished(d.toLocaleDateString("en-US", dateOptions));
        setContentRelease(json);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchContent(`https://api.github.com/repos/Dygmalab/Bazecor/releases/latest`);
  };

  console.log("TESTING DATE", datePublished, new Date(datePublished));

  return (
    <Style>
      <Accordion className="simpleAccordion" defaultActiveKey="0">
        <Card className="simpleAccordionHeader">
          <Accordion.Toggle as={Card.Header} eventKey="1" onClick={fetchContentOnClick}>
            <div className="accordionHeader">
              <div className="accordionTitle">{i18n.firmwareUpdate.texts.whatsNewTitle}</div>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {loading && !error ? (
                <div className="loading marginCenter">
                  <Spinner className="spinner-border" role="status" />
                </div>
              ) : (
                ""
              )}
              {error ? <div className="error">Error</div> : ""}
              {!loading && (
                <div className="cardContent">
                  <Title text={`${i18n.firmwareUpdate.texts.whatsNewTitleVersion} ${contentRelease.name}`} headingLevel={3} />
                  <Title text={datePublished} headingLevel={5} />
                  <div className="versionContent" dangerouslySetInnerHTML={{ __html: contentRelease.body }} />
                </div>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Style>
  );
};

export default WhatsNew;
