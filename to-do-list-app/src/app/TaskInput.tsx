// src/app/TaskInput.tsx
import { useState } from 'react'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select'
import { Card } from '../components/ui/card'
import { useAppDispatch } from '@/store/hooks'
import { addTask } from '@/store/taskSlice'
import { TaskItemProps } from '@/types/taskItemProps'

export default function TaskInput() {
  const [task, setTask] = useState('')
  const [priority, setPriority] = useState<TaskItemProps['priority']>('medium')
  const dispatch = useAppDispatch()

  const handleAdd = () => {
    if (task.trim()) {
      dispatch(addTask({
        title: task,
        description: 'New quest awaits...',
        status: 'pending',
        priority
      }))
      setTask('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && task.trim()) {
      handleAdd()
    }
  }

  return (
    <Card className="p-6 mb-8 bg-gradient-to-r from-amber-50 to-cyan-50 border-amber-200">
      <h2 className="text-xl font-bold text-amber-800 mb-4">Begin New Quest</h2>
      <div className="flex gap-4">
        <Input
          placeholder="What's your next adventure?"
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border-amber-200 focus-visible:ring-amber-200"
        />
        <Select
          value={priority}
          onValueChange={(value: TaskItemProps['priority']) => setPriority(value)}
        >
          <SelectTrigger className="w-[140px] border-cyan-200 focus-visible:ring-cyan-200">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">Epic</SelectItem>
            <SelectItem value="medium">Standard</SelectItem>
            <SelectItem value="low">Simple</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          onClick={handleAdd} 
          disabled={!task.trim()}
          className="bg-amber-500 hover:bg-amber-600 text-white px-8"
        >
          Embark
        </Button>
      </div>
    </Card>
  )
}
