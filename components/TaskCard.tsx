'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  tags: string[];
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  TODO: 'bg-gray-100 text-gray-800 border-gray-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-300',
  COMPLETED: 'bg-green-100 text-green-800 border-green-300',
};

const priorityColors = {
  LOW: 'bg-green-50 border-green-200',
  MEDIUM: 'bg-yellow-50 border-yellow-200',
  HIGH: 'bg-red-50 border-red-200',
};

const statusLabels = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card className={`${priorityColors[task.priority]} border-2 hover:shadow-lg transition-shadow`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <span
            className={`px-2 py-1 rounded-md text-xs font-semibold border ${statusColors[task.status]}`}
          >
            {statusLabels[task.status]}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">Priority:</span>
          <span
            className={`text-xs font-semibold ${
              task.priority === 'HIGH'
                ? 'text-red-600'
                : task.priority === 'MEDIUM'
                ? 'text-yellow-600'
                : 'text-green-600'
            }`}
          >
            {task.priority}
          </span>
        </div>

        {task.dueDate && (
          <div className="text-xs text-muted-foreground">
            Due: {formatDate(task.dueDate)}
          </div>
        )}

        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(task)} className="flex-1">
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(task.id)}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
