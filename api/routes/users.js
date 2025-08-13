import express from 'express';
import { createUser, updateUser, deleteUser, getUser, getAllUsers } from '../controllers/user.js';
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.get("/checkauthentication", verifyToken,(req,res,next) =>{
    res.send("Hello, you are logged in!")
})

router.get("/checkuser/:id", verifyUser,(req,res,next) =>{
    res.send("Hello user, you are logged in and you can delete your account!")
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("Hello admin, you are logged in and you can delete all accounts!") 
})

// CREATE new user
router.post("/", createUser); 
//UPDATE
router.put("/:id", verifyUser, updateUser);


//DELETE
router.delete("/:id",verifyUser, deleteUser);

//GET
router.get("/:id",verifyUser, getUser);

//GET ALL
router.get("/",verifyAdmin, getAllUsers);



export default router;