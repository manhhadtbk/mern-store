import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
// import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SlideShow from '../components/SlideShow'
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
// import data from '../data';

const reducer = (state, action) => {
   switch (action.type) {
      case 'FETCH_REQUEST':
         return { ...state, loading: true };
      case 'FETCH_SUCCESS':
         return {
            ...state,
            productQuantitySolds: action.payload.productQuantitySolds,
            products: action.payload.products,
            page: action.payload.page,
            pages: action.payload.pages,
            countProducts: action.payload.countProducts,
            loading: false
         };
      case 'FETCH_FAIL':
         return { ...state, loading: false, error: action.payload };
      default:
         return state;
   }
};

function HomeScreen() {
   const [{ loading, error, products, productQuantitySolds, pages, countProducts }, dispatch] = useReducer(/* logger( */reducer/* ) */, {
      loading: true,
      error: '',
   });

   useEffect(() => {
      const fetchData = async () => {
         try {
            const { data } = await axios.get(
               // `/api/products/search/home?category=all&query=all&price=all&rating=all&order=toprated&page=1`
               `/api/products/search/home?&order=toprated&page=1`
            );

            // console.log(data);
            // console.log(data.products);
            // console.log(data.productQuantitySolds);

            dispatch({ type: 'FETCH_SUCCESS', payload: data });


         } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: err.message });
         }
      };
      fetchData();
   }, []);

   const getFilterUrl = (filter) => {
      const filterPage = filter.page || 1;

      // return `/search?category=all&query=all&price=all&rating=all&order=toprated&page=${filterPage}`;
      return `/search?order=toprated&page=${filterPage}`;
   };

   return (
      <div >
         <Helmet>
            <title>Online Store</title>
         </Helmet>
         <div>
            <h1
               className='mb-5'
            >Hot Products</h1>
            <SlideShow />
         </div>


         <h1
            className='mt-5 mb-5'
         >Featured Products</h1>
         <div className="products">
            {loading ? (
               <LoadingBox />
            ) : error ? (
               <MessageBox variant="danger">{error}</MessageBox>
            ) : (
               <>
                  <Row className="d-flex align-items-end">
                     {products.map((product) => (
                        <Col sm={6} lg={4} className="mb-3" key={product._id}>
                           <Product
                              product={product}
                              productQuantitySolds={productQuantitySolds}
                           ></Product>
                        </Col>
                     ))}
                  </Row>

                  <div>
                     {[...Array(pages).keys()].map((x) => (
                        <LinkContainer
                           key={x + 1}
                           className="mx-1"
                           to={getFilterUrl({ page: x + 1 })}
                        // to={'/search'}
                        >
                           <Button
                              className={Number(1) === x + 1 ? 'text-bold' : ''}
                              variant="light"
                           >
                              {x + 1}
                           </Button>
                        </LinkContainer>
                     ))}
                  </div>
               </>
            )}
         </div>
      </div>
   );
}
export default HomeScreen;
