import { FC, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import ButtonDelete from '@/src/ui/customButton/ButtonDelete';
import scss from './DeleteMaterial.module.scss';
import { useDeleteMaterialMutation } from '@/src/redux/api/instructor/materials';
import { message } from 'antd';

type MaterialProps = {
	open: boolean;
	handleCloseModal: () => void;
	deleteById: number | null;
};

const DeleteMaterial: FC<MaterialProps> = ({
	open,
	handleCloseModal,
	deleteById
}) => {
	const [deleteMaterial] = useDeleteMaterialMutation();
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		if (isDeleting) return;

		setIsDeleting(true);
		try {
			await deleteMaterial(deleteById);
			handleCloseModal();
			message.success('Урок успешно добавлено в корзину!');
		} catch (error) {
			console.error('Failed to delete material:', error);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div>
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
						<h3>Вы уверены, что хотите удалить урок?</h3>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<ButtonCancel
						width="103px"
						onClick={handleCloseModal}
						disabled={isDeleting}
						type="submit"
					>
						Отмена
					</ButtonCancel>
					<ButtonDelete
						onClick={handleDelete}
						type="submit"
						disabled={isDeleting}
					>
						Удалить
					</ButtonDelete>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default DeleteMaterial;
