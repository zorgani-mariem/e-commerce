import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  errors: {},
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    resetForm: (state) => {
      state.name = '';
      state.email = '';
      state.phone = '';
      state.password = '';
      state.confirmPassword = '';
      state.errors = {};
    },
  },
});

export const {
  setName,
  setEmail,
  setPhone,
  setPassword,
  setConfirmPassword,
  setErrors,
  resetForm,
} = registerSlice.actions;

export default registerSlice.reducer;
