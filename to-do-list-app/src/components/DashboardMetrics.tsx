import { Card, CardContent, CardHeader } from './ui/card';
import { ProgressRing } from './ui/progress-ring';
import { Badge } from './ui/badge';
import { useAppSelector } from '@/store/hooks';

export const DashboardMetrics = () => {
    const tasks = useAppSelector((state) => state.tasks.tasks);
    
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalTasks = tasks.length;
    const completionRate = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    
    const calculateLevel = (completed: number) => {
        if (completed >= 20) return { level: 'Gold', color: 'var(--level-gold)' };
        if (completed >= 10) return { level: 'Silver', color: 'var(--level-silver)' };
        return { level: 'Bronze', color: 'var(--level-bronze)' };
    };

    const { level, color } = calculateLevel(completedTasks);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold text-amber-800">Progress</h3>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <ProgressRing progress={completionRate} color="var(--primary)" />
                </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
                <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold text-cyan-800">Level</h3>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold" style={{ color }}>
                        {level}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                        {20 - completedTasks > 0 ? `${20 - completedTasks} tasks to Gold` : 'Maximum level reached!'}
                    </div>
                </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold text-green-800">Stats</h3>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span>Completed Tasks</span>
                        <Badge variant="secondary" className="bg-green-200 text-green-800">
                            {completedTasks}
                        </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Total Tasks</span>
                        <Badge variant="secondary" className="bg-blue-200 text-blue-800">
                            {totalTasks}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};