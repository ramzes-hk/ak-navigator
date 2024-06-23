export type StoryReviewTable = Record<string, Act>;

export interface Act {
  id: string;
  name: string;
  entryType: "NONE" | "MINI_ACTIVITY" | "MAINLINE" | "ACTIVITY";
  actType: string;
  startTime: Date;
  endTime: Date;
  startShowTime: Date;
  endShowTime: Date;
  remakeStartTime: Date;
  remakeEndTime: Date;
  storyEntryPicId: string;
  storyPicId: null;
  storyMainColor: null;
  customType: number;
  storyCompleteMedalId: null;
  rewards: [];
  infoUnlockDatas: {
    storyReviewType: string;
    storyId: string;
    storyGroup: string;
    storySort: number;
    storyDependence: null;
    storyCanShow: number;
    storyCode: string;
    storyName: string;
    storyPic: null;
    storyInfo: string;
    storyCanEnter: number;
    storyTxt: string;
    avgTag: string;
    unLockType: string;
    costItemType: string;
    costItemId: null;
    costItemCount: number;
    stageCount: number;
    requiredStages: {
      stageId: string;
      minState: string;
      maxState: string;
    }[];
  }[];
}
