const inputINP = document.querySelector("#input");
const respondBTN = document.querySelector("#respond");
const outputPRE = document.querySelector("#output");
const filesINP = document.querySelector("#files");
let FILES = []
filesINP.addEventListener("change", (e) => {
    for(let file of e.target.files){
        const Reader = new FileReader();
        Reader.onload = (e) => {
            console.log(e.target.result);
            console.log(file.name)
        }
        Reader.onerror = (errorBlob) => {
            console.log(errorBlob);
        }
        Reader.readAsDataURL(file)
    }
});