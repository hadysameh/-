import { store } from "../store";
import { premissions } from "../types";
function getUserPremissions() {
  return store.getState().userSlice.premissions;
}
function getUserType() {
  return store.getState().userSlice.userType;
}
function hasPremission(premissionName: string): boolean {
  let userType = getUserType();
  let premissions = getUserPremissions();
  console.log({ premissions });
  if (premissions?.length) {
    for (let index = 0; index < premissions.length; index++) {
      const premission = premissions[index];
      if (premissionName === premission) {
        return true;
      }
    }
  }
  if (userType === "admin") {
    return true;
  }

  return false;
}

export function hasAddWaredPremission(): boolean {
  return hasPremission(premissions.addWared);
}

export function hasEditWaredPremission(): boolean {
  return hasPremission(premissions.editWared);
}

export function hasAddSaderPremission(): boolean {
  return hasPremission(premissions.addSader);
}

export function hasEditSaderPremission(): boolean {
  return hasPremission(premissions.editSader);
}

export function hasDeleteWaredPremission(): boolean {
  return hasPremission(premissions.deleteWared);
}

export function hasDeleteSaderPremission(): boolean {
  return hasPremission(premissions.deleteSader);
}

export function hasAccessToAllWared(): boolean {
  return hasPremission(premissions.hasAccessToAllWared);
}

export function hasAccessToAllSader(): boolean {
  return hasPremission(premissions.hasAccessToAllSader);
}

export function hasAccessToAllBranches(): boolean {
  return hasPremission(premissions.hasAccessToAllBranches);
}

export function hasAccessToAllOfficers(): boolean {
  return hasPremission(premissions.hasAccessToAllOfficers);
}

export function hasAccessToBranchOfficers(): boolean {
  return hasPremission(premissions.hasAccessToBranchOfficers);
}

export function hasAccessToEditWaredOfficers(): boolean {
  return hasPremission(premissions.editWaredOfficers);
}

export function hasAccessToEditWaredBranchs(): boolean {
  return hasPremission(premissions.editWaredBranchs);
}
