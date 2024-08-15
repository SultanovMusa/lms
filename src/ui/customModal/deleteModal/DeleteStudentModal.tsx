import { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { message } from 'antd';
import { useDeleteStudentTableMutation } from '@/src/redux/api/admin/student';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import ButtonDelete from '@/src/ui/customButton/ButtonDelete';
import scss from './DeleteStudentModal.module.scss';

type StudentModalProps = {
	open: boolean;
	handleCloseModal: () => void;
	saveIdElement: number | null;
};

const DeleteStudentModal: FC<StudentModalProps> = ({
	open,
	handleCloseModal,
	saveIdElement
}) => {
	const [deleteStudentTable] = useDeleteStudentTableMutation();

	const handleDelete = async () => {
		if (saveIdElement !== null) {
			try {
				await deleteStudentTable(saveIdElement);
				message.success('Студент успешно добавлено в корзину!');
			} catch (error) {
				message.error('Ошибка при удалении студента');
				console.error('Error:', error);
			}
		}
		handleCloseModal();
	};

	return (
		<Dialog
			open={open}
			onClose={handleCloseModal}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			PaperProps={{
				className: scss.dialog_paper
			}}
		>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					<h3>Вы уверены, что хотите удалить этого студента?</h3>
				</DialogContentText>
			</DialogContent>
			<DialogActions
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'center',
					paddingBottom: '10px',
					paddingTop: '13px',
					gap: '10px',
					paddingInline: '25px'
				}}
			>
				<ButtonCancel
					width="117px"
					onClick={handleCloseModal}
					disabled={false}
					type="submit"
				>
					Отмена
				</ButtonCancel>
				<ButtonDelete onClick={handleDelete} type="submit" disabled={false}>
					Удалить
				</ButtonDelete>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteStudentModal;
