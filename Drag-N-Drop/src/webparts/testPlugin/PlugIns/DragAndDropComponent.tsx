import * as React from 'react';
import styles from './DragAndDrop.module.scss';
import { TextField, ActionButton, Icon } from 'office-ui-fabric-react';
import DragAndDropService,{IDragAndDropService} from "./DragAndDrop.svc";
import {WebPartContext} from '@microsoft/sp-webpart-base';


export interface IDragAndDropComponentState {
  dragging: any;
  drag: boolean;
  Attachments:any[];
  ExistingAttachments:any[];
}
export interface IDragAndDropComponentProps {
  itemId:number;
  listName:string;
  parentComponent:string;
  allowRemoval?:boolean;
  context:WebPartContext;
}

export default class DragAndDropComponent extends React.Component<IDragAndDropComponentProps, IDragAndDropComponentState> {
  private dropRef;
  private dragCounter;
  private dragAndDropService: IDragAndDropService;
  public constructor(props: IDragAndDropComponentProps) {
    super(props);
    this.state = {
      drag: false,
      dragging: null,
      Attachments: [],
      ExistingAttachments: []
    };
    this.dragAndDropService = new DragAndDropService(this.props.context);
    this.uploadToSP = this.uploadToSP.bind(this);
    this.setAttachmentState = this.setAttachmentState.bind(this);
  }

  public componentDidMount() {
    let div = this.dropRef;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
    this.setAttachmentState();
  }

  public componentWillUnmount() {
    let div = this.dropRef;
    div.removeEventListener('dragenter', this.handleDragIn);
    div.removeEventListener('dragleave', this.handleDragOut);
    div.removeEventListener('dragover', this.handleDrag);
    div.removeEventListener('drop', this.handleDrop);
    this.setAttachmentState();
  }
  public setAttachmentState(){
    this.dragAndDropService.getAttachemntsSP(this.props.listName,this.props.itemId).then((response: any) => {
      this.setState({
        ExistingAttachments:response.AttachmentFiles,
        Attachments:[]
      });
    });
  }
  //Drag and Drop 
  private preventDeafultAction(event){
    event.preventDefault();
    event.stopPropagation();
  }
  private handleDrag = (event) => {
    this.preventDeafultAction(event);
  }
  private handleDragIn = (event) => {
    this.preventDeafultAction(event);
    this.dragCounter++;
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  }
  private handleDragOut = (event) => {
    this.preventDeafultAction(event);
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  }
  private handleDrop = (event) => {
    this.preventDeafultAction(event);
    this.setState({ drag: false });
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      this.handleFileChange(event.dataTransfer.files);
      event.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  }
  public renameExistingFile(file,count){
    if(count >= 1){
      file.FileName = `${file.name.substring(0,file.name.lastIndexOf("."))}(${count})${file.name.substring(file.name.lastIndexOf("."))}`;
      file.Occurence = 1;
    }
    return file;
  }
  public checkIfExists(uploadedFile,previousFIles,fileNameProp){
    let file = uploadedFile;
    let fileList = previousFIles;
    let existingFIles = [];
    if(fileList && fileList.length > 0){
      existingFIles = fileList.filter((fileListItem)=>{
        return fileListItem[fileNameProp] ==  file.FileName;
      });
    }
    return existingFIles.length>0;
  }
  public getRenamedFile(uploadedFile,fileList,count){
    let file = uploadedFile;
    while(this.checkIfExists(file,fileList,"FileName") 
      || this.checkIfExists(file,this.state.ExistingAttachments,"FileName")){
      count++;
      file = this.renameExistingFile(uploadedFile,count);
    }
    return file;
  }
  public handleFileChange = (files) => {
    let fileList = this.state.Attachments;
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return;
      files[i].FileName = files[i].name;
      files[i].Size = files[i].size;
      files[i].Type = files[i].type;
      let count = 0;
      let validFile = this.getRenamedFile(files[i],fileList,count);
      fileList.push(validFile);
    }
    this.setState({ Attachments: fileList });
  }
  private filechange(evnt: any) {
    var filecontent: any = document.getElementById(`${this.props.parentComponent}AttachmentFile`);
    var files = filecontent.files;
    this.handleFileChange(evnt.target.files);
  }
  private makeNull(event: any) {
      var filecontent: any = document.getElementById(`${this.props.parentComponent}AttachmentFile`);
      filecontent.value = "";
  }
  public removeAttachment(fileToRemove) {
    var newFileList = this.state.Attachments.filter(item => {
      return item.FileName != fileToRemove.FileName;
    });
    this.setState({ Attachments: newFileList });
  }
  public uploadToSP(){
    this.dragAndDropService.uploadFilesSP(this.props.listName,this.props.itemId,this.state.Attachments).then(response=>{
      if(response.length>0){
        this.setAttachmentState();
      }
    });
  }
  public render(): React.ReactElement<IDragAndDropComponentProps> {
    return (
        <div ref={(reference) => this.dropRef = reference} className={styles.dropboxContainer}>
              <div className={styles.attachmentLabelSection}>
                <label>Attachments</label>
                <button className={``} onClick={() => document.getElementById(`${this.props.parentComponent}AttachmentFile`).click()}>
                    <Icon iconName={'Attach'} className={`${``} ms-Icon`}></Icon> Add Attachments</button>
                <input type="file" id={`${this.props.parentComponent}AttachmentFile`} onChange={this.filechange.bind(this)} onClick={this.makeNull.bind(this)} className={styles.fileUploadBtn} name="Add Attachments" key={""} multiple></input>

                <button onClick={this.uploadToSP} disabled={this.state.Attachments.length<=0 && this.state.Attachments.length>1} >Upload</button>
                {this.state.ExistingAttachments && this.state.ExistingAttachments.length>0 && <div className={`${styles.existingAttachmentsList}`}>
                  <ul>
                  {this.state.ExistingAttachments.map((file, i) =>
                    <li><a href={file.ServerRelativeUrl}>{file.FileName}</a></li>
                  )}
                  </ul>
                </div>}
                {this.state.Attachments.length>0 && <div className={`${styles.attachmentList}`}>
                    {this.state.Attachments.map((file, i) =>
                    <span key={i} className={styles.attachedItem}>
                      {file.FileName}
                      {this.props.allowRemoval && <span onClick={this.removeAttachment.bind(this, file)} className={`${styles.attachmentDeleteIcon}`}>X</span>}
                    </span>
                    )}
                </div>}
            </div>
        </div>  
    );
  }
}
