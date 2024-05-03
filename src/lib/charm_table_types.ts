export interface CharmTable {
  charmList: Charm[];
}

export interface Charm {
  id: string;
  sort: number;
  name: string;
  icon: string;
  itemUsage: string;
  itemDesc: string;
  itemObtainApproach: string;
  rarity: string;
  desc: string;
  price: number;
  specialObtainApproach: string;
  charmType: string;
  obtainInRandom: boolean;
  dropStages: [];
  runeData: {
    id: string;
    points: number;
    mutexGroupKey: null;
    description: string;
    runes: {
      key: string;
      selector: {
        professionMask: string;
        buildableMask: string;
        charIdFilter: null;
        enemyIdFilter: null;
        enemyIdExcludeFilter: null;
        skillIdFilter: null;
        tileKeyFilter: null;
        groupTagFilter: null;
        filterTagFilter: null;
        subProfessionExcludeFilter: null;
      };
      blackboard: {
        key: string;
        value: number;
        valueStr: null;
      }[];
    }[];
  };
}
