import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TaskItemProps } from '@/types/taskItemProps';
import dummyData from '@/data/data.dummy.json';

interface TaskState {
  tasks: TaskItemProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: null
};

// Async thunks would typically make API calls
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    // Simulated API call using the dummy data with type assertion
    const response = await Promise.resolve(dummyData.tasks as TaskItemProps[]);
    return response;
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: Omit<TaskItemProps, 'id'>) => {
    // Simulated API call
    const newTask = {
      ...task,
      id: Date.now().toString(),
    };
    return newTask;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: TaskItemProps) => {
    // Simulated API call
    return task;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.status = task.status === 'completed' ? 'pending' : 'completed';
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch tasks';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export const { toggleTaskStatus, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;