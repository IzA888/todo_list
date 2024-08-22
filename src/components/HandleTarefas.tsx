import React, { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, IconButton, Typography, Paper, Divider } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Tasks } from '../dashboard/Tasks';
import { createTasks, updateTasks, deleteTasks, fetchTasks } from '../services/api';


interface HandleTarefaProps {
  tasks: Tasks[];
  setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
  onAddTasks: (title: string) => Promise<void>;
}

const HandleTarefa: React.FC<HandleTarefaProps> = ({ tasks, setTasks }) => {
  const [newTasks, setNewTasks] = useState('');
  const [editingTasks, setEditingTasks] = useState<Tasks | null>(null);
  const [token] = useState(localStorage.getItem('token') || '');


  const handleAddTasks = async () => {
    const createdTasks = await createTasks(newTasks, token);
    if (newTasks.trim()) {
      try {
        
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
        const updatedTasks = await updateTasks(id, editingTasks.title, token);
        setTasks(tasks.map((tasks) => (tasks.id === id ? updatedTasks : tasks)));
        setEditingTasks(null);
      } catch (error) {
        console.error('Failed to update tasks:', error);
      }
    }
  };

  const handleDeleteTasks = async (id: number) => {
    try {
      await deleteTasks(id, token);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete tasks:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', maxWidth: '600px', margin: 'auto' }}>
    <Typography variant="h5" gutterBottom>
      Gerenciar Tarefas
    </Typography>
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
