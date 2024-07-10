import React, { useContext, useLayoutEffect, useState } from "react";
import { FlatList } from "react-native";
import { Box, HStack, Select } from "native-base";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

import { DeckListTabParamList, MainTabParamList } from "../../../../types/RouteParams";
import { DeckMatchHistory } from "../../../../components/decks/DeckMatchHistory";
import { Header } from "../../../../components/layout/Header";
import { DetailsHeader } from "./DetailsHeader";
import { TranslationContext } from "../../../../contexts/TranslationContext";
import { DeckDetailsStyle } from "../../../../styles/decks/DeckDetailsStyle";
import { Colors } from "../../../../styles/variables";
import { Button } from "../../../../components/layout/Button";

export const DeckDetails = () => {
  const user = auth().currentUser;
  const { params } = useRoute<RouteProp<DeckListTabParamList, "DeckDetails">>();
  const { deck } = params;
  const [limit, setLimit] = useState(5);

  const { t } = useContext(TranslationContext);
  const { navigate } = useNavigation<MainTabParamList>();

  useLayoutEffect(() => {}, [limit]);

  return (
    <FlatList
      style={DeckDetailsStyle.container}
      data={[deck]}
      renderItem={() => (
        <Box>
          <HStack display="flex" alignItems="center">
            <Box width="33%" />
            <Header maxWidth="40%" minWidth="33%" header="h2">
              {t("DECK.DECK_DETAILS.RECENT_RESULTS")}
            </Header>
            <Box width="33%">
              <Select
                minW="65%"
                onValueChange={value => setLimit(Number(value))}
                marginLeft="auto"
                borderWidth={0}
                selectedValue={`${limit}`}
                bgColor={Colors.white}>
                <Select.Item label="5" value="5" />
                <Select.Item label="10" value="10" />
              </Select>
            </Box>
          </HStack>
          <Box style={DeckDetailsStyle.historyContainerWrapper}>
            <Box style={DeckDetailsStyle.historyContainer}>
              <DeckMatchHistory exportable paginated deck={deck} limit={limit} />
            </Box>
          </Box>
        </Box>
      )}
      ListHeaderComponent={DetailsHeader({ deck, user: user! })}
      ListFooterComponent={
        <Box style={DeckDetailsStyle.formButtonContainer} marginX="auto">
          <Button
            text={t("DECK.DECK_DETAILS.ACTIVE_DECK.ADD_RESULT")}
            colorScheme="secondary"
            style={DeckDetailsStyle.formButton}
            onPress={() => navigate("Landing", { selectedDeck: deck })}
          />
        </Box>
      }
    />
  );
};
