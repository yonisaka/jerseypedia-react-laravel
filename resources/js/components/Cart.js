import axios from 'axios'
import React, { Component } from 'react'
// import { Redirect } from "react-router-dom";
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faTrash } from '@fortawesome/fontawesome-free-solid'
// import { useHistory } from 'react-router'
import Swal from 'sweetalert2'

class Detail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            pesanan: {},
            isSubmited: false,
            details: [],
        }
    }
    // onChangehandler = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;
    //     let data = {};
    //     data[name] = value;
    //     this.setState(data);
    // };

    // onSubmitHandler = () => {
    //     axios
    //         .post("http://localhost:8000/api/pesanan", {
    //             user_id: JSON.parse(localStorage.getItem("userData")).id,
    //             product_id: this.props.match.params.id,
    //             jumlah_pesanan: this.state.jumlah_pesanan,
    //         })
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 this.setState({
    //                     isSubmited: true
    //                 })
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    componentDidMount () {
        const user_id = JSON.parse(localStorage.getItem("userData")).id

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

    onDeleteHandler(id) {
        Swal.fire({
            icon: 'warning',
            title: 'Do you want to delete item?',
            showDenyButton: true,
            confirmButtonText: `Delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios
                .delete(`/api/pesanan/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        location.reload();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            } 
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
        const details = this.state.details

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
                                <li className="breadcrumb-item active" aria-current="page">Keranjang</li>
                            </ol>
                        </nav>
                    </div>
                    <div className='col-md-12'>
                        <Table responsive="sm" className='mt-3'>
                            <thead>
                                <tr>
                                    <th className='text-center'>#</th>
                                    <th className='text-center' width='300px'>Gambar</th>
                                    <th className='text-center'>Keterangan</th>
                                    <th className='text-center'>Jenis</th>
                                    <th className='text-center'>Jumlah</th>
                                    <th className='text-center' width='150px'>Harga</th>
                                    <th className='text-center' width='150px'>Total Harga</th>
                                    <th className='text-center'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.map((data, i) => (
                                    <tr key={data.id}>
                                        <td className='text-center'>{i+1}</td>
                                        <td className='text-center'><img className='p-1' src={`../img/jersey/${data.gambar}`} height='100px'></img></td>
                                        <td>{data.nama}</td>
                                        <td>{data.jenis}</td>
                                        <td className='text-center'>{data.jumlah_pesanan}</td>
                                        <td className='text-center'>{this.currencyFormat(data.harga)}</td>
                                        <td className='text-center'>{this.currencyFormat(data.total_harga)}</td>
                                        <td>
                                            <Button
                                            className='btn btn-sm btn-danger' 
                                            onClick={ () => this.onDeleteHandler(data.id)}
                                            ><FontAwesomeIcon className='m-1' icon={faTrash} /></Button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan='6' className='text-right'><strong> Total Yang Harus Dibayarkan : </strong></td>
                                    <td colSpan='2' className='text-right'><strong> Rp. {this.formatPrice(pesanan.total_harga)} </strong></td>
                                </tr>
                                <tr>
                                    <td colSpan='6' className='text-right'><strong> Kode Pembayaran : </strong></td>
                                    <td colSpan='2' className='text-right'><strong> {pesanan.kode_unik} </strong></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className='col-md-12 text-right'>
                        <Link className='btn btn-primary' to='/checkout'> <FontAwesomeIcon className='mr-1' icon={faArrowRight} /> Checkout</Link>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default Detail