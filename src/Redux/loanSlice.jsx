import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loanType: '',
};

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    setLoanType: (state, action) => {
      state.loanType = action.payload;
    },
  },
});

export const { setLoanType } = loanSlice.actions;

export default loanSlice.reducer;
