import React from "react";

export interface UserProfile {
  user_id?: string;
  username?: string;
  rank?: string;
  full_name?: string;
  date_of_birth?: number;
  id_number?: string;
  date_accepted?: number;
  reporting_date?: number;
  flight?: string;
  cat?: string;
}

export interface UserPositions {
  id?: string;
  user_id?: string;
  position?: string;
  start_date?: number;
  end_date?: number;
  approval_date?: number;
  is_revalidation?: boolean;
  is_instructor?: boolean;
}

export interface GlobalVariableType {
  userId?: string;
  hasProfile?: boolean;
  userProfile?: UserProfile;
  userPositions?: UserPositions[];
  ranks?: string[];
  flights?: string[];
  cats?: string[];
  positions?: string[];
  setUserId?: (userId: string) => void;
  setHasProfile?: (boolean: boolean) => void;
  setUserProfile?: (object: UserProfile) => void;
  setUserPositions?: (
    callback: (array: UserPositions[]) => UserPositions[]
  ) => void; // why does this not work when I put it as Array<UserPositions>
}

const GlobalVariables = React.createContext<GlobalVariableType>({});

export default GlobalVariables;
