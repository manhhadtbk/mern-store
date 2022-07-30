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
   const { userInfo } = state;

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
         <h1>Dashboard</h1>
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
                           <Card.Text> Today Profit</Card.Text>

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
                                 View details
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
                           <Card.Text> Last Week Profit</Card.Text>

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
                                 View details
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
                           <Card.Text> Last Month Profit</Card.Text>

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
                                 View details
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
                           <Card.Text> Total Profit</Card.Text>

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
                                 View details
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
                           <Card.Text> Number of Remaining Products</Card.Text>

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
                                 View details
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
                           <Card.Text> Number of Products Sold</Card.Text>

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
                                 View details
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
                           <Card.Text> Number of Total Product</Card.Text>

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
                                 View details
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
                           <Card.Text> Number of total Orders</Card.Text>
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
                                 View details
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
                           <Card.Text> Number of Canceled Orders</Card.Text>
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
                                 View details
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
                           <Card.Text> Number of Success Orders</Card.Text>
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
                                 View details
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
                           <Card.Text> Number of Processing Orders</Card.Text>
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
                                 View details
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
                           <Card.Text> Number of Products Category</Card.Text>

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
                                 View details
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
                           <Card.Text> Number of Users</Card.Text>
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
                                 View details
                              </Link>
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>




               </Row>




               <div className="my-3">
                  <h2>Average Profit</h2>
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
                  <h2>Categories</h2>
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
                  <h2>Hot Selling</h2>
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
