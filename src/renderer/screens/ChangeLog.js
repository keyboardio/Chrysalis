import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import { PageTitle } from "@renderer/components/PageTitle";
import { ProductStatus } from "@renderer/screens/KeyboardSelect/ProductStatus";
import React from "react";
import { useTranslation } from "react-i18next";

const ChangeLog = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <PageTitle title={t("changelog.title")} />
      <Card sx={{ my: 2 }}>
        <CardContent sx={{ width: "100%", px: 4 }}>
          <ProductStatus />
        </CardContent>
      </Card>
    </Container>
  );
};

export default ChangeLog;
