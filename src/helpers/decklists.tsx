import { setTranslations } from "../packages/pokemon/Sets";
import { Card, CardList } from "../types";

const transformList = (listString: string): [CardList, string[]] => {
  const splitArray = listString.replace(/\r/g, "").split(/\n/);
  const listErrors = [];
  let totalCount = 0;
  const cardListHash: CardList = [];
  splitArray.forEach(cardString => {
    const cardItems = cardString.split(" ");
    const count = Number(cardItems.shift());
    if (!count) {
      return undefined;
    } else {
      totalCount += count;
      if (cardItems.slice(-1)[0] === "PH") {
        cardItems.splice(-1);
      } // silly reverse indication from Live
      let [cardName, apiSetId] = Array(3).fill("");
      const [setCode, setNumber] = cardItems.splice(-2);
      cardName = cardItems.join(" ");
      apiSetId = setCode === "Energy" ? "sve" : setTranslations[setCode] || "";
      if (setCode === "TEF") apiSetId = "sv5";
      const card: Card = {
        setNumber: setNumber,
        setId: setCode,
        name: cardName,
        apiSetId: apiSetId,
      };
      cardListHash.push({
        count: count,
        card: card,
      });
    }
  });
  if (!(totalCount === 60)) {
    listErrors.push(`Deck is missing ${60 - totalCount} cards!`);
  }
  return [cardListHash, listErrors];
};

export { transformList };
