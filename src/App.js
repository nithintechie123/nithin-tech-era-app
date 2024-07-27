import {Switch, Route} from 'react-router-dom'

import Header from './components/Header'

import Home from './components/Home'

import './App.css'

// Replace your code here
const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </>
)

export default App
