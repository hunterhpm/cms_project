import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/apps/appsConfigs';
import authRoleExamplesConfigs from 'app/main/auth/authRoleExamplesConfigs';
import CallbackConfig from 'app/main/callback/CallbackConfig';
import DocumentationConfig from 'app/main/documentation/DocumentationConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import RegisterConfig from 'app/main/register/RegisterConfig';
import UsersConfigration from 'app/main/pages/users/UsersConfigration';
import GroupsConfigration from 'app/main/pages/groups/GroupsConfigration';
// import RolesConfigration from 'app/main/pages/roles/RolesConfigration';
import UserInterfaceConfig from 'app/main/user-interface/UserInterfaceConfig';
import React from 'react';
import { Redirect } from 'react-router-dom';
import {REACT_BASE_URL} from '../helper/static_data'
const routeConfigs = [
	...appsConfigs,
	...pagesConfigs,
	...authRoleExamplesConfigs,
	UserInterfaceConfig,
	// DocumentationConfig,
	LogoutConfig,
	LoginConfig,
	RegisterConfig,
	LogoutConfig,
	CallbackConfig,
	UsersConfigration,
	GroupsConfigration,
	// RolesConfigration,
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin']),
	{
		path: `/${REACT_BASE_URL}`,
		exact: true,
		component: () => <Redirect to={`/${REACT_BASE_URL}`} />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
