import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const themes = {
  winter: 'winter',
  dracula: 'dracula',
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.winter;
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

const defaultState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
    },
    toggleTheme: (state) => {
      const { winter, dracula } = themes;
      state.theme = state.theme === winter ? dracula : winter;
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    },
  },
});

export default cartSlice.reducer;
export const { loginUser, logoutUser, toggleTheme } = cartSlice.actions;