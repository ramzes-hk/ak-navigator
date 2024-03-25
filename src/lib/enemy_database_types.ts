import { Blackboard } from "./operators_types";

export interface EnemyDatabase {
  enemies: Enemy[];
}

export interface Enemy {
  Key: string;
  Value: Value[];
}

interface Value {
  level: number;
  enemyData: {
    name: DefineValue<string>;
    desc: DefineValue<string>;
    prefabKey: DefineValue<string>;
    attributes: {
      maxHp: DefineValue<number>;
      atk: DefineValue<number>;
      def: DefineValue<number>;
      magicResistance: DefineValue<number>;
      cost: DefineValue<number>;
      blockCnt: DefineValue<number>;
      moveSpeed: DefineValue<number>;
      attackSpeed: DefineValue<number>;
      baseAttackTime: DefineValue<number>;
      respawnTime: DefineValue<number>;
      hpRecoveryPerSec: DefineValue<number>;
      spRecoveryPerSec: DefineValue<number>;
      maxDeployCount: DefineValue<number>;
      massLevel: DefineValue<number>;
      baseForceLevel: DefineValue<number>;
      tauntLevel: DefineValue<number>;
      epDamageResistance: DefineValue<number>;
      stunImmune: DefineValue<boolean>;
      silenceImmune: DefineValue<boolean>;
      sleepImmune: DefineValue<boolean>;
      frozenImmune: DefineValue<boolean>;
      levitateImmune: DefineValue<boolean>;
    };
    applyWay: DefineValue<ApplyWay>;
    motion: DefineValue<Motion>;
    enemyTags: DefineValue<Race[]>;
    lifePointReduce: DefineValue<number>;
    levelType: DefineValue<LevelType>;
    rangeRadius: DefineValue<number>;
    numOfExtraDrops: DefineValue<number>;
    viewRadius: DefineValue<number>;
    notCountInTotal: DefineValue<boolean>;
    talentBlackboard: Blackboard[] | null;
    skills: EnemySkill[] | null;
    spData: EnemySpData | null;
  };
}

interface EnemySkill {
  prefabKey: string;
  priority: number;
  cooldown: number;
  initCooldown: number;
  spCost: number;
  blackboard: Blackboard[] | null;
}

interface EnemySpData {
  spType: string;
  maxSp: number;
  initSp: number;
  increment: number;
}

export const levelTypes = { NORMAL: "Normal", Elite: "Elite", BOSS: "Boss" };
export type LevelType = keyof typeof levelTypes;

export const motionTypes = { WALK: "Ground", FLY: "Flying" };
export type Motion = keyof typeof motionTypes;

export const applyWayTypes = { NONE: "None", MELEE: "Melee", RANGED: "Ranged" };
export type ApplyWay = keyof typeof applyWayTypes;

export const damageTypes = {
  NO_DAMAGE: "Null",
  PHYSIC: "Physical",
  MAGIC: "Arts",
  HEAL: "Healing",
};
export type DamageType = keyof typeof damageTypes;

interface DefineValue<
  T extends
    | string
    | number
    | boolean
    | LevelType
    | Race[]
    | Motion
    | ApplyWay
    | DamageType,
> {
  m_defined: boolean;
  m_value: T;
}
export const raceData = {
  infection: {
    id: "infection",
    raceName: "Infected Creature",
    sortId: 1,
  },
  drone: {
    id: "drone",
    raceName: "Drone",
    sortId: 2,
  },
  sarkaz: {
    id: "sarkaz",
    raceName: "Sarkaz",
    sortId: 3,
  },
  mutant: {
    id: "mutant",
    raceName: "Possessed",
    sortId: 4,
  },
  seamonster: {
    id: "seamonster",
    raceName: "Sea Monster",
    sortId: 5,
  },
  originiumartscraft: {
    id: "originiumartscraft",
    raceName: "Arts Creation",
    sortId: 6,
  },
  animated: {
    id: "animated",
    raceName: "Apparition",
    sortId: 7,
  },
  machine: {
    id: "machine",
    raceName: "Machina",
    sortId: 8,
  },
  wildanimal: {
    id: "wildanimal",
    raceName: "Wild Beast",
    sortId: 9,
  },
  collapsal: {
    id: "collapsal",
    raceName: "Collapsal",
    sortId: 10,
  },
};

export type Race = keyof typeof raceData;
