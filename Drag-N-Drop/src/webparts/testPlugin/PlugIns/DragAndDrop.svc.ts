import {
    WebPartContext
} from '@microsoft/sp-webpart-base';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IDragAndDropService {
    uploadFilesSP(listName,id,filesArray):any;
    getAttachemntsSP(listName,id):any;
}


export default class DragAndDropService implements IDragAndDropService {
    private context: WebPartContext;
    public constructor(ctx: WebPartContext) {
        this.context = ctx;
    }
    public getAttachemntsSP(listName, id){
        //let queryUrl = this.context.pageContext.web.absoluteUrl+"/_api/lists/GetByTitle('" + listName + "')/items(" + id + ")?$select=AttachmentFiles,Title&$expand=AttachmentFiles";
        let queryUrl = "https://m365x409248.sharepoint.com/sites/IntranetDev/_api/lists/GetByTitle('" + listName + "')/items(" + id + ")?$select=AttachmentFiles,Title&$expand=AttachmentFiles";
        return this.context.spHttpClient.post(queryUrl, SPHttpClient.configurations.v1,
            {
                headers: { "Content-type": "application/json;odata=verbose", "accept": "application/json"},
            }).then((response: any) => {
                return response.json();
            });
    }
    public async uploadFilesSP(listName, id, filesArray) {
        var promises = [];
        for (var i = 0; i < filesArray.length; i++) {
            let output = await this.uploadFileSP(listName, id, filesArray[i]);
            promises.push(output);
            //promises.push(this.uploadFileSP(listName, id, filesArray[i]));
        }
        return promises;
        // return Promise.all(promises).then((results) => {
        //     return results;
        // });
    }

    public uploadFileSP(listName, id, file) {
        return this.getFileBuffer(file).then((buffer: any) => {
            //var queryUrl = this.context.pageContext.web.absoluteUrl+"/_api/lists/GetByTitle('" + listName + "')/items(" + id + ")/AttachmentFiles/add(FileName='" + file.FileName + "')";
            var queryUrl = "https://m365x409248.sharepoint.com/sites/IntranetDev/_api/lists/GetByTitle('" + listName + "')/items(" + id + ")/AttachmentFiles/add(FileName='" + file.FileName + "')";
            return this.context.spHttpClient.post(queryUrl, SPHttpClient.configurations.v1,
                {
                    headers: { "Content-type": "application/json;odata=verbose", "accept": "application/json"   , "content-length": buffer.byteLength },
                    body: buffer
                }).then((response: any) => {
                    return response.json();
                });
        });
    }
    public getFileBuffer(file) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = (e: any) => {
                resolve(e.target.result);
            };
            reader.onerror = (e: any) => {
                reject(e.target.error);
            };
            reader.readAsArrayBuffer(file);
        });
    }
}