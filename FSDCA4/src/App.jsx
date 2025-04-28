import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Low');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === '') return;

    if (isEditing) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { ...updatedTasks[editIndex], name: taskName, priority };
      setTasks(updatedTasks);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { name: taskName, priority, completed: false }]);
    }
    setTaskName('');
    setPriority('Low');
  };

  const handleEdit = (index) => {
    setTaskName(tasks[index].name);
    setPriority(tasks[index].priority);
    setIsEditing(true);
    setEditIndex(index);
  
  };

  const handleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Task List with Priority</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
      </form>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ 
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'gray' : 'black'
          }}>
            {task.name} ({task.priority})
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleComplete(index)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
