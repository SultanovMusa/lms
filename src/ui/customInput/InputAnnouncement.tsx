import { TextField } from '@mui/material';
import scss from './Input.module.scss';
import { ChangeEvent, forwardRef } from 'react';

interface InputProps {
	value: string;
	type: string;
	label: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	error?: boolean;
}

type Ref = HTMLInputElement;

const InputAnnouncement = forwardRef<Ref, InputProps>(
	({ value, onChange, type, label, error }, ref) => {
		return (
			<>
				<TextField
					className={scss.inputBackground}
					id="outlined-textarea"
					label={label}
					value={value}
					onChange={onChange}
					type={type}
					error={error}
					ref={ref}
					multiline
					InputProps={{
						style: {
							borderRadius: '12px',
							minHeight: '10px'
						}
					}}
				/>
			</>
		);
	}
);

export default InputAnnouncement;
