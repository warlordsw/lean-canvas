import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import { useCanvasState } from './context/context'
import NotFound from './NotFound'
import Router from './Router'
const Main = () => {
  const { newDataRealTimeId } = useCanvasState()
  console.log(newDataRealTimeId, 'Main')
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/NotFound'} component={NotFound} />
        <Route exact path='/' component={Router} />
        <Route path={`/${newDataRealTimeId}`} component={App} />
        <Route exact path={'/*'} component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Main
