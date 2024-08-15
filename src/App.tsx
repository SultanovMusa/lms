import { useEffect, useState } from 'react';
import { Preloader } from './ui/preloader/Preloader';
import { Route, Routes } from 'react-router-dom';
import LayoutStudents from './pagesStudents/components/layout/LayoutStudents';
import LayoutAdmin from './pagesAdmin/components/layout/LayoutAdmin';
import LayoutAuth from './pagesAuth/components/layout/LayoutAuth';
import LayoutInstructor from './pagesInstructor/components/layout/LayoutInstructor';

const App = () => {
	const [isPreLoaded, setPreLoader] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setPreLoader(false);
		}, 1500);
	}, []);

	return (
		<>
			{isPreLoaded ? (
				<Preloader />
			) : (
				<Routes>
					<Route path="/*" element={<LayoutStudents />} />
					<Route path="/admin*" element={<LayoutAdmin />} />
					<Route path="/instructor/*" element={<LayoutInstructor />} />
					<Route path="/auth/*" element={<LayoutAuth />} />
				</Routes>
			)}
		</>
	);
};

export default App;
