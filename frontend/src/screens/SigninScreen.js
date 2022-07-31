import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SigninScreen() {
   const navigate = useNavigate();
   const { search } = useLocation();
   const redirectInUrl = new URLSearchParams(search).get('redirect');
   const redirect = redirectInUrl ? redirectInUrl : '/';

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const { state, dispatch: ctxDispatch } = useContext(Store);
   const { userInfo, isEnglish } = state;
   const submitHandler = async (e) => {
      e.preventDefault();
      try {
         const { data } = await Axios.post('/api/users/signin', {
            email,
            password,
         });
         ctxDispatch({ type: 'USER_SIGNIN', payload: data });
         localStorage.setItem('userInfo', JSON.stringify(data));
         navigate(redirect || '/');
      } catch (err) {
         toast.error(getError(err));
      }
   };

   useEffect(() => {
      if (userInfo) {
         navigate(redirect);
      }
   }, [navigate, redirect, userInfo]);

   return (
      <Container className="small-container">
         <Helmet>
            <title>{isEnglish ? 'Sign In' : 'Đăng Nhập'}</title>
         </Helmet>
         <h1 className="my-3">{isEnglish ? 'Sign In' : 'Đăng Nhập'}</h1>
         <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
               <Form.Label>Email</Form.Label>
               <Form.Control
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
               />
            </Form.Group>
            <div className="mb-3">
               <Button type="submit">{isEnglish ? 'Sign In' : 'Đăng Nhập'}</Button>
            </div>
            <div className="mb-3">
               {isEnglish ? 'New customer?' : 'Chưa có tài khoản'}
               {' '}
               <Link to={`/signup?redirect=${redirect}`}>
                  {isEnglish ? 'Create your account' : 'Tạo tài khoản mới'}
               </Link>
            </div>
         </Form>
      </Container>
   );
}
