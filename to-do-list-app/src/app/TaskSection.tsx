// src/app/TaskSection.tsx
import { useEffect } from 'react'
import { TaskList } from '../components/taskList'
import { DashboardMetrics } from '../components/DashboardMetrics'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchTasks, toggleTaskStatus, deleteTask } from '@/store/taskSlice'

export default function TaskSection() {
  const dispatch = useAppDispatch()
  const { tasks, status } = useAppSelector((state) => state.tasks)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks())
    }
  }, [dispatch, status])

  const handleToggleComplete = (id: string) => {
    dispatch(toggleTaskStatus(id))
  }

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id))
  }

  if (status === 'loading') {
    return <div className="flex justify-center py-8">Loading your quests...</div>
  }

  return (
    <section>
      <DashboardMetrics />
      <TaskList 
        tasks={tasks} 
        onToggleComplete={handleToggleComplete}
        onDeleteTask={handleDeleteTask}
      />
    </section>
  )
}
