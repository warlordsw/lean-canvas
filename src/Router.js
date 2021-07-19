import React, { useContext, useEffect } from 'react'
import FirebaseContext from './context/firebase'
import { useHistory } from 'react-router-dom'
import { useCanvasState, useDispatch } from './context/context'
import { newDataIdNumber } from './context/action'

const Router = (props) => {
  const canvasData = useContext(FirebaseContext)
  const dispatch = useDispatch()
  const { newDataRealTimeId } = useCanvasState()

  const history = useHistory()
  useEffect(() => {
    const createDatabase = async () => {
      await newDataIdNumber(dispatch, canvasData.firebase)
      history.push(`/${newDataRealTimeId}`)
    }

    createDatabase()
  }, [canvasData, history, dispatch, newDataRealTimeId])

  return <div>{newDataRealTimeId}</div>
}

export default Router
