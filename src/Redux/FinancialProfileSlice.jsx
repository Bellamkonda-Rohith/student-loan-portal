import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    income: '',
    employment: '',
    financialInfo: '',
};

const FinancialProfileSlice = createSlice({
  name: 'FinancialProfileform',
  initialState,
  reducers: {
    setFinancialProfile: (state, action) => {
      const { income, employment, financialInfo } = action.payload;
      state.income = income;
      state.employment = employment;
      state.financialInfo = financialInfo;
    },
    resetFinancialProfile: (state) => {
      state.income = '';
      state.employment = '';
      state.financialInfo = '';
    },
  },
});

export const { setFinancialProfile, resetFinancialProfile } = FinancialProfileSlice.actions;

export default FinancialProfileSlice.reducer;
