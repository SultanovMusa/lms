/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ANALYTIC {
	type Analytic = {
		groups: number;
		students: number;
		instructors: number;
		courses: number;
		graduated: number;
		year: number;
	};
	type AnalyticsResponse = Analytic[];
	type AnalyticsRequest = void;
}
