import React, { useContext, useState } from "react";
import { MinusIcon, AddIcon, Box } from "native-base";

import { Button } from "../../../../components/layout/Button";
import { Colors } from "../../../../styles/variables";
import { ElevatedContainer } from "../../../../components/layout/ElevatedContainer";
import { Header } from "../../../../components/layout/Header";
import { MatchRecordForm } from "../../../../components/matchRecords/MatchRecordForm";
import { Deck, List } from "../../../../types";
import { TranslationContext } from "../../../../contexts/TranslationContext";
export const DetailsFooter = ({ deck, lists }: { deck: Deck; lists: List[] }) => {
  const { t } = useContext(TranslationContext);
  const [showForm, setshowForm] = useState(false);

  return (
    <>
      <Button
        leftIcon={showForm ? <MinusIcon /> : <AddIcon />}
        text={showForm ? t("DECK.DECK_DETAILS.RECORD_FORM.HIDE") : t("DECK.DECK_DETAILS.RECORD_FORM.SHOW")}
        marginY={5}
        alignSelf="center"
        onPress={() => setshowForm(!showForm)}
      />
      {showForm ? (
        <ElevatedContainer marginBottom={6} style={{ backgroundColor: Colors.light }}>
          <Header header="h2">{t("DECK.DECK_DETAILS.RECORD_FORM.TITLE")}</Header>
          <Box left={-9}>
            <MatchRecordForm bo1={true} started={true} deck={deck} lists={lists} />
          </Box>
        </ElevatedContainer>
      ) : null}
    </>
  );
};
