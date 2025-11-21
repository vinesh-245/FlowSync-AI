import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Brain, 
  Calendar, 
  CheckSquare, 
  BarChart3, 
  Zap, 
  Users, 
  MessageSquare,
  Target,
  TrendingUp,
  Plus,
  Play,
  Pause
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  aiSuggested?: boolean;
  estimatedTime: number;
}

interface Meeting {
  id: string;
  title: string;
  time: string;
  duration: number;
  participants: number;
  aiOptimized?: boolean;
}

const FlowSyncAI: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusTime, setFocusTime] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review quarterly reports', priority: 'high', completed: false, aiSuggested: true, estimatedTime: 45 },
    { id: '2', title: 'Prepare presentation slides', priority: 'medium', completed: false, estimatedTime: 60 },
    { id: '3', title: 'Team standup meeting', priority: 'high', completed: true, estimatedTime: 15 },
    { id: '4', title: 'Code review for new feature', priority: 'medium', completed: false, aiSuggested: true, estimatedTime: 30 }
  ]);

  const [meetings, setMeetings] = useState<Meeting[]>([
    { id: '1', title: 'Daily Standup', time: '09:00', duration: 15, participants: 6, aiOptimized: true },
    { id: '2', title: 'Product Review', time: '14:00', duration: 60, participants: 4 },
    { id: '3', title: 'Client Call', time: '16:30', duration: 30, participants: 3, aiOptimized: true }
  ]);

  const productivityData = [
    { name: 'Mon', focus: 85, meetings: 3, tasks: 8 },
    { name: 'Tue', focus: 92, meetings: 2, tasks: 12 },
    { name: 'Wed', focus: 78, meetings: 5, tasks: 6 },
    { name: 'Thu', focus: 88, meetings: 1, tasks: 10 },
    { name: 'Fri', focus: 95, meetings: 4, tasks: 9 },
  ];

  const aiInsights = [
    "Your productivity peaks between 9-11 AM. Schedule important tasks during this time.",
    "You have 3 back-to-back meetings today. Consider adding 10-minute buffers.",
    "Based on your patterns, you're 23% more productive on days with fewer than 4 meetings.",
    "AI suggests batching similar tasks together to reduce context switching."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (isTimerRunning) {
        setFocusTime(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-yellow-500 bg-yellow-50';
      case 'low': return 'text-green-500 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FlowSync AI</h1>
                <p className="text-sm text-gray-500">AI-Powered Productivity Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Current Time</p>
                <p className="text-lg font-semibold text-gray-900">
                  {currentTime.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Insights Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8 text-white"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="h-6 w-6" />
            <h2 className="text-xl font-semibold">AI Productivity Insights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.slice(0, 2).map((insight, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-3">
                <p className="text-sm">{insight}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tasks & Focus Timer */}
          <div className="lg:col-span-2 space-y-6">
            {/* Focus Timer */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Focus Timer</h3>
                </div>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isTimerRunning 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
                </button>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {formatTime(focusTime)}
                </div>
                <p className="text-gray-500">Deep work session</p>
              </div>
            </motion.div>

            {/* Task Management */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <CheckSquare className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Smart Task Management</h3>
                </div>
                <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Add Task</span>
                </button>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </span>
                        {task.aiSuggested && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            <Brain className="h-3 w-3 mr-1" />
                            AI Suggested
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          getPriorityColor(task.priority)
                        }`}>
                          {task.priority.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {task.estimatedTime} min
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Productivity Analytics */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Weekly Productivity</h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="focus" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="tasks" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Meetings & Stats */}
          <div className="space-y-6">
            {/* Today's Meetings */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Today's Meetings</h3>
              </div>
              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                      {meeting.aiOptimized && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Zap className="h-3 w-3 mr-1" />
                          Optimized
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>{meeting.time}</span>
                      <span>{meeting.duration} min</span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {meeting.participants}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Today's Stats</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-semibold text-green-600">3/8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Focus Time</span>
                  <span className="font-semibold text-blue-600">{formatTime(focusTime)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Meetings Today</span>
                  <span className="font-semibold text-purple-600">{meetings.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Productivity Score</span>
                  <span className="font-semibold text-orange-600">87%</span>
                </div>
              </div>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Target className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
              </div>
              <div className="space-y-3">
                {aiInsights.slice(2).map((insight, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">{insight}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowSyncAI;