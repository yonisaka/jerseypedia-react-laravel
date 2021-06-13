import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/fontawesome-free-solid'
import Swal from 'sweetalert2'

class Header extends Component {

    constructor () {
        super()
        this.state = {
            alert: null,
            total_cart: "",
        };
    }

    componentDidMount () {
        if (localStorage.getItem("userData")){
            const user_id = JSON.parse(localStorage.getItem("userData")).id
            axios.get(`/api/pesanan/total_cart/${user_id}`).then(response => {
                this.setState({
                    total_cart: response.data
                })
            })
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.total_cart !== prevState.total_cart) {
    //         const user_id = JSON.parse(localStorage.getItem("userData")).id
    //         axios.get(`/api/pesanan/total_cart/${user_id}`).then(response => {
    //             this.setState({
    //                 total_cart: response.data
    //             })
    //         })
    //     }
    // }

    onLogoutHandler = () => {
        Swal.fire({
            icon: 'info',
            title: 'Do you want to Logout?',
            showDenyButton: true,
            confirmButtonText: `Logout`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                localStorage.clear();
                location.reload();
            } 
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
        //         Logout successfully
        //     </SweetAlert>
        // );
        // this.setState({
        //     alert: getAlert()
        // });
        // this.setState({
        //   navigate: true,
        // });
        // localStorage.clear();
    };

    hideAlert() {
        this.setState({
            alert: null
        });
    }

    onSuccess(){
        this.componentDidMount();
        this.hideAlert();
    }


    render() {
        const login = localStorage.getItem("isLoggedIn");
        const user = JSON.parse(localStorage.getItem("userData"));
        return (
            <div>
                <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                    <div className='container'>
                        <Link className='navbar-brand' to='/'><b>J</b>Shop</Link>
                        <div className="collapse navbar-collapse text-right">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to='/'>Home</Link>
                                </li>
                            </ul>
                            {login ? (
                            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to='/keranjang'>Keranjang <FontAwesomeIcon className='ml-1' icon={faShoppingCart} /><span className='ml-1 badge badge badge-danger'>{this.state.total_cart}</span></Link>
                                </li>
                                <div className="dropdown">
                                    <li
                                        className="nav-link dropdown-toggle mr-1"
                                        data-toggle="dropdown"
                                        type="button"
                                    >
                                        {user.name}
                                    </li>
                                    <div className="dropdown-menu">
                                        <a href="#" className="dropdown-item" onClick={this.onLogoutHandler}>
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            </ul>
                            ) : (
                            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to='/login'>Login</Link>
                                </li>
                            </ul>
                            )
                            }
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
    

 
export default Header