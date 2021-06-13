import axios from 'axios'
import React, { Component } from 'react'
// import { Redirect } from "react-router-dom";
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faTrash } from '@fortawesome/fontawesome-free-solid'
import Swal from 'sweetalert2'

class Checkout extends Component {
    constructor (props) {
        super(props)
        this.state = {
            pesanan: {},
            isSubmited: false,
            details: [],
            nohp: "",
            alamat: "",
        }
    }
    onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    };

    onSubmitHandler = () => {
        axios
            .post("http://localhost:8000/api/pesanan/checkout", {
                user_id: JSON.parse(localStorage.getItem("userData")).id,
                nohp: this.state.nohp,
                alamat: this.state.alamat,
            })
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.href = '/';
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount () {
        const user_id = JSON.parse(localStorage.getItem("userData")).id
        this.setState({
            nohp: JSON.parse(localStorage.getItem("userData")).nohp,
            alamat: JSON.parse(localStorage.getItem("userData")).alamat,
        })
        axios.get(`/api/pesanan/${user_id}`).then(response => {
            console.log(response.data.detail)
            this.setState({
                pesanan: response.data
            })
            this.setState({
                details: response.data.detail
            })
        })
    }

    currencyFormat(num) {
        return 'Rp. ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    render () {
        const pesanan = this.state.pesanan
        // const nohp = this.state.nohp
        // const alamat = this.state.alamat
        if (this.state.isSubmited){
            return <Redirect to='/'/>
        }
        return (
            <div className='container py-5'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-md-12'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                <li className="breadcrumb-item" aria-current="page">Keranjang</li>
                                <li className="breadcrumb-item active" aria-current="page">Check Out</li>
                            </ol>
                        </nav>
                    </div>
                    <div className='col-md-6'>
                        <h3>Informasi Pembayaran</h3>
                        <hr/>
                        <p>
                            Untuk pembayaran silahkan dapat transfer di rekening dibawah ini sebesar <strong> Rp. {this.formatPrice(pesanan.total_harga)} </strong>
                        </p>
                        <div className='row'>
                            <div className='col-md-3 text-center'>
                                <img src='../img/bri.png' width='70px'></img>
                            </div>
                            <div className='col-md-9'>
                                <h4>BANK BRI</h4>
                                <p>No. Rekening 123-456-678 atas nama <strong> Yoni Saka </strong></p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <h3>Informasi Pengiriman</h3>
                        <hr/>
                        <div className='submit-form'>
                            <div className="mb-3">
                                <label className="form-label">No. HP</label>
                                <input type="text" 
                                name="nohp" 
                                className="form-control" 
                                value={this.state.nohp}
                                onChange={this.onChangehandler} 
                                placeholder="Nomor HP"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Alamat</label>
                                <input type="text" 
                                name="alamat" 
                                className="form-control" 
                                value={this.state.alamat}
                                onChange={this.onChangehandler} 
                                placeholder="Alamat"/>
                            </div>
                        </div>
                        <Button className='btn btn-block btn-primary' onClick={this.onSubmitHandler}> <FontAwesomeIcon className='mr-1' icon={faArrowRight} /> Checkout</Button>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default Checkout