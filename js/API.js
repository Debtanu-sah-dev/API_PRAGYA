const CLOUD_URI = "136.114.185.5";

async function generateContent(content){
    let options = {
        method:"GET",
        body:JSON.stringify({
            prompt:content
        })
    }
    let response = await fetch(CLOUD_URI, options);
    console.log(response);
}

// generateContent("Explain quantum computers");