import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UserState {
  users: User[];
  filteredUsers: User[];
  filter: Partial<Record<keyof User, string>>;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  filter: {},
  status: 'idle',
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const { data } = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    return data;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<{ key: keyof User; value: string }>) => {
      const { key, value } = action.payload;
      state.filter[key] = value;
      // Apply the filter to users
      state.filteredUsers = state.users.filter(user => {
        // Convert values to string and perform the filter
        const filterValue = state.filter[key]?.toLowerCase() || '';
        const userValue = user[key]?.toString().toLowerCase() || '';
        return userValue.includes(filterValue);
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.users = payload;
        state.filteredUsers = payload; // Initialize filteredUsers
      })
      .addCase(fetchUsers.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { updateFilter } = userSlice.actions;
export default userSlice.reducer;