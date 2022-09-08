// Imports
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";

// Store
const store = configureStore({
	reducer:{
		counter:counterReducer
	}
});

// Export
export default store;

// Types
// Infer the RootState and AppDispatch types from the store
// Inferring these types from the store itself means that 
// they are correctly update as you add more slices
export type RootState = ReturnType<typeof store.getState>;
// Inferred type : { counter:CounterState, etc... }
export type AppDispatch = typeof store.dispatch;