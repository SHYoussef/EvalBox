import {Client} from "langsmith"
import fs from "fs"
import logging from "@Evalbox/utils/logging.js";

//TODO: implements upload and download methods

class DataManager {
    private client: Client


    constructor(){
        this.client = new Client()
    }

    async Upload(path: string, inputKeys: string[], outputKeys: string[],
         fileName: string, description: string,  datatype: string)
    {
        if (fs.existsSync(path)){
            
            }
    
        else {
            logging.error(`File at path ${path} does not exist.`)
        }
}

    Download(fileName:string, ){

    }
}