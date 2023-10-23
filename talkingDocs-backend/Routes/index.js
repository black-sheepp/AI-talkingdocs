// Import the 'express' module to create an Express router
const router = require('express').Router();

// Import the userController and pdfController from their respective files
const userController = require("../Controller/user");
const pdfController = require("../Controller/pdfupload");

// Route for user registration (Sign Up)
router.post('/sign-up', userController.signUp);

// Route for user authentication (Sign In)
router.post('/sign-in', userController.signIn);

// Route to log the user out
router.get('/logout', userController.logout);

// Route to verify user token
router.get('/verify-token', userController.getToken);

// Route for uploading a PDF file, with ':id' as a dynamic parameter
// This route is used to associate a PDF with a specific user (indicated by 'id')
router.post('/pdf-upload/:id', pdfController.pdfUpload);

// Route for handling queries related to the uploaded PDF
router.post('/query', pdfController.QnA_TalkingDocs);

module.exports = router;
