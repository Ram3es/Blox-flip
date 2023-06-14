export const loadImage = (list: string[], callback: Function) => {
  let loadedImages = 0
  list.forEach(src => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      loadedImages++
      if (loadedImages === list.length) {
        callback()
      }
    }
  })
}
