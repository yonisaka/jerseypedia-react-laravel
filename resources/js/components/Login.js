// import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
// import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
 
class Login extends Component {
     
    constructor () {
        super()
        this.state = {
            email: "",
            password: "",
            msg: "",
            isLoading: false,
            redirect: false,
            errMsgEmail: "",
            errMsgPwd: "",
            errMsg: "",
            alert: null,
        };
    }
    
    hideAlert() {
        this.setState({
            alert: null
        });
    }

    onSuccess(){
        this.componentDidMount();
        this.hideAlert();
    }

    onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    };

    onSignInHandler = () => {
        console.log(this.state)
        this.setState({ isLoading: true });
        axios
            .post("http://localhost:8000/api/user-login", {
            email: this.state.email,
            password: this.state.password,
            })
            .then((response) => {
            this.setState({ isLoading: false });
            if (response.data.status === 200) {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userData", JSON.stringify(response.data.data));
                Swal.fire({
                    icon: 'success',
                    title: 'Login Success',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = '/';
                })
                
                // const getAlert = () => (
                //     <SweetAlert
                //         success
                //         title="Success!"
                //         onConfirm={() => this.onSuccess() }
                //         onCancel={this.hideAlert()}
                //         timeout={2000}
                //         confirmBtnText="Oke Siap"
                //         >
                //         Login successfully
                //     </SweetAlert>
                // );
                // this.setState({
                //     alert: getAlert()
                // });
                // this.setState({
                //     msg: response.data.message,
                //     redirect: true,
                // });      
            }
            if (
                response.data.status === "failed" &&
                response.data.success === undefined
            ) {
                this.setState({
                errMsgEmail: response.data.validation_error.email,
                errMsgPwd: response.data.validation_error.password,
                });
                setTimeout(() => {
                this.setState({ errMsgEmail: "", errMsgPwd: "" });
                }, 2000);
            } else if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                errMsg: response.data.message,
                });
                setTimeout(() => {
                this.setState({ errMsg: "" });
                }, 2000);
            }
            })
                .catch((error) => {
                console.log(error);
            });
    };
    
    render () {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        const login = localStorage.getItem("isLoggedIn");
        if (login) {
            return <Redirect to="/" />;
        }
        const isLoading = this.state.isLoading;
        return (
            <div className='container py-4'>
                <div className='row'>
                    <div className='col-md-6 mx-auto'>
                        <div className='card'>
                            <div className='card-body'>
                                <h4 className='card-title text-center'><strong> Login </strong></h4>
                                <div className='submit-form'>
                                    <div className="mb-3">
                                        <label className="form-label">Email address</label>
                                        <input type="email" 
                                            name="email" 
                                            className="form-control" 
                                            value={this.state.email}
                                            onChange={this.onChangehandler} 
                                            placeholder="name@example.com"/>
                                        <span className="text-danger">{this.state.msg}</span>
                                        <span className="text-danger">{this.state.errMsgEmail}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={this.state.password}
                                        onChange={this.onChangehandler}
                                        />
                                        <span className="text-danger">{this.state.errMsgPwd}</span>
                                    </div>
                                    <p className="text-danger">{this.state.errMsg}</p>
                                    <div className="mb-3">
                                        <button
                                            className="btn btn-block btn-secondary text-center mb-4"
                                            onClick={this.onSignInHandler}
                                        >
                                            Sign In
                                            {isLoading ? (
                                            <span
                                                className="spinner-border spinner-border-sm ml-5"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            ) : (
                                            <span></span>
                                            )}
                                        </button>
                                    </div>
                                    <div className='text-center'>
                                        <Link to='/register'>Create new account?</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        )
    }
}
 
export default Login