import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import OrderListScreenForStaff from './screens/OrderListScreenForStaff';
import StaffRoute from './components/StaffRoute';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, isEnglish, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };


  // const [isEnglish, setIsEnglish] = useState(true);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categoriesVn`);

        if (isEnglish === true) {
          setCategories(data.categories);
        } else if (isEnglish === false) {
          setCategories(data.categoriesVn)
        }

      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [isEnglish]);


  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>

              {/* language button */}
              <Button
                variant="light"
                onClick={() => ctxDispatch({ type: 'CHANGE_LANGUAGE' })}
              >
                {isEnglish ? 'English' : 'Tiếng Việt'}
              </Button>

              &nbsp;

              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>

              <LinkContainer to="/">
                <Navbar.Brand>{isEnglish ? 'Online Store' : 'Cửa hàng Online'}</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link">
                    {isEnglish ? 'Cart' : 'Giỏ Hàng'}
                    {/* Cart */}
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>


                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>
                          {isEnglish ? 'User Profile' : 'Thông tin người dùng'}
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>
                          {isEnglish ? 'Order History' : 'Lịch sử mua hàng'}
                        </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >

                        {isEnglish ? 'Sign Out' : 'Đăng xuất'}

                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      {isEnglish ? 'Sign In' : 'Đăng Nhập'}
                    </Link>
                  )}


                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>
                          {isEnglish ? 'Dashboard' : 'Thống kê doanh số'}
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>
                          {isEnglish ? 'Products' : 'Quản lý sản phẩm'}
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>
                          {isEnglish ? 'Orders' : 'Quản lý đơn hàng'}
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>
                          {isEnglish ? 'Users' : 'Quản lý người dùng'}
                        </NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}


                  {userInfo && userInfo.isStaff && (
                    <NavDropdown
                      title={isEnglish ? '"Staff"' : 'Nhân viên'}
                      id="staff-nav-dropdown">
                      <LinkContainer to="/isstaff/orderslistcreenforstaff">
                        <NavDropdown.Item>
                          {isEnglish ? 'Orders' : 'Các đơn hàng'}
                        </NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}


                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>


          { /* add Nav of categories */}
          <div>
            <Nav
              style={{ background: '#333', display: 'flext', justifyContent: 'center' }}
            >
              {categories.map((category) => (
                <Nav.Item
                  key={category}
                >
                  <LinkContainer
                    to={`search?category=${category}`}
                    style={{ color: '#ccc', textTransform: 'uppercase' }}
                  >
                    <Nav.Link
                    >{category}</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </header>

        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }

          style={{
            background: '#333'
          }}
        >
          <Nav
            className="flex-column text-white w-100 p-2 mt-5"
          >
            <Nav.Item
              className='mb-3'
            >
              <strong>
                {isEnglish ? 'Categories' : 'Mặt hàng'}
              </strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  className="text-light"
                // onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route
                path="/isstaff/orderslistcreenforstaff"
                element={
                  <StaffRoute>
                    <OrderListScreenForStaff />
                  </StaffRoute>
                }
              ></Route>

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>

          {/* <div style={{
            background: '#ccc',
            with: '100%',
            height: '2vh',
          }}>
          </div> */}


          <Row className='text-center'
            style={{ height: '10vh' }}
          >
            <Col
              className='border-right-footer pt-3'
              md={4}
            >
              <h1
              // style={{ color: '#ccc' }}
              >{
                  isEnglish ? 'Online Store' : ' Cửa hàng Online'
                }</h1>
            </Col>

            <Col
              className='border-right-footer pt-3'
              md={4}
              style={{ textAlign: 'left' }}
            >
              <h3>
                {isEnglish ? 'Address' : 'Địa chỉ'}
              </h3>
              <h6>{isEnglish ? 'Mr John Smith. 132, My Street, Kingston, New York 12401.' : 'số 1 Đại Cồ Việt quận Hai Bà Trưng thành phố Hà Nội'}</h6>
            </Col>
            <Col
              className='border-right-footer pt-3'
              md={4}
              style={{ textAlign: 'left' }}
            >
              <h3>
                {isEnglish ? 'Contact' : 'Liên Hệ'}
              </h3>
              <i className="fab fa-facebook"></i> &nbsp;
              <i className="fas fa-envelope"></i> &nbsp;
              <i className="fab fa-twitter"></i> &nbsp;
              <i className="fas fa-mobile-alt"></i>
            </Col>
          </Row>


          {/* <div className="text-center"
            style={{ background: '#c4c4c4' }}
          >
            <h6>
              All rights reserved
            </h6>
          </div> */}


        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
