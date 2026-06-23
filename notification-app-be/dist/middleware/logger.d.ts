import type { LogLevel, LogStack } from "../types/index.js";
import type { Request, Response, NextFunction } from "express";
export declare function Log(stack: LogStack, level: LogLevel, pkg: string, message: string): Promise<void>;
export declare function requestLogger(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=logger.d.ts.map