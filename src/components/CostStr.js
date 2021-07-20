import React, { useContext } from 'react'
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
}) => {
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

  return (
    <form onSubmit={handleCostStr} className=' flex flex-col addWidth h-60 '>
      <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
        COST STRUCTURE
      </div>
      <div className=' bg-base-200 h-full overflow-y-auto mx-2'>
        {cost_str.map((item, key) => {
          return (
            <div key={key} className='bg-base-300 deldiv'>
              <div className='flex flex-grow'>{item.data}</div>
              <button
                type='button'
                onClick={() => delSpecificCostStr(item.id)}
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
            value={data.cost_str}
            onChange={(e) => setData({ ...data, cost_str: e.target.value })}
            className='btn w-full'
            placeholder='+'
          ></input>
        </div>
      </div>
      <div className='text-xl p-3 mx-2 mb-2 h-12 bg-base-200 text-center'></div>
    </form>
  )
}

export default CostStr
