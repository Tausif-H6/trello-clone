import { storage } from "@/appwrite";
import { ID } from "appwrite";
const uploadImage = async(file:File)=>{
    const fileUloaded= await storage.createFile(
        "650fc6f15bb266db6174",
        ID.unique(),
        file
    )
    return fileUloaded;
}
export default uploadImage;

