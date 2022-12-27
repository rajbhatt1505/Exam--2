
const router = require('express').Router();
const authRoute = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const file = require("../multer")
const fs = require("fs");
const UserProfile = require('../models/userprofile')
const uri = 'http://localhost:8080/contact/send';
const Book = require('../models/Book')

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.json({ success: false, message: "Hashing error" })
    } else {
      const user = new User({
        name:req.body.name,
        displayName: req.body.displayName,
        email: req.body.email,
        mobile:req.body.mobile,
        password: hash,
      })
      user.save()
        .then((_) => {
          res.json({ success: true, message: "Account Has Been Created!!" })
        })
        .catch((err) => {
          if (err.code === 11000) {
            return res.json({ sucess: false, message: "Email is Already Exist!" })
          }
          res.json({ success: false, message: "Authentication failed" })
        })
    }
  });
})

router.post('/login', (req, res) => {
  User.find({ email: req.body.email }).exec().then((result) => {
    if (result.length < 1) {
      return res.json({ success: false, message: "User Not Found" })
    }
    const user = result[0]

    bcrypt.compare(req.body.password, user.password, (err, ret) => {
      token = req.signedCookies.token;
      if (ret) {
        const payload = {
          userId: user._id
        }
        const token = jwt.sign(payload, "webBatch")

        res.cookie("token", token)
        return res.json({ success: true, token: token, message: "Login Successful." })
      } else {
        return res.json({ success: false, message: "Passowrd does not Match!." })
      }
    })
  }).catch(err => {
    res.json({ success: false, message: "Authentication failed !!" })
  })
})

router.get('/profile', checkAuth, (req, res) => {
  const userId = req.userData.userId;
  User.findById(userId).exec().then((result) => {
    res.json({ success: true, data: result })

  }).catch(err => {
    res.json({ success: false, message: "Server error" })
  })
})

router.patch("/update/:id", async(req,res)=>{
  try {
      const updateduser = await User.updateOne({_id:req.params.id}, {$set: req.body});
      res.status(200).json(updateduser);
  } catch (error) {
      res.status(400).json({message: error.message});
  }
});

router.delete("/delete/:id", async(req,res)=>{
    try {
        const deleteduser = await User.deleteOne({_id:req.params.id});
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

router.get("/get" ,async (req,res)=>{
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      res.status(500).json({message: "Cannot get User data"});
  }   
})

router.get("/sendprofile", file.any(), async (req, res) => {
  // console.log(req.params)
  try {
    // let useruserprofile = req.body
    // console.log(useruserprofile)
    // console.log(req.body.Username)
    let data = await UserProfile.findOne({ Email: req.body.email });
    res.status(200).json(data);
    // console.log(data)
  } catch (error) {
    res.status(500).json(error);

  }
});

router.post("/Profileget", file.single("image"), async (req, res) => {
  try {
    let img = req.file.filename
    req.body.image = img

    let data = await UserProfile(req.body);
    let result = await data.save();

    res.status(200).json("Done")

  } catch (error) {
    res.status(403).json("something went wrong")
    console.log(error);
  }
});

router.delete("/Profiledelete/:_id", async (req, res) => {
  let img = await UserProfile.findOne(req.params);

  let delimg = img.image;
  try {
    fs.unlinkSync(`./images/` + delimg);
  } catch (error) { }
  let data = await UserProfile.deleteOne(req.params);
  if (data.deletedCount == 0) {
    console.log("Data not found!");
    res.send("Data not found!")
  } else {
    res.send(data);
  }
});

router.put("/Profileupdate/:_id", file.single("image"), async (req, res) => {

  try {
    let data = await UserProfile.findById(req.params);
    let delimg = data.image;

    console.log(delimg)
    console.log(req.params);
    // console.log(data);
    if (!data) {
      console.log("id not found");
      res.status(404).json("id not found");
    } else {
      try {
        let upimg = req.file.filename
        if (upimg) {
          fs.unlinkSync(`./images/` + delimg);
        }
      }
      catch (error) {
        console.log(error);

      }
      try {
        let upimg = req.file.filename
        req.body.image = upimg;
      } catch (error) {
        //  console.log(error);
      }
      //  console.log(req.params);
      //  console.log(req.body);
      let data = await UserProfile.updateOne(req.params, { $set: req.body });
      if (data.modifiedCount == 1) {
        res.json({ success: true, message: "Profile and details updated!" });
        console.log("Profile and details updated!");
      }
    }
  } catch (error) {
    res.json({ success: false, message: "something went wrong" });
    console.log(error);
  }
});

router.delete("/delete/:id", async(req,res)=>{
  try {
      const deleteduser = await User.deleteOne({_id:req.params.id});
      res.status(200).json(deleteduser);
  } catch (error) {
      res.status(400).json({message: error.message});
  }
})

router.get("/get/:id", async(req,res)=>{
  try {
      const user = await User.findById(req.params.id);
      res.json(user);
  } catch (error) {
      res.status(404).json({message: "Cannot get Users"});
  }
})


router.get("/get" ,async (req,res)=>{
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      res.status(500).json({message: "Cannot get User data"});
  }   
})

router.post('/add-book' , (req, res, next) => {
    Book.create(req.body, (error, data) => {
        if (error) {
            return next(error);

        } else {
            res.json(data)
        }
    });
});

router.get('/',(req, res) => {
    Book.find((error, data) => {
        if (error) {
            return next (error);
        } else {
            res.json(data)
        }
    });
});

router.get('/read-book/:id',(req, res) => {
    Book.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
});

router.put('/update-book/:id',(req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('Book updated successfully !!');
        }
    })
})

router.delete('/delete-book/:id',(req, res, next) => {
    Book.findByIdAndRemove(req.params.id,  (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router