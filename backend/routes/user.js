const express = require('express')
const cors = require('cors')
const zod = require('zod')
const {User} = require('../db')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
const { authMiddleware } = require('../middleware')
const {Account} = require('../db')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})

router.post("/signup", async (req, res) => {
    const {success} = signupBody.safeParse(req.body)
    if(!success) {
        return res.status(411).json({
            message: 'incorrect inputs'
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser) {
        return res.status(411).json({
            message: 'email already taken'
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

// creating a new account and giving them some money in the wallet
    const userId = user._id;
    await Account.create({
        userId,
        balance: 500 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);
    res.json({
        message: 'user created successfully',
        token: token
    })
})

//sign-in method implementation

const signinBody = zod.object({
    username : zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success, data } = signinBody.safeParse(req.body);
  
    if (!success) {
      return res.status(411).json({
        message: "incorrect inputs"
      });
    }
  
    const user = await User.findOne({
      username: req.body.username
    });
  
    if (!user) {
      return res.status(411).json({
        message: "Invalid username or password"
      });
    }
  
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  
    if (isPasswordValid) {
      const token = jwt.sign({
        userId: user._id
      }, JWT_SECRET);
      res.json({
        token: token
      });
      return;
    }
  
    res.status(411).json({
      message: "Invalid username or password"
    });
  });

// updating profile details

const updateBody = zod.object({
    password : zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})
router.put('/update', authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({_id: req.userId}, req.body);
    res.json({
        message: "Updated successfully"
    })
})

// to search for a user

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName: {
                "$regex": filter
            }
        },{
            lastName:{
                "$regex": filter
            }
        }
    ]

    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = router;