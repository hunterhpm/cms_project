import React, {Component} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Container, Grid,  TextField, Button, Checkbox } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import {connect} from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {list, patch, del} from '../../../helper/api';
import {REACT_BASE_URL} from '../../../helper/static_data';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const styles = (theme) => ({
	layoutRoot: {},
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
		this.group={
			id: props.match.params.id,
			name:'',
			permissions: []
		}
		this.state={
			group:this.group,
			permission_list:[],
			selected_permissions:[],
		}
		this.getPermissions = this.getPermissions.bind(this);
	}

	getGroup(){
		let {group} = this.state;
		list(`adm/auth/group/${group.id}`).then((response)=>{
			group = response.data;
			this.setState({group})
			this.getPermissions();
		}).catch((response)=>{
			console.log(response)
		})
	}

	getPermissions(){
		let permission_list, selected_permissions = [];
		let {permissions} = this.state.group;
		list(`adm/auth/permission/`).then((response)=>{
			response.data.map((permission)=>{
				if(permissions.includes(permission.id)){
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
		let [{group}, key, value] = [this.state, e.target.id, e.target.value];
		group[key]=value;
		this.setState({group});
	}

	onPermissionChange = (event, values) => {
		let [{group}, selected_permissions, group_permissions] = [this.state, values, []];
		values.length > 0 && values.map((permission)=>{
			group_permissions.push(permission.id);
		})
		group['permissions'] = group_permissions;
		this.setState({selected_permissions, group})
	}

	handleSubmit(e){
		let {group} = this.state;
		if(group.name !== ""){
			patch(`adm/auth/group/${group.id}/`, group).then((response)=>{
				if(e!=="save_and_edit"){
					this.props.history.push(e==='save'? `/${REACT_BASE_URL}/auth/group` : `/${REACT_BASE_URL}/auth/group/add`)
				}
				alert('Group successfully Edit')

			})
		}
	}

	handleDelete(){
		let {id} = this.state.group;
		del(`adm/auth/group/${id}/`).then((response)=>{
				this.props.history.push(`/${REACT_BASE_URL}/auth/group`)
		})
	}

	componentDidMount() {
		this.getGroup();
	}

	render(){
		const { classes } = this.props;
		let {group:{name, permissions}, permission_list, selected_permissions} = this.state;
		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot
				}}
				header={
					<div className="py-24">
						<h1>Groups</h1>
					</div>
				}
				contentToolbar={
					<div className="px-24">
						<span>Edit Group</span>
						{/* <Button variant="contained" color="primary" raised justifyContent="flex-end" style={{marginLeft:'30px'}}>
							History
						</Button> */}
						<Button variant="contained" color="primary" raised justifyContent="flex-end" style={{marginLeft:'30px'}} onClick={()=>this.handleDelete()}>
							Delete Group
						</Button>
					</div>
				}
				content={
					<Container fixed>
						<div className="p-24">
							<form id="edit_user" autoComplete="off">
								<Grid container spacing={3}>
									<Grid item xs={12} sm={12}>
										<TextField 
											id="name" 
											label="Name" 
											value={name}
											onChange={(e)=>{this.changeHandler(e)}}
											variant="outlined" 
											fullWidth 
										/>
									</Grid>									
									<Grid item xs={12} sm={12}>
										<h2>PERMISSIONS</h2>
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
														checked={permissions && permissions.includes(option.id)} 
													/>
													{option.name}
												</React.Fragment>
											)}
											renderInput={params => (
												<TextField {...params} id="test" variant="outlined" label="User Permissions" />
											)}
										/>
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