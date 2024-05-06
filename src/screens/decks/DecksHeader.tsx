import React, { useContext } from "react";

import { Header } from "../../components/layout/Header";
import { DeckCreationForm } from "../../components/decks/DeckCreationForm";
import { User } from "../../types";
import { TranslationContext } from "../../contexts/TranslationContext";
export const DecksHeader = ({ user }: { user: User }) => {
  const { t } = useContext(TranslationContext);

  return (
    <>
      <DeckCreationForm user={user} />
      <Header zIndex={-9999} paddingY={6} header="h2">
        {t("DECKS_SCREEN.SUB_TITLE")}
      </Header>
    </>
  );
};
