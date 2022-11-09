import React from "react";

export interface GlobalVariableType {
  userId?: number;
  setUserId?: (userId: number) => void;
  hasProfile?: boolean;
  setHasProfile?: (boolean: boolean) => void;
  ranks?: string[];
  flights?: string[];
  cats?: string[];
  positions?: string[];
}

const GlobalVariables = React.createContext<GlobalVariableType>({});

export default GlobalVariables;
