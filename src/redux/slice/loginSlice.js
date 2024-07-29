// redux/slice/loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  errors: {},
  loading: false,
  success: false,
};

export const login = createAsyncThunk(
  'login/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const users = JSON.parse(localStorage.getItem("users"));
      if (password === users.password && email === users.email) {
        localStorage.setItem('isLogged', 'true');
        return { email }; // Returning user data if needed
      } else {
        return thunkAPI.rejectWithValue({ error: 'Invalid credentials' });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('login/logoutUser', async () => {
  localStorage.removeItem('isLogged');
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    resetForm(state) {
      state.email = '';
      state.password = '';
      state.errors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.errors = {};
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.errors = {};
        state.email = action.payload.email; // Save email if needed
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.errors = action.payload || {};
      })
      .addCase(logout.fulfilled, (state) => {
        state.success = false;
        state.email = '';
      });
  },
});

export const { setEmail, setPassword, setErrors, resetForm } = loginSlice.actions;
export default loginSlice.reducer;
