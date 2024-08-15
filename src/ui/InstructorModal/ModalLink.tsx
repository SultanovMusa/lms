/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import scss from './Styled.module.scss';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	sx: {
		bgcolor: 'background.paper',
		padding: '0px'
	}
};
interface TeacherAddProps {
	open: boolean;
	handleClose: () => void;
}

const ModalLink: FC<TeacherAddProps> = ({ open, handleClose }) => {
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box className={scss.main_modal_vid} sx={{ ...style }}></Box>
			</Modal>
		</div>
	);
};

export default ModalLink;
