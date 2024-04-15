import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState {
  email?: string;
  username?: string;
}

const initialState: UserState = {
  email: '',
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    resetStateUser: () => initialState,
  },
});

export default userSlice.reducer;

export const { resetStateUser, updateUsername, updateEmail } =
  userSlice.actions;
