import { Router } from 'express';
import connectDB from '../utils/db.js';

const router = Router();

export default router.post('/create-adoption', async (req, res) => {
    console.log('req body is ',req.body)
  const {email, password,type,_id,posts } = req.body;

  // Connect to  database
  const db = await connectDB(); 
  try {
    // Validate type parameter (optional)
    if (!type || (type !== 'user' && type !== 'veterinarian')) {
      return res.status(400).json({ message: 'Invalid user type' });
    } 


    let collectionName ;
    if(type == 'user'){
        collectionName = 'users'
    }else{
        collectionName = 'veterinarians'
    }
    console.log("found collectionName ", collectionName)
 
    // Check for existing acc in same db
    let existingUser = await db.collection(collectionName).findOne({ email ,password, type,});
    console.log("Found existingUser ",existingUser)
    if (!existingUser) {
      return res.status(400).json({ status:400, message: 'No User Found' });
    } 
   
    if(existingUser){ 
    // Update the posts field for the existing user
    await db.collection(collectionName).updateOne(
        { _id: existingUser._id },
        { $set: { posts: posts } }
    );

    // Retrieve the updated user data
    let updatedUser = await db.collection(collectionName).findOne({ _id: existingUser._id });

    res.status(200).json({ status: 200, message: 'Update Post successful', data: updatedUser });
}

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
