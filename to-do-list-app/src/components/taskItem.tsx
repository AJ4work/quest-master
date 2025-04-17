import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { TaskItemProps } from '@/types/taskItemProps';
import { useAppDispatch } from '@/store/hooks';
import { updateTask } from '@/store/taskSlice';

interface TaskItemComponentProps extends TaskItemProps {
    defaultIsEditing?: boolean;
}

const TaskItem = ({ id, title, description, status, priority, defaultIsEditing = false }: TaskItemComponentProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(defaultIsEditing);
    const [editedTask, setEditedTask] = useState({
        title,
        description,
        priority
    });

    const handleSave = () => {
        dispatch(updateTask({
            id,
            status,
            ...editedTask
        }));
        setIsEditing(false);
    };

    const getPriorityStyle = (priority: string) => {
        const baseStyle = "transform transition-all duration-200 hover:scale-105";
        switch (priority) {
            case 'high':
                return `${baseStyle} bg-gradient-to-r from-red-100 to-amber-100 text-red-800 border-red-200`;
            case 'medium':
                return `${baseStyle} bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200`;
            case 'low':
                return `${baseStyle} bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200`;
            default:
                return baseStyle;
        }
    };

    const renderStatusBadge = () => (
        <div className={`flex items-center justify-center h-8 w-8 rounded-full transition-all duration-200 
            ${status === 'completed' 
                ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-lg' 
                : 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700'}`}>
            {status === 'completed' ? '✓' : '○'}
        </div>
    );

    const renderFooterActions = () => (
        <div className="flex justify-between w-full">
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="text-amber-700 hover:text-amber-800 hover:bg-amber-50"
            >
                Return to Quest Log
            </Button>
            {isEditing ? (
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsEditing(false)}
                        className="border-cyan-200 text-cyan-700 hover:bg-cyan-50"
                    >
                        Cancel Changes
                    </Button>
                    <Button 
                        size="sm" 
                        onClick={handleSave}
                        className="bg-amber-500 hover:bg-amber-600 text-white"
                    >
                        Save Quest
                    </Button>
                </div>
            ) : (
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(true)}
                    className="border-amber-200 text-amber-700 hover:bg-amber-50"
                >
                    Modify Quest
                </Button>
            )}
        </div>
    );

    const getDifficultyLabel = (priority: string) => {
        switch (priority) {
            case 'high': return 'Epic';
            case 'medium': return 'Standard';
            case 'low': return 'Simple';
            default: return priority;
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto mb-4 bg-gradient-to-br from-amber-50 via-white to-cyan-50 border-amber-200">
            <CardHeader className="flex flex-col items-start gap-4 pb-2">
                <div className="flex items-center gap-4 w-full">
                    {renderStatusBadge()}
                    {isEditing ? (
                        <Input
                            value={editedTask.title}
                            onChange={(e) => setEditedTask(prev => ({ ...prev, title: e.target.value }))}
                            className="flex-1 border-amber-200 focus-visible:ring-amber-200"
                            placeholder="Enter quest title..."
                        />
                    ) : (
                        <h2 className="text-2xl font-bold text-amber-900">{title}</h2>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Difficulty:</span>
                    {isEditing ? (
                        <Select
                            value={editedTask.priority}
                            onValueChange={(value: TaskItemProps['priority']) => 
                                setEditedTask(prev => ({ ...prev, priority: value }))}
                        >
                            <SelectTrigger className="w-[140px] border-cyan-200 focus-visible:ring-cyan-200">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="high">Epic</SelectItem>
                                <SelectItem value="medium">Standard</SelectItem>
                                <SelectItem value="low">Simple</SelectItem>
                            </SelectContent>
                        </Select>
                    ) : (
                        <Badge className={getPriorityStyle(priority)}>
                            {getDifficultyLabel(priority)}
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="mt-4">
                <div className="bg-white/50 rounded-lg p-4 border border-amber-100">
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">Quest Details</h3>
                    {isEditing ? (
                        <Input
                            value={editedTask.description}
                            onChange={(e) => setEditedTask(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Describe your quest..."
                            className="border-amber-200 focus-visible:ring-amber-200"
                        />
                    ) : (
                        <p className="text-gray-700">{description}</p>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                {renderFooterActions()}
            </CardFooter>
        </Card>
    );
};

export default TaskItem;