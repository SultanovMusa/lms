import scss from './Block.module.scss';

const Block = () => {
	return (
		<div className={scss.BlockContainer}>
			<div className="container">
				<div className={scss.content}>
					<img
						className={scss.block_image}
						src="../../assets/svgs/353%201.svg"
						alt="BlockImage"
					/>

					<h1 className={scss.block_dostup}>Вам закрыли доступ</h1>
					<p className={scss.block_zakryli_dostup}>
						Вам закрыли доступ к системе,внесите <br />
						<span className={scss.block_zakryli_dostup_span}>
							оплату для продолжения !
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Block;
