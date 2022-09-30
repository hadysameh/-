export enum waredBoxType {
    normal = "normal wared box",
    red = "red circle wared box",
    green = "green circle wared box",
  }
export enum premissions{
  addSader='add sader',
  addWared='add wared',
  deleteSader='delete sader',
  deleteWared='delete wared',
  editSader='edit sader',
  editWared='edit wared',
  editWaredBranchs='edit wared branches',
  editWaredOfficers='edit wared officers',
  hasAccessToAllBranches='has access to all branches',
  hasAccessToAllOfficers='has access to all officers',
  hasAccessToAllSader='has access to all sader',
  hasAccessToAllWared='has access to all wared',
  hasAccessToBranchOfficers='has access to branch officers',
  hasAccessToBranchSader='has access to branch sader',
  hasAccessToBranchWared='has access to branch wared',
}

export enum socketIoEvent {
  refetchWared = "refetchWared",
  refetchSader = "refetchSader",
}