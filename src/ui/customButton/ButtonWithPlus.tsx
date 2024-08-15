import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';
import PlusIcon from '@/src/assets/svgs/plus.svg';

interface ButtonWithPlusProps {
	type: 'button' | 'submit' | 'reset';

	children: ReactNode;
	disabled: boolean;
	onClick?: () => void;
}

const ButtonWithPlus: FC<ButtonWithPlusProps> = ({
	type,
	children,
	disabled,
	onClick
}) => {
	return (
		<>
			<Button
				type={type}
				className={scss.PlusButton}
				disabled={disabled}
				variant="contained"
				onClick={onClick}
			>
				<img className={scss.PlusIcon} src={PlusIcon} alt="#" />
				{children}
			</Button>
		</>
	);
};

export default ButtonWithPlus;
