import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  firstName: string;
  lastName: string;
  userName: string;
}
interface userState {
  premissions: string[] | null;
  user: any;
  userType: string | null;
  officer: any;
  token: any;
  rank: any;
}
const initialState: userState = {
  premissions: [],
  user: null,
  userType: null,
  officer: null,
  token: null,
  rank: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setData: (state: userState, action) => {
      let data = action.payload;
      state.user = data.user;
      state.premissions = data.premissions;
      state.userType = data.userType;
      state.officer = data.officer;
      state.token = data.token;
      state.rank = data.rank;
    },
    removeData: (state: userState) => {
      state.user = null;
      state.premissions = null;
      state.userType = null;
      state.officer = null;
      state.token = null;
      state.rank = null;
    },
  },
});

export const { setData, removeData } = userSlice.actions;
// The functions below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = (state: any) => {
  return state.userSlice.user;
};
export const selectPremissions = (state: any): string[] => {
  return state.userSlice.premissions;
};
export const selectOfficer = (state: any) => {
  return state.userSlice.officer;
};
export const selectToken = (state: any) => state.userSlice.token;

export const selectUserType = (state: any) => state.userSlice.userType;

export const selectRank = (state: any) => state.userSlice.rank;

export const getUser = () => (dispatch: any, getState: any) => {
  return getState().userSlice.user;
};

export const getPremissions = () => (dispatch: any, getState: any):any[] => {
  return getState().userSlice.premissions;
};

export const getUserType = () => (dispatch: any, getState: any) => {
  return getState().userSlice.userType;
};

export default userSlice.reducer;
