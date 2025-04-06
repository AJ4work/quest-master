import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import TaskItem from './components/taskItem'
import { TaskItemProps } from './types/taskItemProps'
import { TaskList } from './components/taskList'

function App() {
  const tasks: TaskItemProps[] = [
    {
      id: 'TAS-12398032',
      title: 'Task 1',
      description: 'This is the first task',
      status: 'completed',
      priority: 'high'
    },
    {
      id: 'TAS-12398033',
      title: 'Task 2',
      description: 'This is the second task',
      status: 'pending',
      priority: 'medium'
    }
  ]
  const [taskList, setTaskList] = useState<TaskItemProps[]>(tasks)


  return (
    <>
    <h1 className='text-3xl font-bold'>To Do List</h1>
    <TaskList tasks={taskList} />
      <TaskItem id={"TAS-12398032"} title={"Hi"} description={"I'm a completed task"} status={'completed'} priority={'high'}/>
    </>
  )
}

export default App
