import React, {Component} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Button, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, IconButton } from '@material-ui/core';
import { fade, withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {list, del} from '../../../helper/api';
import {REACT_BASE_URL} from '../../../helper/static_data';
import Checkbox from '@material-ui/core/Checkbox';
import  CloseIcon  from '@material-ui/icons/Cancel';
import  CheckIcon from '@material-ui/icons/CheckCircle';
import  SearchIcon from '@material-ui/icons/Search';
import  DeleteIcon from '@material-ui/icons/Delete';
import  EditIcon from '@material-ui/icons/Edit';
import { green } from '@material-ui/core/colors';


const styles = theme => ({
	layoutRoot: {},
	inputRoot: {
		color: 'inherit'
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		}
	},
	searchIcon: {
		padding: theme.spacing(1),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		// paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '30ch'
		}
	}
});

class List extends Component {
	constructor(props){
		super(props);
		this.state={
			userList:[],
			page:0,
			rowsPerPage:25,
			columns : [
				{ id: 'id', label: '', minWidth: 5},
				{ id: 'name', label: 'UserName', minWidth: 170},
				{ id: 'email', label: 'Email', minWidth: 100 },
				{
					id: 'first_name',
					label: 'First Name',
					minWidth: 170,
					align: 'right',
					format: value => value.toLocaleString('en-US')
				},
				{
					id: 'last_name',
					label: 'Last Name',
					minWidth: 170,
					align: 'right',
					format: value => value.toLocaleString('en-US')
				},
				{
					id: 'is_staff',
					label: 'Staff Status',
					minWidth: 170,
					align: 'right',
					// format: value => value.toLocaleString('en-US')
				},
				{
					id: 'actions',
					label: 'Actions',
					minWidth: 170,
					align: 'right',
					actions: <CloseIcon />
					// format: value => value.toLocaleString('en-US')
				}
			],
			rows: [],
			params:{search:''}
		}
		this.getUsers();
	}

	
	handleDelete(id){
		del(`adm/auth/user/${id}/`).then((response)=>{
				this.props.history.push(`/${REACT_BASE_URL}/auth/user`)
				this.getUsers();
				alert('Record succesfully deleted')
		})
	}

	getUsers(){
		let {params} = this.state;
		list('adm/auth/user/', params).then((response)=>{
			this.setState({userList:response.data})
			let rows = [];
			response.data.map((row)=>{
				rows.push(this.createData(row.id, row.username, row.email, row.first_name, row.last_name, row.is_staff.toLocaleString()==='true'? <CheckIcon style={{ color: green[500] }} fontSize="large" />: <CloseIcon color='secondary' fontSize="large" />, [<EditIcon color='primary'  style={{cursor:"pointer"}} onClick={()=>{this.props.history.push(`/${REACT_BASE_URL}/auth/user/${row.id}`)}}/>,<DeleteIcon style={{cursor:"pointer"}} onClick={()=>this.handleDelete(row.id)} color='secondary'/>]))
			})
		this.setState({rows});
		})
	}

	handleChangePage = (event, newPage) => {
		this.setState({page:newPage});
	};

	handleChangeRowsPerPage = event => {
		this.setState({rowsPerPage:event.target.value});
		this.setState({page:0});
	};
	createData(id,name, email, first_name, last_name, is_staff, actions) {
		return {id, name, email, first_name, last_name, is_staff, actions };
	}
	render(){
		const { classes } = this.props;
		let {params:{search}, rowsPerPage, page, rows, columns} = this.state;
		return (
			<FusePageCarded
				classes={{
					root: classes.layoutRoot
				}}
				header={
					<div className="py-24">
						<h4>Users</h4>
					</div>
				}
				contentToolbar={
					<div className="px-24" style={{width:'100%'}}>
						<span>Users List</span>
						<InputBase
							style={{margin:'2pc' }}
							className={classes.input}
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							value={search}
							onChange={(e)=>{
								let params = {search:e.target.value};
								this.setState({params});
								if(!e.target.value){
									this.getUsers()
								}
							}}
							placeholder="Search Users"
							inputProps={{ 'aria-label': 'search users' }}
						/>
						<IconButton type="submit" className={classes.iconButton} aria-label="search">
							<SearchIcon onClick={()=>{this.getUsers()}}/>
						</IconButton>
						<span style={{float:'right', marginTop:'30px'}}>
						<Button variant="contained" color="primary" justifyContent="flex-end" onClick={()=>{this.props.history.push(`/${REACT_BASE_URL}/auth/user/add`)}}>
							Add User
						</Button>
						<Button variant="contained" color="primary" justifyContent="flex-end" style={{marginLeft:'5px'}}>
							Delete Selected
						</Button>
						</span>
					</div>
				}
				content={
					<div className="p-24">
						<Paper className={classes.root}>
							<TableContainer className={classes.container}>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											{columns.map((column, index) => (
												<TableCell key={index} align={column.align} style={{ minWidth: column.minWidth }}>
													{column.label}
												</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
											return (
												<TableRow hover role="checkbox" tabIndex={-1} key={index}>
													{columns.map((column, index) => {
														const value = row[column.id];
														return (
															<TableCell key={index} align={column.align} style={{color:column.id === "name" && 'blue', cursor:column.id === "name" && 'pointer'}} onClick={()=>{column.id === "name" && this.props.history.push(`/${REACT_BASE_URL}/auth/user/${row.id}`)}}>
																{column.format && typeof value === 'number'
																	? column.format(value)
																	: value}
															</TableCell>
														);
													})}
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								rowsPerPageOptions={[10, 25, 50, 100]}
								component="div"
								count={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={this.handleChangePage}
								onChangeRowsPerPage={this.handleChangeRowsPerPage}
							/>
						</Paper>
					</div>
				}
			/>
		);
	}
}

export default connect(null, null)(withStyles(styles)(List))
