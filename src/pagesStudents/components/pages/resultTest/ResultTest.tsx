/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { blue, green, red } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, ScrollArea } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useGetTestResultStudentsQuery } from '@/src/redux/api/students/test';
import { Tooltip } from '@mui/material';

import scss from './ResultTest.module.scss';

function ResultTest() {
	const { testId } = useParams();
	const test = Number(testId);
	const { data } = useGetTestResultStudentsQuery(test);

	return (
		<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
			<Box>
				<div className={scss.Main_div}>
					<div className={scss.get_test_name_test} key={data?.testId}>
						<h2 className={scss.block_text}>
							<Tooltip title={data?.testTitle}>
								<p
									style={{
										width: '100%',
										maxWidth: '620px',
										textOverflow: 'ellipsis',
										overflow: 'hidden'
									}}
								>
									{data?.testTitle?.length > 20 ? (
										<>{data?.testTitle.slice(0, 50) + '...'}</>
									) : (
										<>{data?.testTitle}</>
									)}
								</p>
							</Tooltip>
						</h2>
						<p className={scss.get_test_time}>
							{`Время для прохождения теста: ${data?.testId}`}
						</p>
					</div>
					<div className={scss.testing_container}>
						{data?.answerQuestionResponses.map((question) => (
							<div key={question.questionId} className={scss.question}>
								<div className={scss.oneQuestion}>
									<div className={scss.get_test_testing_second_container}>
										<h4>{question.questionTitle}</h4>
									</div>
									{question.answerOptionResponses.map((item) => (
										<div key={item.optionId} className={scss.option}>
											{question.answerOptionResponses.filter((opt) => opt.true)
												.length === 1 ? (
												<FormControlLabel
													value={item.option}
													control={
														<Radio
															checked={item.true || item.yourChoice !== 3}
															className={item.true ? scss.correct_checkbox : ''}
															style={{
																color:
																	item.yourChoice === 1 && item.true === true
																		? blue[500]
																		: item.yourChoice === 3 &&
																			  item.true === true
																			? green[500]
																			: item.yourChoice === 2 && !item.true
																				? red[500]
																				: ''
															}}
														/>
													}
													label={item.option}
												/>
											) : (
												<div>
													<Checkbox
														checked={item.true || item.yourChoice !== 3}
														className={item.true ? scss.correct_checkbox : ''}
														style={{
															color:
																item.yourChoice === 1 && item.true === true
																	? blue[500]
																	: item.yourChoice === 3 && item.true === true
																		? green[500]
																		: item.yourChoice === 2 && !item.true
																			? red[500]
																			: ''
														}}
													/>
													<label>{item.option}</label>
												</div>
											)}
										</div>
									))}
								</div>
								<div
									style={{
										width: '100px',
										display: 'flex',
										justifyContent: 'flex-end',
										paddingBottom: '20px',
										paddingInline: '30px'
									}}
								>
									Балл:{question.point}
								</div>

								{/* <hr className={scss.getTest_hr} /> */}
							</div>
						))}
					</div>
				</div>
			</Box>
		</ScrollArea>
	);
}

export default ResultTest;
