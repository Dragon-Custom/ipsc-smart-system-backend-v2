import config from "../config";

const divisions = [...config.ipsc.division];
export type Division = (typeof divisions)[0];
