import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';

const reducer = (state, action) => {
   switch (action.type) {
      case 'FETCH_REQUEST':
         return { ...state, loading: true };
      case 'FETCH_SUCCESS':
         return { ...state, loading: false };
      case 'FETCH_FAIL':
         return { ...state, loading: false, error: action.payload };
      case 'UPDATE_REQUEST':
         return { ...state, loadingUpdate: true };
      case 'UPDATE_SUCCESS':
         return { ...state, loadingUpdate: false };
      case 'UPDATE_FAIL':
         return { ...state, loadingUpdate: false };
      case 'UPLOAD_REQUEST':
         return { ...state, loadingUpload: true, errorUpload: '' };
      case 'UPLOAD_SUCCESS':
         return {
            ...state,
            loadingUpload: false,
            errorUpload: '',
         };
      case 'UPLOAD_FAIL':
         return { ...state, loadingUpload: false, errorUpload: action.payload };

      default:
         return state;
   }
};
export default function ProductEditScreen() {
   const navigate = useNavigate();
   const params = useParams(); // /product/:id
   const { id: productId } = params;

   const { state } = useContext(Store);
   const { userInfo, isEnglish } = state;
   const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
      useReducer(reducer, {
         loading: true,
         error: '',
      });

   const [name, setName] = useState('');
   const [slug, setSlug] = useState('');
   const [price, setPrice] = useState('');
   const [image, setImage] = useState('');
   const [category, setCategory] = useState('');
   const [categoryVn, setCategoryVn] = useState('');
   const [countInStock, setCountInStock] = useState('');
   const [brand, setBrand] = useState('');
   const [description, setDescription] = useState('');

   useEffect(() => {
      const fetchData = async () => {
         try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/products/${productId}`);
            setName(data.name);
            setSlug(data.slug);
            setPrice(data.price);
            setImage(data.image);
            setCategory(data.category);
            setCategoryVn(data.categoryVn);
            setCountInStock(data.countInStock);
            setBrand(data.brand);
            setDescription(data.description);
            dispatch({ type: 'FETCH_SUCCESS' });
         } catch (err) {
            dispatch({
               type: 'FETCH_FAIL',
               payload: getError(err),
            });
         }
      };
      fetchData();
   }, [productId]);

   const submitHandler = async (e) => {
      e.preventDefault();
      try {
         dispatch({ type: 'UPDATE_REQUEST' });
         await axios.put(
            `/api/products/${productId}`,
            {
               _id: productId,
               name,
               slug,
               price,
               image,
               category,
               categoryVn,
               brand,
               countInStock,
               description,
            },
            {
               headers: { Authorization: `Bearer ${userInfo.token}` },
            }
         );
         dispatch({
            type: 'UPDATE_SUCCESS',
         });
         toast.success('Product updated successfully');
         navigate('/admin/products');
      } catch (err) {
         toast.error(getError(err));
         dispatch({ type: 'UPDATE_FAIL' });
      }
   };
   const uploadFileHandler = async (e) => {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append('file', file);
      try {
         dispatch({ type: 'UPLOAD_REQUEST' });
         const { data } = await axios.post('/api/upload', bodyFormData, {
            headers: {
               'Content-Type': 'multipart/form-data',
               authorization: `Bearer ${userInfo.token}`,
            },
         });
         dispatch({ type: 'UPLOAD_SUCCESS' });

         toast.success('Image uploaded successfully');
         setImage(data.secure_url);
      } catch (err) {
         toast.error(getError(err));
         dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      }
   };
   return (
      <Container className="small-container">
         <Helmet>
            <title>
               {isEnglish ? 'Edit Product $' : 'Sửa thông tin sản phẩm '}

               {productId}</title>
         </Helmet>
         <h1>{isEnglish ? 'Edit Product $' : 'Sửa thông tin sản phẩm'}&nbsp;
            {productId}</h1>

         {loading ? (
            <LoadingBox></LoadingBox>
         ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
         ) : (
            <Form onSubmit={submitHandler}>
               <Form.Group className="mb-3" controlId="name">
                  <Form.Label>
                     {isEnglish ? 'Name' : 'Tên'}
                  </Form.Label>
                  <Form.Control
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     required
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="slug">
                  <Form.Label>
                     {isEnglish ? 'Slug' : 'Tên đường dẫn'}
                  </Form.Label>
                  <Form.Control
                     value={slug}
                     onChange={(e) => setSlug(e.target.value)}
                     required
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="name">
                  <Form.Label>
                     {isEnglish ? 'Price' : 'Giá'}
                  </Form.Label>
                  <Form.Control
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     required
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="image">
                  <Form.Label>
                     {isEnglish ? 'Image File' : 'Đường dẫn đến file hỉnh ảnh'}
                  </Form.Label>
                  <Form.Control
                     value={image}
                     onChange={(e) => setImage(e.target.value)}
                     required
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="imageFile">
                  <Form.Label>
                     {isEnglish ? 'Upload File' : 'Upload hình ảnh'}
                  </Form.Label>
                  <Form.Control type="file" onChange={uploadFileHandler} />
                  {loadingUpload && <LoadingBox></LoadingBox>}
               </Form.Group>

               {/* category */}
               <Form.Group className="mb-3" controlId="category">
                  <Form.Label>
                     {isEnglish ? 'Category' : 'Mặt hàng'}
                  </Form.Label>
                  <Form.Control
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                     required
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="categoryVn">
                  <Form.Label>
                     {isEnglish ? 'Category in Vietnamese' : 'Mặt hàng theo tiếng Việt'}
                  </Form.Label>
                  <Form.Control
                     value={categoryVn}
                     onChange={(e) => setCategoryVn(e.target.value)}
                     required
                  />
               </Form.Group>


               <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>
                     {isEnglish ? 'Brand' : 'Nhãn hiệu'}
                  </Form.Label>
                  <Form.Control
                     value={brand}
                     onChange={(e) => setBrand(e.target.value)}
                     required
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="countInStock">
                  <Form.Label>
                     {isEnglish ? 'Count In Stock' : 'Số lượng'}
                  </Form.Label>
                  <Form.Control
                     value={countInStock}
                     onChange={(e) => setCountInStock(e.target.value)}
                     required
                  />
               </Form.Group>
               <Form.Group className="mb-3" controlId="description">
                  <Form.Label>
                     {isEnglish ? 'Description' : 'Mô tả'}
                  </Form.Label>
                  <Form.Control
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     required
                  />
               </Form.Group>
               <div className="mb-3">
                  <Button disabled={loadingUpdate} type="submit">
                     {isEnglish ? 'Update' : 'Cập nhật'}

                  </Button>
                  {loadingUpdate && <LoadingBox></LoadingBox>}
               </div>
            </Form>
         )}
      </Container>
   );
}
