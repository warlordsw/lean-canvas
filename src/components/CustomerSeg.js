import React, { useContext } from 'react'
import FirebaseContext from '../context/firebase'

const CustomerSeg = ({
  customer_seg,
  setCustomer_seg,
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

  const handleCustomerSeg = async (e) => {
    e.preventDefault()
    if (!data.customer_seg) {
      return
    } else {
      try {
        const newCustomerSeg = {
          data: data.customer_seg,
          id: new Date().getTime().toString(),
        }
        setCustomer_seg([...customer_seg, newCustomerSeg])
        setData(initialState)
        await updateDatabase(canvasNames[6], customer_seg, newCustomerSeg)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const delSpecificCustomerSeg = async (id) => {
    const findData = await canvasData.firebase.database().ref(linkId)
    await findData.update({
      ...baseCanvas,
      customer_seg: customer_seg.filter((prop) => prop.id !== id),
    })
    setCustomer_seg(customer_seg.filter((prop) => prop.id !== id))
    setBaseCanvas({
      ...baseCanvas,
      customer_seg: customer_seg.filter((prop) => prop.id !== id),
    })
    if (baseCanvas.customer_seg.length === 1) {
      findData.set({ ...baseCanvas, customer_seg: '' })
    }
  }

  return (
    <form onSubmit={handleCustomerSeg} className='flex flex-col w-64 addHeight'>
      <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
        CUSTOMER SEGMENTS
      </div>
      <div className='bg-base-200 h-full mx-2 overflow-y-auto'>
        {customer_seg.map((item, key) => {
          return (
            <div key={key} className='bg-base-300 deldiv'>
              <div className='flex flex-grow'>{item.data}</div>
              <button
                type='button'
                onClick={() => delSpecificCustomerSeg(item.id)}
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
            value={data.customer_seg}
            onChange={(e) => setData({ ...data, customer_seg: e.target.value })}
            className='btn w-full'
            placeholder='+'
          ></input>
        </div>
      </div>
      <div className='text-xl p-3 mx-2 mb-2 h-12 bg-base-200 text-center'></div>
    </form>
  )
}

export default CustomerSeg
