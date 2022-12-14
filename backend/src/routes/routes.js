const { createUser, getUsers, getUserById, updateUser, deleteUser, login } = require("../controllers/authController.js");
const { uploadAvatar } = require("../controllers/avatarController.js")

const express = require('express');
const router = express.Router(); 
const { checkToken } = require ('../auth/tokenValidation.js');
const postController = require("../controllers/postController.js");
const multer = require("multer");
const path = require("path");

const storageImgPost = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/assets/postagens')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.originalname}-${Date.now()}.${ext}`);
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/assets/avatar')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.originalname}-${Date.now()}.${ext}`);
    }
});

const upload = multer({ storage: storage });

const uploadImgPost = multer ({storage: storageImgPost});

router.use('/avatar',express.static(path.join(__dirname, '../assets/avatar')))
router.use('/postagens',express.static(path.join(__dirname, '../assets/postagens')))

router.post('/users/:id/avatar', upload.single('avatar'), uploadAvatar);

router.get("/postagens", postController.getPost);
router.get("/postagens/:id", postController.getPostById);
router.post("/postagens", uploadImgPost.single('pathImage'), postController.insertPost);
router.put("/postagens/:id", postController.updatePost);
router.delete("/postagens/:id", postController.deletePost);

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", checkToken, updateUser);
router.delete("/users/:id", checkToken, deleteUser);
router.post("/users/login", login);

module.exports = router;