const fs = require('fs');
const process = require('process');
const axios = require('axios')

function handleOut(text,goingOut){
    if(goingOut){
        fs.writeFile(goingOut, text, 'utf8', function(err){
            if(err){
                console.error(`Error = ${err}`)
                process.exit(1);
            }
        });
    }
    else{
        console.log(text);
    }
}

function cat (path,goingOut){
    fs.readFile(path, 'utf8', (error, data) =>{
        if(error){
            console.log("Error:", error);
            process.exit(1)
        }
        else{
            handleOut(data,goingOut)
        }
    })
}

async function webCat (URL,goingOut){
    try{
        let res = await axios.get(URL);
        handleOut(res.data, goingOut);
    }
    catch (err){
        console.error(`Error: ${err}`)
        process.exit(1)
    }
}

let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
  } else {
    path = process.argv[2];
  }

if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path,out);
}

