import { authRoles } from 'app/auth';
import MaterialUIComponentsNavigation from 'app/main/documentation/material-ui-components/MaterialUIComponentsNavigation';
import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import {REACT_BASE_URL} from '../helper/static_data'

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'dashboards',
				title: 'Dashboards',
				translate: 'DASHBOARDS',
				type: 'item',
				icon: 'dashboard',
				exact: true,
				url: `/${REACT_BASE_URL}`
			},
			{
				id: 'users',
				title: 'Users',
				translate: 'USERS',
				type: 'collapse',
				icon: 'person',
				children: [
					{
						id: 'user_add',
						title: 'Add',
						type: 'item',
						exact: true,
						url: `/${REACT_BASE_URL}/auth/user/add`
					},
					{
						id: 'user_list',
						title: 'List',
						type: 'item',
						exact: true,
						url: `/${REACT_BASE_URL}/auth/user`
					}
				]
			},
			{
				id: 'groups',
				title: 'Groups',
				translate: 'GROUPS',
				type: 'collapse',
				icon: 'group',
				children: [
					{
						id: 'group_add',
						title: 'Add',
						type: 'item',
						exact: true,
						url: `/${REACT_BASE_URL}/auth/group/add`
					},
					{
						id: 'group_list',
						title: 'List',
						type: 'item',
						exact: true,
						url: `/${REACT_BASE_URL}/auth/group`
					}
				]
			},
		]
	},
];

export default navigationConfig;
