//Made By BioShot\\
let fs = require("fs");
let linebyline = require("line-by-line");
if(process.argv.length == 3) {
    if(process.argv[2].endsWith(".ands")){
        if(fs.existsSync(process.argv[2])){

        }else{
            console.error("Error! The File Does not exist! \nUsage: main.js <filename.ands>");
            process.exit(1);
        }
    }else{
        console.error("Usage: main.js <filename.ands>");
        process.exit(0);
    }
}else{
    console.error("Usage: main.js <filename.ands>");
    process.exit(0);
}
let lr = new linebyline(process.argv[2]);
let nodebugfound=false;
let vars = {};
let debug = true;


lr.on("line", function(line){
    if(line == "" || line == " ")return;
    interp(line);
})

function interp(line){
    if(line.startsWith("ptext")){
        let args = line.split(" ");
        args.shift();
        let str = args.join(" ").split('"')[1];
        if(str == undefined){
            let thing = vars[args];

            let val = thing.split('"')[1];
            if(val == undefined){
                console.log(vars[args]);
            }else{
                console.log(val);
            }
        }else{
            console.log(str);
        }

    }else if(line.startsWith('"')){

        let args = line.split(" ");
        args.shift();
        let str = line.split('"')[1];
        let restt = args.join(" ").split('"')[1];
        let argswithout = restt.split(str)[0].split(" ");
        console.log(str);
        if(argswithout.includes("->")){
            let pointer = argswithout[2].split('->')[0];
            if(pointer == "ptext"){
                console.log(str);
            }
        }
    }else if(line.startsWith("let")){
        let varname = line.split(" ")[1];
        let varvalue = line.split(" ").splice(3).join(" ");
        vars[varname] = varvalue;
        if(debug == false){

        }else{
            console.log(vars);
        }

    }else if(line.startsWith("if")){
        let args = line.split(" ");
        args.shift();
        let value1 = args[0];
        let value2 = args[1];
        if(value1 == value2){
            let ifcode = args.splice(2).join(" ");
            interp(ifcode);
        }


    }
    else{
        if(line == "nodebug -> settings"){
            debug = false;
            nodebugfound = true;
        }
        let args = line.split(" ");
        args.shift();
        let str = args.join(" ").split('"')[1];

        if(str == undefined){

            let lnt = line.split("->")[0]
           // console.log(lnt);
           let bbt = lnt.split(" ")[0];


            let thing = vars[bbt];

           // console.log(thing);
            //let val = thing.split('"')[1];

            if(thing == undefined){
                if(line == "nodebug -> settings"){
                    if(nodebugfound == true){

                    }
                }else if(line.startsWith("//")){
                    //its a comment.
                }
                else{
                    console.error("Unknown keywords in line. keywords: "+line);
                }
            }else{

                    let pointer = args[1];

                    if(pointer == "ptext"){
                        let strc = thing.split('"')[1];
                        if(strc == undefined){
                            console.log(thing)
                        }else{
                            console.log(strc);
                        }
                    }
            }
    }
    }
}
