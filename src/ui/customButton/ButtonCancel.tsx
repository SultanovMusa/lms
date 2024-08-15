import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';

interface CancelButtonPlusProps {
	type: 'button' | 'submit' | 'reset';

	width: string;
	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
}

const ButtonCancel: FC<CancelButtonPlusProps> = ({
	type,
	width,
	children,
	disabled,
	onClick
}) => {
	return (
		<>
			<Button
				type={type}
				className={scss.CancelButton}
				style={{ width }}
				onClick={onClick}
				disabled={disabled}
				variant="contained"
			>
				{children}
			</Button>
		</>
	);
};

export default ButtonCancel;
