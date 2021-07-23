import React, { useContext, useState } from 'react'
import FirebaseContext from '../context/firebase'

const Channels = ({
  channels,
  setChannels,
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

  const handleChannels = async (e) => {
    e.preventDefault()
    if (!data.channels) {
      return
    } else {
      try {
        const newChannels = {
          data: data.channels,
          id: new Date().getTime().toString(),
        }
        setChannels([...channels, newChannels])
        setData(initialState)
        await updateDatabase(canvasNames[5], channels, newChannels)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const delSpecificChannels = async (id) => {
    const findData = await canvasData.firebase.database().ref(linkId)
    await findData.update({
      ...baseCanvas,
      channels: channels.filter((prop) => prop.id !== id),
    })
    setChannels(channels.filter((prop) => prop.id !== id))
    setBaseCanvas({
      ...baseCanvas,
      channels: channels.filter((prop) => prop.id !== id),
    })
    if (baseCanvas.channels.length === 1) {
      findData.set({ ...baseCanvas, channels: '' })
    }
  }

  const onFocus = (id) => {
    const specificChannel = channels.find((prop) => prop.id === id)
    setIsEditing(id)
    setInputData(specificChannel.data)
  }

  const onBlur = async (id) => {
    const specificChannel = channels.find((prop) => prop.id === id)
    setChannels(
      channels.map((item) => {
        if (item.id === specificChannel.id) {
          return { ...item, data: inputData }
        } else {
          return item
        }
      })
    )
    const findData = await canvasData.firebase.database().ref(linkId)
    await findData.update({
      ...baseCanvas,
      channels: channels.map((item) => {
        if (item.id === specificChannel.id) {
          return { ...item, data: inputData }
        } else {
          return item
        }
      }),
    })
  }

  return (
    <div className='flex flex-col addHeightTwo'>
      <div className='text-xl p-3 mx-2 bg-base-200 text-center'>CHANNELS</div>
      <div className=' bg-base-200 mx-2 h-full overflow-y-auto'>
        {channels.map((item, key) => {
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
                onClick={() => delSpecificChannels(item.id)}
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
          <form onSubmit={handleChannels}>
            <input
              onBlur={handleChannels}
              value={data.channels}
              onChange={(e) => setData({ ...data, channels: e.target.value })}
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

export default Channels
