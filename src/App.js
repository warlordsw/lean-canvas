import React, { useState } from 'react'

const initialState = {
  problem: '',
  solution: '',
  key_metrics: '',
  unique_value: '',
  unfair: '',
  channels: '',
  customer_seg: '',
  cost_str: '',
  revenue: '',
}

const App = () => {
  // const [list, setList] = useState(initialState)
  // console.log(list.problem)
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

  //console.log(data.problem)
  console.log(solution)
  const handleProblem = (e) => {
    e.preventDefault()
    if (!data.problem) {
      return
    } else {
      const newProblem = {
        data: data.problem,
      }
      setProblem([...problem, newProblem])
      setData(initialState)
    }
  }

  const handleSolution = (e) => {
    e.preventDefault()
    if (!data.solution) {
      return
    } else {
      const newSolution = {
        data: data.solution,
      }
      setSolution([...solution, newSolution])
      setData(initialState)
    }
  }

  const handleKeyMetrics = (e) => {
    e.preventDefault()
    if (!data.key_metrics) {
      return
    } else {
      const newKeyMetrics = {
        data: data.key_metrics,
      }
      setKey_metrics([...key_metrics, newKeyMetrics])
      setData(initialState)
    }
  }

  const handleUniqueValue = (e) => {
    e.preventDefault()
    if (!data.unique_value) {
      return
    } else {
      const newUniqueValue = {
        data: data.unique_value,
      }
      setUnique_value([...unique_value, newUniqueValue])
      setData(initialState)
    }
  }

  const handleUnfair = (e) => {
    e.preventDefault()
    if (!data.unfair) {
      return
    } else {
      const newUnfair = {
        data: data.unfair,
      }
      setUnfair([...unfair, newUnfair])
      setData(initialState)
    }
  }

  const handleChannels = (e) => {
    e.preventDefault()
    if (!data.channels) {
      return
    } else {
      const newChannels = {
        data: data.channels,
      }
      setChannels([...channels, newChannels])
      setData(initialState)
    }
  }

  const handleCustomerSeg = (e) => {
    e.preventDefault()
    if (!data.customer_seg) {
      return
    } else {
      const newCustomerSeg = {
        data: data.customer_seg,
      }
      setCustomer_seg([...customer_seg, newCustomerSeg])
      setData(initialState)
    }
  }

  const handleCostStr = (e) => {
    e.preventDefault()
    if (!data.cost_str) {
      return
    } else {
      const newCostStr = {
        data: data.cost_str,
      }
      setCost_str([...cost_str, newCostStr])
      setData(initialState)
    }
  }

  const handleRevenue = (e) => {
    e.preventDefault()
    if (!data.revenue) {
      return
    } else {
      const newRevenue = {
        data: data.revenue,
      }
      setRevenue([...revenue, newRevenue])
      setData(initialState)
    }
  }

  return (
    <div>
      <div className='flex justify-center'>
        <form
          onSubmit={handleProblem}
          className=' flex flex-col w-full addHeight'
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
        <div className='flex flex-col w-full'>
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
          className='flex flex-col w-full addHeight'
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
        <div className='flex flex-col w-full '>
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
          className='flex flex-col w-full addHeight'
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
        <form onSubmit={handleCostStr} className=' flex flex-col w-full h-60 '>
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
        <form onSubmit={handleRevenue} className='flex flex-col w-full h-60'>
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
