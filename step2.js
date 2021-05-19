const fs =  require('fs')
const axios = require('axios')
const process = require('process')


function cat(path){
    fs.readFile(path, "utf-8", (err,data)=>{
        if(err){
            console.log(`Error Reading ${path}`, err)
            process.kill(1)
        }
        console.log(data)
    })
}

async function webCat(url){
    let response = await axios.get(url)
    console.log(response.data)
}

if(process.argv[2].includes(".txt")){
    cat(process.argv[2])
}
else{
    webCat(process.argv[2])
}
