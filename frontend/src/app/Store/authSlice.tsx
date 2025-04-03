import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface TypeUserdata {
    name : string,
    email : string
}

interface state {
    isAuthenticated : boolean,
    userData : TypeUserdata | null
}


const initialState : state = {
  isAuthenticated: false,
  userData : null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action : PayloadAction<TypeUserdata>) => {
      state.isAuthenticated = true;
      state.userData = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;