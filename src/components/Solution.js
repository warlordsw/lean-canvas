import React, { useContext, useState } from 'react'
import FirebaseContext from '../context/firebase'

const Solution = ({
  data,
  setData,
  solution,
  setSolution,
  initialState,
  updateDatabase,
  canvasNames,
  baseCanvas,
  setBaseCanvas,
  linkId,
  isEditing,
  setIsEditing,
}) => {
  const [inputData, setInputData] = useState('')
  const canvasData = useContext(FirebaseContext)

  const handleSolution = async (e) => {
    e.preventDefault()
    if (!data.solution) {
      return
    } else {
      try {
        const newSolution = {
          data: data.solution,
          id: new Date().getTime().toString(),
        }
        setSolution([...solution, newSolution])
        setData(initialState)
        await updateDatabase(canvasNames[1], solution, newSolution)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const delSpecificSolution = async (id) => {
    const findData = await canvasData.firebase.database().ref(linkId)
    await findData.update({
      ...baseCanvas,
      solution: solution.filter((prop) => prop.id !== id),
    })
    setSolution(solution.filter((prop) => prop.id !== id))
    setBaseCanvas({
      ...baseCanvas,
      solution: solution.filter((prop) => prop.id !== id),
    })
    if (baseCanvas.solution.length === 1) {
      findData.set({ ...baseCanvas, solution: '' })
    }
  }

  const editSolutionButton = (id) => {
    const specificSolution = solution.find((prop) => prop.id === id)
    setIsEditing({ editId: id, editing: true, editButtonActive: true })
    setInputData(specificSolution.data)
  }

  const solutionEditFinished = async (id) => {
    const specificSolution = solution.find((prop) => prop.id === id)
    setSolution(
      solution.map((item) => {
        if (item.id === specificSolution.id) {
          return { ...item, data: inputData }
        } else {
          return item
        }
      })
    )
    const findData = await canvasData.firebase.database().ref(linkId)
    await findData.update({
      ...baseCanvas,
      solution: solution.map((item) => {
        if (item.id === specificSolution.id) {
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
      <div className='text-xl p-3 mx-2 bg-base-200 text-center'>SOLUTION</div>
      <div className=' bg-base-200 mx-2 overflow-y-auto h-full'>
        {solution.map((item, key) => {
          return (
            <div key={key} className='bg-base-300 deldiv'>
              {isEditing.editing && isEditing.editId === item.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    solutionEditFinished(item.id)
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
                  onClick={() => delSpecificSolution(item.id)}
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
                    onClick={() => editSolutionButton(item.id)}
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
                    onClick={() => delSpecificSolution(item.id)}
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
          <form onSubmit={handleSolution}>
            <input
              value={data.solution}
              onChange={(e) => setData({ ...data, solution: e.target.value })}
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

export default Solution
