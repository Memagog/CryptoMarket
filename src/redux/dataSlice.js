import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  coins: [],
  status: 'idle',
  select: {},
  history: [],
};

export const getDataAsync = createAsyncThunk('fetchData', async () => {
  try {
    const response = await fetch('https://api.coincap.io/v2/assets').then(res =>
      res.json(),
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const getHistoryAsync = createAsyncThunk('getHistory', async id => {
  try {
    const response = await fetch(
      `https://api.coincap.io/v2/assets/${id}/history?interval=d1`,
    ).then(res => res.json());
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    selectCoin: (state, action) => {
      state.select = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getDataAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getDataAsync.fulfilled, (state, action) => {
        state.coins = action.payload;
        state.status = 'fin';
      })
      .addCase(getHistoryAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getHistoryAsync.fulfilled, (state, action) => {
        state.history = action.payload;
        state.status = 'fin';
      });
  },
});

export const { selectCoin } = dataSlice.actions;
export const mainData = state => state;
export default dataSlice.reducer;
