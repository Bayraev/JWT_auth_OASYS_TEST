import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  selectedComponent: string;
  editingPage: boolean;
}
const initialState: IInitialState = {
  selectedComponent: 'users',
  editingPage: false,
};

const NavigationSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setSelectedComponent: (state, action: PayloadAction<string>) => {
      state.selectedComponent = action.payload;
    },
    setEditingPage: (state) => {
      state.editingPage = !state.editingPage;
    },
  },
});

export const { setSelectedComponent, setEditingPage } = NavigationSlice.actions;
export default NavigationSlice.reducer;
