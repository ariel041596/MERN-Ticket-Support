import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Function to create async data
// Create a ticket note
export const createNote = createAsyncThunk(
  "notes/create",
  async ({ noteText, ticketID }, thunkAPI) => {
    //noteData is from the frontend
    try {
      // Get the user via thunkAPI
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createNote(noteText, ticketID, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user note
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (ticketID, thunkAPI) => {
    // ticketID is from the frontend
    try {
      // Get the user via thunkAPI
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(ticketID, token); // if after (async has a parameter before thunkAPi please add also the second argument before the token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
        // .push is where you wanted to see in the frontend the requested data rather than loading
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
