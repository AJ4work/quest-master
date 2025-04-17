import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppContainer from './app/AppContainer'
import { TaskDetailView } from './app/features/task-detail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContainer />} />
        <Route path="/task/:taskId" element={<TaskDetailView />} />
      </Routes>
    </Router>
  )
}

export default App
