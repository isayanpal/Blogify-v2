import './App.css'
import {Route, Routes} from "react-router-dom";
import {UserContextProvider} from "./context/UserContext";
import Layout from './const/Layout';
import Home from './pages/Home';
import Register from './authPages/Register';
import Login from './authPages/Login';
import Explore from './pages/Explore';
import SinglePost from './pages/SinglePost';
import Edit from './pages/Edit';
import CreatePost from './pages/CreatePost';

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/post/:id' element={<SinglePost/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/create' element={<CreatePost/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
