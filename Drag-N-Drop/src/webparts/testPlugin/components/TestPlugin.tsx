import * as React from 'react';
import styles from './TestPlugin.module.scss';
import { ITestPluginProps } from './ITestPluginProps';
import { escape } from '@microsoft/sp-lodash-subset';
import DragAndDropComponent from '../PlugIns/DragAndDropComponent';

export default class TestPlugin extends React.Component<ITestPluginProps, {}> {
  public render(): React.ReactElement<ITestPluginProps> {
    return (
      <div className={ styles.testPlugin }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <DragAndDropComponent
                itemId={2}
                listName={`TestListAttach`}
                parentComponent="TestPlugin"
                allowRemoval={true}
                context={this.props.webpartContext}
              ></DragAndDropComponent>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
