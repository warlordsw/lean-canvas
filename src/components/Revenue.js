import React, { useContext } from 'react'
import FirebaseContext from '../context/firebase'

const Revenue = ({
  revenue,
  setRevenue,
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

  const handleRevenue = async (e) => {
    e.preventDefault()
    if (!data.revenue) {
      return
    } else {
      try {
        const newRevenue = {
          data: data.revenue,
          id: new Date().getTime().toString(),
        }
        setRevenue([...revenue, newRevenue])
        setData(initialState)
        await updateDatabase(canvasNames[8], revenue, newRevenue)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const delSpecificRevenue = async (id) => {
    const findData = await canvasData.firebase.database().ref(linkId)
    await findData.update({
      ...baseCanvas,
      revenue: revenue.filter((prop) => prop.id !== id),
    })
    setRevenue(revenue.filter((prop) => prop.id !== id))
    setBaseCanvas({
      ...baseCanvas,
      revenue: revenue.filter((prop) => prop.id !== id),
    })
    if (baseCanvas.revenue.length === 1) {
      findData.set({ ...baseCanvas, revenue: '' })
    }
  }

  return (
    <form onSubmit={handleRevenue} className='flex flex-col addWidth  h-60'>
      <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
        REVENUE STREAMS
      </div>
      <div className=' bg-base-200 mx-2  h-full overflow-y-auto'>
        {revenue.map((item, key) => {
          return (
            <div key={key} className='bg-base-300 deldiv'>
              <div className='flex flex-grow'>{item.data}</div>
              <button
                type='button'
                onClick={() => delSpecificRevenue(item.id)}
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
            value={data.revenue}
            onChange={(e) => setData({ ...data, revenue: e.target.value })}
            className='btn w-full'
            placeholder='+'
          ></input>
        </div>
      </div>
      <div className='text-xl p-3 mx-2 mb-2 h-12 bg-base-200 text-center'></div>
    </form>
  )
}

export default Revenue
