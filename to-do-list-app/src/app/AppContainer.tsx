import Header from './Header'
import TaskInput from './TaskInput'
import TaskSection from './TaskSection'
import { Card } from '../components/ui/card'
import '../App.css'

const AppContainer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Card className="shadow-lg border-amber-200">
          <div className="p-8">
            <Header />
            <TaskInput />
            <TaskSection />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AppContainer