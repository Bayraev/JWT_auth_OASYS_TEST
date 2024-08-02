import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedComponent: 'auth',
  editingPage: false,
};

const NavigationSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setSelectedComponent: (state, action: PayloadAction<string>) => {
      state.selectedComponent = action.payload;
    },
  },
});

export const { setSelectedComponent } = NavigationSlice.actions;
export default NavigationSlice.reducer;
