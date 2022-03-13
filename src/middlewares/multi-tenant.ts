import { Request, Response, NextFunction } from "express";
import { MultiTenantAccessError } from "../errors/multi-tenant-access-error";

export type MultiTenantValidationFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => boolean | Promise<boolean>;

declare global {
  namespace Express {
    interface Request {
      tenant?: string;
    }
  }
}

export const multiTenant = (multiTenantCheck?: MultiTenantValidationFn) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { tenantId } = req.params;
    // TODO verify Tenant
    const check = multiTenantCheck
      ? await multiTenantCheck(req, res, next)
      : true;

    if (!check) {
      throw new MultiTenantAccessError();
    }

    req.tenant = tenantId;
    next();
  };
};
