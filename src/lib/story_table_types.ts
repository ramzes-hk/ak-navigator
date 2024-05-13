export interface StoryTable {
  [storyId: string]: StoryTableEntry;
}

export interface StoryTableEntry {
  id: string;
  needCommit: boolean;
  repeatable: boolean;
  disabled: boolean;
  videoResource: boolean;
  trigger: {
    type: string;
    key: null;
    useRegex: boolean;
  };
  condition: {
    minProgress: number;
    maxProgress: number;
    minPlayerLevel: number;
    requiredFlags: [];
    excludedFlags: [];
    requiredStages: {
      stageId: string;
      minState: string;
      maxState: string;
    }[];
  };
  setProgress: number;
  setFlags: [];
  completedRewards: [];
}
