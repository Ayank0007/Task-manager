'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TaskForm from '@/components/TaskForm';
import TaskCard from '@/components/TaskCard';
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

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchTasks();
    }
  }, [session]);

  useEffect(() => {
    let filtered = tasks;
    
    if (filterStatus !== 'ALL') {
      filtered = filtered.filter((task) => task.status === filterStatus);
    }
    
    if (filterPriority !== 'ALL') {
      filtered = filtered.filter((task) => task.priority === filterPriority);
    }
    
    setFilteredTasks(filtered);
  }, [tasks, filterStatus, filterPriority]);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = () => {
    fetchTasks();
    setShowForm(false);
    setEditingTask(null);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const todoCount = tasks.filter((t) => t.status === 'TODO').length;
  const inProgressCount = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const completedCount = tasks.filter((t) => t.status === 'COMPLETED').length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar userName={session.user?.name} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">My Tasks</h2>
            <Button onClick={() => setShowForm(!showForm)} size="lg">
              {showForm ? 'Cancel' : '+ New Task'}
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">To Do</p>
              <p className="text-3xl font-bold text-gray-800">{todoCount}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">In Progress</p>
              <p className="text-3xl font-bold text-blue-600">{inProgressCount}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-3xl font-bold text-green-600">{completedCount}</p>
            </div>
          </div>

          {showForm && (
            <div className="mb-6">
              <TaskForm
                onTaskCreated={handleTaskCreated}
                editTask={editingTask}
                onCancel={handleCancel}
              />
            </div>
          )}

          {/* Filters */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <div>
              <label className="text-sm font-medium mr-2">Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="ALL">All</option>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mr-2">Priority:</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="ALL">All</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {tasks.length === 0
                ? 'No tasks yet. Create your first task to get started!'
                : 'No tasks match the selected filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
