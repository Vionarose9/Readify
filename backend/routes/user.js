const router = require("express").Router();
const User = require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const authenticateToken =require("./userAuth");


// Sign up route
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Validate username
        if (username.length <= 4) {
            return res.status(400).json({ message: "Username length should be greater than 4" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Validate password
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password length should be greater than 5" });
        }
        const hashPass=await bcrypt.hash(password,10);

        // Create new user
        const newUser = new User({ username, email, password:hashPass, address });
        await newUser.save();

        return res.status(200).json({ message: "Sign-up successful!" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}); 

//Sign in
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Create JWT token
        const authClaim = {
            name: existingUser.username,
            role: existingUser.role || "user" // default role if undefined
        };

        const token = jwt.sign(authClaim, "bookstore123", { expiresIn: "30d" });

        return res.status(200).json({
            message: "Sign in successful",
            id: existingUser._id,
            role: authClaim.role,
            token: token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//get user info
router.get("/get-user-information",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const data=await User.findById(id).select("-password");
        return res.status(200).json(data);

    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
})

// Update address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;

    await User.findByIdAndUpdate(id, { address: address });

    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
