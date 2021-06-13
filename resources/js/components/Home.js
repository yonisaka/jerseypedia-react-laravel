import axios from 'axios'
import React, { Component } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faSearch } from '@fortawesome/fontawesome-free-solid'
// import SweetAlert from 'react-bootstrap-sweetalert';
 
class Home extends Component {
     
    constructor () {
        super()
        this.state = {
            products: [],
            ligas: [],
            msg: null,
            type: null,
            flash:false,
            alert: null,
            // search: "",
        }
    }
    
    onChangehandler = (e) => {
        axios.get('/api/products').then(response => {
            this.setState({
                products: response.data.filter(product => product.nama.toLowerCase().indexOf(e.target.value) > -1)
            })
        })  
    };

    componentDidMount () {
        axios.get('/api/products').then(response => {
            this.setState({
                products: response.data
            })
        })  

        axios.get('/api/ligas').then(response => {
            this.setState({
                ligas: response.data
            })
        })  
    }
    
    filterProducts(liga_id) {
        axios.get('/api/products').then(response => {
            this.setState({
                products: response.data.filter(product => product.liga_id == liga_id)
            })
        })  
    }

    currencyFormat(num) {
        return 'Rp. ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    render () {
        const products = this.state.products
        const ligas = this.state.ligas
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <img src="img/slider/slider1.png"></img>
                        </div>
                    </div>
                </div>
                <div className='row py-3'>
                    <div className='col-md-12'>
                        <h3><strong>Pilih Liga</strong></h3>
                    </div>
                    {ligas.map((liga, i) => (
                        <div className='col-md-3 py-3' key={liga.id}>
                            <a href="#" onClick={ () => this.filterProducts(liga.id)}>
                                <div className='card text-center' style={{boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)',borderRadius:'10px'}}>
                                    <div className='card-body'>
                                        <img className='p-3' src={`img/liga/${liga.gambar}`} style={{maxHeight:'100px'}}></img>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
                <div className='row py-3'>
                    <div className='col-md-8'>
                        <h3><strong>List Product</strong></h3>
                    </div>
                    <div className='col-md-4'>
                        <InputGroup>
                            <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                            <FormControl placeholder="Search Product" onChange={this.onChangehandler}/>
                        </InputGroup>
                    </div>
                    {products.map((product, i) => (
                        <div className='col-md-3 py-3' key={product.id}>
                            <div className='card text-center' style={{borderRadius:'10px'}}>
                                <img className='p-3' src={`img/jersey/${product.gambar}`}></img>
                                <div className='card-body'>
                                    <h6 className='card-title'><strong>{product.nama}</strong></h6>
                                    <div className='card-subtitle'>{this.currencyFormat(product.harga)}</div>
                                    <Link
                                        className='btn btn-block btn-secondary mt-1'
                                        to={`/product/${product.id}`}
                                        ><FontAwesomeIcon className='mr-1' icon={faEye} /> Detail
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
 
export default Home