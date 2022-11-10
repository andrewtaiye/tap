import React from "react";

export interface UserProfile {
  user_id?: string;
  username?: string;
  rank?: string;
  full_name?: string;
  date_of_birth?: string;
  id_number?: string;
  date_accepted?: string;
  reporting_date?: string;
  flight?: string;
  cat?: string;
}

export interface UserPositions {
  id?: string;
  user_id?: string;
  position?: string;
  start_date?: string;
  end_date?: string;
  approval_date?: string;
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
