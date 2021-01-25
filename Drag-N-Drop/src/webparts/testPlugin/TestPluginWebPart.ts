import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TestPluginWebPartStrings';
import TestPlugin from './components/TestPlugin';
import { ITestPluginProps } from './components/ITestPluginProps';

export interface ITestPluginWebPartProps {
  description: string;
  webpartContext:any;
}

export default class TestPluginWebPart extends BaseClientSideWebPart<ITestPluginWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITestPluginProps> = React.createElement(
      TestPlugin,
      {
        description: this.properties.description,
        webpartContext :this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
  }
}
