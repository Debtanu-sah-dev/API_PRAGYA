const inputINP = document.querySelector("#input");
const respondBTN = document.querySelector("#respond");
const outputPRE = document.querySelector("#output");
const filesINP = document.querySelector("#files");
const timeLABEL = document.querySelector("#time_taken");
let timeStamp = 0;
let FILES = [];
let model = genAI.getGenerativeModel({model:"gemini-flash-latest"});
filesINP.addEventListener("change", (e) => {
    FILES = [];
    for(let file of e.target.files){
        const Reader = new FileReader();
        Reader.onload = (e) => {
            FILES.push(new FileDataBlob(e.target.result, file.type))
        }
        Reader.onerror = (errorBlob) => {
            console.log(errorBlob);
        }
        Reader.readAsDataURL(file)
    }
});

respondBTN.addEventListener("click",async () => {
    timeStamp = new Date();
    let interval = setInterval(() => {
        timeLABEL.innerText = ((new Date() - timeStamp)/1000).toFixed(3) + " seconds";
    })
    //* No streaming
    // let content = await model.generateContent([inputINP.value, ...FILES]);
    // outputPRE.innerText = content;

    //* Streaming
    let content = await model.generateContentStream([inputINP.value, ...FILES]);
    outputPRE.innerText = "";
    for await (const chunk of content.stream) {
        outputPRE.innerText += chunk
    }
    clearInterval(interval);
})