import React, { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, IconButton, Typography, Paper, Divider, Checkbox } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Tasks } from '../dashboard/Tasks';
import { createTasks, updateTasks, deleteTasks } from '../services/api';
import { useRouter } from 'next/router';


interface HandleTarefaProps {
  tasks: Tasks[];
  setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
  //onAddTasks: (title: string) => Promise<void>;
}

const HandleTarefa: React.FC<HandleTarefaProps> = ({ tasks, setTasks }) => {
  const [newTasks, setNewTasks] = useState('');
  const [editingTasks, setEditingTasks] = useState<Tasks | null>(null);
  const [token] = useState(localStorage.getItem('token') || '');
  const [keyword, setKeyword] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = React.useState<string>('');
  const router = useRouter();


  const handleAddTasks = async () => {
    const createdTasks = await createTasks(newTasks, token);
    if (newTasks.trim()) {
      try {
        //await onAddTasks(title);
        setTasks([...tasks, createdTasks]);
        setNewTasks('');
      } catch (error) {
        console.error('Failed to create tasks:', error);
      }
    }
  };

  const handleUpdateTasks = async (id:number) => {
    if (editingTasks) {
      try {
        const updatedTasks = await updateTasks(id, editingTasks.title, !editingTasks.completed, token);
        setTasks(tasks.map((tasks) => (tasks.id === id ? updatedTasks : tasks)));
        setEditingTasks(null);
      } catch (error) {
        console.error('Failed to update tasks:', error);
      }
    }
  };

  const handleToggleComplete = async (task: Tasks) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const updatedTask = await updateTasks(task.id, task.title, !task.completed, token);
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
      } catch (error) {
        setError('Failed to update task');
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDeleteTasks = async (id: number) => {
    try {
      await deleteTasks(id, token);
      router.reload();
    } catch (error) {
      console.error('Failed to delete tasks:', error);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(keyword.toLowerCase()));


  return (
    <Paper elevation={3} style={{ padding: '16px', maxWidth: '600px', margin: 'auto' }}>
    <Typography variant="h5" gutterBottom>
      Gerenciar Tarefas
    </Typography>
      
      <TextField
      label="Filtrar por palavra-chave"
      variant="outlined"
      value={keyword}
      onChange={handleFilterChange}
      fullWidth
      margin="normal"
    />

    <List>
      {filteredTasks.map((task) => (
        <ListItem key={task.id}>
          <ListItemText primary={task.title} secondary={task.completed} />
        </ListItem>
      ))}
    </List>
      
    <TextField
      label="Nova Tarefa"
      variant="outlined"
      value={newTasks}
      onChange={(e) => setNewTasks(e.target.value)}
      fullWidth
      margin="normal"
      onKeyPress={(e) => e.key === 'Enter' && handleAddTasks()}
    />
    <Button variant="contained" color="primary" onClick={handleAddTasks} fullWidth>
      Adicionar Tarefa
    </Button>
    <Divider style={{ margin: '16px 0' }} />
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} secondaryAction={
          <>
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggleComplete(task)}
            />
            <IconButton edge="end" aria-label="edit" onClick={() => setEditingTasks(task)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTasks(task.id)}>
              <Delete />
            </IconButton>
          </>
        }>
          <ListItemText
            primary={
              editingTasks && editingTasks.id === task.id ? (
                <TextField
                  value={editingTasks.title}
                  onChange={(e) => setEditingTasks({ ...editingTasks, title: e.target.value })}
                  onBlur={() => handleUpdateTasks(task.id)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUpdateTasks(task.id)}
                  fullWidth
                  variant="outlined"
                />
              ) : (
                  task.title
                )
            }
          />
        </ListItem>
      ))}
      </List>
  </Paper>
  );
};

export default HandleTarefa;
