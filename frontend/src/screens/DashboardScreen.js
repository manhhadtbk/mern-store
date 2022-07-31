import React, { useContext, useEffect, useReducer } from 'react';
import Chart from 'react-google-charts';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
   switch (action.type) {
      case 'FETCH_REQUEST':
         return { ...state, loading: true };
      case 'FETCH_SUCCESS':
         return {
            ...state,
            summary: action.payload,
            loading: false,
         };
      case 'FETCH_FAIL':
         return { ...state, loading: false, error: action.payload };
      default:
         return state;
   }
};
export default function DashboardScreen() {
   const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
      loading: true,
      error: '',
      summary: {},
   });
   const { state } = useContext(Store);
   const { userInfo, isEnglish } = state;

   useEffect(() => {
      const fetchData = async () => {
         try {
            const { data } = await axios.get('/api/orders/summary', {
               headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
            console.log(data);
         } catch (err) {
            dispatch({
               type: 'FETCH_FAIL',
               payload: getError(err),
            });
         }
      };
      fetchData();
   }, [userInfo]);


   return (
      <div>
         <h1>
            {isEnglish ? 'Dashboard' : 'Trang thống kê'}
         </h1>
         {loading ? (
            <LoadingBox />
         ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
         ) : (
            <>

               {/* Profit row */}
               <Row className="d-flex align-items-end">
                  <Col md={3}>
                     <Card
                        style={{
                           background: '#D7DE8D',
                           fontSize: '1.25rem',
                           color: 'white'
                        }}
                     >
                        <Card.Body>
                           <Card.Text>
                              {isEnglish ? 'Today Profit' : 'Lợi nhuận trong ngày'}
                           </Card.Text>

                           <Card.Title
                              style={{
                                 fontSize: '1.25rem',
                              }}
                           >
                              $
                              {summary.dailyOrders && summary.dailyOrders[0]
                                 ? summary.dailyOrders[0].sales
                                 : 0}
                           </Card.Title>

                           <Button>
                              <Link
                                 style={{ color: '#333', textDecoration: 'none' }}
                                 to="/admin/orders">
                                 {isEnglish ? ' View details' : 'Xem chi tiết'}

                              </Link>
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col md={3}>
                     <Card
                        style={{
                           background: '#D7DE8D',
                           fontSize: '1.25rem',
                           color: 'white'
                        }}
                     >
                        <Card.Body>
                           <Card.Text>
                              {isEnglish ? 'Last Week Profit' : 'Lợi nhuận trong tuần'}
                           </Card.Text>

                           <Card.Title
                              style={{
                                 fontSize: '1.25rem',
                              }}
                           >
                              $
                              {summary.lastWeekProfit && summary.lastWeekProfit[0]
                                 ? summary.lastWeekProfit[0].profit
                                 : 0}
                           </Card.Title>

                           <Button>
                              <Link
                                 style={{ color: '#333', textDecoration: 'none' }}
                                 to="/admin/orders">
                                 {isEnglish ? 'View details' : 'Xem chi tiết'}

                              </Link>
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col md={3}>
                     <Card
                        style={{
                           background: '#D7DE8D',
                           fontSize: '1.25rem',
                           color: 'white'
                        }}
                     >
                        <Card.Body>
                           <Card.Text>
                              {isEnglish ? 'Last Month Profit' : 'Lợi nhuận trong tháng'}
                           </Card.Text>

                           <Card.Title
                              style={{
                                 fontSize: '1.25rem',
                              }}
                           >
                              $
                              {summary.lastMonthProfit && summary.lastMonthProfit[0]
                                 ? summary.lastMonthProfit[0].profit
                                 : 0}
                           </Card.Title>

                           <Button>
                              <Link
                                 style={{ color: '#333', textDecoration: 'none' }}
                                 to="/admin/orders">
                                 {isEnglish ? 'View details' : 'Xem chi tiết'}

                              </Link>
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col md={3}>
                     <Card
                        style={{
                           background: '#D7DE8D',
                           fontSize: '1.25rem',
                           color: 'white'
                        }}
                     >
                        <Card.Body>
                           <Card.Text>
                              {isEnglish ? 'Total Profit' : 'Tổng lợi nhuận'}
                           </Card.Text>

                           <Card.Title
                              style={{
                                 fontSize: '1.25rem',
                              }}
                           >
                              $
                              {(summary.orders[0] !== undefined) && summary.orders && summary.users[0]
                                 ? summary.orders[0].totalSales.toFixed(2)
                                 : 0}
                           </Card.Title>

                           <Button>
                              <Link
                                 style={{ color: '#333', textDecoration: 'none' }}
                                 to="/admin/orders">
                                 {isEnglish ? 'View details' : 'Xem chi tiết'}

                              </Link>
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>

               {/* product row */}
               <Row
                  className="d-flex align-items-end"
               >
                  {/* total remaining products */}
                  <Col
                     className='mt-3'
                     md={3}>
                     <Card
                        style={{
                           background: '#DA8DDE',
                           fontSize: '1.25rem',
                           color: 'white',
                        }}
                     >
                        <Card.Body>
                           <Card.Text>
                              {isEnglish ? 'Number of Remaining Products' : 'Số sản phẩm còn trong kho'}
                           </Card.Text>

                           <Card.Title
                              style={{
                                 fontSize: '1.25rem',
                              }}
                           >
                              {
                                 summary.numOfRemainingProducts && summary.numOfRemainingProducts[0] && summary.numOfSoldProducts[0]
                                    ? summary.numOfRemainingProducts[0].numOfRemainingProducts - summary.numOfSoldProducts[0].numOfSoldProducts
                                    : 0}
                           </Card.Title>

                           <Button>
                              <Link
                                 style={{ color: '#333', textDecoration: 'none' }}
                                 to="/admin/orders">
                                 {isEnglish ? 'View details' : 'Xem chi tiết'}

                              </Link>
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>

                  {/* number of products sold */}
                  <Col
                     className='mt-3'
                     md={3}>
                     <Card
                        style={{
                           background: '#DA8DDE',
                           fontSize: '1.25rem',
                           color: 'white',
                        }}
                     >
                        <Card.Body>
                           <Card.Text>
                              {isEnglish ? 'Number of Products Sold' : 'Số sản phẩm đã bán được'}
                           </Card.Text>

                           <Card.Title
                              style={{
                                 fontSize: '1.25rem',
                              }}
                           >
                              {summary.numOfSoldProducts && summary.numOfSoldProducts[0]
                                 ? summary.numOfSoldProducts[0].numOfSoldProducts
                                 : 0}
                           </Card.Title>

                           <Button>
                              <Link
                                 style={{ color: '#333', textDecoration: 'none' }}
                                 to="/admin/orders">
                                 {isEnglish ? 'View details' : 'Xem chi tiết'}

                              </Link>
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>

                  {/* number of total products  */}
                  <Col
                     className='mt-3'
                     md={3}>
                     <Card
                        style={{
                           background: '#DA8DDE',
                           fontSize: '1.25rem',
                           color: 'white',
                        }}
                     >
                        <Card.Body>
                           <Card.Text>
                              {isEnglish ? 'Number of Total Product' : 'Tổng sổ sản phẩm'}
                           </Card.Text>

                           <Card.Title
                              style={{
                                 fontSize: '1.25rem',
                              }}
                           >
                              {
                                 // ((summary.numOfSoldProducts[0] !== undefined))
                                 //    ? (summary.numOfRemainingProducts[0].numOfRemainingProducts + summary.numOfSoldProducts[0].numOfSoldProducts)
                                 //    : (0 + summary.numOfRemainingProducts[0].numOfRemainingProducts)

                                 summary.numOfRemainingProducts && summary.numOfRemainingProducts[0]
                                    ? summary.numOfRemainingProducts[0].numOfRemainingProducts
                                    : 0

                              }
                           </Card.Title>

                           <Button>
                              <Link
                                 style={{ color: '#333', textDecoration: 'none' }}
                                 to="/admin/orders">

                                 {isEnglish ? 'View details' : 'Xem chi tiết'}

                              </Link>
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>

               {/* Order row */}
               <Row className="d-flex align-items-end">
                  <Col md={3}>
                     <Card
                        style={{
                           background: '#6ED68E',
                           fontSize: '1.25rem',
                           color: 'white'
                        }}
                     >
                        <Card.Body>
                           <Card.Text>
                              {isEnglish ? ' Number of total Orders' : 'Tổng số đơn hàng'}
                           </Card.Text>
                           <Card.Title
                              style={{
                                 fontSize: '1.25rem',
                              }}
                           >
                              {
                                 ((summary.numOfTotalOrders[0] !== undefined)) && summary.numOfTotalOrders && summary.users[0]
                                    ? summary.numOfTotalOrders[0].numOfTotalOrders
                                    : 0
                              }
                           </Card.Title>

                           <Button>
                              <Link
                                 style={{ color: '#333', textDecoration: 'none' }}
                                 to="/admin/orders">
                                 {isEnglish ? 'View details' : 'Xem chi tiết'}

                              </Link>
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col md={3}>
                     <Card
                        style={{
                           background: '#6ED68E',
                           fontSize: '1.25rem',
                           color: 'white'
                        }}
                     >
                        <Card.Body>
                           <Card.Text>
                              {isEnglish ? 'Number of Canceled Orders' : 'Số đơn hàng bị hủy'}
                           </Card.Text>
                           <Card.Title
                              style={{
                                 fontSize: '1.25rem',
                              }}
                           >
                              {summary.canceledOrders && summary.canceledOrders[0]
                                 ? summary.canceledOrders[0].canceledOrders
                                 : 0}
                           </Card.Title>

                           <Button>
                              <Link
                                 style={{ color: '#333', textDecoration: 'none' }}
                                 to="/admin/orders">
                                 {isEnglish ? ' View details' : 'Xem chi tiết'}
                              </Link>
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col md={3}>
                     <Card
                        style={{
                           background: '#6ED68E',
                           fontSize: '1.25rem',
                           color: 'white'
                        }}
                     >
                        <Card.Body>
                           <Card.Text>
                              {isEnglish ? ' Number of Success Orders' : 'Tổng số đơn hàng bán được'}
                           </Card.Text>
                           <Card.Title
                              style={{
                                 fontSize: '1.25rem',
                              }}
                           >
                              {summary.successOrders && summary.successOrders[0]
                                 ? summary.successOrders[0].successOrders
                                 : 0}
                           </Card.Title>

                           <Button>
                              <Link
                                 style={{ color: '#333', textDecoration: 'none' }}
                                 to="/admin/orders">
                                 {isEnglish ? 'View details' : 'Xem chi tiết'}

                              </Link>
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col md={3}>
                     <Card
                        style={{
                           background: '#6ED68E',
                           fontSize: '1.25rem',
                           color: 'white'
                        }}
                     >
                        <Card.Body>
                           <Card.Text>
                              {isEnglish ? 'Number of Processing Orders' : 'Số đơn hàng đang xử lý'}
                           </Card.Text>
                           <Card.Title
                              style={{
                                 fontSize: '1.25rem',
                              }}
                           >
                              {summary.processingOrders && summary.processingOrders[0]
                                 ? summary.processingOrders[0].processingOrders
                                 : 0}
                           </Card.Title>

                           <Button>
                              <Link
                                 style={{ color: '#333', textDecoration: 'none' }}
                                 to="/admin/orders">
                                 {isEnglish ? 'View details' : 'Xem chi tiết'}

                              </Link>
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>



               <Row className="d-flex align-items-end">
                  <Col
                     md={2}>
                     <Card
                        style={{
                           background: '#DA8DDE',
                           fontSize: '1.25rem',
                           color: 'white'
                        }}
                     >
                        <Card.Body>
                           <Card.Text>
                              {isEnglish ? 'Number of Products Category' : 'Tổng số loại mặt hàng'}
                           </Card.Text>

                           <Card.Title
                              style={{
                                 fontSize: '1.25rem',
                              }}
                           >
                              {summary.numOfProducts && summary.numOfProducts[0]
                                 ? summary.numOfProducts[0].numOfProducts
                                 : 0}
                           </Card.Title>

                           <Button>
                              <Link
                                 style={{ color: '#333', textDecoration: 'none' }}
                                 to="/admin/orders">
                                 {isEnglish ? ' View details' : 'Xem chi tiết'}

                              </Link>
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>


               <Row className="d-flex align-items-end">
                  <Col md={3}>
                     <Card
                        style={{
                           background: '#5B8FBD',
                           fontSize: '1.25rem',
                           color: 'white'
                        }}
                        bg='info'
                     >
                        <Card.Body>
                           <Card.Text>
                              {isEnglish ? 'Number of Users' : 'Tổng số người dùng'}
                           </Card.Text>
                           <Card.Title
                              style={{
                                 fontSize: '1.25rem',
                              }}
                           >
                              {summary.users && summary.users[0]
                                 ? summary.users[0].numUsers
                                 : 0}
                           </Card.Title>

                           <Button>
                              <Link
                                 style={{ color: '#333', textDecoration: 'none' }}
                                 to="/admin/users">
                                 {isEnglish ? 'View details' : 'Xem chi tiết'}

                              </Link>
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>




               </Row>




               <div className="my-3">
                  <h2>
                     {isEnglish ? ' Average Profit' : 'Biểu đồ lợi nhuận trung bình'}
                  </h2>
                  {summary.dailyOrders.length === 0 ? (
                     <MessageBox>No Sale</MessageBox>
                  ) : (
                     <Chart
                        width="100%"
                        height="400px"
                        chartType="AreaChart"
                        loader={<div>Loading Chart...</div>}
                        data={[
                           ['Date', 'Sales'],
                           ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                        ]}
                     ></Chart>
                  )}
               </div>

               <div className="my-3">
                  <h2>
                     {isEnglish ? 'Categories' : 'Các mặt hàng đang kinh doanh'}
                  </h2>
                  {summary.productCategories.length === 0 ? (
                     <MessageBox>No Category</MessageBox>
                  ) : (
                     <Chart
                        width="100%"
                        height="400px"
                        chartType="PieChart"
                        loader={<div>Loading Chart...</div>}
                        data={[
                           ['Category', 'Products'],
                           ...summary.productCategories.map((x) => [x._id, x.count]),
                        ]}
                     ></Chart>
                  )}
               </div>


               <div className="my-3">
                  <h2>
                     {isEnglish ? 'Hot Selling' : 'Sản phẩm bán chạy'}
                  </h2>
                  {summary.productQuantitySolds.length === 0 ? (
                     <MessageBox>No Category</MessageBox>
                  ) : (
                     <Chart
                        width="100%"
                        height="400px"
                        // chartType="PieChart"
                        chartType="ColumnChart"
                        loader={<div>Loading Chart...</div>}
                        data={[
                           ['Category', 'Products'],
                           ...summary.productQuantitySolds.map((x) => [x._id, x.quantity]),
                        ]}
                     ></Chart>
                  )}
               </div>
            </>
         )}
      </div>
   );
}
