export type activityToStage = Record<
  string,
  { name: string; id: string; stages: { id: string; name: string }[] }
>;
