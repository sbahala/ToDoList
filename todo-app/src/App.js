import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Checkbox
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
const API_URL = "http://127.0.0.1:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");


  // Fetch tasks from the backend
  useEffect(() => {
    axios.get(`${API_URL}/tasks`).then(response => setTasks(response.data))
    .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      axios.post(`${API_URL}/tasks`, { task: newTask, priority })  // ✅ Send priority too
        .then(response => {
          setTasks([...tasks, { id: response.data.id, task: newTask, priority }]); // ✅ Ensure ID is included
          setNewTask("");
        })
        .catch(error => console.error("Error adding task:", error));
    }
  };  

  // Delete a task
  const deleteTask = (taskId) => {
    axios.delete(`${API_URL}/tasks/${taskId}`).then(() => setTasks(tasks.filter(task => task.id !== taskId)))
    .catch(error => console.error("Error deleting task:", error));
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: "50px" }}>
      <Paper elevation={3} sx={{ padding: "20px", borderRadius: "10px" }}>
        <Typography variant="h4" gutterBottom>
          📝 To-Do List
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              label="Add a Task"
              variant="outlined"
              fullWidth
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <MenuItem value="High">🔥 High</MenuItem>
                <MenuItem value="Medium">⚡ Medium</MenuItem>
                <MenuItem value="Low">🟢 Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<AddIcon />}
              onClick={addTask}
            >
              Add Task
            </Button>
          </Grid>
        </Grid>

        {/* Task List */}
        <List sx={{ marginTop: "20px" }}>
          {tasks.map((task, index) => (
            <ListItem
              key={task.id || index}
              divider
              secondaryAction={
                <IconButton onClick={() => deleteTask(task.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Checkbox icon={<CancelIcon />} checkedIcon={<CheckCircleIcon />} />
              <ListItemText
                primary={task.task}
                secondary={`Priority: ${task.priority || "Medium"}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
