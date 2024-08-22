import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tasks } from '../dashboard/Tasks';

interface ListaTarefaProps {
  tasks: Tasks[];
  addTasks: (text: string) => void;
  toggleCompleted: (id: number) => void;
  removeTasks: (id: number) => void;
}

const ListaTarefa: React.FC<ListaTarefaProps> = ({ tasks, addTasks, toggleCompleted, removeTasks }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTasks(text);
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <TextField
          label="Add a new task"
          variant="outlined"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
      </form>
      <List>
        {tasks.map(tasks => (
          <ListItem key={tasks.id} divider>
            <Checkbox
              checked={tasks.completed}
              onChange={() => toggleCompleted(tasks.id)}
              color="primary"
            />
            <ListItemText
              primary={tasks.title}
              style={{ textDecoration: tasks.completed ? 'line-through' : 'none' }}
            />
            <IconButton edge="end" onClick={() => removeTasks(tasks.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ListaTarefa;
