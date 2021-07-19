import 'firebase/database'

let isCreated = false

export const newDataIdNumber = async (dispatch, firebase) => {
  if (isCreated === false) {
    const newDataRealTime = await firebase.database().ref().push()
    await newDataRealTime.set({
      problem: '',
      solution: '',
      key_metrics: '',
      unique_value: '',
      unfair: '',
      channels: '',
      customer_seg: '',
      cost_str: '',
      revenue: '',
    })
    const newDataRealTimeId = newDataRealTime.key
    dispatch({
      type: 'NEW_DATA_ID_REQUEST',
    })

    dispatch({
      type: 'NEW_DATA_ID_SUCCESS',
      payload: newDataRealTimeId,
    })

    isCreated = true
  }
}
