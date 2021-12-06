
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Task from './components/Task'
import Admin from './components/Admin'

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Home/>}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/register' element={<Admin />}/>
        <Route exact path="/todo" element={<Task/>}/>
        
      </Routes>
    </div>
  );
}


export default App;
