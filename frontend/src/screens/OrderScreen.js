import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';

function reducer(state, action) {
   switch (action.type) {
      case 'FETCH_REQUEST':
         return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
         return { ...state, loading: false, order: action.payload, error: '' };
      case 'FETCH_FAIL':
         return { ...state, loading: false, error: action.payload };
      case 'PAY_REQUEST':
         return { ...state, loadingPay: true };
      case 'PAY_SUCCESS':
         return { ...state, loadingPay: false, successPay: true };
      case 'PAY_FAIL':
         return { ...state, loadingPay: false };
      case 'PAY_RESET':
         return { ...state, loadingPay: false, successPay: false };

      case 'DELIVER_REQUEST':
         return { ...state, loadingDeliver: true };
      case 'DELIVER_SUCCESS':
         return { ...state, loadingDeliver: false, successDeliver: true };
      case 'DELIVER_FAIL':
         return { ...state, loadingDeliver: false };
      case 'DELIVER_RESET':
         return {
            ...state,
            loadingDeliver: false,
            successDeliver: false,
         };


      case 'CANCEL_REQUEST':
         return { ...state, loadingCancel: true, };
      case 'CANCEL_SUCCESS':
         return { ...state, loadingCancel: false, successCancel: true };
      case 'CANCEL_FAIL':
         return { ...state, loadingCancel: false };
      case 'CANCEL_RESET':
         return {
            ...state,
            loadingCancel: false,
            successCancel: false,
         };


      case 'SHIPPING_REQUEST':
         return { ...state, loadingShipping: true, };
      case 'SHIPPING_SUCCESS':
         return { ...state, loadingShipping: false, successShipping: true };
      case 'SHIPPING_FAIL':
         return { ...state, loadingShipping: false };
      case 'SHIPPING_RESET':
         return {
            ...state,
            loadingShipping: false,
            successShipping: false,
         };


      default:
         return state;
   }
}


// let productStats = []

