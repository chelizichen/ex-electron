import * as path from 'path'

const cwd = process.cwd()

function getPath(targetHTML:string){
    console.log(typeof(process.env.isProduction));
    
    if(process.env.isProduction == "true"){

    }else{
        let _path = path.resolve(cwd,'src',targetHTML)
        console.log(_path);
        
        return _path
    }
}
export {
    getPath
}