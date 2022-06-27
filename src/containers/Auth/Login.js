import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {handleLoginAPI} from '../../services/userService'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showpassword:false,
            errMessage:''
        }
    }
    handleOnChangeInput = (event) => {
        this.setState({
            username: event.target.value,
        })
        console.log(event.target.value);
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
        console.log(event.target.value);
    }
    handleLogin =async () => {
        // console.log('username:' + this.state.username);
        // console.log('password: ' + this.state.password);
        this.setState({
            errMessage:''
        })
        try{
        let data=await handleLoginAPI(this.state.username, this.state.password);
        console.log(40,data.userData.user);
        console.log(41,data.userData.errCode);
        if(data && data.userData.errCode!==0){
            this.setState({
                errMessage:data.userData.errMessage
            })
        }
        if(data && data.userData.errCode==0){
            let login=this.props.userLoginSuccess(data.userData.user)
           
            console.log('log in success');
        }
        }
        catch(e){
            if(e.response){
                console.log(e.response);
                this.setState({
                    errMessage:e.response.data.errMessage
                })
            }
            console.log('loi dang nhap', e.response);

        }
    }
    handleShowHidePassword=()=>{
        this.setState({
            showpassword:!this.state.showpassword
        })
    }
    render() {


        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login'>Login</div>
                        <div className='col-12 formgoup login-input'>
                            <label>Username</label>
                            <input type='text' className='form-control'
                                placeholder='Enter your  Username'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeInput(event)} />

                        </div>
                        <div className='col-12 formgoup login-input'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                            <input type={this.state.showpassword?'text':'password'} className='form-control' placeholder='Enter your  Password'
                                value={this.state.password}
                                onChange={(event) => this.handleOnChangePassword(event)} />
                           <span onClick={()=>{this.handleShowHidePassword()}}><i className="fas fa-eye"></i></span> 
                            </div>
                        </div>
                        <div className='col-12 '>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>LOGIN</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password ?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-other-login' >Or login with</span>
                        </div>
                        <div className='col-12' style={{color:'red'}}>
                                {this.state.errMessage}
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-brands fa-google-plus google"></i>
                            <i className="fab fa-facebook facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess:(userInfo)=>dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
