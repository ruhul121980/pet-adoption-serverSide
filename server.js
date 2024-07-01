import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser'; 

// import connectDB from './utils/db.js';
dotenv.config()
import loginRouter from './api/login.js';
import registerRouter from './api/register.js';
import uploadImgRouter from './api/upload-image.js';
import createAdoptionRouter from './api/create-adoption.js';
import allAdoptionsRouter from './api/all-adoptions.js';
import allVetPostsRouter from './api/all-vet-posts.js';
import createVetPost from './api/create-vet-post.js';
// import allVeterinarianRouter from './api/all-veterinarian';
// import veterinarianRouter from './api/veterinarian';


const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json({ limit: '50mb' }));

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

 
app.use('/api', loginRouter);
app.use('/api', allAdoptionsRouter);
app.use('/api', registerRouter);
app.use('/api', createAdoptionRouter);
app.use('/api', uploadImgRouter);
app.use('/api', createVetPost);
app.use('/api', allVetPostsRouter);
// app.use('/api', allVeterinarianRouter);
// app.use('/api', veterinarianRouter);

const port = process.env.PORT || 4000; 
app.listen(port, () => console.log(`Server listening on port ${port}`));
