declare interface ITestPluginWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'TestPluginWebPartStrings' {
  const strings: ITestPluginWebPartStrings;
  export = strings;
}
