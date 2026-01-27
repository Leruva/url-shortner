//endpoints
const express = require('express');
const { createShortUrl, retriveOriginalUrl, updateShortUrl, deleteShortUrl } = require('../controllers/shortenerControllers');
const router = express.Router();

//post
router.post("/", createShortUrl );
//get
router.get("/:shortCode", retriveOriginalUrl );
//put
router.put("/:shortCode", updateShortUrl);
//delete
router.delete("/:shortCode", deleteShortUrl);
module.exports = router;