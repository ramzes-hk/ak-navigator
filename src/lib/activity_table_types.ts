export interface ActivityTable {
  basicInfo: Record<string, Activity>;
  zoneToActivity: Record<string, string>;
}

export interface Activity {
  id: string;
  type: string;
  displayType: string;
  name: string;
  startTime: Date;
  endTime: Date;
  rewardEndTime: Date;
  displayOnHome: boolean;
  hasStage: boolean;
  templateShopId: string | null;
  medalGroupId: string | null;
  ungroupedMedalIds: string[] | null;
  isReplicate: boolean;
  needFixedSync: boolean;
}
