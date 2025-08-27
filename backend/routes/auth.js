const express = require('express');
const User = require('../model/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');


// | Term        | What it means                            |
// | ----------- | ---------------------------------------- |
// | `Promise`   | A value that will be available **later** |
// | `resolve()` | Mark the promise as successful ✅         |
// | `reject()`  | Mark the promise as failed ❌             |
// | `.then()`   | Run when resolved                        |
// | `.catch()`  | Run when rejected                        |
// | `await`     | Pause until the promise resolves    “⏸ Pause this function here, until the Promise returned by side function written is resolved or rejected.”
//   |

// ROUTE 01: to store data...
http://localhost:3000/api/auth/storeData
router.post('/storeData',
   [
      body('name').isLength({ min: 3 }),
      body('email').isEmail(),
      body('password').isLength({ min: 6 }),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      try {
         const existingUser = await User.findOne({ email: req.body.email });
         if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
         }

         const salt = await bcrypt.genSalt(10);
         const secPass = await bcrypt.hash(req.body.password, salt);

         const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: secPass
         });

         await user.save();  // ✅ Save user first

         const data = {
            user: {
               id: user.id
            }
         };

         const JWT_SECRET = 'mySuperSecretKey';
         const authToken = jwt.sign(data, JWT_SECRET);

         res.status(201).json({
            message: "User created successfully",
            authToken,
            user: {
               id: user.id,
               name: user.name,
               email: user.email
            }
         });

      } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Server Error", details: error.message });
      }
   }
);

//ROUTE 02: to check is password of user is entered is correct...
//http://localhost:3000/api/auth/checkData
router.post('/checkData',
   [
      body('email').isEmail(),
      body('password').isLength({ min: 6 }).exists(),
   ],
   async (req, res) => {
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      try {
         let user = await User.findOne({ email });
         if (!user) {
            success = false;
            return res.status(400).json({ Error: "Please Enter Correct Data" });

         }
         const comparePassword = await bcrypt.compare(password, user.password);
         if (!comparePassword) {
            success = false;
            return res.status(400).json({success, Error: "Please Enter Correct Data" });
         }
         const data = {
            user: {
               id: user.id
            }
         }
         const JWT_SECRET = 'mySuperSecretKey';
         const authToken = jwt.sign(data, JWT_SECRET);
         success = true;
         res.json({ success, authToken })
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Server Error", details: error.message });
      }
   }
);

//ROUTE 03: get user Detail... take the authtoken from the storeData and put on the headers 
//http://localhost:3000/api/auth/getData
router.post('/getData', fetchUser, [
   body('email').isEmail(),
   body('password').isLength({ min: 6 }).exists()
], async (req, res) => {
   try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error", details: error.message });
   }
});
    module.exports = router;
