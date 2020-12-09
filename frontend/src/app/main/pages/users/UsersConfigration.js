import React from 'react';
import {REACT_BASE_URL} from '../../../helper/static_data';

const UsersConfigration = {
	settings: {
		layout: {
			add: {}
		}
	},
	routes: [
		{
			path: `/${REACT_BASE_URL}/auth/user/add`,
			exact: true,
			component: React.lazy(() => import('./Add'))
		},
		{
			path: `/${REACT_BASE_URL}/auth/user`,
			exact: true,
			component: React.lazy(() => import('./List'))
		},
		{
			path: `/${REACT_BASE_URL}/auth/user/:id`,
			exact: true,
			component: React.lazy(() => import('./Edit'))
		}
		
	]
};

export default UsersConfigration;
