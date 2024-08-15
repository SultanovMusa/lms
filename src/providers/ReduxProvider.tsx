import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { FC, ReactNode } from 'react';

interface ReduxProviderProps {
	children: ReactNode;
}

const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => {
	return (
		<>
			<Provider store={store}>{children}</Provider>
		</>
	);
};

export default ReduxProvider;
