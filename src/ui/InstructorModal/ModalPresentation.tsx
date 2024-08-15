/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import scss from './Styled.module.scss';
import { useGetFileQuery } from '@/src/redux/api/instructor/presentation';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	boxShadow: 24,
	p: 4,
	sx: {
		padding: '0px'
	}
};
interface TeacherAddProps {
	open: boolean;
	handleClose: () => void;
	saveId: number | null;
}

const ModalPresentation: FC<TeacherAddProps> = ({
	open,
	handleClose,
	saveId
}) => {
	const { data } = useGetFileQuery(saveId || 0);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
				sx={{
					backgroundColor: '#161515bc',
					backdropFilter: 'none',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
				BackdropProps={{
					style: {
						backgroundColor: 'rgba(0, 0, 0, 0)'
					}
				}}
			>
				<Box className={scss.main_modal_vid} sx={{ ...style }}>
					{data && (
						<div className={scss.iframe}>
							<iframe
								style={{ borderRadius: '8px' }}
								src={`https://lms-b12.s3.eu-central-1.amazonaws.com/${data.file}`}
								frameBorder="0"
								width="100%"
								height="500px"
							></iframe>
						</div>
					)}
				</Box>
			</Modal>
		</div>
	);
};

export default ModalPresentation;
