import { Enemy } from "./enemy_database_types";

export interface ActivityFile {
  options: {
    characterLimit: number;
    maxLifePoint: number;
    initialCost: number;
    maxCost: number;
    costIncreaseTime: number;
    moveMultiplier: number;
    steeringEnabled: boolean;
    isTrainingLevel: boolean;
    isHardTrainingLevel: boolean;
    isPredefinedCardsSelectable: boolean;
    maxPlayTime: number;
    functionDisableMask: string;
    configBlackBoard: null;
  };
  levelId: null;
  mapId: null;
  bgmEvent: string;
  environmentSe: null;
  mapData: {
    map: number[][];
    tiles: {
      tileKey: string;
      heightType: string;
      buildableType: string;
      passableMask: string;
      playerSideMask: string;
      blackboard: null;
      effects: null;
    }[];
    blockEdges: null;
    tags: null;
    effects: null;
    layerRects: null;
  };
  tilesDisallowToLocate: [];
  runes: [
    {
      difficultyMask: string;
      key: string;
      professionMask: number;
      buildableMask: string;
      blackboard: {
        key: string;
        value: number;
        valueStr: null;
      }[];
    },
  ];
  globalBuffs: null;
  routes: {
    motionMode: string;
    startPosition: {
      row: number;
      col: number;
    };
    endPosition: {
      row: number;
      col: number;
    };
    spawnRandomRange: {
      x: number;
      y: number;
    };
    spawnOffset: {
      x: number;
      y: number;
    };
    checkpoints:
      | {
          type: string;
          time: number;
          position: {
            row: number;
            col: number;
          };
          reachOffset: {
            x: number;
            y: number;
          };
          randomizeReachOffset: boolean;
          reachDistance: number;
        }[]
      | null;
    allowDiagonalMove: boolean;
    visitEveryTileCenter: boolean;
    visitEveryNodeCenter: boolean;
    visitEveryCheckPoint: boolean;
  }[];
  extraRoutes: [];
  enemies: [];
  enemyDbRefs: {
    useDb: boolean;
    id: string;
    level: number;
    overwrittenData: Enemy["Value"][number]["enemyData"] | null;
  }[];
  waves: {
    preDelay: number;
    postDelay: number;
    maxTimeWaitingForNextWave: number;
    fragments: {
      preDelay: number;
      actions: {
        actionType: string;
        managedByScheduler: boolean;
        key: string;
        count: number;
        preDelay: number;
        interval: number;
        routeIndex: number;
        blockFragment: boolean;
        autoPreviewRoute: boolean;
        autoDisplayEnemyInfo: boolean;
        isUnharmfulAndAlwaysCountAsKilled: boolean;
        hiddenGroup: null;
        randomSpawnGroupKey: null;
        randomSpawnGroupPackKey: null;
        randomType: string;
        weight: number;
        dontBlockWave: boolean;
        isValid: boolean;
        extraMeta: null;
      }[];
    }[];
    advancedWaveTag: null;
  }[];
  branches: null;
  predefines: {
    characterInsts: [];
    tokenInsts: {
      position: {
        row: number;
        col: number;
      };
      direction: string;
      hidden: boolean;
      alias: null;
      uniEquipIds: null;
      inst: {
        characterKey: string;
        level: number;
        phase: string;
        favorPoint: number;
        potentialRank: number;
      };
      skillIndex: number;
      mainSkillLvl: number;
      skinId: null;
      tmplId: null;
      overrideSkillBlackboard: null;
    }[];
    characterCards: [];
    tokenCards: [];
  };
  hardPredefines: null;
  excludeCharIdList: null;
  randomSeed: number;
  operaConfig: null;
  runtimeData: null;
}
