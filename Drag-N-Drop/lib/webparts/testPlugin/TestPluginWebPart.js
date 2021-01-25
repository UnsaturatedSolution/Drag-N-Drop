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
import * as ReactDom from 'react-dom';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'TestPluginWebPartStrings';
import TestPlugin from './components/TestPlugin';
var TestPluginWebPart = /** @class */ (function (_super) {
    __extends(TestPluginWebPart, _super);
    function TestPluginWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestPluginWebPart.prototype.render = function () {
        var element = React.createElement(TestPlugin, {
            description: this.properties.description,
            webpartContext: this.context
        });
        ReactDom.render(element, this.domElement);
    };
    TestPluginWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    TestPluginWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return TestPluginWebPart;
}(BaseClientSideWebPart));
export default TestPluginWebPart;
//# sourceMappingURL=TestPluginWebPart.js.map