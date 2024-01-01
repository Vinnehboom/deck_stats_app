import Sets from "../packages/pokemon/Sets"

const transformList = listString => {
  let splitArray = listString.replace(/\r/g, "").split(/\n/)
  let listErrors = []
  let totalCount = 0
  let cardListHash = splitArray.reduce((acc, cardString) => {
    const cardItems = cardString.split(" ")
    const count = parseInt(cardItems.shift(), 10)
    if (!count) {
      return { ...acc }
    } else {
      totalCount += count
      if (cardItems.slice(-1)[0] === "PH") {
        cardItems.splice(-1)
      } // silly reverse indication from Live
      let [cardCode, cardName, setId] = Array(3).fill("")
      const [setCode, setNumber] = cardItems.splice(-2)
      cardCode = `${setCode} ${setNumber}`
      cardName = cardItems.join(" ")
      setId = setCode === "Energy" ? "sve" : Sets[setCode] || ""
      return {
        ...acc,
        [cardCode]: { setId: setId, name: cardName, count: count },
      }
    }
  }, {})
  if (!(totalCount === 60)) {
    listErrors.push(`Deck is missing ${60 - totalCount} cards!`)
  }
  return [cardListHash, listErrors]
}

export { transformList }
