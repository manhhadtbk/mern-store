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
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337781/mern-image/headphone/asus-headphone_z3uw27.jpg', // 679px × 829px
         price: 4,
         countInStock: 10,
         brand: 'Asus',
         rating: 1.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Asus Headphone2',
         slug: 'asus-headphone2',
         category: 'headphone',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337781/mern-image/headphone/asus-headphone_z3uw27.jpg', // 679px × 829px
         price: 4,
         countInStock: 10,
         brand: 'Asus',
         rating: 1.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Lenovo Headphone',
         slug: 'lenovo-headphone',
         category: 'headphone',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337781/mern-image/headphone/lenovo-headphone_b7gchh.jpg', // 679px × 829px
         price: 1,
         countInStock: 10,
         brand: 'Lenovo',
         rating: 2.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Lenovo Headphone2',
         slug: 'lenovo-headphone2',
         category: 'headphone',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337781/mern-image/headphone/lenovo-headphone_b7gchh.jpg', // 679px × 829px
         price: 1,
         countInStock: 10,
         brand: 'Lenovo',
         rating: 2.5,
         numReviews: 10,
         description: 'high quality ',
      },

      // keyboard
      {
         name: 'Lenovo Keyboard',
         slug: 'lenovo-keyboard',
         category: 'keyboard',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/keyboard/lenovo_nif8ah.jpg', // 679px × 829px
         price: 3,
         countInStock: 10,
         brand: 'Lenovo',
         rating: 3.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Lenovo Keyboard2',
         slug: 'lenovo-keyboard2',
         category: 'keyboard',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/keyboard/lenovo_nif8ah.jpg', // 679px × 829px
         price: 3,
         countInStock: 10,
         brand: 'Lenovo',
         rating: 3.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Xiaomi Keyboard',
         slug: 'xiaomi-keyboard',
         category: 'keyboard',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/keyboard/xiaomi-keyboard_sai5tb.jpg', // 679px × 829px
         price: 2,
         countInStock: 10,
         brand: 'Lenovo',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality keyboard',
      },
      {
         name: 'Xiaomi Keyboard2',
         slug: 'xiaomi-keyboard2',
         category: 'keyboard',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/keyboard/xiaomi-keyboard_sai5tb.jpg', // 679px × 829px
         price: 2,
         countInStock: 10,
         brand: 'Lenovo',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality keyboard',
      },

      // laptop
      {
         name: 'Acer Laptop',
         slug: 'acer-laptop',
         category: 'laptop',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/laptop/acer-laptop_lxiwxf.jpg', // 679px × 829px
         price: 3,
         countInStock: 0,
         brand: 'Acer',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality laptop',
      },
      {
         name: 'Acer Laptop2',
         slug: 'acer-laptop2',
         category: 'laptop',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/laptop/acer-laptop_lxiwxf.jpg', // 679px × 829px
         price: 3,
         countInStock: 10,
         brand: 'Acer',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality laptop',
      },
      {
         name: 'Apple Laptop',
         slug: 'apple-laptop',
         category: 'laptop',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/laptop/apple-laptop_wvye6e.jpg', // 679px × 829px
         price: 4,
         countInStock: 10,
         brand: 'Apple',
         rating: 3.5,
         numReviews: 10,
         description: 'high quality laptop',
      },
      {
         name: 'Apple Laptop2',
         slug: 'apple-laptop2',
         category: 'laptop',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/laptop/apple-laptop_wvye6e.jpg', // 679px × 829px
         price: 4,
         countInStock: 10,
         brand: 'Apple',
         rating: 3.5,
         numReviews: 10,
         description: 'high quality laptop',
      },

      // monitor
      {
         name: 'Apple Monitor',
         slug: 'apple-monitor',
         category: 'monitor',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/monitor/apple-monitor_w3butw.jpg', // 679px × 829px
         price: 3,
         countInStock: 10,
         brand: 'Apple',
         rating: 2.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Apple Monitor2',
         slug: 'apple-monitor2',
         category: 'monitor',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/monitor/apple-monitor_w3butw.jpg', // 679px × 829px
         price: 3,
         countInStock: 10,
         brand: 'Apple',
         rating: 2.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Asus Monitor',
         slug: 'asus-monitor',
         category: 'monitor',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/monitor/asus-monitor_tmtcg2.jpg', // 679px × 829px
         price: 3,
         countInStock: 10,
         brand: 'Asus',
         rating: 1.5,
         numReviews: 10,
         description: 'high quality ',
      },
      {
         name: 'Asus Monitor2',
         slug: 'asus-monitor2',
         category: 'monitor',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337782/mern-image/monitor/asus-monitor_tmtcg2.jpg', // 679px × 829px
         price: 3,
         countInStock: 10,
         brand: 'Asus',
         rating: 1.5,
         numReviews: 10,
         description: 'high quality ',
      },

      // phone
      {
         name: 'Apple Phone',
         slug: 'apple-phone',
         category: 'phone',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337783/mern-image/phone/apple-phone_mb3o1s.jpg', // 679px × 829px
         price: 1,
         countInStock: 10,
         brand: 'Apple',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality phone',
      },
      {
         name: 'Apple Phone2',
         slug: 'apple-phone2',
         category: 'phone',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337783/mern-image/phone/apple-phone_mb3o1s.jpg', // 679px × 829px
         price: 1,
         countInStock: 10,
         brand: 'Apple',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality phone',
      },
      {
         name: 'Asus Phone',
         slug: 'asus-phone',
         category: 'phone',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337783/mern-image/phone/asus-phone_iyxheh.jpg', // 679px × 829px
         price: 2,
         countInStock: 10,
         brand: 'Asus',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality phone',
      },
      {
         name: 'Asus Phone2',
         slug: 'asus-phone2',
         category: 'phone',
         image: 'https://res.cloudinary.com/mern-manhhadtbk/image/upload/v1657337783/mern-image/phone/asus-phone_iyxheh.jpg', // 679px × 829px
         price: 2,
         countInStock: 10,
         brand: 'Asus',
         rating: 4.5,
         numReviews: 10,
         description: 'high quality phone',
      },

   ],
};
export default data;
