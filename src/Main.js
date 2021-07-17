import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import { useCanvasState } from './context/context'
import NotFound from './NotFound'
import Router from './Router'
//import { newDataId } from './Router'

//console.log(newDataId, 'eminmisin')
const Main = (props) => {
  const { newDataId } = useCanvasState()
  console.log(newDataId, 'Main')
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Router} />
        <Route path={`/${newDataId}`} component={App} />
        <Route path={'/*'} component={NotFound} />
      </Switch>
    </HashRouter>
  )
}

export default Main
