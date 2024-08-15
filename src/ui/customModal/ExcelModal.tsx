// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { FC, useRef, useState } from 'react';
import {
	Modal,
	Box,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	OutlinedInput,
	useTheme,
	Theme
} from '@mui/material';
import { useForm } from 'react-hook-form';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import scss from './Style.module.scss';
import Input from '../customInput/Input';
import {
	useGetGroupAllQuery,
	usePostExcelStudentMutation
} from '@/src/redux/api/admin/student';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 542,
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};

interface SearchProps {
	handleClose: () => void;
	open: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

function getStyles(name: string, excelFileId: number | null, theme: Theme) {
	return {
		fontWeight: theme.typography.fontWeightRegular
	};
}

const ExcelModal: FC<SearchProps> = ({ handleClose, open }) => {
	const { handleSubmit } = useForm();
	const theme = useTheme();
	const [excelFileId, setExcelFileId] = useState<number | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [postExcelStudent] = usePostExcelStudentMutation();
	const { data } = useGetGroupAllQuery();

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setSelectedFile(event.target.files[0]);
			setFileName(event.target.files[0].name);
		}
	};

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setExcelFileId(event.target.value as number);
	};

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const onSubmit = async () => {
		if (selectedFile) {
			const formData = new FormData();
			formData.append('file', selectedFile);

			const newLink = {
				link: 'https://lms-js12-topaz.vercel.app/auth/newPassword'
			};

			try {
				await postExcelStudent({ excelFileId, formData, newLink });
				handleClose();
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style} className={scss.main_modal}>
				<Typography
					className={scss.text}
					id="modal-modal-title"
					variant="h6"
					component="h2"
				>
					<p className={scss.comText}>Импорт Excel в БД</p>
				</Typography>

				<Box className={scss.input_button_card}>
					<div className={scss.select_div}>
						<FormControl>
							<InputLabel style={{ background: '#fff' }} id="demo-name-label">
								Группа
							</InputLabel>
							<Select
								style={{ borderRadius: '12px' }}
								labelId="demo-name-label"
								id="demo-name"
								value={excelFileId}
								onChange={handleChange}
								input={<OutlinedInput label="groupName" />}
								MenuProps={MenuProps}
							>
								{data?.map((group) => (
									<MenuItem
										key={group.id}
										value={group.id}
										style={getStyles(group.groupName, excelFileId, theme)}
									>
										{group.groupName}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div style={{ display: 'flex', gap: '10px' }}>
							<Input
								value={fileName || ''}
								size="medium"
								width="100%"
								placeholder="Выберите Excel файл для импорта"
								type="text"
								onChange={handleFileChange}
							/>
							<input
								type="file"
								style={{ display: 'none' }}
								ref={fileInputRef}
								onChange={handleFileChange}
								accept=".xlsx, .xls"
							/>
							<ButtonCancel
								type="button"
								width="150px"
								disabled={false}
								onClick={handleButtonClick}
							>
								Обзор...
							</ButtonCancel>
						</div>
					</div>

					<div
						style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'flex-end',
							alignItems: 'center',
							paddingBottom: '10px',
							paddingTop: '13px',
							gap: '10px'
						}}
					>
						<ButtonCancel
							type="button"
							disabled={false}
							onClick={handleClose}
							width="117px"
						>
							Отмена
						</ButtonCancel>
						<ButtonSave
							type="submit"
							width="117px"
							disabled={!selectedFile}
							onClick={handleSubmit(onSubmit)}
						>
							Добавить
						</ButtonSave>
					</div>
				</Box>
			</Box>
		</Modal>
	);
};

export default ExcelModal;
