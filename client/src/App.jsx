import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopNav from './components/TopNav.jsx'
import BottomNav from './components/BottomNav.jsx'
// import BottomNav from './components/BottomNav'
// import DashboardView from './views/DashboardView.jsx'
// import EditView from './views/EditView.jsx'
// import LandingView from './views/LandingView.jsx'
// import LoginView from './views/LoginView.jsx'
// import ProfileView from './views/ProfileView.jsx'
// import RegisterView from './views/RegisterView.jsx'


const App = () => {
  return (
   <div>
    <BrowserRouter>
      <TopNav />
      <Routes>


      </Routes>
      <BottomNav />
      </BrowserRouter>

   </div>
  )
}

export default App
