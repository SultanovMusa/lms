import scss from './Preloader.module.scss';
export const Preloader = () => {
	return (
		<div className={scss.pre_loader}>
			<div className={scss.content}>
				<div className={scss.ring}></div>
				<div className={scss.ring}></div>
				<div className={scss.ring}></div>
			</div>
		</div>
	);
};
