import React, { useContext, useState } from 'react'
import FirebaseContext from '../context/firebase'

const Unfair = ({
  unfair,
  setUnfair,
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

  const handleUnfair = async (e) => {
    e.preventDefault()
    if (!data.unfair) {
      return
    } else {
      try {
        const newUnfair = {
          data: data.unfair,
          id: new Date().getTime().toString(),
        }
        setUnfair([...unfair, newUnfair])
        setData(initialState)
        await updateDatabase(canvasNames[4], unfair, newUnfair)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const delSpecificUnfair = async (id) => {
    const findData = await canvasData.firebase.database().ref(linkId)
    await findData.update({
      ...baseCanvas,
      unfair: unfair.filter((prop) => prop.id !== id),
    })
    setUnfair(unfair.filter((prop) => prop.id !== id))
    setBaseCanvas({
      ...baseCanvas,
      unfair: unfair.filter((prop) => prop.id !== id),
    })
    if (baseCanvas.unfair.length === 1) {
      findData.set({ ...baseCanvas, unfair: '' })
    }
  }

  const editUnfairButton = (id) => {
    const specificUnfair = unfair.find((prop) => prop.id === id)
    setIsEditing({ editId: id, editing: true, editButtonActive: true })
    setInputData(specificUnfair.data)
  }

  const unfairEditFinished = async (id) => {
    const specificUnfair = unfair.find((prop) => prop.id === id)
    setUnfair(
      unfair.map((item) => {
        if (item.id === specificUnfair.id) {
          return { ...item, data: inputData }
        } else {
          return item
        }
      })
    )
    const findData = await canvasData.firebase.database().ref(linkId)
    await findData.update({
      ...baseCanvas,
      unfair: unfair.map((item) => {
        if (item.id === specificUnfair.id) {
          return { ...item, data: inputData }
        } else {
          return item
        }
      }),
    })
    setIsEditing({ editing: false, editButtonActive: false })
  }

  return (
    <div className='flex flex-col addHeightTwo'>
      <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
        UNFAIR ADVANTAGE
      </div>
      <div className='bg-base-200 h-full mx-2 overflow-y-auto'>
        {unfair.map((item, key) => {
          return (
            <div key={key} className='bg-base-300 deldiv '>
              {isEditing.editing && isEditing.editId === item.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    unfairEditFinished(item.id)
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
                  onClick={() => delSpecificUnfair(item.id)}
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
                <div className='flex items-center justify-center'>
                  <button
                    type='button'
                    onClick={() => editUnfairButton(item.id)}
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
                    onClick={() => delSpecificUnfair(item.id)}
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
          <form onSubmit={handleUnfair}>
            <input
              value={data.unfair}
              onChange={(e) => setData({ ...data, unfair: e.target.value })}
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

export default Unfair
