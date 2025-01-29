import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    qualification: "",
    institution: "",
    graduationYear: "",
    gpa: "",
};

const EducationalProfileSlice = createSlice({
  name: 'Educationalform',
  initialState,
  reducers: {
    setEducationalProfile: (state, action) => {
      const { qualification, institution, graduationYear, gpa } = action.payload;
      state.qualification = qualification;
      state.institution = institution;
      state.graduationYear = graduationYear;
      state.gpa = gpa;
    },
    resetEducationalProfile: (state) => {
      state.qualification = "";
      state.institution = "";
      state.graduationYear = "";
      state.gpa = "";
    },
  },
});

export const { setEducationalProfile, resetEducationalProfile } = EducationalProfileSlice.actions;

export default EducationalProfileSlice.reducer;
