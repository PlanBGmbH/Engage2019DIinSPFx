import { ITaskService } from "./ITaskService";
import { ServiceScope } from "@microsoft/sp-core-library";
import { ILogger } from "./ILogger";
import { ITask } from "../models/ITask";
import { LoggerKey } from "./ServiceKeys";

export default class MockTaskService implements ITaskService {
  private _logger: ILogger;

  private _tasks: ITask[] = [{
    id: '1', title: 'Prepare presentation and demos', dueDateTime: new Date(), percentComplete: 100
  }, {
    id: '2', title: 'Travel to Engage', dueDateTime: new Date(), percentComplete: 100
  },{
    id: '3', title: 'Perform session', dueDateTime: new Date(), percentComplete: 94
  }];

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this._logger = serviceScope.consume(LoggerKey);
    });
  }

  public async getMyTasks(): Promise<ITask[]> {
    this._logger.log("Getting my Tasks from Mock...");
    await this._timeout(1000);
    return this._tasks;
  }

  private _timeout(ms): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
