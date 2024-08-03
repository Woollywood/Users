export const authReducer = (state, { type, payload }) => {
	switch (type) {
		case 'SET_LOADING': {
			return { ...state, loading: payload };
		}
		case 'SET_USER': {
			return { ...state, user: payload };
		}
		case 'RESET_USER': {
			return { ...state, user: null };
		}
	}
};
