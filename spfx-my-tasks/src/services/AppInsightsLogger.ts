import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ILogger } from './ILogger';

export default class AppInsightsLogger implements ILogger {
  private _appInsights: ApplicationInsights;
  constructor() {
    this._appInsights = new ApplicationInsights({ config: {
      instrumentationKey: '9620a059-690b-4996-8715-97c4e5c79ca6'
    } });
    this._appInsights.loadAppInsights();
  }

  public log(message: string): void {
    this._appInsights.trackTrace({message: "[Plan-B Engage] |" + message});
  }
}