export default function OrderScreen() {
   const { state } = useContext(Store);

   const { userInfo, isEnglish } = state;

   const params = useParams();
   const { id: orderId } = params;
   const navigate = useNavigate();

   const [
      {
         loading,
         error,
         order,
         successPay,
         loadingPay,
         loadingDeliver,
         successDeliver,
         loadingCancel,
         successCancel,
         loadingShipping,
         successShipping,

      },
      dispatch,
   ] = useReducer(reducer, {
      loading: true,
      order: {},
      error: '',
      successPay: false,
      loadingPay: false,
   });


   const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

   function createOrder(data, actions) {
      return actions.order
         .create({
            purchase_units: [
               {
                  amount: { value: order.totalPrice },
               },
            ],
         })
         .then((orderID) => {
            return orderID;
         });
   }

   function onApprove(data, actions) {
      return actions.order.capture().then(async function (details) {
         try {
            console.log(details);
            dispatch({ type: 'PAY_REQUEST' });
            const { data } = await axios.put(
               `/api/orders/${order._id}/pay`,
               details,
               {
                  headers: { authorization: `Bearer ${userInfo.token}` },
               }
            );
            dispatch({ type: 'PAY_SUCCESS', payload: data });
            toast.success('Order is paid');
         } catch (err) {
            dispatch({ type: 'PAY_FAIL', payload: getError(err) });
            toast.error(getError(err));
         }
      });
   }
   function onError(err) {
      toast.error(getError(err));
   }

   const confirmByStaff = async () => {

      const details = {
         isPaid: true,
         paidAt: Date.now(),
         id: null,
         status: 'COMPLETED',
         update_time: Date.now(),
         email_address: null,
      }

      try {
         console.log(details);
         dispatch({ type: 'PAY_REQUEST' });
         const { data } = await axios.put(
            `/api/orders/${order._id}/pay`,
            details,
            {
               headers: { authorization: `Bearer ${userInfo.token}` },
            }
         );
         dispatch({ type: 'PAY_SUCCESS', payload: data });
         toast.success('Order is paid');
      } catch (err) {
         dispatch({ type: 'PAY_FAIL', payload: getError(err) });
         toast.error(getError(err));
      }

      // // change countInStock
      // try {
      //    const { data } = await axios.get(`/api/orders/${orderId}`, {
      //       headers: { authorization: `Bearer ${userInfo.token}` },
      //    });

      //    console.log(data.orderItems);

      //    productStats = data.orderItems.map((element, index) => {
      //       return {
      //          _id: element._id,
      //          quantity: element.quantity,
      //       }
      //    })

      // } catch (err) {
      // }

      // try {
      //    // const { data } = await axios.get(`/api/products/${productStats[0]._id}`);

      //    async function abc() {

      //       for (let i = 0; i < productStats.length; i++) {
      //          const response = await axios.get(`/api/products/${productStats[i]._id}`).then((res) => {
      //             return res.data
      //          }).catch(() => {
      //             console.log('fail');
      //          })
      //          console.log(response.countInStock);

      //          console.log(productStats);
      //          console.log(productStats[0]._id);

      //          await axios.put(
      //             `/api/products/${productStats[i]._id}/afterdeliveredstaff`,
      //             {
      //                countInStock: response.countInStock - productStats[i].quantity,
      //             },
      //             {
      //                headers: { authorization: `Bearer ${userInfo.token}` },
      //             }
      //          );
      //       }
      //    }
      //    abc()
      // } catch (error) { }

   }

   useEffect(() => {
      const fetchOrder = async () => {
         try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/orders/${orderId}`, {
               headers: { authorization: `Bearer ${userInfo.token}` },
            });
            dispatch({ type: 'FETCH_SUCCESS', payload: data });

         } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
         }
      };

      if (!userInfo) {
         return navigate('/login');
      }

      if (
         !order._id ||
         successPay ||
         successDeliver ||
         successCancel ||
         successShipping ||
         (order._id && order._id !== orderId)
      ) {
         fetchOrder();

         if (successPay) {
            dispatch({ type: 'PAY_RESET' });
         }
         if (successDeliver) {
            dispatch({ type: 'DELIVER_RESET' });
         }

         if (successCancel) {
            dispatch({ type: 'CANCEL_RESET' })
         }

         if (successShipping) {
            dispatch({ type: 'SHIPPING_RESET' })
         }

      } else {
         const loadPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/keys/paypal', {
               headers: { authorization: `Bearer ${userInfo.token}` },
            });
            paypalDispatch({
               type: 'resetOptions',
               value: {
                  'client-id': clientId,
                  currency: 'USD',
               },
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
         };
         loadPaypalScript();
      }
   }, [
      order,
      userInfo,
      orderId,
      navigate,
      paypalDispatch,
      successPay,
      successDeliver,
      successCancel,
      successShipping,
   ]);


   async function deliverOrderHandler() {
      try {
         dispatch({ type: 'DELIVER_REQUEST' });
         const { data } = await axios.put(
            `/api/orders/${order._id}/deliver`,
            {},
            {
               headers: { authorization: `Bearer ${userInfo.token}` },
            }
         );
         dispatch({ type: 'DELIVER_SUCCESS', payload: data });
         toast.success('Order is delivered');
      } catch (err) {
         toast.error(getError(err));
         dispatch({ type: 'DELIVER_FAIL' });
      }

      // // change countInStock
      // try {

      //    const { data } = await axios.get(`/api/orders/${orderId}`, {
      //       headers: { authorization: `Bearer ${userInfo.token}` },
      //    });

      //    console.log(data.orderItems);

      //    productStats = data.orderItems.map((element, index) => {
      //       return {
      //          _id: element._id,
      //          quantity: element.quantity,
      //       }
      //    })

      // } catch (err) {
      // }

      // try {
      //    // const { data } = await axios.get(`/api/products/${productStats[0]._id}`);

      //    async function abc() {

      //       for (let i = 0; i < productStats.length; i++) {
      //          const response = await axios.get(`/api/products/${productStats[i]._id}`).then((res) => {
      //             return res.data
      //          }).catch(() => {
      //             console.log('fail');
      //          })
      //          console.log(response.countInStock);

      //          console.log(productStats);
      //          console.log(productStats[0]._id);

      //          if (userInfo.isAdmin) {
      //             await axios.put(
      //                `/api/products/${productStats[i]._id}/afterdelivered`,
      //                {
      //                   countInStock: response.countInStock - productStats[i].quantity,
      //                },
      //                {
      //                   headers: { authorization: `Bearer ${userInfo.token}` },
      //                }
      //             );
      //          }
      //          if (userInfo.isStaff) {
      //             await axios.put(
      //                `/api/products/${productStats[i]._id}/afterdeliveredstaff`,
      //                {
      //                   countInStock: response.countInStock - productStats[i].quantity,
      //                },
      //                {
      //                   headers: { authorization: `Bearer ${userInfo.token}` },
      //                }
      //             );
      //          }
      //       }
      //    }
      //    abc()
      // } catch (error) { }

   }


   async function cancelOrderHandler() {
      try {
         dispatch({ type: 'CANCEL_REQUEST' });
         const { data } = await axios.put(
            `/api/orders/${order._id}/cancel`,
            {},
            {
               headers: { authorization: `Bearer ${userInfo.token}` },
            }
         );

         dispatch({ type: 'CANCEL_SUCCESS', payload: data });
         toast.success('Order is Canceled');
      } catch (err) {
         toast.error(getError(err));
         dispatch({ type: 'CANCEL_FAIL' });
      }
   }

   async function shippingOrderHandler() {
      try {
         dispatch({ type: 'SHIPPING_REQUEST' });
         const { data } = await axios.put(
            `/api/orders/${order._id}/shipping`,
            {},
            {
               headers: { authorization: `Bearer ${userInfo.token}` },
            }
         );

         dispatch({ type: 'SHIPPING_SUCCESS', payload: data });
         toast.success('Order is shipping');
      } catch (err) {
         toast.error(getError(err));
         dispatch({ type: 'SHIPPING_FAIL' });
      }
   }

   return loading ? (
      <LoadingBox></LoadingBox>
   ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
   ) : (
      <div>
         <Helmet>
            <title>
               {isEnglish ? 'Order' : 'Đơn hàng'}
               {orderId}</title>
         </Helmet>
         <h1 className="my-3">{isEnglish ? 'Order' : 'Đơn hàng'}{orderId}</h1>
         <Row>
            <Col md={8}>
               <Card className="mb-3">
                  <Card.Body>
                     <Card.Title>
                        {isEnglish ? 'Shipping' : 'Tình trạng giao hàng'}
                     </Card.Title>
                     <Card.Text>
                        <strong>
                           {isEnglish ? 'Name:' : 'Tên'}
                        </strong> {order.shippingAddress.fullName} <br />
                        <strong>
                           {isEnglish ? 'Address: ' : 'Địa chỉ'}
                        </strong> {order.shippingAddress.address},
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                        ,{order.shippingAddress.country}
                     </Card.Text>
                     {order.isDelivered ? (
                        <MessageBox variant="success">
                           {isEnglish ? 'Delivered at' : 'Giao hàng lúc '}{order.deliveredAt}
                        </MessageBox>
                     ) : (
                        <MessageBox variant="danger">
                           {isEnglish ? 'Not Delivered' : 'Chưa giao hàng'}
                        </MessageBox>
                     )}
                  </Card.Body>
               </Card>
               <Card className="mb-3">
                  <Card.Body>
                     <Card.Title>
                        {isEnglish ? 'Payment' : 'Tình trạng thanh toán'}
                     </Card.Title>
                     <Card.Text>
                        <strong>
                           {isEnglish ? 'Method:' : 'Phương thức thanh toán:'}
                        </strong> {order.paymentMethod}
                     </Card.Text>
                     {order.isPaid ? (
                        <MessageBox variant="success">
                           {isEnglish ? 'Paid at ' : 'Đã thanh toán lúc'}
                           {order.paidAt}
                        </MessageBox>
                     ) : (
                        <MessageBox variant="danger">
                           {isEnglish ? 'Not Paid' : 'Chưa thanh toán'}
                        </MessageBox>
                     )}
                  </Card.Body>
               </Card>

               <Card className="mb-3">
                  <Card.Body>
                     <Card.Title>
                        {isEnglish ? 'Items' : 'Danh sách sản phẩm'}
                     </Card.Title>
                     <ListGroup variant="flush">
                        {order.orderItems.map((item) => (
                           <ListGroup.Item key={item._id}>
                              <Row className="align-items-center">
                                 <Col md={6}>
                                    <img
                                       src={item.image}
                                       alt={item.name}
                                       className="img-fluid rounded img-thumbnail"
                                    ></img>{' '}
                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                 </Col>
                                 <Col md={3}>
                                    <span>{item.quantity}</span>
                                 </Col>
                                 <Col md={3}>${item.price}</Col>
                              </Row>
                           </ListGroup.Item>
                        ))}
                     </ListGroup>
                  </Card.Body>
               </Card>
            </Col>
            <Col md={4}>
               <Card className="mb-3">
                  <Card.Body>
                     <Card.Title>
                        {isEnglish ? 'Order Summary' : 'Chi phí đơn hàng'}
                     </Card.Title>
                     <ListGroup variant="flush">
                        <ListGroup.Item>
                           <Row>
                              <Col>
                                 {isEnglish ? 'Items' : 'Các sản phẩm'}
                              </Col>
                              <Col>${order.itemsPrice.toFixed(2)}</Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>
                                 {isEnglish ? 'Shipping' : 'Phí giao hàng'}
                              </Col>
                              <Col>${order.shippingPrice.toFixed(2)}</Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>
                                 {isEnglish ? 'Tax' : 'Thuế'}
                              </Col>
                              <Col>${order.taxPrice.toFixed(2)}</Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>
                                 <strong>
                                    {isEnglish ? 'Order Total' : 'Tổng tiền'}
                                 </strong>
                              </Col>
                              <Col>
                                 <strong>${order.totalPrice.toFixed(2)}</strong>
                              </Col>
                           </Row>
                        </ListGroup.Item>

                        {
                           !order.canceled && (!order.isPaid) && (order.paymentMethod === 'Payment on delivery') && (
                              <ListGroup.Item>
                                 <div className='d-grid'>
                                    <MessageBox>
                                       {isEnglish ? 'The Customer Will Pay On Delivery' : 'Khách hàng sẽ thanh toán khi nhận hàng'}

                                    </MessageBox>
                                 </div>
                              </ListGroup.Item>
                           )
                        }

                        {(order.paymentMethod === 'PayPal') && !userInfo.isAdmin && !userInfo.isStaff && !order.isPaid && !order.canceled && (
                           <ListGroup.Item>
                              {(loadingCancel && isPending) ? (
                                 <LoadingBox />
                              ) : (
                                 <div>
                                    <PayPalButtons
                                       style={{
                                          color: 'blue'

                                       }}
                                       createOrder={createOrder}
                                       onApprove={onApprove}
                                       onError={onError}
                                    ></PayPalButtons>
                                 </div>
                              )}
                              {loadingPay && <LoadingBox></LoadingBox>}
                           </ListGroup.Item>
                        )}

                        {
                           (order.paymentMethod === 'Payment on delivery') && userInfo.isStaff && !order.isPaid && !order.canceled && order.isShipping && (
                              <ListGroup.Item>
                                 {isPending ? (
                                    <LoadingBox />
                                 ) : (
                                    <div className="d-grid">
                                       <Button type='button'
                                          onClick={confirmByStaff}
                                       >
                                          {isEnglish ? ' Confirm The Customer Has Paid' : 'Xác nhận đã thanh toán'}

                                       </Button>
                                    </div>
                                 )}
                                 {loadingPay && <LoadingBox></LoadingBox>}
                              </ListGroup.Item>
                           )}


                        {/* confirm delivery */}
                        {(order.paymentMethod === 'PayPal') && order.isShipping && userInfo.isStaff && order.isPaid && !order.isDelivered && (
                           <ListGroup.Item>
                              {loadingDeliver && <LoadingBox></LoadingBox>}
                              <div className="d-grid">
                                 <Button type="button" onClick={deliverOrderHandler}>
                                    {isEnglish ? 'Confirm The Order Has Been Delivered' : 'Xác nhận đã giao hàng'}

                                 </Button>
                              </div>
                           </ListGroup.Item>
                        )}
                        {(order.paymentMethod === 'Payment on delivery') && userInfo.isStaff && order.isPaid && !order.isDelivered && (
                           <ListGroup.Item>
                              {loadingDeliver && <LoadingBox></LoadingBox>}
                              <div className="d-grid">
                                 <Button type="button" onClick={deliverOrderHandler}>
                                    {isEnglish ? 'Confirm The Order Has Been Delivered' : 'Xác nhận đã giao hàng'}

                                 </Button>
                              </div>
                           </ListGroup.Item>
                        )}


                        <ListGroup.Item>
                           <div className="d-grid">
                              {(!order.isShipping) && !order.isPaid && !userInfo.isStaff && !userInfo.isAdmin && (!order.canceled) && (
                                 <Button type="button" variant='secondary' onClick={cancelOrderHandler}>
                                    {isEnglish ? 'Cancel Order' : 'Huỷ đơn hàng'}

                                 </Button>
                              )}

                              {(!!order.canceled) && (
                                 <MessageBox variant="secondary">
                                    {isEnglish ? 'Order Canceled' : 'Đơn hàng đã bị hủy'}
                                 </MessageBox>
                              )}
                           </div>
                        </ListGroup.Item>

                        <ListGroup.Item>
                           <div className="d-grid">

                              {
                                 (order.paymentMethod === 'PayPal') && !order.isPaid && (
                                    <MessageBox variant="warning">
                                       {isEnglish ? 'Waiting for customer to pay' : 'Đang chờ khách hàng thanh toán online'}</MessageBox>
                                 )
                              }

                              {!order.canceled && (!order.isShipping) && (
                                 <MessageBox variant="warning">
                                    {isEnglish ? 'Order is processing' : 'Đơn hàng đang chờ xử lý'}</MessageBox>
                              )}
                              {!order.isDelivered && order.isShipping && (
                                 <MessageBox variant="success">
                                    {isEnglish ? 'Order is shipping' : 'Đơn hàng đang được vận chuyển'}
                                 </MessageBox>
                              )}

                              {(order.paymentMethod === 'PayPal') && !order.canceled && order.isPaid && !order.isShipping && userInfo.isStaff && (
                                 <Button type="button" variant='warning' onClick={shippingOrderHandler}>
                                    {isEnglish ? 'Start Shipping Order' : 'Bắt đầu giao hàng'}

                                 </Button>
                              )}

                              {(order.paymentMethod === 'Payment on delivery') && !order.canceled && !order.isPaid && !order.isShipping && userInfo.isStaff && (
                                 <Button type="button" variant='warning' onClick={shippingOrderHandler}>
                                    {isEnglish ? 'Start Shipping Order' : 'Bắt đầu giao hàng'}

                                 </Button>
                              )}

                           </div>
                        </ListGroup.Item>

                     </ListGroup>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </div>
   );

} 