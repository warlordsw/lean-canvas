import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App, { linkId } from './App'
import { useCanvasState } from './context/context'
import Router from './Router'

//import { newDataId } from './Router'

//console.log(newDataId, 'eminmisin')
const Main = (props) => {
  const { newDataId } = useCanvasState()
  console.log(newDataId, 'Main')
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Router} />
        <Route path={`/${linkId}`} component={App} />
      </Switch>
    </BrowserRouter>
  )
}

export default Main
