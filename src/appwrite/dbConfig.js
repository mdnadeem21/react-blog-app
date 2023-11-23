import { Client,Storage, Databases, ID, Query } from "appwrite";
import config from "../config/config";


export class DbServices{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
           .setEndpoint(config.appwriteUrl)
           .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        
        
    }
 
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            const createdPost =  await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                   title,
                   content,
                   featuredImage,
                   status,
                   userId
                }
                )
            return createdPost  
        } catch (error) {
            console.log("APPwrite service ::::: createPost :: error : ",error)
        }
    }
 
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                   title,
                   content,
                   featuredImage,
                   status,
                }
                )
        } catch (error) {
            console.log("APPwrite service ::::: updatePost :: error : ",error)
        }
    }

    async deletePost(slug){
        try {
               await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                )
                return true;
        } catch (error) {
            console.log("APPwrite service ::::: deletePost :: error : ",error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,)
        } catch (error) {
            console.log("APPwrite service ::::: getPost :: error : ",error)
            return false
        }
    }

    async getAllPost(queries = [Query.equal("status","active")]){
          try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries, 
            )
          } catch (error) {
            console.log("APPwrite service ::::: getAllPost :: error : ",error)
            return false
          }
    }


    // file upload service
    async uploadFile(file){
        try {
            const uploadedFile = await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
            return uploadedFile
        } catch (error) {
            console.log("APPwrite service ::::: uploadFile :: error : ",error)
            return false;
        }
    }

    async deleteFile(fileId){
       try {
             await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
       } catch (error) {
        console.log("APPwrite service ::::: deleteFile :: error : ",error)
            return false;
       }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}



const  dbServices = new DbServices();
export default dbServices;