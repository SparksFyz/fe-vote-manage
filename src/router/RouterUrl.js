import React, 
{ Component } from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';
import Icons from '../components/UI/Icons';
import ProductList from '../components/UI/ProductList';
import Product from '../components/UI/Product'
import NewProduct from '../components/UI/NewProduct'
import DropdownMenu from '../components/UI/DropdownMenu';
import Pageination from '../components/UI/Pageination';
import Grid from '../components/Layout/Grid';
export default class RouterUrl extends Component{
    render(){
        return( 
                <Switch>
                    <Route exact path="/" component={ProductList}/>
                    <Route path='/vote/list' component={ProductList}/>
                    <Route path='/vote/product' component={Product} />
                    <Route path='/vote/newProduct' component={NewProduct} />
                    <Route path='/vote/icons' component={Icons}/>
                    <Route path='/vote/dropdown' component={DropdownMenu}/>
                    <Route path='/vote/pageination' component={Pageination}/>
                    <Route path='/layout/grid' component={Grid}/>
                    <Route component={Icons}/>
                </Switch>
        )
    }
}