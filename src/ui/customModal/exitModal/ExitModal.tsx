import scss from './ExitModal.module.scss';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

interface DeleteProps {
	openExit: boolean;
	handleClose: () => void;
}

const ExitModal: React.FC<DeleteProps> = ({ handleClose, openExit }) => {
	const navigate = useNavigate();

	const handleExit = () => {
		navigate(`/auth/login`);
		localStorage.clear();
	};

	return (
		<div>
			<React.Fragment>
				<div className={scss.dialog_paper}>
					<Dialog
						open={openExit}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						PaperProps={{
							className: scss.dialogPaper
						}}
					>
						<DialogContent style={{ height: 'auto' }}>
							<DialogContentText
								id="alert-dialog-description"
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '10px',
									fontSize: '18px',
									fontWeight: '600'
								}}
							>
								<h3 style={{ color: '#5f5f5f' }}>Выход</h3>
								<h4 style={{ color: '#848484' }}>
									Вы уверены что хотите выйти из Peaksoft LMS ?
								</h4>
							</DialogContentText>
						</DialogContent>
						<DialogActions
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center',
								paddingInline: '25px',
								paddingBottom: '10px',
								paddingTop: '13px',
								gap: '2px'
							}}
						>
							<Button
								variant="text"
								style={{ fontSize: '16px', fontWeight: '600' }}
								onClick={handleClose}
							>
								Нет
							</Button>
							<Button
								style={{
									color: '#f83b3b',
									fontSize: '16px',
									fontWeight: '600'
								}}
								variant="text"
								onClick={() => {
									handleClose();
									handleExit();
								}}
							>
								Да
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</React.Fragment>
		</div>
	);
};

export default ExitModal;
