import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopNav from './components/TopNav.jsx'
import BottomNav from './components/BottomNav.jsx'
import Expert from './views/Expert.jsx'
import RegisterView from './views/RegisterView.jsx'
import DashboardView from './views/DashboardView.jsx'
import ProfileView from './views/ProfileView.jsx'
import LandingView from './views/LandingView.jsx'
import LoginView from './views/LoginView.jsx'
import EditView from './views/EditView.jsx'
// import MatchRequestView from './components/MatchRequestView.jsx'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route path="/expert" element={<Expert />} />

          <Route path="/register" element={<RegisterView />} />
          <Route path="/login" element={<LoginView />} />

          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/profile/:id" element={<ProfileView />} />
          <Route path="/edit/:id" element={<EditView />} />

          {/* <Route path="/match-request/:userId" element={<MatchRequestView />} /> */}

        </Routes>
        <BottomNav />
      </BrowserRouter>
    </div>
  )
}

export default App
