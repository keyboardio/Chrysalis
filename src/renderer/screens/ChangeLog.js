import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { PageTitle } from "@renderer/components/PageTitle";
import logo from "@renderer/logo-small.png";
import pkg from "@root/package.json";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

const version = pkg.version;

const ChangeLog = (props) => {
  const { classes } = props;
  const { t } = useTranslation();

  const [data, setData] = useState("");

  useEffect(() => {
    // Assuming you have the absolute path for the file, replace it accordingly
    const changelogFile = "/assets/NEWS.md";

    fetch(changelogFile)
      .then((response) => response.text())
      .then((text) => {
        setData(text);
      })
      .catch((error) => {
        console.error("An error occurred while fetching the changelog:", error);
      });
  }, []);

  return (
    <Container>
      <PageTitle title={t("changelog.title")} />
      <Card sx={{ my: 2 }}>
        <CardHeader
          avatar={<img src={logo} alt={t("components.logo.altText")} />}
          title="Chrysalis"
          subheader={version}
        />
        <CardContent>
          <ReactMarkdown
            components={{
              h1({ node, ...props }) {
                return (
                  <Typography component="h1" variant="h1" sx={{ textDecoration: "underline" }}>
                    {node.children[0].value}
                  </Typography>
                );
              },
            }}
          >
            {data}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ChangeLog;
