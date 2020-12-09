import React from 'react';
import {REACT_BASE_URL} from '../../../../helper/static_data'

const AnalyticsDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: `/${REACT_BASE_URL}`,
			exact: true,
			component: React.lazy(() => import('./AnalyticsDashboardApp'))
		}
	]
};

export default AnalyticsDashboardAppConfig;
