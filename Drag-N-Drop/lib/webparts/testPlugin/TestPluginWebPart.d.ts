import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface ITestPluginWebPartProps {
    description: string;
    webpartContext: any;
}
export default class TestPluginWebPart extends BaseClientSideWebPart<ITestPluginWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=TestPluginWebPart.d.ts.map