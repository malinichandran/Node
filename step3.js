const fs =  require('fs')
const axios = require('axios')
const process = require('process')


function cat(path, out){
    fs.readFile(path, "utf-8", (err,data)=>{
        if(err){
            console.log(`Error Reading ${path}`, err)
            process.kill(1)
        }
        handleOutput(data, out)
    })
}

async function webCat(url, out){
    try{
    let response = await axios.get(url)
    handleOutput(response.data, out)
}
    catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
      }
}

function handleOutput(text, out) {
    if (out) {
      fs.writeFile(out, text, 'utf8', function(err) {
        if (err) {
          console.error(`Couldn't write ${out}: ${err}`);
          process.exit(1);
        }
      });
    } else {
      console.log(text);
    }
  }



let out;
let path;

if(process.argv[2]=== "--out"){
    out = process.argv[3];
    path = process.argv[4];
  } else {
    path = process.argv[2];
  }

  if (path.slice(0, 4) === 'http') {
    webCat(path, out);
  } else {
    cat(path, out);
  }