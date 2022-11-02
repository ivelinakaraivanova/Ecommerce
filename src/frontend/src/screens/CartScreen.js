import {useEffect} from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import { Message } from '../components/Message';
import { addToCart } from '../actions/cartActions';

export const CartScreen = () => {
    const param = useParams();
    const location = useLocation();
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    console.log('cartItems: ', cartItems)

    useEffect(() => {
        if (param.id){
            dispatch(addToCart(param.id, qty))
        }
    }, [dispatch, param.id, qty]);

    return (
        <div>
            Cart
        </div>
    );
}