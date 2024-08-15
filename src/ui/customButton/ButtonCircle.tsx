import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';
import PlusIcon from '@/src/assets/svgs/plus.svg';

interface CircleButtonProps {
	type: 'button' | 'submit' | 'reset';

	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
}

const ButtonCircle: FC<CircleButtonProps> = ({
	type,
	children,
	disabled,
	onClick
}) => {
	return (
		<>
			<Button
				type={type}
				className={scss.CircleButton}
				disabled={disabled}
				variant="contained"
				onClick={onClick}
			>
				{children}
				<img className={scss.PlusIcon} src={PlusIcon} alt="#" />
			</Button>
		</>
	);
};

export default ButtonCircle;
