const router = require('express').Router();
const userController = require("../Controller/user");
const pdfController = require("../Controller/pdfupload");

router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.get('/logout', userController.logout);
router.get('/verify-token', userController.getToken);
router.post('/pdf-upload/:id', pdfController.pdfUpload);
router.post('/query', pdfController.QnA_TalkingDocs)

module.exports = router;