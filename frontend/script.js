console.log("script.js loaded");

async function shortenUrl() {
    const originalUrl = document.getElementById('longUrl').value;
    const resultDiv = document.getElementById('result');

    if (!originalUrl) {
        resultDiv.innerHTML = '<p style="color: red;">Please enter a URL.</p>';
        return;
    }

    try{
        const response = await fetch('http://localhost:5000/api/shortner', {
            method: 'POST',
            headers: {  'Content-Type': 'application/json' },
            body: JSON.stringify({ originalUrl })
        });
        const data = await response.json();
        if (!response.ok) {
            resultDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
            return;
        }
        const shortUrl = `http://localhost:5000/api/shortner/${data.shortCode}`;
        resultDiv.innerHTML = `✅ Short URL:<br/>  <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
    }catch(error){
        resultDiv.innerHTML = `<p style="color: red;">An error occurred. Please try again later.</p>`;
    }
}

