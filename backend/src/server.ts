// import express from 'express';
// import cors from 'cors';
// import path from 'path';
// import { dirname, join } from 'path';
// import categoryRoutes from './routers/category.routes';
// import productRoutes from './routers/product.routes';
// import loginRoutes from './routers/login.routes';
// import cartRoutes from './routers/cart.router';
// import checkoutRoutes from './routers/checkout.routes'
// import adminProducts from './routers/adminProducts';
// import adminCategories from './routers/adminCategories';
// // import path from 'path';

// const app = express();
// app.use(cors({ origin: 'http://localhost:4200' }));

// app.use(express.json());

// const imagesPath = join(__dirname, '../assets/images');
// app.use('/assets/images', express.static(imagesPath));


// app.use('/api/categories', categoryRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/auth',loginRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/checkout", checkoutRoutes);
// app.use('/api/admin/products', adminProducts);
// app.use('/api/admin/categories', adminCategories);
// //app.use("api/auth", loginRoutes)

// app.use('/assets/images', express.static(path.join(__dirname, '..', 'assets')));

// app.listen(59324, () => {
//   console.log('https://ecom-backend-production-5341.up.railway.app');
//   console.log(' Image path served from:', imagesPath);
// });
// // app.listen(3000, () => {
// //   console.log(' Server running at http://localhost:3000');
// //   console.log(' Image path served from:', imagesPath);
// // });

import express from 'express';
import cors from 'cors';
import path from 'path';
import categoryRoutes from './routers/category.routes';
import productRoutes from './routers/product.routes';
import loginRoutes from './routers/login.routes';
import cartRoutes from './routers/cart.router';
import checkoutRoutes from './routers/checkout.routes';
import adminProducts from './routers/adminProducts';
import adminCategories from './routers/adminCategories';

const app = express();
app.use(cors());
app.use(express.json());

const imagesPath = path.join(__dirname, '../assets/images');
app.use('/assets/images', express.static(imagesPath));

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

app.use('/api/admin/products', adminProducts);
app.use('/api/admin/categories', adminCategories);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("SERVER RUNNING on Railway"));
