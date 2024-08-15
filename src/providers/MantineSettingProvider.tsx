import { FC, ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';

interface MantineSettingProviderProps {
	children: ReactNode;
}

const MantineSettingProvider: FC<MantineSettingProviderProps> = ({
	children
}) => {
	return (
		<>
			<MantineProvider>{children}</MantineProvider>
		</>
	);
};

export default MantineSettingProvider;
