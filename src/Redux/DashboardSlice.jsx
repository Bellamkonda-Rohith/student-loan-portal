import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  TotalApplications: 0,
  QualifiedApplications: 0,
  NotQualifiedApplications: 0,
  disqualificationReasons: []
};

const DashboardSlice = createSlice({
  name: 'DashboardDetails',
  initialState,
  reducers: {
    incrementTotalApplications: (state) => {
      state.TotalApplications += 1;
    },
    incrementQualifiedApplications: (state) => {
      state.QualifiedApplications += 1;
    },
    incrementNotQualifiedApplications: (state) => {
      state.NotQualifiedApplications += 1;
    },
    addDisqualificationReason: (state, action) => {
      state.disqualificationReasons.push(action.payload);
    },
    fetchLatestData: (state, action) => {
      
     const { applications,
      Qapplications,
      notQualifiedApplications, 
      disqualificationReasons}= action.payload;

      state.TotalApplications = applications;
      state.QualifiedApplications = Qapplications;
      state.NotQualifiedApplications = notQualifiedApplications;
      state.disqualificationReasons = disqualificationReasons;
    }
  },
});

export const {
  incrementTotalApplications,
  incrementQualifiedApplications,
  incrementNotQualifiedApplications,
  addDisqualificationReason,
  fetchLatestData
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
