export interface HandbookChar {
  charID: string;
  infoName: string;
  isLimited: boolean;
  storyTextAudio: {
    stories: {
      storyText: string;
      unLockType: string;
      unLockParam: string;
      unLockString: string;
    }[];
    storyTitle: string;
    unLockorNot: boolean;
  }[];
}

export interface HandbookInfo {
  handbookDict: {
    [charID: string]: HandbookChar;
  };
}
