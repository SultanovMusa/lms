/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FC, useEffect } from 'react';
import scss from './Styled.module.scss';
import { useGetIdVideoLessonQuery } from '@/src/redux/api/instructor/video';
import { useSearchParams } from 'react-router-dom';

interface ModalWatchVideoProps {
	open: boolean;
	handleClose: () => void;
}

const ModalWatchVideo: FC<ModalWatchVideoProps> = ({ open, handleClose }) => {
	const [searchParams, _] = useSearchParams();
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

	const { data, isLoading, isError } = useGetIdVideoLessonQuery(
		Number(searchParams.get('videoId')) ?? 0
	);

	useEffect(() => {
		if (searchParams.get('videoId')) {
			console.log(`Fetching video with ID: ${searchParams.get('videoId')}`);
		} else {
			console.log('No saveId provided');
		}
	}, [searchParams.get('videoId')]);

	return (
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
			<Box
				className={scss.main_modal_vid}
				sx={{
					...style,
					backgroundColor: 'transparent',
					boxShadow: 'none',
					border: 'none'
				}}
			>
				{isError && <p>Error fetching video.</p>}
				{isLoading ? (
					<p>Loading video...</p>
				) : data && data.linkOfVideo ? (
					<div className={scss.iframe}>
						<iframe
							style={{ borderRadius: '10px' }}
							src={`https://www.youtube.com/embed/${data.linkOfVideo}`}
							width="100%"
							height="480px"
							allowFullScreen
						></iframe>
					</div>
				) : (
					<p>No video available.</p>
				)}
			</Box>
		</Modal>
	);
};

export default ModalWatchVideo;
