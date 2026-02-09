const Url = require('../models/urlModels');
const asyncHandler = require('express-async-handler');
const generateCode = require('../utils/generateCode');
const validateUrl = require('../utils/validateUrl');


//Create Short URL
//POST /shorten
const createShortUrl = asyncHandler(async (req, res) => {
    const { originalUrl } =  req.body;
    if(validateUrl(originalUrl) === false){
        res.status(400);
        throw new Error("Invalid URL");
    }
    let savedUrl;
    let attempts = 0;
    while(!attempts < 5 && !savedUrl){
        try{
            const shortCode = generateCode();
            savedUrl = await Url.create({
                originalUrl,
                shortCode, 
                accessCount: 0,
            });
        }catch (error){
            if(error.code === 11000){
                attempts++;
            }else{
                throw new error;
            }
        }
    }

    if(!savedUrl){
        res.status(500);
        throw new Error("Server Error. Please try again later.");
    }

    res.status(201).json(savedUrl);
        
});
//Redirect Original URL
//GET /shorten/abc123
const redirectOriginalUrl = asyncHandler(async (req,res) =>{
    const { shortCode } = req.params;
    if(!shortCode){
        res.status(400);
        throw new Error("Short code is required");
    }
    const urlData = await Url.findOneAndUpdate({shortCode}, {$inc : {accessCount: 1}}, {new: true});
    
    if(!urlData) {
        res.status(404);
        throw new Error("Short Url not found");
    }
    // console.log(urlData.originalUrl);
    res.redirect(urlData.originalUrl);
    //res.status(200).json(urlData);
});
//Retrieve Original URL
//GET /shorten/info/abc123

const retriveOriginalUrl = asyncHandler(async (req,res) =>{
    const { shortCode } = req.params;
    if(!shortCode){
        res.status(400);
        throw new Error("Short code is required");
    }
    const urlData = await Url.findOne({shortCode});

    if(!urlData) {
        res.status(404);
        throw new Error("Short Url not found");
    }  
    res.status(200).json(urlData);
});
//Update Short URL
//PUT /shorten/abc123
const updateShortUrl = asyncHandler(async (req,res)=>{
    const { shortCode} = req.params;
    const { originalUrl } = req.body;

    if(!shortCode){
        res.status(400);
        throw new Error("Short code is Required");
    }

    if(validateUrl(originalUrl) === false){
        res.status(400);
        throw new Error("Invalid URL");
    }

    const updatedUrl = await Url.findOneAndUpdate({shortCode}, { originalUrl }, { new: true });

    if(!updatedUrl){
        res.status(404);
        throw new Error("Short Url not found");
    }
    res.status(200).json(updatedUrl);
});
//Delete Short URL
//DELETE /shorten/abc123
const deleteShortUrl = asyncHandler(async (req,res)=>{
    const { shortCode } = req.params;

    if(!shortCode){
        res.status(400);
        throw new Error("Short code is Required");
    }

    const deletedUrl = await Url.findOneAndDelete({ shortCode });

    if(!deletedUrl){
        res.status(404);
        throw new Error("Short Url not found");
    }
    res.status(200).json({ message: "Short URL deleted successfully" });
});

//Get URL Statistics
//GET /shorten/abc123/stats
// const urlStats = 


module.exports = {
    createShortUrl,
    updateShortUrl,
    redirectOriginalUrl,
    retriveOriginalUrl,
    deleteShortUrl
}