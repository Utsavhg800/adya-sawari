const router = require('express').Router();
const User = require('../models/usersModel');
const Review = require('../models/reviewModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');
const ForgotPassword = require("../models/ForgotPassword");
const Mail = require("../config/mail");
const dotenv = require("dotenv");
dotenv.config();


// For registration
router.post("/register", async (req, res) => {
    try {
      if (!isNaN(+req.body.name)) {
        // Check if the name is a number
        return res.send({
          message: "Name should not be a number",
          success: false,
          data: null,
        });
      }
      const existingUser = await User.findOne({email: req.body.email});
      if (existingUser) {
          return res.send({
              message: "User already exists",
              success: false,
              data: null,
          });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
      const newUser = new User(req.body);
      await newUser.save();
      res.send({
          message: "User created successfully",
          success: true,
          data: null,
      });
    } catch (error) {
      res.send({
        message: error.message,
        success: false,
        data: null,
      });
    }
});
  

// Login User
router.post("/login", async (req, res) => {
    // Check whether the user exists or not
    try {
        const userExists = await User.findOne({email: req.body.email});
        if (!userExists) {
            return res.send({
                message: "User does not exist",
                success: false,
                data: null,
            });
        }

        if (userExists.isBlocked) {
            return res.send({
                message: "Your account has been blocked , please contact the admin!!",
                success: false,
                data: null,
            });
        }


        // Comparing the password with the bcrypt.
        const Matchpassword = await bcrypt.compare(
            req.body.password,
            userExists.password
        );
        if (!Matchpassword) {
            return res.send({
                message: "Incorrect password",
                success: false,
                data: null,
            });
        }
        const token = jwt.sign(
            {userId: userExists._id}, process.env.secretkey_JWT, {expiresIn: "1d"},
        );
        res.send({
            message: "User logged in successfully",
            success: true,
            data: token,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
            data: token
        });
    }
})

router.post("/password-reset", async (req, res) => {
    let email = req.body.email;
    let findUser = await User.findOne({email: email});
    let errorType = {
        email: '',
    }
    if (findUser) {
        let userId = findUser._id;
        let token = Math.random().toString(36).slice(2);
        await ForgotPassword.create({userId: userId, token: token});
        let link = `http://localhost:3000/reset-password/${token}`;
        let body = `<h1>Reset Password</h1>
                <p>Click on the link to reset your password</p>
                <a href="${link}">Reset Password</a>
                `;
        let mailObj = new Mail();
        mailObj.sendMail(process.env.EMAIL, email, "Password Reset", body);
        return res.status(200).json({success: "Email sent successfully"});
    } else {
        errorType.email = 'Email not found';
        return res.status(200).json({error: errorType});
    }
});

router.post("/password-reset-confirm", async (req, res) => {
    let token = req.body.token;
    let findToken = await ForgotPassword.findOne({token: token});
    if (findToken) {
        let userId = findToken.userId;
        const newUser = await User.findById(userId);
        newUser.password = await bcrypt.hash(req.body.password, 10);
        await newUser.save();
        return res.status(200).json({success: "Password reset successfully"});
    } else {
        return res.status(200).json({error: "Invalid token"});
    }
});

router.post("/change-password", authMiddleware, async (req, res) => {
    let id = req.body.userId;
    let oldPassword = req.body.old_password;
    let findData = await User.findById(id);

    let match = await bcrypt.compare(oldPassword, findData.password);
    if (match) {
        findData.password = await bcrypt.hash(req.body.password, 10);
        await findData.save();
        return res.status(200).json({success: "Password changed successfully"});
    } else {
        return res.status(200).json({error: "Password does not match"});
    }

});

router.post("/update-name", authMiddleware, async (req, res) => {
    let id = req.body.userId;
    let newName = req.body.name;
    let findData = await User.findById(id);
  
    if (findData) {
      findData.name = newName;
      await findData.save();
      return res.status(200).json({ success: "Name updated successfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  });

router.post("/review", authMiddleware, async (req, res) => {
    let userId = req.body.userId;
    let newRating = req.body.rating;
  
    try {
      let existingReview = await Review.findOne({ userId: userId });
  
      if (existingReview) {
        existingReview.rating = newRating;
        await existingReview.save();
        return res.status(200).json({ success: "Rating and review updated successfully" });
      } else {
        const newReview = new Review({
          userId: userId,
          rating: newRating,
        });
        await newReview.save();
        return res.status(200).json({ success: "Rating and review created successfully" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
});
  
router.get("/review/:id", authMiddleware, async (req, res) => {
    try {
        const review = await Review.findOne({ userId: req.body.userId });
        
        if (!review) {
            return res.send({
                message: "Review not found",
                success: false,
                data: null,
            });
        }
        
        res.send({
            message: "Review fetched successfully",
            success: true,
            data: review,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
            data: null,
        });
    }
});

  
router.get("/review/", authMiddleware, async (req, res) => {
    try {
        const reviews = await Review.find();

        let totalRating = 0;
        for (const review of reviews) {
            totalRating += +review.rating;
        }
        const averageRating = totalRating / reviews.length;

        res.send({
            message: "Reviews fetched successfully",
            success: true,
            data: {
                reviews: reviews,
                totalRating: totalRating,
                averageRating: averageRating,
            },
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
            data: null,
        });
    }
});

  


router.post("/get-user-by-id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            message: "User fetched successfully",
            success: true,
            data: user,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
            data: null,
        });
    }
});


// Get all Users

router.post("/get-all-users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.send({
            message: "Users fetched successfully",
            success: true,
            data: users,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
            data: null,
        });
    }
});


// Update User

router.post("/update-user-permissions", authMiddleware, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.body._id, req.body);
        res.send({
            message: "User permissions updated successfully",
            success: true,
            data: null,
        });
    } catch {
        res.send({
            message: error.message,
            success: false,
            data: null,
        });
    }
});


module.exports = router;
