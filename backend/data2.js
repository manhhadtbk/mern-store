import bcrypt from 'bcryptjs';

const data = {

   users: [
      {
         name: 'Henry',
         email: 'admin@example.com',
         password: bcrypt.hashSync('1'),
         isAdmin: true,
      },
      {
         name: 'Peter',
         email: 'staff@example.com',
         password: bcrypt.hashSync('1'),
         isAdmin: false,
         isStaff: true,
      },
      {
         name: 'John',
         email: 'user@example.com',
         password: bcrypt.hashSync('1'),
         isAdmin: false,
      },
   ],

   products: [

      // headphone
      {
         name: 'Asus Headphone',
         slug: 'asus-headphone',
         category: 'headphone',
         categoryVn: 'tai nghe',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337781/mern-image/headphone/asus-headphone_z3uw27.jpg', // 679px × 829px
         price: 300,
         countInStock: 10,
         brand: 'Asus',
         rating: 1.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Microsoft Headphone',
         slug: 'microsoft-headphone',
         category: 'headphone',
         categoryVn: 'tai nghe',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337781/mern-image/headphone/nokia-headphone_qvmwfb.jpg', // 679px × 829px
         price: 250,
         countInStock: 10,
         brand: 'Microsoft',
         rating: 1.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Lenovo Headphone',
         slug: 'lenovo-headphone',
         category: 'headphone',
         categoryVn: 'tai nghe',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337781/mern-image/headphone/lenovo-headphone_b7gchh.jpg', // 679px × 829px
         price: 100,
         countInStock: 10,
         brand: 'Lenovo',
         rating: 2.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Nokia Headphone',
         slug: 'nokia-headphone',
         category: 'headphone',
         categoryVn: 'tai nghe',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337781/mern-image/headphone/nokia-headphone_qvmwfb.jpg', // 679px × 829px
         price: 180,
         countInStock: 15,
         brand: 'Nokia',
         rating: 2.5,
         numReviews: 10,
         description: 'high quality ',
      },

      // keyboard
      {
         name: 'Lenovo Keyboard',
         slug: 'lenovo-keyboard',
         category: 'keyboard',
         categoryVn: 'bàn phím',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/keyboard/lenovo_nif8ah.jpg', // 679px × 829px
         price: 300,
         countInStock: 10,
         brand: 'Lenovo',
         rating: 3.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Asus Keyboard',
         slug: 'asus-keyboard',
         category: 'keyboard',
         categoryVn: 'bàn phím',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/keyboard/asus-keyboard_rujb3q.jpg', // 679px × 829px
         price: 50,
         countInStock: 20,
         brand: 'Asus',
         rating: 3.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Xiaomi Keyboard',
         slug: 'xiaomi-keyboard',
         category: 'keyboard',
         categoryVn: 'bàn phím',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/keyboard/xiaomi-keyboard_sai5tb.jpg', // 679px × 829px
         price: 200,
         countInStock: 10,
         brand: 'Lenovo',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality keyboard',
      },
      {
         name: 'Dell Keyboard',
         slug: 'dell-keyboard2',
         category: 'keyboard',
         categoryVn: 'bàn phím',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/keyboard/dell-keyboard_nu6fxl.jpg', // 679px × 829px
         price: 20,
         countInStock: 10,
         brand: 'Dell',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality keyboard',
      },

      // laptop
      {
         name: 'Acer Laptop',
         slug: 'acer-laptop',
         category: 'laptop',
         categoryVn: 'laptop',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/laptop/acer-laptop_lxiwxf.jpg', // 679px × 829px
         price: 150,
         countInStock: 10,
         brand: 'Acer',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality laptop',
      },
      {
         name: 'Xiaomi Laptop',
         slug: 'xiaomi-laptop',
         category: 'laptop',
         categoryVn: 'laptop',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/laptop/acer-laptop_lxiwxf.jpg', // 679px × 829px
         price: 75,
         countInStock: 10,
         brand: 'Xiaomi',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality laptop',
      },
      {
         name: 'Apple Laptop',
         slug: 'apple-laptop',
         category: 'laptop',
         categoryVn: 'laptop',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/laptop/apple-laptop_wvye6e.jpg', // 679px × 829px
         price: 240,
         countInStock: 10,
         brand: 'Apple',
         rating: 3.5,
         numReviews: 10,
         description: 'high quality laptop',
      },
      {
         name: 'Lenovo Laptop',
         slug: 'lenovo-laptop',
         category: 'laptop',
         categoryVn: 'laptop',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/laptop/lenovo-laptop_wsxjkd.jpg', // 679px × 829px
         price: 999,
         countInStock: 0,
         brand: 'Lenovo',
         rating: 3.5,
         numReviews: 10,
         description: 'high quality laptop',
      },

      // monitor
      {
         name: 'Apple Monitor',
         slug: 'apple-monitor',
         category: 'monitor',
         categoryVn: 'màn hình',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/monitor/apple-monitor_w3butw.jpg', // 679px × 829px
         price: 100,
         countInStock: 10,
         brand: 'Apple',
         rating: 2.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Samsung Monitor',
         slug: 'samsung-monitor',
         category: 'monitor',
         categoryVn: 'màn hình',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337783/mern-image/monitor/samsung-monitor_lstwpa.jpg', // 679px × 829px
         price: 150,
         countInStock: 10,
         brand: 'Samsung',
         rating: 2.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Asus Monitor',
         slug: 'asus-monitor',
         category: 'monitor',
         categoryVn: 'màn hình',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/monitor/asus-monitor_tmtcg2.jpg', // 679px × 829px
         price: 88,
         countInStock: 10,
         brand: 'Asus',
         rating: 1.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Microsoft Monitor',
         slug: 'microsoft-monitor',
         category: 'monitor',
         categoryVn: 'màn hình',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337783/mern-image/monitor/microsoft-monitor_xjvsrk.jpg', // 679px × 829px
         price: 30,
         countInStock: 10,
         brand: 'Microsoft',
         rating: 1.5,
         numReviews: 10,
         description: 'high quality ',
      },

      // phone
      {
         name: 'Apple Phone',
         slug: 'apple-phone',
         category: 'phone',
         categoryVn: 'màn hình',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337783/mern-image/phone/apple-phone_mb3o1s.jpg', // 679px × 829px
         price: 1000,
         countInStock: 10,
         brand: 'Apple',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality phone',
      },
      {
         name: 'Xiaomi Phone',
         slug: 'xiaomi-phone',
         category: 'phone',
         categoryVn: 'Điện thoại',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337783/mern-image/phone/xiaomi-phone_dgy9fx.jpg', // 679px × 829px
         price: 150,
         countInStock: 10,
         brand: 'Xiaomi',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality phone',
      },
      {
         name: 'Asus Phone',
         slug: 'asus-phone',
         category: 'phone',
         categoryVn: 'Điện thoại',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337783/mern-image/phone/asus-phone_iyxheh.jpg', // 679px × 829px
         price: 330,
         countInStock: 10,
         brand: 'Asus',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality phone',
      },
      {
         name: 'Oppo Phone',
         slug: 'oppo-phone',
         category: 'phone',
         categoryVn: 'Điện thoại',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337783/mern-image/phone/oppo-phone_qkobje.jpg', // 679px × 829px
         price: 40,
         countInStock: 10,
         brand: 'Oppo',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality phone',
      },

   ],
};
export default data;
