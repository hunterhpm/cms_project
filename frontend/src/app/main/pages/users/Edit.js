import React, {Component} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Container, Grid,  TextField, Button, Checkbox, FormControlLabel, FormGroup, Modal  } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import {connect} from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {list, patch, del} from '../../../helper/api';
import InputIcon from '@material-ui/icons/Input'
import {REACT_BASE_URL} from '../../../helper/static_data';
import { Visibility } from '@material-ui/icons';
// import PassChange from './PassChange'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const styles = (theme) => ({
	layoutRoot: {},
	PaperProps: {
		style: {
		  maxHeight: 48 * 4.5 + 8,
		  width: 250,
		},
	  },
	  root: {
		'& > *': {
		  margin: theme.spacing(1),
		  textAlign: 'right'
		},
	  },
});
  

class Edit extends Component{
	constructor(props){
		super(props);
		this.user={
			id: props.match.params.id,
			username: '',
			first_name: '',
			last_name: '',
			email: '',
			is_active: false,
			is_staff: false,
			is_superuser: false, 
			groups: [],
			user_permissions: []
		}
		this.state={
			user:this.user,
			group_list:[],
			selected_groups:[],
			permission_list:[],
			selected_permissions:[],
			// open: false,
		}
	}

	getUser(){
		let {user} = this.state;
		list(`adm/auth/user/${user.id}`).then((response)=>{
			user = response.data;
			this.setState({user})
			this.getGroups();
			this.getPermissions();
		}).catch((response)=>{
			console.log(response)
		})
	}

	getGroups(){
		let group_list, selected_groups = [];
		let {groups} = this.state.user;
		list(`adm/auth/group/`).then((response)=>{
			response.data.map((group)=>{
				if(groups.includes(group.id)){
					selected_groups.push(group)
				}
				
			})
			group_list = response.data;
			this.setState({group_list, selected_groups})
		}).catch((response)=>{
			console.log(response)
		})
	}

	getPermissions(){
		let permission_list, selected_permissions = [];
		let {user_permissions} = this.state.user;
		list(`adm/auth/permission/`).then((response)=>{
			response.data.map((permission)=>{
				if(user_permissions.includes(permission.id)){
					selected_permissions.push(permission)
				}
				
			})
			permission_list = response.data;
			this.setState({permission_list, selected_permissions})
		}).catch((response)=>{
			console.log(response)
		})
	}

	changeHandler(e){
		let [key, value, user] = [e.target.id, e.target.value, this.state.user];
		if(key === "is_active" || key=== "is_staff" || key === "is_superuser"){
			user[key]= !user[key];
		}else{
			user[key]=value;
		}
		this.setState({user});
	}

	onGroupChange = (event, values) => {
		let [selected_groups, groups, {user}] = [values, [], this.state];
		values.length > 0 && values.map((group)=>{
			groups.push(group.id);
		})
		user['groups'] = groups;
		this.setState({selected_groups, user})
	}

	onPermissionChange = (event, values) => {
		let [selected_permissions, user_permissions, {user}] = [values, [], this.state];
		values.length > 0 && values.map((permission)=>{
			user_permissions.push(permission.id);
		})
		user['user_permissions'] = user_permissions;
		this.setState({selected_permissions, user})
	}

	handleSubmit(e){
		let {user} = this.state;
		if(user.username !== ""){
			patch(`adm/auth/user/${user.id}/`, user).then((response)=>{
				if(e!=="save_and_edit"){
					this.props.history.push(e==='save'? `/${REACT_BASE_URL}/auth/user` : `/${REACT_BASE_URL}/auth/user/add`)
					alert('User successfully Edit')
				}
			})
		}
	}

	handleDelete(){
		let {id} = this.state.user;
		del(`adm/auth/user/${id}/`).then((response)=>{
				this.props.history.push(`/${REACT_BASE_URL}/auth/user`)
		})
	}
	// handleOpen($class){
	// 	if(!$class.state.open)
	// 		$class.setState({open:true})
	//  };
 
	// handleClose ($class){
	// 	if($class.state.open)
	// 	$class.setState({open:false})
	//  };

	componentDidMount() {
		this.getUser();
	}

