import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/fontawesome-free-solid'
import Swal from 'sweetalert2'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class Detail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            product: {},
            jumlah_pesanan: "",
            isSubmited: false,
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
            .post("http://localhost:8000/api/pesanan", {
                user_id: JSON.parse(localStorage.getItem("userData")).id,
                product_id: this.props.match.params.id,
                jumlah_pesanan: this.state.jumlah_pesanan,
            })
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Added to Cart',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.href = '/';
                        // this.props.history.push("/"); 
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount () {
        const productId = this.props.match.params.id

        axios.get(`/api/product/${productId}`).then(response => {
            this.setState({
                product: response.data
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
        const product = this.state.product
        if (this.state.isSubmited){
            return <Redirect to='/'/>
        }
        return (
            <div className='container py-5'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-md-12'>
                        {/* <div className='card'>
                            <div className='card-body py-5'> */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Detail</li>
                                </ol>
                            </nav>
                                <div className='row'>
                                    <div className='col-md-6 text-center'>
                                        <img className='p-3' src={`../img/jersey/${product.gambar}`} height='400px'></img>
                                    </div>
                                    <div className='col-md-6'>
                                        <h3 className='card-title'><strong>{product.nama}</strong></h3>
                                        <h5 className='card-title'><strong>Rp. {this.formatPrice(product.harga)}</strong>
                                            {product.is_ready == 1 ? (
                                                <span className='ml-3 badge badge-success'>Stok Tersedia</span>
                                            ) : (
                                                <span className='ml-3 badge badge-danger'>Stok Habis</span>
                                            )}
                                        </h5>
                                        
                                        <Table responsive='sm'>
                                            <tbody>
                                                <tr>
                                                    <td width='30%'>Liga</td>
                                                    <td width='2%'>:</td>
                                                    <td><img src={`../img/liga/${product.liga_gambar}`} height='50px'></img></td>
                                                </tr>
                                                <tr>
                                                    <td width='30%'>Jenis</td>
                                                    <td width='2%'>:</td>
                                                    <td>{product.jenis}</td>
                                                </tr>
                                                <tr>
                                                    <td width='30%'>Berat</td>
                                                    <td width='2%'>:</td>
                                                    <td>{product.berat}</td>
                                                </tr>
                                                <tr>
                                                    <td width='30%'>Jumlah</td>
                                                    <td width='2%'>:</td>
                                                    <td>
                                                        <input 
                                                            type='text' 
                                                            className='form-control'
                                                            name="jumlah_pesanan" 
                                                            value={this.state.jumlah_pesanan}
                                                            onChange={this.onChangehandler} 
                                                            placeholder='Jumlah Pesanan'
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <hr/>
                                        {product.is_ready == 1 ? (
                                            <Button 
                                                className='btn btn-block btn-secondary'
                                                onClick={this.onSubmitHandler}
                                            > <FontAwesomeIcon className='mr-1' icon={faShoppingCart} /> Masukkan Keranjang</Button>
                                        ) : (
                                            <Button 
                                                className='btn btn-block btn-secondary'
                                                onClick={this.onSubmitHandler}
                                                disabled
                                            > <FontAwesomeIcon className='mr-1' icon={faShoppingCart} /> Stok Tidak Tersedia</Button>
                                        )}
                                        
                                    </div>
                                </div>
                            {/* </div>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}
 
export default Detail