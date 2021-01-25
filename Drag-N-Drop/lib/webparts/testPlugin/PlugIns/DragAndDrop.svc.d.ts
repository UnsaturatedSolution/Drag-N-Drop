import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface IDragAndDropService {
    uploadFilesSP(listName: any, id: any, filesArray: any): any;
    getAttachemntsSP(listName: any, id: any): any;
}
export default class DragAndDropService implements IDragAndDropService {
    private context;
    constructor(ctx: WebPartContext);
    getAttachemntsSP(listName: any, id: any): Promise<any>;
    uploadFilesSP(listName: any, id: any, filesArray: any): Promise<any[]>;
    uploadFileSP(listName: any, id: any, file: any): Promise<any>;
    getFileBuffer(file: any): Promise<{}>;
}
//# sourceMappingURL=DragAndDrop.svc.d.ts.map