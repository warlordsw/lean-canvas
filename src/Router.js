import React, { useContext, useEffect } from 'react'
import FirebaseContext from './context/firebase'
import { useHistory } from 'react-router-dom'
import { useCanvasState, useDispatch } from './context/context'
import { newDataIdNumber } from './context/action'

//export let newDataId

const Router = () => {
  const canvasData = useContext(FirebaseContext)
  const dispatch = useDispatch()
  const { newDataId } = useCanvasState()
  //console.log(useCanvasState())

  const history = useHistory()
  useEffect(() => {
    const createDatabase = async () => {
      await newDataIdNumber(dispatch, canvasData.firebase)
      //const newData = await firebase.firestore().collection('Canvas').doc()
      //await newData.set({})
      // newDataId = newData.id
      history.push(`/${newDataId}`)
    }

    createDatabase()
  }, [canvasData, history, dispatch, newDataId])

  return <div>{newDataId}</div>
}

export default Router
