export const parseString = (input) => {
  //   const { trim = true, removeEmpty = true, allowQuotes = true } = opts
  if (!typeof input === "string") return input
  return input
    .split(",")
    .map((s) => (true ? s.trim() : s))
    .filter((s) => (true ? s !== "" : true))
}

export const parseArray = (input) => {
  if (!Array.isArray(input)) return input
  return input.join(", ")
}