	render(){
		const { classes } = this.props;
		let {user:{username, first_name, last_name, email, is_active, is_staff, is_superuser, groups, user_permissions}, group_list, selected_groups, permission_list, selected_permissions} = this.state;
		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot
				}}
				header={
					<div className="py-24">
						<h1>Users</h1>
					</div>
				}
				contentToolbar={
					<div className="px-24">
						<span>Edit User</span>
						{/* <Button variant="contained" color="primary" raised justifyContent="flex-end" style={{marginLeft:'30px'}}>
							History
						</Button> */}
						<Button variant="contained" color="primary" raised justifyContent="flex-end" style={{marginLeft:'30px'}}  onClick={()=>this.handleDelete()}>
							Delete User
						</Button>
					</div>
				}
				content={
					<Container fixed>
						<div className="p-24">
							<form id="edit_user" autoComplete="off">
								<Grid container spacing={3}>
									<Grid item xs={12} sm={6}>
										<TextField
											id="username"
											label="Username"
											value={username}
											onChange={(e)=>{this.changeHandler(e)}}
											variant="outlined"
											fullWidth
											helperText="Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											id="password"
											type="password"
											label="Password"
											variant="outlined"
											fullWidth
											disabled
											helperText="Raw passwords are not stored, so there is no way to see this user’s password, but you can change the password using this form."
										/>
										{/* <PassChange handleOpen={()=>this.handleOpen(this)} handleClose={()=>this.handleClose(this)} open={this.state.open}/> */}
										
									</Grid>
									<Grid item xs={12}>
										<h2>Personal Info</h2>
										<hr/>
									</Grid>
									<Grid item xs={12} md={4}>
										<TextField
											fullWidth
											id="first_name"
											label="First Name"
											variant="outlined"
											value={first_name}
											onChange={(e)=>{this.changeHandler(e)}}
										/>
									</Grid>
									<Grid item xs={12} md={4}>
										<TextField
											fullWidth
											id="last_name"
											label="Last Name"
											variant="outlined"
											value={last_name}
											onChange={(e)=>{this.changeHandler(e)}}
										/>
									</Grid>
									<Grid item xs={12} md={4}>
										<TextField
											fullWidth
											id="email"
											label="Email Address"
											variant="outlined"
											value={email}
											onChange={(e)=>{this.changeHandler(e)}}
										/>
									</Grid>
									<Grid item xs={12}>
										<h2>Permisions</h2>
										<hr/>
										<FormGroup>
											<FormControlLabel
												control={
												<Checkbox
													id="is_active"
													color="primary"
													checked={is_active}
													onChange={(e)=>{this.changeHandler(e)}}
												/>
												}
												label="Active"
												/>
												<FormControlLabel
												control={
												<Checkbox
													id="is_staff"
													color="primary"
													checked={is_staff}
													onChange={(e)=>{this.changeHandler(e)}}
												/>
												}
												label="Staff Status"
												/>
												<FormControlLabel
												control={
												<Checkbox
													id="is_superuser"
													color="primary"
													checked={is_superuser}
													onChange={(e)=>{this.changeHandler(e)}}
												/>
												}
												label="Superuser Status"
											/>
										</FormGroup>
									</Grid>
									<Grid item xs={12} sm={6}>
										<h2>Groups</h2>
										<hr/><br/>
										<Autocomplete
											multiple
											id="groups"
											options={group_list}
											disableCloseOnSelect
											value={selected_groups}
											onChange={this.onGroupChange}
											getOptionLabel={option => option.name}
											renderOption={(option) => (
												<React.Fragment>
													<Checkbox
														icon={icon}
														checkedIcon={checkedIcon}
														style={{ marginRight: 8 }}
														checked={groups.includes(option.id)}
													/>
													{option.name}
												</React.Fragment>
											)}
											renderInput={params => (
												<TextField {...params} id="test" variant="outlined" label="Groups" />
											)}
										/>
									</Grid>
									{/* <Modal onClose={()=>this.handleClose()} visible={true}><div className={classes.paper}>
											<h2 id="transition-modal-title">Transition modal</h2>
											<p id="transition-modal-description">react-transition-group animates me.</p>
										</div></Modal> */}
									<Grid item xs={12} sm={6}>
										<h2>USER PERMISSIONS</h2>
										<hr/><br/>
										<Autocomplete
											multiple
											id="permissions"
											options={permission_list}
											disableCloseOnSelect
											value={selected_permissions}
											onChange={this.onPermissionChange}
											getOptionLabel={option => option.name}
											renderOption={(option) => (
												<React.Fragment>
													<Checkbox
														icon={icon}
														checkedIcon={checkedIcon}
														style={{ marginRight: 8 }}
														checked={user_permissions.includes(option.id)}
													/>
													{option.name}
												</React.Fragment>
											)}
											renderInput={params => (
												<TextField {...params} id="test" variant="outlined" label="User Permissions" />
											)}
										/>
									</Grid>
									<Grid item xs={12}>
										<h2>Important Dates</h2>
										<hr/><br/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField id="outlined-basic" label="Last Login Date" variant="outlined" fullWidth />
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField id="outlined-basic" label="Last Login Time" variant="outlined" fullWidth />
									</Grid>
									<Grid item xs={12}>
										<h2>Date Joined</h2>
										<hr/><br/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField id="outlined-basic" label="Joined Date" variant="outlined" fullWidth />
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField id="outlined-basic" label="Joined Time" variant="outlined" fullWidth />
									</Grid>
								</Grid>
								<div className={classes.root} style={{textAlign:'right'}}>
									<Button variant="contained" onClick={()=>{this.handleSubmit("save_and_new")}}>
										Save and add another
									</Button>
									<Button variant="contained" onClick={()=>{this.handleSubmit("save_and_edit")}}>
										Save and continue editing
									</Button>
									<Button variant="contained" color="primary" onClick={()=>{this.handleSubmit("save")}}>
										Save
									</Button>
								</div>
							</form>
						</div>
					</Container>
				}
			/>
		);
	}
}

export default connect(null, null)(withStyles(styles)(Edit));