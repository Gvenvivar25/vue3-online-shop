export function transform(data) {
  const result = Object.keys(data).map(key => {
    return {...data[key], id: key}
  })
  return data ? result : []
}