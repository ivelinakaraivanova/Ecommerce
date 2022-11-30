import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions';
import Moment from 'react-moment';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';

export const OrderScreen = () => {
    const navigate = useNavigate();
    const param = useParams();
    const orderId = param.id;
    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
    }

    // AerXnQWthSD0hzve4sYxVYKRmRj-Ys53e0gTs84hDTf3jQFCELttDGGoYIIAkaccqerkDE7QCftq6_OW

    const addPayPalScript = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.paypal.com/sdk/js?client-id=AerXnQWthSD0hzve4sYxVYKRmRj-Ys53e0gTs84hDTf3jQFCELttDGGoYIIAkaccqerkDE7QCftq6_OW&currency=USD';
        script.async = true;
        script.onload = () => {
            setSdkReady(true)
        };
        document.body.appendChild(script);
    }

    useEffect(() => {

        if (!userInfo) {
            navigate('/user/login');
        }

        if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, orderId, successPay, successDeliver, navigate, userInfo])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading
        ? (<Loader />)
        : error
            ? (<Message variant='danger'>{error}</Message>)
            :
            (
                <div>
                    <h1>Order: {orderId}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong>
                                        {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>
                                        <a href={`mailto:${order.user.email}`}>
                                            {order.user.email}
                                        </a>
                                    </p>
                                    <p>
                                        <strong>Shipping: </strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}
                                        {' '}
                                        {order.shippingAddress.postalCode},
                                        {' '}
                                        {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered
                                        ? (
                                            <Message variant='success'>
                                                Delivered on <Moment format="YYYY/MM/DD">{order.deliveredAt}</Moment>
                                            </Message>
                                        )
                                        : (
                                            <Message variant='warning'>Not Delivered</Message>
                                        )
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid
                                        ? (
                                            <Message variant='success'>
                                                Paid on <Moment format="YYYY/MM/DD">{order.paidAt}</Moment>
                                            </Message>
                                        )
                                        : (
                                            <Message variant='warning'>Not Paid</Message>
                                        )
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>

                                    {order.orderItems.length === 0
                                        ? <Message variant='info'>
                                            Order is empty
                                        </Message>
                                        : (
                                            <ListGroup variant='flush'>
                                                {order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>

                                                            <Col>
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </Col>

                                                            <Col md={4}>
                                                                {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Item:</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping:</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax:</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total:</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                />
                                            )
                                            }
                                        </ListGroup.Item>
                                    )}

                                    {loadingDeliver && <Loader />}
                                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                        <ListGroup.Item>
                                            <div className="d-grid gap-2">
                                                <Button
                                                    type='button'
                                                    className='btn btn-block'
                                                    onClick={deliverHandler}
                                                >
                                                    Mark As Delivered
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    )}

                                </ListGroup>

                            </Card>
                        </Col>
                    </Row>
                </div >
            );
}