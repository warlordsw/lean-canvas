import React, { useContext } from 'react'
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
}) => {
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

  return (
    <form onSubmit={handleChannels} className='flex flex-col addHeightTwo'>
      <div className='text-xl p-3 mx-2 bg-base-200 text-center'>CHANNELS</div>
      <div className=' bg-base-200 mx-2 h-full overflow-y-auto'>
        {channels.map((item, key) => {
          return (
            <div key={key} className='bg-base-300 deldiv'>
              <div className='flex flex-grow'>{item.data}</div>
              <button
                type='button'
                onClick={() => delSpecificChannels(item.id)}
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
          <input
            value={data.channels}
            onChange={(e) => setData({ ...data, channels: e.target.value })}
            className='btn w-full'
            placeholder='+'
          ></input>
        </div>
      </div>
      <div className='text-xl p-3 mx-2 mb-2 h-12 bg-base-200 text-center'></div>
    </form>
  )
}

export default Channels
