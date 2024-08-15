import { Checkbox } from '@mui/material';
import { FC } from 'react';
import scss from './CheckBox.module.scss';

interface CheckboxProps {
	disabled: boolean;
}

const CheckBox: FC<CheckboxProps> = ({ disabled }) => {
	return (
		<>
			<Checkbox
				className={scss.HoverForCheck}
				disabled={disabled}
				inputProps={{ 'aria-label': 'Checkbox demo' }}
			/>
		</>
	);
};

export default CheckBox;
