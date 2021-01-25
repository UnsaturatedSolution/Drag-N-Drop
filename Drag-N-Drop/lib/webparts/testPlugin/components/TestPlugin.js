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
import styles from './TestPlugin.module.scss';
import DragAndDropComponent from '../PlugIns/DragAndDropComponent';
var TestPlugin = /** @class */ (function (_super) {
    __extends(TestPlugin, _super);
    function TestPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestPlugin.prototype.render = function () {
        return (React.createElement("div", { className: styles.testPlugin },
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.row },
                    React.createElement("div", { className: styles.column },
                        React.createElement("span", { className: styles.title }, "Welcome to SharePoint!"),
                        React.createElement(DragAndDropComponent, { itemId: 2, listName: "TestListAttach", parentComponent: "TestPlugin", allowRemoval: true, context: this.props.webpartContext }))))));
    };
    return TestPlugin;
}(React.Component));
export default TestPlugin;
//# sourceMappingURL=TestPlugin.js.map