import { Blackboard } from "./operators";

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
    applyWay: DefineValue<string>;
    motion: DefineValue<string>;
    enemyTags: DefineValue<string[]>;
    lifePointReduce: DefineValue<number>;
    levelType: DefineValue<string>;
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

interface DefineValue<T extends string | number | boolean | string[]> {
  m_defined: boolean;
  m_value: T;
}
