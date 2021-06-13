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
            name: "",
            nohp: "",
            alamat: "",
            email: "",
            password: "",
            msg: "",
            isLoading: false,
            redirect: false,
            errMsgName: "",
            errMsgNohp: "",
            errMsgAlamat: "",
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

    onSubmitHandler = () => {
        console.log(this.state)
        this.setState({ isLoading: true });
        axios
            .post("http://localhost:8000/api/user-signup", {
                name: this.state.name,
                nohp: this.state.nohp,
                alamat: this.state.alamat,
                email: this.state.email,
                password: this.state.password,
            })
            .then((response) => {
                this.setState({ isLoading: false });
                if (response.data.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Register Success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.href = '/login';
                    })
                    
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
                                <h4 className='card-title text-center'><strong> Register </strong></h4>
                                <div className='submit-form'>
                                    <div className="mb-3">
                                        <label className="form-label">Nama Lengkap</label>
                                        <input type="text" 
                                            name="name" 
                                            className="form-control" 
                                            value={this.state.name}
                                            onChange={this.onChangehandler} 
                                            placeholder="Nama Lengkap"/>
                                        <span className="text-danger">{this.state.msg}</span>
                                        <span className="text-danger">{this.state.errMsgName}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">No. HP</label>
                                        <input type="text" 
                                            name="nohp" 
                                            className="form-control" 
                                            value={this.state.nohp}
                                            onChange={this.onChangehandler} 
                                            placeholder="No Hp"/>
                                        <span className="text-danger">{this.state.msg}</span>
                                        <span className="text-danger">{this.state.errMsgNohp}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Alamat</label>
                                        <input type="text" 
                                            name="alamat" 
                                            className="form-control" 
                                            value={this.state.alamat}
                                            onChange={this.onChangehandler} 
                                            placeholder="Alamat"/>
                                        <span className="text-danger">{this.state.msg}</span>
                                        <span className="text-danger">{this.state.errMsgAlamat}</span>
                                    </div>
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
                                            onClick={this.onSubmitHandler}
                                        >
                                            Register
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
                                        <Link to='/login'>Have an account?</Link>
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