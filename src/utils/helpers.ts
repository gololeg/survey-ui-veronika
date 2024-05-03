export const getLevelId = (value: string) => {
  switch (value) {
    case 'HIGH':
      return 3
    case 'MIDDLE':
      return 2
    case 'LOW':
      return 1
    default:
      return 1
  }
}

export const getTypeId = (value: string) => {
  switch (value) {
    case 'RADIO':
      return 2
    case 'CHECKBOX':
      return 1
    default:
      return 2
  }
}

export function getImageFormat(base64String: string) {
  const byteCharacters = atob(base64String)
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)

  const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10]
  const jpegSignature = [255, 216, 255, 224]
  let imgType = ''

  if (
    byteArray.length >= pngSignature.length &&
    Array.prototype.every.call(pngSignature, function (elem, i) {
      return elem === byteArray[i]
    })
  ) {
    imgType = 'png'
  } else if (
    byteArray.length >= jpegSignature.length &&
    Array.prototype.every.call(jpegSignature, function (elem, i) {
      return elem === byteArray[i]
    })
  ) {
    imgType = 'jpeg'
  }

  return `data:${imgType};base64,${base64String}`
}
