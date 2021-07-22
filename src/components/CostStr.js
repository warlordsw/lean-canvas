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

  const editCostStrButton = (id) => {
    const specificCostStr = cost_str.find((prop) => prop.id === id)
    setIsEditing({ editId: id, editing: true, editButtonActive: true })
    setInputData(specificCostStr.data)
  }

  const costStrEditFinished = async (id) => {
    const specificCostStr = cost_str.find((prop) => prop.id === id)
    if (!inputData) {
      return
    } else {
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
      setIsEditing({ editing: false, editButtonActive: false })
    }
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
              {isEditing.editing && isEditing.editId === item.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    costStrEditFinished(item.id)
                  }}
                >
                  <input
                    className='text-black'
                    value={inputData}
                    placeholder='+'
                    onChange={(e) => setInputData(e.target.value)}
                  />
                </form>
              ) : (
                <div className='flex flex-grow'>{item.data}</div>
              )}
              {isEditing.editButtonActive && isEditing.editId === item.id ? (
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
              ) : (
                <div className='flex items-center'>
                  <button
                    type='button'
                    onClick={() => editCostStrButton(item.id)}
                    className='btn btn-circle btn-outline btn-xs '
                  >
                    <svg
                      id='i-edit'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 32 32'
                      fill='#ffffff'
                      stroke='#000000'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                    >
                      <path d='M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z' />
                    </svg>
                  </button>
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
              )}
            </div>
          )
        })}
        <div className='m-2 bg-base-300'>
          <form onSubmit={handleCostStr}>
            <input
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
