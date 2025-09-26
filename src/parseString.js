export const parseString = (input) => {
  //   const { trim = true, removeEmpty = true, allowQuotes = true } = opts
  return input
    .split(",")
    .map((s) => (true ? s.trim() : s))
    .filter((s) => (true ? s !== "" : true))
}
