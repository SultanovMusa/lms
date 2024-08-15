import { useGetLessonQuery } from '@/src/redux/api/lesson';
import { useParams } from 'react-router-dom';
import BasicBreadcrumbs from '../breadCrumbs/BreadCrumbs';

const Material = () => {
	const { data } = useGetLessonQuery();
	const { material } = useParams();
	console.log(material);

	return (
		<div>
			<BasicBreadcrumbs />
			{data?.map((item) => <div>{item.title}</div>)}
		</div>
	);
};

export default Material;
