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
        resultDiv.innerHTML = `Short URL:<br/>  <a href="${shortUrl}" target="_blank">${shortUrl}</a>
        <br>access count: ${data.accessCount} <br>
        <button onclick="copyText('${shortUrl}')">Copy</button>`;
    }catch(error){
        resultDiv.innerHTML = `<p style="color: red;">An error occurred. Please try again later.</p>`;
    }
}

async function updateUrl() {
    const shortCode = document.getElementById('updateCode').value;
    const newOriginalUrl = document.getElementById('updateUrl').value;
    const resultDiv = document.getElementById('updateResult');

    if (!shortCode || !newOriginalUrl) {
        resultDiv.innerHTML = '<p style="color: red;">Please enter both short code and new URL.</p>';
        return;
    }
    try {
        const response = await fetch(`http://localhost:5000/api/shortner/${shortCode}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ originalUrl: newOriginalUrl })
        });
        const data = await response.json();
        if (!response.ok) {
            resultDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
            return;
        }
        const updatedUrl = `http://localhost:5000/api/shortner/${data.shortCode}`;
        resultDiv.innerHTML = `Updated URL:<br/>  <a href="${updatedUrl}" target="_blank">${updatedUrl}</a>`;
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">An error occurred. Please try again later.</p>`;
    }
}

async function deleteUrl() {
    const shortCode = document.getElementById('deleteCode').value;
    const resultDiv = document.getElementById('deleteResult');
    if(!shortCode){
        resultDiv.innerHTML = ' <p style="color: red;">Please Enter short code</p>';
        return; 
    }
    try{
        const response = await fetch(`http://localhost:5000/api/shortner/${shortCode}`,{
            method: 'DELETE',
        });
        const data = await response.json();
        if(!response.ok){
            resultDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
            return;
        }
        resultDiv.innerHTML = `<p style="color: green;">${data.message}</p>`;
        
    }catch (error){
        resultDiv.innerHTML = `<p style= "color: red;">${error}</p>`;
        return;
    }
    
}

function copyText(text) {
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
}
