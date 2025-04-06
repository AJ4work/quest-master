export type TaskItemProps = {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'pending';
    priority: 'high' | 'medium' | 'low';
};