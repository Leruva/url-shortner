let parsedUrl;
function validateUrl(url) {
    if (!url || typeof url !== 'string'){
        return false;
    }
    try {
        parsedUrl = new URL(url);
        return (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:");
    } catch (error) {
        return false;
    }
}

module.exports = validateUrl;