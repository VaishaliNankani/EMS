import React from 'react';
import {message} from 'antd'
import "./style.css" 
import 'bootstrap';
export default class login extends React.Component {
      
	componentDidMount(){
		sessionStorage.removeItem("login");
	}

    handleLogin = () => {
        var userName = this.username.value;
        var password = this.password.value;
        if (userName !== "" && userName !== undefined && password !== "" && password !== undefined) {
            if(userName === 'admin' && password === 'admin'){
                message.success('Sign in successful');
                sessionStorage.setItem("login", true);
                window.location.href = "/employees/list";

            }else{
            message.error('Incorrect credentials');
            }
        } else {
            message.error('Please enter username and password');
        }
    }
    render() {
        return (
            <>

                <div class="login-page row no-gutters">
                    <div class="left-side">
                        <div class="bg-block text-center center-block">
                            <div class="notice-text">
                                <h2>Application Login Page</h2>
                                <p>Login from here to access.</p>
                            </div>
                        </div>
                    </div>

                    <div className="right-side d-flex justify-content-center align-items-center">
                        <div class="login-wrapper">
                            <div class="login" id="login">
                                <div class="login-logo">
                                    <span class="a-pwc-logo-grid a-lg"></span>
                                </div>
                                <div class="user-fields">
                                    <div class="a-d-flex a-flex-column a-textarea-box">
                                        <div class="a-form-label">User Name</div>
                                        <input type="text" className="a-text-input a-input-secondary" placeholder="Enter user name" ref={(c) => this.username = c} />
                                        <div class="a-form-label" style={{position: 'relative', top: '-18px'}}>Password</div>
                                        <input type="password" className="a-text-input a-input-secondary" style={{position: 'relative', top: '-18px'}} placeholder="Enter password" ref={(c) => this.password = c} />
                                        <div class="d-flex gutter-wrapper">
                                            <button className="a-btn a-btn-primary a-btn-lg login-btn" 
style={{width: '43%'}} type="submit" onClick={this.handleLogin}>Login</button>

                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>


                    </div>

                </div>
                
            </>
            
        );
    }
}
