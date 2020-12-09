import React from 'react';
import {REACT_BASE_URL} from '../../../helper/static_data';

const GroupsConfigration = {
	settings: {
		layout: {
			add: {}
		}
	},
	routes: [
		{
			path: `/${REACT_BASE_URL}/auth/group/add`,
			exact: true,
			component: React.lazy(() => import('./Add'))
		},
		{
			path: `/${REACT_BASE_URL}/auth/group`,
			exact: true,
			component: React.lazy(() => import('./List'))
		},
		{
			path: `/${REACT_BASE_URL}/auth/group/:id`,
			exact: true,
			component: React.lazy(() => import('./Edit'))
		}
		
	]
};

export default GroupsConfigration;
