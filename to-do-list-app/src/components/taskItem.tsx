import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, Circle } from 'lucide-react';
import { TaskItemProps } from '@/types/taskItemProps'; 


const TaskItem = ({id, title, description, status, priority }: TaskItemProps) => {
    const priorityColors = {
        high: 'bg-red-500',
        medium: 'bg-yellow-500',
        low: 'bg-green-500',
    };

    return (
        <Card className="w-full mb-4">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                    {status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                        <Circle className="h-5 w-5 text-gray-300" />
                    )}
                    <h3 className="font-semibold text-lg">{title}</h3>
                </div>
                <Badge className={priorityColors[priority]}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Badge>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600">{description}</p>
            </CardContent>
        </Card>
    );
};

export default TaskItem;