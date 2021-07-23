import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Channels from './components/Channels'
import CostStr from './components/CostStr'
import CustomerSeg from './components/CustomerSeg'
import KeyMetrics from './components/KeyMetrics'
import Problem from './components/Problem'
import Revenue from './components/Revenue'
import Solution from './components/Solution'
import Unfair from './components/Unfair'
import UniqueValue from './components/UniqueValue'
import { useCanvasState } from './context/context'
import FirebaseContext from './context/firebase'

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
const initialStateString = {
  problem: '[]',
  solution: '[]',
  key_metrics: '[]',
  unique_value: '[]',
  unfair: '[]',
  channels: '[]',
  customer_seg: '[]',
  cost_str: '[]',
  revenue: '[]',
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
export let linkId = ''
const App = (props) => {
  const { newDataRealTimeId } = useCanvasState()
  linkId = props.location.pathname.substring(1)
  const canvasData = useContext(FirebaseContext)
  const history = useHistory()

  const [baseCanvas, setBaseCanvas] = useState(initialStateString)
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
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState('')

  const updateDatabase = async (varA, varB, newCanvasProperty) => {
    if (newDataRealTimeId) {
      await canvasData.firebase
        .database()
        .ref(newDataRealTimeId)
        .set({ ...baseCanvas, [varA]: [...varB, newCanvasProperty] })
      setBaseCanvas({ ...baseCanvas, [varA]: [...varB, newCanvasProperty] })
    } else {
      await canvasData.firebase
        .database()
        .ref(linkId)
        .set({ ...baseCanvas, [varA]: [...varB, newCanvasProperty] })
      setBaseCanvas({ ...baseCanvas, [varA]: [...varB, newCanvasProperty] })
    }
  }

  useEffect(() => {
    const getCanvasList = async (firebase) => {
      setLoading(true)

      if (newDataRealTimeId) {
        const realtimeData = await firebase.database().ref(newDataRealTimeId)
        realtimeData.on('value', (snapshot) => {
          result = snapshot.val()

          if (result.problem && result.problem !== '') {
            setProblem(result.problem)
          } else if (!result.problem) {
            setProblem([])
          }
          if (result.solution !== '' && result.solution) {
            setSolution(result.solution)
          } else if (!result.solution) {
            setSolution([])
          }
          if (result.key_metrics !== '' && result.key_metrics) {
            setKey_metrics(result.key_metrics)
          } else if (!result.key_metrics) {
            setKey_metrics([])
          }
          if (result.unique_value !== '' && result.unique_value) {
            setUnique_value(result.unique_value)
          } else if (!result.unique_value) {
            setUnique_value([])
          }
          if (result.unfair !== '' && result.unfair) {
            setUnfair(result.unfair)
          } else if (!result.unfair) {
            setUnfair([])
          }
          if (result.channels !== '' && result.channels) {
            setChannels(result.channels)
          } else if (!result.channels) {
            setChannels([])
          }
          if (result.customer_seg !== '' && result.customer_seg) {
            setCustomer_seg(result.customer_seg)
          } else if (!result.customer_seg) {
            setCustomer_seg([])
          }
          if (result.cost_str !== '' && result.cost_str) {
            setCost_str(result.cost_str)
          } else if (!result.cost_str) {
            setCost_str([])
          }
          if (result.revenue !== '' && result.revenue) {
            setRevenue(result.revenue)
          } else if (!result.revenue) {
            setRevenue([])
          }
          setBaseCanvas(result)
          setLoading(false)
        })
      } else {
        const linkId = props.location.pathname.substring(1)
        const realtimeData = await firebase.database().ref(linkId)
        realtimeData.on('value', (snapshot) => {
          result = snapshot.val()
          if (result) {
            if (result.problem && result.problem !== '') {
              setProblem(result.problem)
            } else if (!result.problem) {
              setProblem([])
            }
            if (result.solution !== '' && result.solution) {
              setSolution(result.solution)
            } else if (!result.solution) {
              setSolution([])
            }
            if (result.key_metrics !== '' && result.key_metrics) {
              setKey_metrics(result.key_metrics)
            } else if (!result.key_metrics) {
              setKey_metrics([])
            }
            if (result.unique_value !== '' && result.unique_value) {
              setUnique_value(result.unique_value)
            } else if (!result.unique_value) {
              setUnique_value([])
            }
            if (result.unfair !== '' && result.unfair) {
              setUnfair(result.unfair)
            } else if (!result.unfair) {
              setUnfair([])
            }
            if (result.channels !== '' && result.channels) {
              setChannels(result.channels)
            } else if (!result.channels) {
              setChannels([])
            }
            if (result.customer_seg !== '' && result.customer_seg) {
              setCustomer_seg(result.customer_seg)
            } else if (!result.customer_seg) {
              setCustomer_seg([])
            }
            if (result.cost_str !== '' && result.cost_str) {
              setCost_str(result.cost_str)
            } else if (!result.cost_str) {
              setCost_str([])
            }
            if (result.revenue !== '' && result.revenue) {
              setRevenue(result.revenue)
            } else if (!result.revenue) {
              setRevenue([])
            }
            setBaseCanvas(result)
            setLoading(false)
          } else {
            history.push('/NotFound')
          }
        })
      }
    }
    getCanvasList(canvasData.firebase)
  }, [canvasData, newDataRealTimeId, history, props.location.pathname])

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div className='flex justify-center'>
            <Problem
              problem={problem}
              setProblem={setProblem}
              data={data}
              setData={setData}
              initialState={initialState}
              updateDatabase={updateDatabase}
              canvasNames={canvasNames}
              linkId={linkId}
              baseCanvas={baseCanvas}
              setBaseCanvas={setBaseCanvas}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
            <div className='flex flex-col w-64'>
              <Solution
                solution={solution}
                setSolution={setSolution}
                data={data}
                setData={setData}
                initialState={initialState}
                updateDatabase={updateDatabase}
                canvasNames={canvasNames}
                baseCanvas={baseCanvas}
                setBaseCanvas={setBaseCanvas}
                linkId={linkId}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
              <KeyMetrics
                key_metrics={key_metrics}
                setKey_metrics={setKey_metrics}
                data={data}
                setData={setData}
                initialState={initialState}
                updateDatabase={updateDatabase}
                canvasNames={canvasNames}
                linkId={linkId}
                baseCanvas={baseCanvas}
                setBaseCanvas={setBaseCanvas}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </div>
            <UniqueValue
              data={data}
              setData={setData}
              unique_value={unique_value}
              setUnique_value={setUnique_value}
              initialState={initialState}
              updateDatabase={updateDatabase}
              canvasNames={canvasNames}
              baseCanvas={baseCanvas}
              setBaseCanvas={setBaseCanvas}
              linkId={linkId}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
            <div className='flex flex-col w-64 '>
              <Unfair
                data={data}
                setData={setData}
                unfair={unfair}
                setUnfair={setUnfair}
                initialState={initialState}
                updateDatabase={updateDatabase}
                canvasNames={canvasNames}
                baseCanvas={baseCanvas}
                setBaseCanvas={setBaseCanvas}
                linkId={linkId}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
              <Channels
                data={data}
                setData={setData}
                channels={channels}
                setChannels={setChannels}
                initialState={initialState}
                updateDatabase={updateDatabase}
                canvasNames={canvasNames}
                baseCanvas={baseCanvas}
                setBaseCanvas={setBaseCanvas}
                linkId={linkId}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </div>
            <CustomerSeg
              data={data}
              setData={setData}
              customer_seg={customer_seg}
              setCustomer_seg={setCustomer_seg}
              initialState={initialState}
              updateDatabase={updateDatabase}
              canvasNames={canvasNames}
              baseCanvas={baseCanvas}
              setBaseCanvas={setBaseCanvas}
              linkId={linkId}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </div>
          {/* Alt Sekme Geçiş */}
          <div className='flex justify-center'>
            <CostStr
              data={data}
              setData={setData}
              cost_str={cost_str}
              setCost_str={setCost_str}
              initialState={initialState}
              updateDatabase={updateDatabase}
              canvasNames={canvasNames}
              baseCanvas={baseCanvas}
              setBaseCanvas={setBaseCanvas}
              linkId={linkId}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
            <Revenue
              data={data}
              setData={setData}
              revenue={revenue}
              setRevenue={setRevenue}
              initialState={initialState}
              updateDatabase={updateDatabase}
              canvasNames={canvasNames}
              baseCanvas={baseCanvas}
              setBaseCanvas={setBaseCanvas}
              linkId={linkId}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
