import React, { useContext, useState } from 'react'
import FirebaseContext from '../context/firebase'

const CostStr = ({
  cost_str,
  setCost_str,
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

  const handleCostStr = async (e) => {
    e.preventDefault()
    if (!data.cost_str) {
      return
    } else {
      try {
        const newCostStr = {
          data: data.cost_str,
          id: new Date().getTime().toString(),
        }
        setCost_str([...cost_str, newCostStr])
        setData(initialState)
        await updateDatabase(canvasNames[7], cost_str, newCostStr)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const delSpecificCostStr = async (id) => {
    const findData = await canvasData.firebase.database().ref(linkId)
    await findData.update({
      ...baseCanvas,
      cost_str: cost_str.filter((prop) => prop.id !== id),
    })
    setCost_str(cost_str.filter((prop) => prop.id !== id))
    setBaseCanvas({
      ...baseCanvas,
      cost_str: cost_str.filter((prop) => prop.id !== id),
    })
    if (baseCanvas.cost_str.length === 1) {
      findData.set({ ...baseCanvas, cost_str: '' })
    }
  }

  const onFocus = (id) => {
    const specificCostStr = cost_str.find((prop) => prop.id === id)
    setIsEditing(id)
    setInputData(specificCostStr.data)
  }

  const onBlur = async (id) => {
    const specificCostStr = cost_str.find((prop) => prop.id === id)
    setCost_str(
      cost_str.map((item) => {
        if (item.id === specificCostStr.id) {
          return { ...item, data: inputData }
        } else {
          return item
        }
      })
    )
    const findData = await canvasData.firebase.database().ref(linkId)
    await findData.update({
      ...baseCanvas,
      cost_str: cost_str.map((item) => {
        if (item.id === specificCostStr.id) {
          return { ...item, data: inputData }
        } else {
          return item
        }
      }),
    })
  }

  return (
    <div className=' flex flex-col addWidth h-60 '>
      <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
        COST STRUCTURE
      </div>
      <div className=' bg-base-200 h-full overflow-y-auto mx-2'>
        {cost_str.map((item, key) => {
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
                onClick={() => delSpecificCostStr(item.id)}
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
          <form onSubmit={handleCostStr}>
            <input
              onBlur={handleCostStr}
              value={data.cost_str}
              onChange={(e) => setData({ ...data, cost_str: e.target.value })}
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

export default CostStr
