import React, { useContext } from 'react'
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
}) => {
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

  return (
    <form onSubmit={handleUnfair} className='flex flex-col addHeightTwo'>
      <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
        UNFAIR ADVANTAGE
      </div>
      <div className='bg-base-200 h-full mx-2 overflow-y-auto'>
        {unfair.map((item, key) => {
          return (
            <div key={key} className='bg-base-300 deldiv '>
              <div className='flex flex-grow'>{item.data}</div>
              <button
                type='button'
                onClick={() => delSpecificUnfair(item.id)}
                className='btn btn-outline btn-circle btn-xs'
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
            value={data.unfair}
            onChange={(e) => setData({ ...data, unfair: e.target.value })}
            className='btn w-full'
            placeholder='+'
          ></input>
        </div>
      </div>
      <div className='text-xl p-3 mx-2 mb-2 h-12 bg-base-200 text-center'></div>
    </form>
  )
}

export default Unfair
