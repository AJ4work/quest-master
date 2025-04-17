import { Link, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    const getPriorityStyle = (priority: string) => {
        const baseStyle = "inline-flex px-3 py-1 rounded-full text-xs font-medium transform transition-all duration-200 hover:scale-105";
        switch (priority) {
            case 'high':
                return `${baseStyle} bg-red-100 text-red-800 border border-red-200`;
            case 'medium':
                return `${baseStyle} bg-amber-100 text-amber-800 border border-amber-200`;
            case 'low':
                return `${baseStyle} bg-green-100 text-green-800 border border-green-200`;
            default:
                return baseStyle;
        }
    };

    const getTaskStyle = (status: string) => {
        return status === 'completed' 
            ? 'line-through text-gray-500 bg-gray-50' 
            : 'hover:bg-amber-50 transition-colors';
    };
    
    return (
        <div className="rounded-lg border border-amber-200 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-amber-50">
                        <TableHead className="w-[80px] text-center font-bold text-amber-900">Status</TableHead>
                        <TableHead className="w-[250px] text-center font-bold text-amber-900">Quest Title</TableHead>
                        <TableHead className="w-[300px] text-center font-bold text-amber-900">Description</TableHead>
                        <TableHead className="w-[150px] text-center font-bold text-amber-900">Difficulty</TableHead>
                        <TableHead className="w-[200px] text-center font-bold text-amber-900">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow 
                            key={task.id} 
                            className={getTaskStyle(task.status)}
                        >
                            <TableCell className="text-center">
                                <button
                                    onClick={() => onToggleComplete?.(task.id)}
                                    className={`w-6 h-6 rounded-full border-2 transition-all duration-200 
                                        ${task.status === 'completed' 
                                            ? 'bg-green-500 border-green-600 hover:bg-green-600' 
                                            : 'border-amber-400 hover:border-amber-500'}`}
                                >
                                    {task.status === 'completed' && (
                                        <span className="text-white text-xs">✓</span>
                                    )}
                                </button>
                            </TableCell>
                            <TableCell className="text-center">
                                <Link 
                                    to={`/task/${task.id}`}
                                    className="text-amber-700 hover:text-amber-900 hover:underline font-medium"
                                >
                                    {task.title}
                                </Link>
                            </TableCell>
                            <TableCell className="text-center text-sm text-gray-600">
                                {task.description}
                            </TableCell>
                            <TableCell className="text-center">
                                <span className={getPriorityStyle(task.priority)}>
                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </span>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="flex justify-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => navigate(`/task/${task.id}?edit=true`)}
                                        className="border-cyan-200 text-cyan-700 hover:bg-cyan-50"
                                    >
                                        Edit Quest
                                    </Button>
                                    <Button
                                        onClick={() => onDeleteTask?.(task.id)}
                                        variant="destructive"
                                        size="sm"
                                        className="bg-red-500 hover:bg-red-600"
                                    >
                                        Abandon
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};