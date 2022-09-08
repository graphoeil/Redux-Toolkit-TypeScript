// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Type
interface CounterState {
	value:number;
	jokes:{
		id:string;
		value:string;
	}[];
};

// Initial state
const initialState:CounterState = {
	value:0,
	jokes:[]
};

// Thunk methods
export const getData = createAsyncThunk('counter/getData', async(_, thunkAPI) => {
	try {
		const response = await axios.get('https://api.chucknorris.io/jokes/random');
		return response.data.value;
	} catch (error){
		return thunkAPI.rejectWithValue('An error occured ! => ' + (error as { message:string }).message);
	}
});
export const searchData = createAsyncThunk('counter/searchData', async(search:{ value:string }, thunkAPI) => {
	try {
		const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${ search.value }`);
		return response.data.result;
	} catch (error){
		return thunkAPI.rejectWithValue('An error occured ! => ' + (error as { message:string }).message);
	}
});

// Slice
const counterSlice = createSlice({
	name:'counter',
	initialState,
	reducers:{
		// Increment
		increment:(state) => {
			state.value += 1;
		},
		// Decrement
		decrement:(state) => {
			state.value -= 1;
		},
		// Increment by amount
		incrementByAmount:(state, { payload }) => {
			const { value } = payload;
			state.value += value;
		}
	},
	extraReducers:(builder) => {
		// Get data
		builder.addCase(getData.pending, (state, action) => {
			console.log('Loading...');
		});
		builder.addCase(getData.fulfilled, (state, action) => {
			console.log('Success !');
			console.log(action.payload);
		});
		builder.addCase(getData.rejected, (state, action) => {
			console.log(action.payload);
		});
		// Search data
		builder.addCase(searchData.pending, (state, action) => {
			console.log('Loading...');
		});
		builder.addCase(searchData.fulfilled, (state, action) => {
			console.log('Success !');
			state.jokes = action.payload;
		});
		builder.addCase(searchData.rejected, (state, action) => {
			console.log(action.payload);
		});
	}
});

// Actions export
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Reducer export
export default counterSlice.reducer;