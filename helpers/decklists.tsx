import { setTranslations } from "../packages/pokemon/Sets"
import { Card, CardList } from "../types"
const transformList = (listString: string): [CardList, string[]] => {
  let splitArray = listString.replace(/\r/g, "").split(/\n/)
  let listErrors = []
  let totalCount = 0
  let cardListHash: CardList = []
  splitArray.forEach(cardString => {
    const cardItems = cardString.split(" ")
    const count = Number(cardItems.shift())
    if (!count) {
      return undefined
    } else {
      totalCount += count
      if (cardItems.slice(-1)[0] === "PH") {
        cardItems.splice(-1)
      } // silly reverse indication from Live
      let [cardCode, cardName, apiSetId] = Array(3).fill("")
      const [setCode, setNumber] = cardItems.splice(-2)
      cardCode = `${setCode} ${setNumber}`
      cardName = cardItems.join(" ")
      apiSetId = setCode === "Energy" ? "sve" : setTranslations[setCode] || ""
      const card: Card = {
        identifier: cardCode,
        setNumber: setNumber,
        setId: setCode,
        name: cardName,
        apiSetId: apiSetId,
        imageApiSlug: `${apiSetId}-${setNumber}`,
      }
      cardListHash.push({ [count]: card })
    }
  })
  if (!(totalCount === 60)) {
    listErrors.push(`Deck is missing ${60 - totalCount} cards!`)
  }
  return [cardListHash, listErrors]
}

export { transformList }
