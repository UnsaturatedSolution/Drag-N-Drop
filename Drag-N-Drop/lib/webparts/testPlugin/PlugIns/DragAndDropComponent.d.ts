import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface IDragAndDropComponentState {
    dragging: any;
    drag: boolean;
    Attachments: any[];
    ExistingAttachments: any[];
}
export interface IDragAndDropComponentProps {
    itemId: number;
    listName: string;
    parentComponent: string;
    allowRemoval?: boolean;
    context: WebPartContext;
}
export default class DragAndDropComponent extends React.Component<IDragAndDropComponentProps, IDragAndDropComponentState> {
    private dropRef;
    private dragCounter;
    private dragAndDropService;
    constructor(props: IDragAndDropComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    setAttachmentState(): void;
    private preventDeafultAction;
    private handleDrag;
    private handleDragIn;
    private handleDragOut;
    private handleDrop;
    renameExistingFile(file: any, count: any): any;
    checkIfExists(uploadedFile: any, previousFIles: any, fileNameProp: any): boolean;
    getRenamedFile(uploadedFile: any, fileList: any, count: any): any;
    handleFileChange: (files: any) => void;
    private filechange;
    private makeNull;
    removeAttachment(fileToRemove: any): void;
    uploadToSP(): void;
    render(): React.ReactElement<IDragAndDropComponentProps>;
}
//# sourceMappingURL=DragAndDropComponent.d.ts.map