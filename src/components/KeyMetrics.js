import React, { useContext } from 'react'
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
}) => {
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

  return (
    <form onSubmit={handleKeyMetrics} className='flex flex-col addHeightTwo'>
      <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
        KEY METRICS
      </div>
      <div className='bg-base-200 mx-2 overflow-y-auto h-full'>
        {key_metrics.map((item, key) => {
          return (
            <div key={key} className='bg-base-300 deldiv'>
              <div className='flex flex-grow'>{item.data}</div>
              <button
                type='button'
                onClick={() => delSpecificKeyMetrics(item.id)}
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
            value={data.key_metrics}
            onChange={(e) => setData({ ...data, key_metrics: e.target.value })}
            className='btn w-full'
            placeholder='+'
          ></input>
        </div>
      </div>
      <div className='text-xl p-3 mx-2 mb-2 h-12 bg-base-200 text-center'></div>
    </form>
  )
}

export default KeyMetrics
