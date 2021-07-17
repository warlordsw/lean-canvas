let isCreated = false

export const newDataIdNumber = async (dispatch, firebase) => {
  if (isCreated === false) {
    const newData = await firebase.firestore().collection('Canvas').doc()
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
    console.log(newDataId, 'action')
    dispatch({
      type: 'NEW_DATA_ID',
      payload: newDataId,
    })
    isCreated = true
  }
}
