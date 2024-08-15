import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';

interface ButtonSaveProps {
	type: 'button' | 'submit' | 'reset';
	width: string;
	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
}

const ButtonSave: FC<ButtonSaveProps> = ({
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
				style={{ width }}
				className={scss.SaveButton}
				disabled={disabled}
				variant="contained"
				onClick={onClick}
			>
				{children}
			</Button>
		</>
	);
};

export default ButtonSave;
