import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { isAuth, isAdmin, isStaff } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
   '/',
   isAuth,
   isAdmin,
   expressAsyncHandler(async (req, res) => {
      const orders = await Order.find().populate('user', 'name');
      res.send(orders);
   })
);


orderRouter.get(
   '/staff',
   isAuth,
   isStaff,
   expressAsyncHandler(async (req, res) => {
      const orders = await Order.find().populate('user', 'name');
      res.send(orders);
   })
);


orderRouter.post(
   '/',
   isAuth,
   expressAsyncHandler(async (req, res) => {
      const newOrder = new Order({
         orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
         shippingAddress: req.body.shippingAddress,
         paymentMethod: req.body.paymentMethod,
         itemsPrice: req.body.itemsPrice,
         shippingPrice: req.body.shippingPrice,
         taxPrice: req.body.taxPrice,
         totalPrice: req.body.totalPrice,
         user: req.user._id,
      });

      const order = await newOrder.save();
      res.status(201).send({ message: 'New Order Created', order });
   })
);

orderRouter.get(
   '/summary',
   isAuth,
   isAdmin,
   expressAsyncHandler(async (req, res) => {

      const numOfTotalOrders = await Order.aggregate([
         {
            $group: {
               _id: null,
               numOfTotalOrders: { $sum: 1 },
            },
         },
      ]);


      const orders = await Order.aggregate([
         { $match: { 'isDelivered': true } },
         {
            $group: {
               _id: null,
               numOrders: { $sum: 1 },
               totalSales: { $sum: '$totalPrice' },
            },
         },
      ]);


      const canceledOrders = await Order.aggregate([

         { $match: { 'canceled': true } },
         {
            $group: {
               _id: null,
               canceledOrders: { $sum: 1 },
            }
         },

      ]);

      const successOrders = await Order.aggregate([

         { $match: { 'isDelivered': true } },
         {
            $group: {
               _id: null,
               successOrders: { $sum: 1 },
            }
         },

      ]);

      const processingOrders = await Order.aggregate([

         { $match: { 'isDelivered': false, 'canceled': false } },
         {
            $group: {
               _id: null,
               processingOrders: { $sum: 1 },
            }
         },

      ]);


      const users = await User.aggregate([
         {
            $group: {
               _id: null,
               numUsers: { $sum: 1 },
            },
         },
      ]);

      const dailyOrders = await Order.aggregate([
         { $match: { 'isDelivered': true } },
         {
            $group: {
               _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
               orders: { $sum: 1 },
               sales: { $sum: '$totalPrice' },
            },
         },
         { $sort: { _id: -1 } },
      ]);


      // last week profit
      const lastWeekProfit = await Order.aggregate([
         { $match: { 'isDelivered': true } },
         {
            $group: {
               _id: {
                  // year: { $year: "$createdAt" },
                  // month: { $month: "$createdAt" },
                  // day: { $dayOfMonth: "$createdAt" },
                  week: { $week: "$createdAt" },
               },
               profit: { $sum: '$totalPrice' }
            }
         },
         { $sort: { _id: -1 } },
      ]);

      // last month profit
      const lastMonthProfit = await Order.aggregate([
         { $match: { 'isDelivered': true } },

         {
            $group: {
               _id: {
                  // year: { $year: "$createdAt" },
                  month: { $month: "$createdAt" },
                  // day: { $dayOfMonth: "$createdAt" },
                  // week: { $week: "$createdAt" },
               },
               profit: { $sum: '$totalPrice' }
            }
         },
         { $sort: { _id: -1 } },
      ]);


      const productCategories = await Product.aggregate([
         {
            $group: {
               _id: '$category',
               count: { $sum: 1 },
            },
         },
      ]);

      const numOfProducts = await Product.aggregate([
         {
            $group: {
               _id: null,
               numOfProducts: { $sum: 1 },
            },
         }
      ])

      const numOfRemainingProducts = await Product.aggregate([
         {
            $group: {
               _id: null,
               numOfRemainingProducts: { $sum: '$countInStock' }
            }
         }
      ])

      const numOfSoldProducts = await Order.aggregate([
         { $match: { 'isDelivered': true } },
         { $unwind: '$orderItems' },
         {
            $group: {
               _id: null,
               numOfSoldProducts: { $sum: '$orderItems.quantity' }
            }
         }
      ])


      const productQuantitySolds = await Order.aggregate([
         { $match: { 'isDelivered': true } },
         { $unwind: '$orderItems' },
         {
            $group: {
               _id: '$orderItems.name',
               quantity: { $sum: '$orderItems.quantity' },
            }
         },
         { $sort: { quantity: -1 } },
      ])


      res.send({
         users,
         numOfTotalOrders,
         orders,
         canceledOrders,
         successOrders,
         processingOrders,
         dailyOrders,
         lastWeekProfit,
         lastMonthProfit,
         productCategories,
         numOfProducts,
         numOfRemainingProducts,
         numOfSoldProducts,
         productQuantitySolds

      });
   })
);

orderRouter.get(
   '/mine',
   isAuth,
   expressAsyncHandler(async (req, res) => {
      const orders = await Order.find({ user: req.user._id });
      res.send(orders);
   })
);

orderRouter.get(
   '/:id',
   isAuth,
   expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
         res.send(order);
      } else {
         res.status(404).send({ message: 'Order Not Found' });
      }
   })
);

orderRouter.put(
   '/:id/deliver',
   isAuth,
   expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
         order.isDelivered = true;
         order.deliveredAt = Date.now();
         await order.save();
         res.send({ message: 'Order Delivered' });
      } else {
         res.status(404).send({ message: 'Order Not Found' });
      }
   })
);

orderRouter.put(
   '/:id/cancel',
   isAuth,
   expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
         order.canceled = true;
         // order.deliveredAt = Date.now();
         const cancelOrder = await order.save();
         res.send({ message: 'Order Canceled', order });
      } else {
         res.status(404).send({ message: 'Order Not Found', });
      }
   })
);

orderRouter.put(
   '/:id/shipping',
   isAuth,
   expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
         order.isShipping = true;
         const shippingOrder = await order.save();
         res.send({ message: 'Order is Shipping', order });
      } else {
         res.status(404).send({ message: 'Order Not Found', });
      }
   })
);

orderRouter.put(
   '/:id/pay',
   isAuth,
   expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
         order.isPaid = true;
         order.paidAt = Date.now();
         order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
         };

         const updatedOrder = await order.save();
         res.send({ message: 'Order Paid', order: updatedOrder });
      } else {
         res.status(404).send({ message: 'Order Not Found' });
      }
   })
);

orderRouter.delete(
   '/:id',
   isAuth,
   isAdmin,
   expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
         await order.remove();
         res.send({ message: 'Order Deleted' });
      } else {
         res.status(404).send({ message: 'Order Not Found' });
      }
   })
);

export default orderRouter;
