import { createContext, useContext, useReducer } from 'react'
import { initialState, canvasReducer } from './reducer'

const CanvasStateContext = createContext()
const DispatchContext = createContext()

export const useCanvasState = () => {
  const context = useContext(CanvasStateContext)
  if (context === undefined) {
    throw new Error('useProductState must be used within a CanvasProvider')
  }
  return context
}

export function useDispatch() {
  const context = useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useDispatch must be used within a CanvasProvider')
  }

  return context
}

export const CanvasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(canvasReducer, initialState)
  return (
    <CanvasStateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </CanvasStateContext.Provider>
  )
}
