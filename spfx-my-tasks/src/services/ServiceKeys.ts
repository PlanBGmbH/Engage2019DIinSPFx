import { ServiceKey } from "@microsoft/sp-core-library";
import { ITaskService } from "./ITaskService";
import GraphTaskService from "./GraphTaskService";
import { ILogger } from "./ILogger";
import AppInsightsLogger from "./AppInsightsLogger";

export const TaskServiceKey =
  ServiceKey.create<ITaskService>("planbengage:taskService", GraphTaskService);

export const LoggerKey = ServiceKey.create<ILogger>("planbengage:logger", AppInsightsLogger);

