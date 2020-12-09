import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputIcon from '@material-ui/icons/Input'
import { Button, Grid, TextField } from '@material-ui/core';
import  SaveAltIcon  from '@material-ui/icons/SaveAlt';
import {REACT_BASE_URL} from '../../../helper/static_data'
import {post} from '../../../helper/api'
import { withStyles } from '@material-ui/styles';
import {connect} from 'react-redux';


const styles = theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});

class TransitionsModal extends Component {

    constructor(props){
        super(props);
        this.state={
            password:'',
            confirm_password:'',
            // open:this.props.open,
        }
    //    this.handleOpen= this.handleOpen.bind(this);
    //    this.handleClose= this.handleClose.bind(this);
       this.handleSubmit= this.handleSubmit.bind(this)
    }

    
    handleSubmit(e){
		let {password, password_confirmation} = this.state.user;
		if( password !== "" && password === password_confirmation){
			post('adm/auth/user/', { password}).then((response)=>{
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
        let {classes} = this.props
        console.log('modal props',this.props)
    return (
        <div>
            <button type="button" onClick={this.props.handleOpen}>
                <InputIcon />
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={this.props.open}
                onClose={this.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Password change</h2><br />
                        <form>
                            <Grid>
                                <TextField
                                    id="password"
                                    type='password'
                                    label="Password"
                                    // value={username}
                                    // onChange={(e) => { this.changeHandler(e) }}
                                    variant="outlined"
                                    autoComplete= 'new-password'
                                    fullWidth
                                />
                            </Grid><br />
                            <Grid>
                                <TextField
                                    id="password"
                                    type='password'
                                    label="Confirm Password"
                                    // value={username}
                                    // onChange={(e) => { this.changeHandler(e) }}
                                    variant="outlined"
                                    autoComplete= 'new-password'
                                    fullWidth
                                />
                            </Grid> <br /><hr />
                            <Button onClose={this.props.handleClose}><SaveAltIcon color='primary'/></Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
}

export default connect(null, null)(withStyles(styles)(TransitionsModal)); 
