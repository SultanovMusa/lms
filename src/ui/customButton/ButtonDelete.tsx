import { FC, ReactNode } from 'react';
import Button from '@mui/material/Button';
import scss from './CustomButton.module.scss';

interface ButtonDeleteProps {
	type: 'button' | 'submit' | 'reset';

	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
}

const ButtonDelete: FC<ButtonDeleteProps> = ({
	type,
	children,
	disabled,
	onClick
}) => {
	return (
		<>
			<Button
				type={type}
				className={scss.DeleteButton}
				disabled={disabled}
				variant="contained"
				onClick={onClick}
			>
				{children}
			</Button>
		</>
	);
};

export default ButtonDelete;
