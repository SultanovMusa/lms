import { useParams } from 'react-router-dom';
import scss from './Link.module.scss';
import { Tooltip } from '@mui/material';
import { useGetLinkQuery } from '@/src/redux/api/instructor/link';

const Link = () => {
	const { lessonId } = useParams();
	const lesson = Number(lessonId);
	const { data, isLoading } = useGetLinkQuery(lesson);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={scss.link_section}>
			<div className={scss.container}>
				<div className={scss.card}>
					{data?.objects?.map((item) => (
						<>
							<div className={scss.cards}>
								<div className={scss.title}>
									<div className={scss.text}>
										<Tooltip title={item.title}>
											<p>
												<a
													href={item.url}
													target="_blank"
													rel="noopener noreferrer"
												>
													{item.title}
												</a>
											</p>
										</Tooltip>
									</div>
								</div>
							</div>
						</>
					))}
				</div>
			</div>
		</div>
	);
};

export default Link;
