export interface StageTable {
  stages: Record<string, Stage>;
}

export interface Stage {
  stageType: string;
  difficulty: string;
  performanceStageFlag: string;
  diffGroup: string;
  unlockCondition: {
    stageId: string;
    completeState: string;
  }[];
  stageId: string;
  levelId: string | null;
  zoneId: string;
  code: string;
  name: string;
  description: string | null;
  hardStagedId: string | null;
  dangerLevel: string;
  dangerPoint: number;
  loadingPicId: string;
  canPractice: boolean;
  canBattleReplay: boolean;
  apCost: number;
  apFailReturn: number;
  etItemId: null;
  etCost: number;
  etFailReturn: number;
  etButtonStyle: null;
  apProtectTimes: number;
  diamondOnceDrop: number;
  practiceTicketCost: number;
  dailyStageDifficulty: number;
  expGain: number;
  goldGain: number;
  loseExpGain: number;
  loseGoldGain: number;
  passFavor: number;
  completeFavor: number;
  slProgress: number;
  displayMainItem: string;
  hilightMark: boolean;
  bossMark: boolean;
  isPredefined: boolean;
  isHardPredefined: boolean;
  isSkillSelectablePredefined: boolean;
  isStoryOnly: boolean;
  appearanceStyle: string;
  stageDropInfo: {
    firstPassRewards: boolean;
    firstCompleteRewards: null;
    passRewards: null;
    completeRewards: null;
    displayRewards: {
      type: string;
      id: string;
      dropType: string;
    }[];
    displayDetailRewards: {
      occPercent: string;
      type: string;
      id: string;
      dropType: string;
    }[];
  };
  canUseCharm: boolean;
  canUseTech: boolean;
  canUseTrapTool: boolean;
  canUseBattlePerformance: boolean;
  startButtonOverrideId: null;
  isStagePatch: boolean;
  mainStageId: string;
  extraCondition: null;
  extraInfo: null;
}
