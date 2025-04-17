import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import TaskItem from '@/components/taskItem';
import { Button } from '@/components/ui/button';

export const TaskDetailView = () => {
    const { taskId } = useParams();
    const [searchParams] = useSearchParams();
    const isEditing = searchParams.get('edit') === 'true';
    
    const task = useAppSelector(state => 
        state.tasks.tasks.find(t => t.id === taskId)
    );

    if (!task) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-cyan-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-amber-800 mb-4">Quest Not Found</h2>
                        <p className="text-gray-600 mb-4">This quest seems to have vanished into thin air!</p>
                        <Link to="/">
                            <Button 
                                className="bg-amber-500 hover:bg-amber-600 text-white"
                            >
                                Return to Quest Log
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-cyan-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <Link to="/" className="text-amber-700 hover:text-amber-900 flex items-center gap-2">
                        <span>←</span>
                        <span>Back to Quest Log</span>
                    </Link>
                </div>
                <TaskItem {...task} defaultIsEditing={isEditing} />
            </div>
        </div>
    );
};