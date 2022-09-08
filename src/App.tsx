// Imports
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/storeHooks";
import { decrement, increment, incrementByAmount, getData, searchData } from "./store/features/counterSlice";

// Component
const App = () => {

	// Store
	const { value, jokes } = useAppSelector((store) => { return store.counter });

	// Dispatch
	const dispatch = useAppDispatch();

	// Get data from server
	useEffect(() => {
		dispatch(getData());
		dispatch(searchData({ value:'beer' }));
	},[dispatch]);

	// Return
	return(
		<React.Fragment>
			<button onClick={ () => { dispatch(decrement()); } }>
				Decrement
			</button>
			<span>{ value }</span>
			<button onClick={ () => { dispatch(increment()); } }>
				Increment
			</button>
			<button onClick={ () => { dispatch(incrementByAmount({ value:5 })); } }>
				Increment by 5
			</button>
			<main>
				{
					jokes.map((joke:{ id:string, value:string }) => {
						const { id, value } = joke;
						return <p key={ id }>{ value }</p>
					})
				}
			</main>
		</React.Fragment>
	);

};

// Export
export default App;