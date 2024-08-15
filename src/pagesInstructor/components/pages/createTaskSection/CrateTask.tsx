import { Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { IconDotsVertical, IconPlus } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import scss from './CreateTask.module.scss';
import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import editImg from '@/src/assets/svgs/edit.svg';
import { useState } from 'react';
import DeleteTask from '@/src/ui/customModal/deleteModal/DeleteTask';
import empty from '@/src/assets/notCreated0.png';

const CrateTask = () => {
	const [openDelete, setOpenDelete] = useState(false);
	const [saveId, setSaveId] = useState<number | null>(null);
	const navigate = useNavigate();
	const { courseId, lessonId } = useParams();
	const test = Number(lessonId);
	const { data } = useGetTaskInstructorQuery(test);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const openLessonAddTask = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/addTask`
		);
	};

	const openLessonEditTask = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${saveId}/update`
		);
	};

	const GetTask = (id: number) => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${id}/panding`
		);
	};
	console.log(saveId);

	return (
		<div className={scss.Task}>
			<div className={scss.course_button_modal}>
				<Button
					size="large"
					className={scss.button}
					onClick={openLessonAddTask}
					variant="contained"
				>
					<div className={scss.icon}>
						<IconPlus stroke={2} />
					</div>
					<span style={{ textTransform: 'none' }}>Создать задание</span>
				</Button>
			</div>

			{data?.taskResponse && data.taskResponse.length > 0 ? (
				<div className={scss.card_lesson}>
					{data.taskResponse.map((item: { id: number; title: string }) => (
						<div
							key={item.id}
							className={scss.card_container}
							onClick={() => {
								localStorage.setItem('hwTask', item.title);
								setSaveId(item.id);
							}}
						>
							<Tooltip title={item.title}>
								<p onClick={() => GetTask(item.id)} className={scss.card_link}>
									{item.title}
								</p>
							</Tooltip>
							<div className={scss.button} onClick={() => setSaveId(item.id)}>
								<button onClick={handleClick}>
									<IconDotsVertical stroke={2} />
								</button>
							</div>
							<Menu
								id="positioned-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									'aria-labelledby': 'basic-button'
								}}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right'
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								PaperProps={{
									style: { boxShadow: 'none', border: '1px solid gray' }
								}}
							>
								<MenuItem
									onClick={() => {
										openLessonEditTask();
									}}
									style={{ display: 'flex', gap: '10px' }}
								>
									<img src={editImg} alt="#" />
									Редактировать
								</MenuItem>

								<MenuItem
									onClick={() => {
										setOpenDelete(true);
										setAnchorEl(null);
									}}
									style={{ display: 'flex', gap: '10px' }}
								>
									<img src={deleteImg} alt="#" />
									Удалить
								</MenuItem>
							</Menu>
						</div>
					))}
				</div>
			) : (
				<div className={scss.empty_page}>
					<img src={empty} alt="" />
				</div>
			)}

			<DeleteTask
				openModalDelete={openDelete}
				closeModalDelete={() => setOpenDelete(false)}
				deleteById={saveId}
			/>
		</div>
	);
};

export default CrateTask;
