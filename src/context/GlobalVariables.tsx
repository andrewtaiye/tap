import React from "react";

export interface GlobalVariableType {
  userId?: number;
  setUserId?: (userId: number) => void;
  hasProfile?: boolean;
  setHasProfile?: (boolean: boolean) => void;
}

const GlobalVariables = React.createContext<GlobalVariableType>({});

export default GlobalVariables;
