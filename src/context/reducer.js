export const initialState = {
  newDataRealTimeId: '',
}

export const canvasReducer = (initialState, action) => {
  switch (action.type) {
    case 'NEW_DATA_ID_REQUEST':
      return {
        ...initialState,
      }
    case 'NEW_DATA_ID_SUCCESS':
      return {
        ...initialState,
        newDataRealTimeId: action.payload,
      }
    default:
      return { ...initialState }
  }
}
