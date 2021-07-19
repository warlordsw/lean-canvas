import 'firebase/database'

let isCreated = false

export const newDataIdNumber = async (dispatch, firebase) => {
  if (isCreated === false) {
    const newData = await firebase.firestore().collection('Canvas').doc()
    const newDataRealTime = await firebase.database().ref().push()
    const newDataId = newData.id
    await newData.set({
      problem: [],
      solution: [],
      key_metrics: [],
      unique_value: [],
      unfair: [],
      channels: [],
      customer_seg: [],
      cost_str: [],
      revenue: [],
    })

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
