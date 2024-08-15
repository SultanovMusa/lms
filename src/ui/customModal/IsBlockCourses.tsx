import { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';

import scss from './Style.module.scss';
import { useCreateStudentBlockCoursesMutation } from '@/src/redux/api/admin/courses';
import { Button } from '@mui/material';

type VideoLessonProps = {
	openModalBlock: boolean;
	handleCloseModal: () => void;
	saveIdElement: number | null;
	saveBlock: boolean;
};

const IsBlockCourses: FC<VideoLessonProps> = ({
	openModalBlock,
	handleCloseModal,
	saveIdElement,
	saveBlock
}) => {
	const [createStudentBlockCourses] = useCreateStudentBlockCoursesMutation();

	const updateCompletedFunc = async () => {
		await createStudentBlockCourses(saveIdElement);
		handleCloseModal();
	};

	return (
		<Dialog
			open={openModalBlock}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			PaperProps={{
				className: scss.dialog_paper
			}}
		>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					<h3>
						Вы уверены, что хотите{' '}
						{saveBlock ? 'Заблокировать' : 'Разблокировать'}?
					</h3>
				</DialogContentText>
			</DialogContent>
			<DialogActions
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'flex-end',
					paddingInline: '25px',
					alignItems: 'center',
					paddingBottom: '10px',
					paddingTop: '13px',
					gap: '10px'
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

				<Button
					variant="contained"
					style={{
						background: 'red',
						padding: '10px 24px',
						fontSize: '16px',
						fontWeight: '600',
						textTransform: 'none',
						borderRadius: '8px'
					}}
					size="small"
					onClick={updateCompletedFunc}
					type="submit"
					disabled={false}
				>
					{saveBlock === false ? 'Разблокировать' : 'Заблокировать'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default IsBlockCourses;
