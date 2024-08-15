import { styled } from '@mui/material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FC } from 'react';
import { useSendAccessResultTestMutation } from '@/src/redux/api/instructor/resultTest';
import { useParams } from 'react-router-dom';

const IOSSwitch = styled((props: SwitchProps) => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
	width: 42,
	height: 26,
	padding: 0,
	'& .MuiButtonBase-root.MuiSwitch-switchBase': {
		color: 'red'
	},
	'& .MuiSwitch-switchBase': {
		padding: 0,
		margin: 2,
		transitionDuration: '300ms',

		'&.Mui-checked': {
			transform: 'translateX(16px)',
			color: '#36AC0C',
			'& + .MuiSwitch-track': {
				backgroundColor: theme.palette.mode === 'dark' ? '#eae9e9' : '#ffffff',
				opacity: 1,
				border: 0
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5
			}
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: '#36AC0C',
			border: '6px solid #fff'
		},

		'&.Mui-disabled .MuiSwitch-thumb': {
			color:
				theme.palette.mode === 'light'
					? theme.palette.grey[100]
					: theme.palette.grey[600]
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
		}
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 22,
		height: 22
	},
	'& .MuiSwitch-track': {
		borderRadius: 26 / 2,
		backgroundColor: theme.palette.mode === 'light' ? '#dbdbdb' : '#3d3939',

		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 500
		})
	}
}));
interface IsTrueProps {
	setIsTrue: (value: boolean) => void;
	isTrue: boolean;
}
const GreenSwitch: FC<IsTrueProps> = ({ isTrue, setIsTrue }) => {
	const { testId } = useParams();
	const test = Number(testId);
	console.log(test);

	const [sendAccessResultTest] = useSendAccessResultTestMutation();
	const handleAccess = async () => {
		await sendAccessResultTest({ test, isTrue });
	};
	return (
		<FormGroup>
			<FormControlLabel
				onClick={() => {
					setIsTrue(!isTrue);
					handleAccess();
				}}
				control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
				label={
					!isTrue ? (
						<p style={{ color: 'green' }}>Ответы принимаются</p>
					) : (
						<p style={{ color: 'red' }}>Ответы не принимаются</p>
					)
				}
				labelPlacement="start"
				sx={{
					'& .MuiFormControlLabel-label': {
						color: 'green',
						fontSize: 12,
						fontWeight: 'bold'
					}
				}}
			/>
		</FormGroup>
	);
};

export default GreenSwitch;
