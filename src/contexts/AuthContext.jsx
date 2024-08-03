import { createContext, useReducer, useContext } from 'react';
import { authReducer } from '../reducers/AuthReducer';

const initialState = {
	loading: false,
	user: null,
};

const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

export function useAuth() {
	return useContext(AuthContext);
}

export function useAuthDispatch() {
	return useContext(AuthDispatchContext);
}

export function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(authReducer, initialState);

	return (
		<AuthContext.Provider value={state}>
			<AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
		</AuthContext.Provider>
	);
}
