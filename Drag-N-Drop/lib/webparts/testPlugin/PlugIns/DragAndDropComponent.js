var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import styles from './DragAndDrop.module.scss';
import { Icon } from 'office-ui-fabric-react';
import DragAndDropService from "./DragAndDrop.svc";
var DragAndDropComponent = /** @class */ (function (_super) {
    __extends(DragAndDropComponent, _super);
    function DragAndDropComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.handleDrag = function (event) {
            _this.preventDeafultAction(event);
        };
        _this.handleDragIn = function (event) {
            _this.preventDeafultAction(event);
            _this.dragCounter++;
            if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
                _this.setState({ drag: true });
            }
        };
        _this.handleDragOut = function (event) {
            _this.preventDeafultAction(event);
            _this.dragCounter--;
            if (_this.dragCounter === 0) {
                _this.setState({ drag: false });
            }
        };
        _this.handleDrop = function (event) {
            _this.preventDeafultAction(event);
            _this.setState({ drag: false });
            if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
                _this.handleFileChange(event.dataTransfer.files);
                event.dataTransfer.clearData();
                _this.dragCounter = 0;
            }
        };
        _this.handleFileChange = function (files) {
            var fileList = _this.state.Attachments;
            for (var i = 0; i < files.length; i++) {
                if (!files[i].name)
                    return;
                files[i].FileName = files[i].name;
                files[i].Size = files[i].size;
                files[i].Type = files[i].type;
                var count = 0;
                var validFile = _this.getRenamedFile(files[i], fileList, count);
                fileList.push(validFile);
            }
            _this.setState({ Attachments: fileList });
        };
        _this.state = {
            drag: false,
            dragging: null,
            Attachments: [],
            ExistingAttachments: []
        };
        _this.dragAndDropService = new DragAndDropService(_this.props.context);
        _this.uploadToSP = _this.uploadToSP.bind(_this);
        _this.setAttachmentState = _this.setAttachmentState.bind(_this);
        return _this;
    }
    DragAndDropComponent.prototype.componentDidMount = function () {
        var div = this.dropRef;
        div.addEventListener('dragenter', this.handleDragIn);
        div.addEventListener('dragleave', this.handleDragOut);
        div.addEventListener('dragover', this.handleDrag);
        div.addEventListener('drop', this.handleDrop);
        this.setAttachmentState();
    };
    DragAndDropComponent.prototype.componentWillUnmount = function () {
        var div = this.dropRef;
        div.removeEventListener('dragenter', this.handleDragIn);
        div.removeEventListener('dragleave', this.handleDragOut);
        div.removeEventListener('dragover', this.handleDrag);
        div.removeEventListener('drop', this.handleDrop);
        this.setAttachmentState();
    };
    DragAndDropComponent.prototype.setAttachmentState = function () {
        var _this = this;
        this.dragAndDropService.getAttachemntsSP(this.props.listName, this.props.itemId).then(function (response) {
            _this.setState({
                ExistingAttachments: response.AttachmentFiles,
                Attachments: []
            });
        });
    };
    //Drag and Drop 
    DragAndDropComponent.prototype.preventDeafultAction = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    DragAndDropComponent.prototype.renameExistingFile = function (file, count) {
        if (count >= 1) {
            file.FileName = file.name.substring(0, file.name.lastIndexOf(".")) + "(" + count + ")" + file.name.substring(file.name.lastIndexOf("."));
            file.Occurence = 1;
        }
        return file;
    };
    DragAndDropComponent.prototype.checkIfExists = function (uploadedFile, previousFIles, fileNameProp) {
        var file = uploadedFile;
        var fileList = previousFIles;
        var existingFIles = [];
        if (fileList && fileList.length > 0) {
            existingFIles = fileList.filter(function (fileListItem) {
                return fileListItem[fileNameProp] == file.FileName;
            });
        }
        return existingFIles.length > 0;
    };
    DragAndDropComponent.prototype.getRenamedFile = function (uploadedFile, fileList, count) {
        var file = uploadedFile;
        while (this.checkIfExists(file, fileList, "FileName")
            || this.checkIfExists(file, this.state.ExistingAttachments, "FileName")) {
            count++;
            file = this.renameExistingFile(uploadedFile, count);
        }
        return file;
    };
    DragAndDropComponent.prototype.filechange = function (evnt) {
        var filecontent = document.getElementById(this.props.parentComponent + "AttachmentFile");
        var files = filecontent.files;
        this.handleFileChange(evnt.target.files);
    };
    DragAndDropComponent.prototype.makeNull = function (event) {
        var filecontent = document.getElementById(this.props.parentComponent + "AttachmentFile");
        filecontent.value = "";
    };
    DragAndDropComponent.prototype.removeAttachment = function (fileToRemove) {
        var newFileList = this.state.Attachments.filter(function (item) {
            return item.FileName != fileToRemove.FileName;
        });
        this.setState({ Attachments: newFileList });
    };
    DragAndDropComponent.prototype.uploadToSP = function () {
        var _this = this;
        this.dragAndDropService.uploadFilesSP(this.props.listName, this.props.itemId, this.state.Attachments).then(function (response) {
            if (response.length > 0) {
                _this.setAttachmentState();
            }
        });
    };
    DragAndDropComponent.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { ref: function (reference) { return _this.dropRef = reference; }, className: styles.dropboxContainer },
            React.createElement("div", { className: styles.attachmentLabelSection },
                React.createElement("label", null, "Attachments"),
                React.createElement("button", { className: "", onClick: function () { return document.getElementById(_this.props.parentComponent + "AttachmentFile").click(); } },
                    React.createElement(Icon, { iconName: 'Attach', className: "" + " ms-Icon" }),
                    " Add Attachments"),
                React.createElement("input", { type: "file", id: this.props.parentComponent + "AttachmentFile", onChange: this.filechange.bind(this), onClick: this.makeNull.bind(this), className: styles.fileUploadBtn, name: "Add Attachments", key: "", multiple: true }),
                React.createElement("button", { onClick: this.uploadToSP, disabled: this.state.Attachments.length <= 0 && this.state.Attachments.length > 1 }, "Upload"),
                this.state.ExistingAttachments && this.state.ExistingAttachments.length > 0 && React.createElement("div", { className: "" + styles.existingAttachmentsList },
                    React.createElement("ul", null, this.state.ExistingAttachments.map(function (file, i) {
                        return React.createElement("li", null,
                            React.createElement("a", { href: file.ServerRelativeUrl }, file.FileName));
                    }))),
                this.state.Attachments.length > 0 && React.createElement("div", { className: "" + styles.attachmentList }, this.state.Attachments.map(function (file, i) {
                    return React.createElement("span", { key: i, className: styles.attachedItem },
                        file.FileName,
                        _this.props.allowRemoval && React.createElement("span", { onClick: _this.removeAttachment.bind(_this, file), className: "" + styles.attachmentDeleteIcon }, "X"));
                })))));
    };
    return DragAndDropComponent;
}(React.Component));
export default DragAndDropComponent;
//# sourceMappingURL=DragAndDropComponent.js.map