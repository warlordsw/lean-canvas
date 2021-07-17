export const initialState = {
  newDataId: '',
  loading: false,
}

export const canvasReducer = (initialState, action) => {
  switch (action.type) {
    case 'NEW_DATA_ID':
      return { ...initialState, newDataId: action.payload }
    default:
      return { ...initialState }
  }
}
