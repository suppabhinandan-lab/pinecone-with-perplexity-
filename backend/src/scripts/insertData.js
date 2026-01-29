import { storeDocument } from "../services/vectorService.js";
import { documents } from "../../data.js";

function pushData(documents){
console.log(documents,'documentsdocuments');
try{
storeDocument(documents);
}
catch(error){
    console.log(error);
}


}
// let documents={name:"Abhi",text:"kxkidcke"}
pushData(documents);