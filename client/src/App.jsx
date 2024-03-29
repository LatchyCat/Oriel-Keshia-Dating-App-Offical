import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopNav from './components/TopNav.jsx'
import BottomNav from './components/BottomNav.jsx'
import Expert from './views/Expert.jsx'
import RegisterView from './views/RegisterView.jsx'
// import DashboardView from './views/DashboardView.jsx'
// import EditView from './views/EditView.jsx'
import LandingView from './views/LandingView.jsx'
import LoginView from './views/LoginView.jsx'
// import ProfileView from './views/ProfileView.jsx'


const App = () => {
  return (
   <div>
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route path="/" element={<LandingView/>}/>
        <Route path="/expert" element={<Expert/>}/>

        <Route path="/register" element={<RegisterView/>}/>
        <Route path="/login" element={<LoginView/>}/>

        {/* <Route path="/edit" element={<EditView/>}/> */}

      </Routes>
      <BottomNav />
      </BrowserRouter>

   </div>
  )
}

export default App
