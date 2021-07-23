import React, { useContext, useState } from 'react'
import FirebaseContext from '../context/firebase'

const Problem = ({
  problem,
  setProblem,
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

  const handleProblem = async (e) => {
    e.preventDefault()
    if (!data.problem) {
      console.log('data.problem yok')
      return
    } else {
      try {
        const newProblem = {
          data: data.problem,
          id: new Date().getTime().toString(),
        }
        setProblem([...problem, newProblem])
        setData(initialState)
        await updateDatabase(canvasNames[0], problem, newProblem)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const delSpecificProblem = async (id) => {
    const findData = await canvasData.firebase.database().ref(linkId)
    await findData.update({
      ...baseCanvas,
      problem: problem.filter((prop) => prop.id !== id),
    })
    setProblem(problem.filter((prop) => prop.id !== id))
    setBaseCanvas({
      ...baseCanvas,
      problem: problem.filter((prop) => prop.id !== id),
    })
    if (baseCanvas.problem.length === 1) {
      findData.child('problem').remove()
      findData.set({ ...baseCanvas, problem: '' })
    }
  }

  const onFocus = (id) => {
    const specificProblem = problem.find((prop) => prop.id === id)
    setIsEditing(id)
    setInputData(specificProblem.data)
  }

  const onBlur = async (id) => {
    const specificProblem = problem.find((prop) => prop.id === id)
    setProblem(
      problem.map((item) => {
        if (item.id === specificProblem.id) {
          return { ...item, data: inputData }
        } else {
          return item
        }
      })
    )
    const findData = await canvasData.firebase.database().ref(linkId)
    await findData.update({
      ...baseCanvas,
      problem: problem.map((item) => {
        if (item.id === specificProblem.id) {
          return { ...item, data: inputData }
        } else {
          return item
        }
      }),
    })
  }

  return (
    <div className=' flex flex-col w-64 addHeight'>
      <div className='text-xl p-3 mx-2 bg-base-200 text-center'>PROBLEM</div>
      <div className=' bg-base-200 mx-2 h-full overflow-y-auto'>
        {problem.map((item, key) => {
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
                onClick={() => delSpecificProblem(item.id)}
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
          <form onSubmit={handleProblem}>
            <input
              onBlur={handleProblem}
              value={data.problem}
              onChange={(e) => setData({ ...data, problem: e.target.value })}
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

export default Problem
