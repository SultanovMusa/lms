import { TextField } from '@mui/material';
import scss from './Input.module.scss';
import { ChangeEvent, forwardRef } from 'react';

interface InputProps {
	placeholder: string;
	width: string;
	value: string;
	type: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	error?: boolean;
	size: 'medium' | 'small';
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>(
	({ placeholder, width, value, onChange, type, error, size }, ref) => {
		return (
			<>
				<TextField
					className={scss.inputBackground}
					id="customWidth"
					style={{ width }}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					type={type}
					error={error}
					ref={ref}
					size={size}
					InputProps={{
						style: {
							borderRadius: '12px'
						}
					}}
				/>
			</>
		);
	}
);

export default Input;
