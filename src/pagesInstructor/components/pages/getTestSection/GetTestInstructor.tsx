import { green } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

import scss from './GetTestInstructor.module.scss';
import { Box, ScrollArea } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useGetInsideTestQuery } from '@/src/redux/api/instructor/test';

function GetTestInstructor() {
	const { testId } = useParams();

	const test = Number(testId);
	const { data } = useGetInsideTestQuery(test);

	return (
		<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
			<Box>
				<div className={scss.Main_div}>
					{data && (
						<>
							<div className={scss.get_test_name_test} key={data.testId}>
								<h2>{data.title}</h2>
								<p className={scss.get_test_time}>
									{` Время для прохождения теста:${data.hour}.${data.minute}`}
								</p>
							</div>
						</>
					)}
					<div className={scss.testing_container}>
						{data?.questionResponseList?.map((question) => (
							<div key={question.questionId} className={scss.question}>
								<div className={scss.get_test_testing_second_container}>
									<h4>{question.title}</h4>
								</div>
								{question.optionResponses.map((option) => (
									<div key={option.optionId} className={scss.option}>
										{question.optionResponses.filter((opt) => opt.isTrue)
											.length === 1 ? (
											<>
												<FormControlLabel
													value={option.option}
													control={
														<Radio
															checked={option.isTrue}
															className={
																option.isTrue ? scss.correct_checkbox : ''
															}
															sx={{
																color: green[800],
																'&.Mui-checked': {
																	color: green[600]
																}
															}}
														/>
													}
													label={option.option}
												/>
											</>
										) : (
											<>
												<input
													type="checkbox"
													checked={option.isTrue == true}
													className={scss.correct_checkbox}
												/>
												a<label>{option.option}</label>
											</>
										)}
									</div>
								))}
								<hr className={scss.getTest_hr} />
							</div>
						))}
					</div>
				</div>
			</Box>
		</ScrollArea>
	);
}

export default GetTestInstructor;
