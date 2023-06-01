// import express, { json } from 'express';
//
// const app = express();
//
// app.use(json())
//
// const PORT = process.env.PORT || 3000;
//
// app.get('/', async (req, res) => {
//     res.json({ status: true, message: "Our node.js app works" })
// });
//
// app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
//

import express from 'express';
import ProfileRoutes from './routes/profileRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/Profiles', ProfileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
export default app;
