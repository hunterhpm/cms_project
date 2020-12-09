import React, { Component }  from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Button, Grid, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import {connect} from 'react-redux';
import {post} from '../../../helper/api';
import {REACT_BASE_URL} from '../../../helper/static_data';

const styles = (theme) => ({
	root: {
	  '& > *': {
		margin: theme.spacing(1),
		textAlign: 'right'
	  },
	},
  });

// const classes = useStyles;
class Add extends Component{
	// const classes = useStyles();
	constructor(props){
		super(props);
		this.user = {
			username:'',
			password:'',
			password_confirmation:''
		}
		this.state={
			user:this.user
		}
	}

	handleChange(e){
		let {user} = this.state;
		let [key, value] = [e.target.id, e.target.value]
		user[key] = value;
		this.setState({user})
	}
	handleSubmit(e){
		let {username, password, password_confirmation} = this.state.user;
		if(username !== "" && password !== "" && password === password_confirmation){
			post('adm/auth/user/', {username, password}).then((response)=>{
				if(e==="save_and_new"){
					let user ={
						username:'', password:'', password_confirmation:''
					}
					this.setState({user})
					document.getElementById("add_new_user").reset();
				}else{
					this.props.history.push(e==='save' ? `/${REACT_BASE_URL}/auth/user` : `/${REACT_BASE_URL}/auth/user/${response.data.id}`)
				}
				alert('User successfully added')

			})
		}

	}
	render(){
		const { classes } = this.props;
		let { user:{username, password, password_confirmation} } = this.state;
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
						<h3>Add User</h3>
					</div>
				}
				content={
					<Grid className="p-24">
						<form id="add_new_user" className={classes.root} autoComplete="off">
							<Grid item xs={12} style={{textAlign:'left'}}>
								<label>First, enter a username and password. Then, you’ll be able to edit more user options.</label>
							</Grid>
							<Grid item xs={12}>
								<TextField
									onBlur={(e)=>{this.handleChange(e)}}
									id="username"
									label="Username"
									defaultValue={username}
									variant="outlined"
									fullWidth
									helperText="Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
								/>
							</Grid>
							<Grid item xs={12} style={{textAlign:'left'}}>
								<TextField
									id="password"
									label="Password"
									type="password"
									defaultValue={password}
									variant="outlined"
									fullWidth
									onBlur={(e)=>{this.handleChange(e)}}
									helperText="Your password can’t be too similar to your other personal information. Your password must contain at least 8 characters. Your password can’t be a commonly used password. Your password can’t be entirely numeric."
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="password_confirmation"
									label="Password Confirmation"
									type="password"
									defaultValue={password_confirmation}
									variant="outlined"
									fullWidth
									onBlur={(e)=>{this.handleChange(e)}}
								/>
							</Grid>
							<hr />
							<div className={classes.root}>
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
					</Grid>
				}
			/>
		);
	}
}
export default connect(null, null)(withStyles(styles)(Add))

