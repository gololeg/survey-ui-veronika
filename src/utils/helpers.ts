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
