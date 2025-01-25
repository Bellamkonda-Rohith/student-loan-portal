import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Fullname: "",
    Dob: "",
    Address: "",
    ContactInfo: "",
    
};

const PersonalProfileSlice = createSlice({
  name: 'Personalformdata',
  initialState,
  reducers: {
    setpersonalProfile: (state, action) => {
          const { Fullname, Dob, Address, ContactInfo } = action.payload;
          state.Fullname = Fullname;
          state.Dob = Dob;
          state.Address = Address;
          state.ContactInfo = ContactInfo;
    },
  },
});

export const { setpersonalProfile } = PersonalProfileSlice.actions;

export default PersonalProfileSlice.reducer;
