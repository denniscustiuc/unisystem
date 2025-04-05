import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SingleDegreePage from './pages/SingleDegree'
import AllDegreePage from './pages/AllDegree';
import SingleStudentPage from './pages/SingleStudent';
import AllCohortPage from './pages/AllCohort';
import SingleCohortPage from './pages/SingleCohort';
import './styles/App.css'
import HomePage from './pages/Home'
import AllModules from './pages/AllModules';
import ModulesForCohort from './pages/ModulesForCohort';



function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/degree/:shortcode" element={<SingleDegreePage />} />
        <Route path="/degree" element={<AllDegreePage />} />
        <Route path="/cohort" element={<AllCohortPage />} />
        <Route path="/cohort/:id" element={<SingleCohortPage />} />
        <Route path="/student/:id" element={<SingleStudentPage />} />
        <Route path="/module" element={<AllModules/>} />
        <Route path="/module/:code" element={<ModulesForCohort/>} />
      </Routes>
    </Router>
  )
}

export default App
