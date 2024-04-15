import { useTranslation } from "react-i18next";
import React from "react";

import { Header } from "../../components/layout/Header";
import { DeckCreationForm } from "../../components/decks/DeckCreationForm";
import { User } from "../../types";
export const DecksHeader = ({ user }: { user: User }) => {
  const { t } = useTranslation();

  return (
    <>
      <DeckCreationForm user={user} />
      <Header zIndex={-1} header="h2">
        {t("DECKS_SCREEN.SUB_TITLE")}
      </Header>
    </>
  );
};
