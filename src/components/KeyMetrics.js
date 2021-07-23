import React, { useContext, useState } from 'react'
import FirebaseContext from '../context/firebase'

const KeyMetrics = ({
  key_metrics,
  setKey_metrics,
  data,
  setData,
  initialState,
  updateDatabase,
  canvasNames,
  linkId,
  baseCanvas,
  setBaseCanvas,
  isEditing,
  setIsEditing,
}) => {
  const [inputData, setInputData] = useState('')
  const canvasData = useContext(FirebaseContext)
  const handleKeyMetrics = async (e) => {
    e.preventDefault()
    if (!data.key_metrics) {
      return
    } else {
      try {
        const newKeyMetrics = {
          data: data.key_metrics,
          id: new Date().getTime().toString(),
        }
        setKey_metrics([...key_metrics, newKeyMetrics])
        setData(initialState)
        await updateDatabase(canvasNames[2], key_metrics, newKeyMetrics)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const delSpecificKeyMetrics = async (id) => {
    const findData = await canvasData.firebase.database().ref(linkId)
    await findData.update({
      ...baseCanvas,
      key_metrics: key_metrics.filter((prop) => prop.id !== id),
    })
    setKey_metrics(key_metrics.filter((prop) => prop.id !== id))
    setBaseCanvas({
      ...baseCanvas,
      key_metrics: key_metrics.filter((prop) => prop.id !== id),
    })
    if (baseCanvas.key_metrics.length === 1) {
      findData.set({ ...baseCanvas, key_metrics: '' })
    }
  }

  const onFocus = (id) => {
    const specificKeyMetrics = key_metrics.find((prop) => prop.id === id)
    setIsEditing(id)
    setInputData(specificKeyMetrics.data)
  }

  const onBlur = async (id) => {
    const specificKeyMetrics = key_metrics.find((prop) => prop.id === id)
    setKey_metrics(
      key_metrics.map((item) => {
        if (item.id === specificKeyMetrics.id) {
          return { ...item, data: inputData }
        } else {
          return item
        }
      })
    )
    const findData = await canvasData.firebase.database().ref(linkId)
    await findData.update({
      ...baseCanvas,
      key_metrics: key_metrics.map((item) => {
        if (item.id === specificKeyMetrics.id) {
          return { ...item, data: inputData }
        } else {
          return item
        }
      }),
    })
  }

  return (
    <div className='flex flex-col addHeightTwo'>
      <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
        KEY METRICS
      </div>
      <div className='bg-base-200 mx-2 overflow-y-auto h-full'>
        {key_metrics.map((item, key) => {
          return (
            <div key={key} className='bg-base-300 deldiv'>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  onBlur(item.id)
                }}
              >
                {isEditing === item.id ? (
                  <input
                    onBlur={() => onBlur(item.id)}
                    onFocus={() => onFocus(item.id)}
                    id='denemee'
                    type='text'
                    className='bg-base-300 outline-none'
                    value={inputData}
                    placeholder='+'
                    onChange={(e) => setInputData(e.target.value)}
                  />
                ) : (
                  <input
                    onBlur={() => onBlur(item.id)}
                    onFocus={() => onFocus(item.id)}
                    type='text'
                    className='bg-base-300 outline-none'
                    value={item.data}
                    placeholder='+'
                    onChange={(e) => setInputData(e.target.value)}
                  />
                )}
              </form>
              <button
                type='button'
                onClick={() => delSpecificKeyMetrics(item.id)}
                className='btn btn-outline btn-circle btn-xs ml-1'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block w-4 h-4 stroke-current'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              </button>
            </div>
          )
        })}
        <div className='m-2 bg-base-300'>
          <form onSubmit={handleKeyMetrics}>
            <input
              onBlur={handleKeyMetrics}
              value={data.key_metrics}
              onChange={(e) =>
                setData({ ...data, key_metrics: e.target.value })
              }
              className='btn w-full'
              placeholder='+'
            ></input>
          </form>
        </div>
      </div>
      <div className='text-xl p-3 mx-2 mb-2 h-12 bg-base-200 text-center'></div>
    </div>
  )
}

export default KeyMetrics
