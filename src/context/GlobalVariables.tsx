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

export interface PositionAssessment {
  id?: string;
  user_position_id: string;
  assessment_number: number;
  instructor: string;
  date: number;
  intensity: number;
  objective1: string;
  objective2: string | undefined;
  objective3: string | undefined;
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  g: number;
  h: number;
  i: number;
  j: number;
  safety: boolean;
  grade?: number;
  remarks: string;
  is_simulator: boolean;
}

export interface GlobalVariableType {
  accessToken?: any;
  userId?: string;
  hasProfile?: boolean;
  userProfile?: UserProfile;
  userPositions?: UserPositions[];
  positionAssessments?: PositionAssessment[];
  isInstructor?: boolean;
  isAdmin?: boolean;
  ranks?: string[];
  flights?: string[];
  cats?: string[];
  positions?: string[];
  setUserId?: (userId: string) => void;
  setHasProfile?: (boolean: boolean) => void;
  setUserProfile?: (
    callback: UserProfile | ((object: UserProfile) => UserProfile)
  ) => void;
  setUserPositions?: (
    callback: UserPositions[] | ((array: UserPositions[]) => UserPositions[])
  ) => void;
  setPositionAssessments?: (
    callback:
      | PositionAssessment[]
      | ((array: PositionAssessment[]) => PositionAssessment[])
  ) => void;
  setIsInstructor?: (boolean: boolean) => void;
  setIsAdmin?: (boolean: boolean) => void;
  setRanks?: (callback: string[] | ((array: string[]) => string[])) => void;
  setFlights?: (callback: string[] | ((array: string[]) => string[])) => void;
  setPositions?: (callback: string[] | ((array: string[]) => string[])) => void;
  setCats?: (callback: string[] | ((array: string[]) => string[])) => void;
}

const GlobalVariables = React.createContext<GlobalVariableType>({});

export default GlobalVariables;
