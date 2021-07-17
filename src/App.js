import React, { useContext, useEffect, useState } from 'react'
import { useCanvasState } from './context/context'
import FirebaseContext from './context/firebase'

const initialState = {
  problem: [],
  solution: [],
  key_metrics: [],
  unique_value: [],
  unfair: [],
  channels: [],
  customer_seg: [],
  cost_str: [],
  revenue: [],
}

const canvasNames = [
  'problem',
  'solution',
  'key_metrics',
  'unique_value',
  'unfair',
  'channels',
  'customer_seg',
  'cost_str',
  'revenue',
]

let result = ''

const App = (props) => {
  const { newDataId } = useCanvasState()
  // const [list, setList] = useState(initialState)
  // console.log(list.problem)
  //console.log(newDataId, 'newDataIdApp')
  let linkId = props.location.pathname.substring(1)
  const canvasData = useContext(FirebaseContext)

  const [baseCanvas, setBaseCanvas] = useState(initialState)
  const [data, setData] = useState(initialState)
  const [problem, setProblem] = useState([])
  const [solution, setSolution] = useState([])
  const [key_metrics, setKey_metrics] = useState([])
  const [unique_value, setUnique_value] = useState([])
  const [unfair, setUnfair] = useState([])
  const [channels, setChannels] = useState([])
  const [customer_seg, setCustomer_seg] = useState([])
  const [cost_str, setCost_str] = useState([])
  const [revenue, setRevenue] = useState([])
  // const updateDatabase = async (firebase) => {
  //   if (newDataId) {
  //     await firebase.firestore().collection('Canvas').doc(newDataId).set({
  //       problem: problem,
  //       solution: solution,
  //       key_metrics: key_metrics,
  //       unique_value: unique_value,
  //       unfair: unfair,
  //       channels: channels,
  //       customer_seg: customer_seg,
  //       cost_str: cost_str,
  //       revenue: revenue,
  //     })
  //   }

  //   await firebase.firestore().collection('Canvas').doc(linkId).set({
  //     problem: problem,
  //     solution: solution,
  //     key_metrics: key_metrics,
  //     unique_value: unique_value,
  //     unfair: unfair,
  //     channels: channels,
  //     customer_seg: customer_seg,
  //     cost_str: cost_str,
  //     revenue: revenue,
  //   })
  // }

  const updateDatabase = async (varA, varB, newProblem) => {
    if (newDataId) {
      await canvasData.firebase
        .firestore()
        .collection('Canvas')
        .doc(newDataId)
        .set({ ...baseCanvas, [varA]: [...varB, newProblem] })
      setBaseCanvas({ ...baseCanvas, [varA]: [...varB, newProblem] })
    }
    await canvasData.firebase
      .firestore()
      .collection('Canvas')
      .doc(linkId)
      .set({ ...baseCanvas, [varA]: [...varB, newProblem] })
    setBaseCanvas({ ...baseCanvas, [varA]: [...varB, newProblem] })
  }

  useEffect(() => {
    const getCanvasList = async (firebase) => {
      const snapshot = await firebase
        .firestore()
        .collection('Canvas')
        .doc(linkId)
        .get()
      result = snapshot.data()
      if (
        result.problem ||
        result.solution ||
        result.key_metrics ||
        result.unique_value ||
        result.unfair ||
        result.channels ||
        result.customer_seg ||
        result.cost_str ||
        result.revenue
      ) {
        setProblem(result.problem)
        setSolution(result.solution)
        setKey_metrics(result.key_metrics)
        setUnique_value(result.unique_value)
        setUnfair(result.unfair)
        setChannels(result.channels)
        setCustomer_seg(result.customer_seg)
        setCost_str(result.cost_str)
        setRevenue(result.revenue)
      }
      return
    }

    getCanvasList(canvasData.firebase)
  }, [canvasData, linkId])

  const handleProblem = async (e) => {
    e.preventDefault()
    if (!data.problem) {
      return
    } else {
      try {
        const newProblem = {
          data: data.problem,
        }
        setProblem([...problem, newProblem])
        setData(initialState)
        await updateDatabase(canvasNames[0], problem, newProblem)
        // if (newDataId) {
        //   await canvasData.firebase
        //     .firestore()
        //     .collection('Canvas')
        //     .doc(newDataId)
        //     .set({ ...initialState, problem: [...problem, newProblem] })
        // }

        // await canvasData.firebase
        //   .firestore()
        //   .collection('Canvas')
        //   .doc(linkId)
        //   .set({ ...initialState, problem: [...problem, newProblem] })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleSolution = async (e) => {
    e.preventDefault()
    if (!data.solution) {
      return
    } else {
      try {
        const newSolution = {
          data: data.solution,
        }
        setSolution([...solution, newSolution])
        setData(initialState)
        await updateDatabase(canvasNames[1], solution, newSolution)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleKeyMetrics = async (e) => {
    e.preventDefault()
    if (!data.key_metrics) {
      return
    } else {
      try {
        const newKeyMetrics = {
          data: data.key_metrics,
        }
        setKey_metrics([...key_metrics, newKeyMetrics])
        setData(initialState)
        await updateDatabase(canvasNames[2], key_metrics, newKeyMetrics)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleUniqueValue = async (e) => {
    e.preventDefault()
    if (!data.unique_value) {
      return
    } else {
      try {
        const newUniqueValue = {
          data: data.unique_value,
        }
        setUnique_value([...unique_value, newUniqueValue])
        setData(initialState)
        await updateDatabase(canvasNames[3], unique_value, newUniqueValue)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleUnfair = async (e) => {
    e.preventDefault()
    if (!data.unfair) {
      return
    } else {
      try {
        const newUnfair = {
          data: data.unfair,
        }
        setUnfair([...unfair, newUnfair])
        setData(initialState)
        await updateDatabase(canvasNames[4], unfair, newUnfair)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleChannels = async (e) => {
    e.preventDefault()
    if (!data.channels) {
      return
    } else {
      try {
        const newChannels = {
          data: data.channels,
        }
        setChannels([...channels, newChannels])
        setData(initialState)
        await updateDatabase(canvasNames[5], channels, newChannels)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleCustomerSeg = async (e) => {
    e.preventDefault()
    if (!data.customer_seg) {
      return
    } else {
      try {
        const newCustomerSeg = {
          data: data.customer_seg,
        }
        setCustomer_seg([...customer_seg, newCustomerSeg])
        setData(initialState)
        await updateDatabase(canvasNames[6], customer_seg, newCustomerSeg)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleCostStr = async (e) => {
    e.preventDefault()
    if (!data.cost_str) {
      return
    } else {
      try {
        const newCostStr = {
          data: data.cost_str,
        }
        setCost_str([...cost_str, newCostStr])
        setData(initialState)
        await updateDatabase(canvasNames[7], cost_str, newCostStr)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleRevenue = async (e) => {
    e.preventDefault()
    if (!data.revenue) {
      return
    } else {
      try {
        const newRevenue = {
          data: data.revenue,
        }
        setRevenue([...revenue, newRevenue])
        setData(initialState)
        await updateDatabase(canvasNames[8], revenue, newRevenue)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <div className='flex justify-center'>
        <form
          onSubmit={handleProblem}
          className=' flex flex-col w-64 addHeight'
        >
          <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
            PROBLEM
          </div>
          <div className=' bg-base-200 mx-2 h-full overflow-y-auto'>
            {problem.map((item, key) => {
              return (
                <div key={key} className='m-2 p-3 bg-base-300 '>
                  {item.data}
                </div>
              )
            })}
            <div className='m-2 bg-base-300'>
              <input
                value={data.problem}
                onChange={(e) => setData({ ...data, problem: e.target.value })}
                className='btn w-full'
                placeholder='+'
              ></input>
            </div>
          </div>
          <div className='text-xl p-3 mx-2 mb-2 h-12 bg-base-200 text-center'></div>
        </form>
        <div className='flex flex-col w-64'>
          <form
            onSubmit={handleSolution}
            className='flex flex-col addHeightTwo'
          >
            <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
              SOLUTION
            </div>
            <div className=' bg-base-200 mx-2 overflow-y-auto h-full'>
              {solution.map((item, key) => {
                return (
                  <div key={key} className='m-2 p-3 bg-base-300 '>
                    {item.data}
                  </div>
                )
              })}
              <div className='m-2 bg-base-300'>
                <input
                  value={data.solution}
                  onChange={(e) =>
                    setData({ ...data, solution: e.target.value })
                  }
                  className='btn w-full'
                  placeholder='+'
                ></input>
              </div>
            </div>
            <div className='text-xl p-3 mx-2 mb-2 h-12 bg-base-200 text-center'></div>
          </form>
          <form
            onSubmit={handleKeyMetrics}
            className='flex flex-col addHeightTwo'
          >
            <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
              KEY METRICS
            </div>
            <div className='bg-base-200 mx-2 overflow-y-auto h-full'>
              {key_metrics.map((item, key) => {
                return (
                  <div key={key} className='m-2 p-3 bg-base-300 '>
                    {item.data}
                  </div>
                )
              })}
              <div className='m-2 bg-base-300'>
                <input
                  value={data.key_metrics}
                  onChange={(e) =>
                    setData({ ...data, key_metrics: e.target.value })
                  }
                  className='btn w-full'
                  placeholder='+'
                ></input>
              </div>
            </div>
            <div className='text-xl p-3 mx-2 mb-2 h-12 bg-base-200 text-center'></div>
          </form>
        </div>
        <form
          onSubmit={handleUniqueValue}
          className='flex flex-col w-64 addHeight'
        >
          <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
            UNIQUE VALUE PROPOSITION
          </div>
          <div className='bg-base-200 h-full mx-2 overflow-y-auto'>
            {unique_value.map((item, key) => {
              return (
                <div key={key} className='m-2 p-3 bg-base-300 '>
                  {item.data}
                </div>
              )
            })}
            <div className='m-2 bg-base-300'>
              <input
                value={data.unique_value}
                onChange={(e) =>
                  setData({ ...data, unique_value: e.target.value })
                }
                className='btn w-full'
                placeholder='+'
              ></input>
            </div>
          </div>
          <div className='text-xl p-3 mx-2 mb-2 h-12 bg-base-200 text-center'></div>
        </form>
        <div className='flex flex-col w-64 '>
          <form onSubmit={handleUnfair} className='flex flex-col addHeightTwo'>
            <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
              UNFAIR ADVANTAGE
            </div>
            <div className='bg-base-200 h-full mx-2 overflow-y-auto'>
              {unfair.map((item, key) => {
                return (
                  <div key={key} className='m-2 p-3 bg-base-300 '>
                    {item.data}
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
          <form
            onSubmit={handleChannels}
            className='flex flex-col addHeightTwo'
          >
            <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
              CHANNELS
            </div>
            <div className=' bg-base-200 mx-2 h-full overflow-y-auto'>
              {channels.map((item, key) => {
                return (
                  <div key={key} className='m-2 p-3 bg-base-300 '>
                    {item.data}
                  </div>
                )
              })}
              <div className='m-2 bg-base-300'>
                <input
                  value={data.channels}
                  onChange={(e) =>
                    setData({ ...data, channels: e.target.value })
                  }
                  className='btn w-full'
                  placeholder='+'
                ></input>
              </div>
            </div>
            <div className='text-xl p-3 mx-2 mb-2 h-12 bg-base-200 text-center'></div>
          </form>
        </div>
        <form
          onSubmit={handleCustomerSeg}
          className='flex flex-col w-64 addHeight'
        >
          <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
            CUSTOMER SEGMENTS
          </div>
          <div className='bg-base-200 h-full mx-2 overflow-y-auto'>
            {customer_seg.map((item, key) => {
              return (
                <div key={key} className='m-2 p-3 bg-base-300 '>
                  {item.data}
                </div>
              )
            })}
            <div className='m-2 bg-base-300'>
              <input
                value={data.customer_seg}
                onChange={(e) =>
                  setData({ ...data, customer_seg: e.target.value })
                }
                className='btn w-full'
                placeholder='+'
              ></input>
            </div>
          </div>
          <div className='text-xl p-3 mx-2 mb-2 h-12 bg-base-200 text-center'></div>
        </form>
      </div>
      {/* Alt Sekme Geçiş */}
      <div className='flex justify-center'>
        <form
          onSubmit={handleCostStr}
          className=' flex flex-col addWidth h-60 '
        >
          <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
            COST STRUCTURE
          </div>
          <div className=' bg-base-200 h-full overflow-y-auto mx-2'>
            {cost_str.map((item, key) => {
              return (
                <div key={key} className='m-2 p-3 bg-base-300 '>
                  {item.data}
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
        <form onSubmit={handleRevenue} className='flex flex-col addWidth  h-60'>
          <div className='text-xl p-3 mx-2 bg-base-200 text-center'>
            REVENUE STREAMS
          </div>
          <div className=' bg-base-200 mx-2  h-full overflow-y-auto'>
            {revenue.map((item, key) => {
              return (
                <div key={key} className='m-2 p-3 bg-base-300 '>
                  {item.data}
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
      </div>
    </div>
  )
}

export default App
