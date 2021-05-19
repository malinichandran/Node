const fs =  require('fs')
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

cat(process.argv[2])

