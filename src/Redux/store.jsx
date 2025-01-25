import { configureStore } from '@reduxjs/toolkit';
import loanReducer from './loanSlice';
import personalProfileSlice from './PersonalProfileSlice'
import EducationalProfileSlice from './EducationalProfileSlice';
import FinancialProfileSlice from './FinancialProfileSlice';
import DashboardSlice from './DashboardSlice';
export const store = configureStore({
  reducer: {
    loan: loanReducer,
    Personalformdata: personalProfileSlice,
    Educationalform: EducationalProfileSlice,
    FinancialProfileform: FinancialProfileSlice,
    DashboardDetails: DashboardSlice,
    
    
    
  },
});
