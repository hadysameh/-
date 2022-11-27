import { Request } from "express";
import { premissions } from "../types";

export const isHasAccessToAllWared = (req: Request): boolean => {
  return (
    req.user.usertype.premissions.find((premission: any) => {
      return premission.premission === premissions.hasAccessToAllWared;
    }) || req.user.usertype.type === "admin"
  );
};

export const isHasAccessToAllSader = (req: Request): boolean => {
  return (
    req.user.usertype.premissions.find((premission: any) => {
      return premission.premission === premissions.hasAccessToAllSader;
    }) || req.user.usertype.type === "admin"
  );
};

export const isHasAccessToBranchSader = (req: Request): boolean => {
  return req.user.usertype.premissions.find((premission: any) => {
    return premission.premission === premissions.hasAccessToBranchSader;
  });
};

export const isHasAccessToBranchWared = (req: Request): boolean => {
  return req.user.usertype.premissions.find((premission: any) => {
    return premission.premission === premissions.hasAccessToBranchWared;
  });
};
