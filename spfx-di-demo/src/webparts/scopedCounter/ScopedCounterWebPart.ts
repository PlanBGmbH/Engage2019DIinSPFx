import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, EnvironmentType, Environment, ServiceScope } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'ScopedCounterWebPartStrings';
import { ICounterService } from '../../services/ICounterService';
import Counter from './components/Counter';
import { DoubleCounterServiceKey } from '../../services/DoubleCounterService';
import { CounterServiceKey } from '../../services/CounterService';
import { ICounterProps } from './components/ICounterProps';

export interface IScopedCounterWebPartProps {
  description: string;
}

export default class ScopedCounterWebPart extends BaseClientSideWebPart<IScopedCounterWebPartProps> {

  public render(): void {
    const serviceScope: ServiceScope = this.context.serviceScope.startNewChild();
    let counterServiceInstance: ICounterService;
    switch (Environment.type) {
      case EnvironmentType.Local:
        counterServiceInstance = serviceScope.createDefaultAndProvide(DoubleCounterServiceKey);
        break;

      default:
        counterServiceInstance = serviceScope.createDefaultAndProvide(CounterServiceKey);
        break;
    }
    serviceScope.finish();

    // let counterServiceInstance: ICounterService = this.context.serviceScope.consume(CounterServiceKey);
  
    const element: React.ReactElement<ICounterProps > = React.createElement(
      Counter,
      {
        description: this.properties.description,
        counterService: counterServiceInstance
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
