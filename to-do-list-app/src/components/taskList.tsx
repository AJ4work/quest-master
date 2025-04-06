import {

Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"
import { TaskItemProps } from "@/types/taskItemProps";
import { Button } from "./ui/button";


interface TaskListProps {
tasks: TaskItemProps[];
onDeleteTask?: (id: string) => void;
onToggleComplete?: (id: string) => void;
}

export const TaskList = ({ tasks, onDeleteTask, onToggleComplete }: TaskListProps) => {
return (
    <div className="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.map((task) => (
                    <TableRow key={task.id}>
                        <TableCell>
                            <input
                                type="checkbox"
                                onChange={() => onToggleComplete?.(task.id)}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                        </TableCell>
                        <TableCell>
                            {task.title}
                        </TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>
                            <Button
                                onClick={() => onDeleteTask?.(task.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
)
}