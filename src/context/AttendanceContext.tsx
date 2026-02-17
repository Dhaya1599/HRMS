import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Alert } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { attendanceApi } from '../api/attendance';

export interface TodayAttendanceState {
  hasCheckedIn?: boolean;
  hasCheckedOut?: boolean;
  checkInTime?: string;
  checkOutTime?: string;
  workingHours?: number;
  status?: string;
}

interface AttendanceContextType {
  todayAttendance: TodayAttendanceState | null;
  punchLoading: boolean;
  refreshAttendance: () => Promise<void>;
  punchIn: () => Promise<void>;
  punchOut: () => Promise<void>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { location, getCurrentLocation } = useLocation();
  const [todayAttendance, setTodayAttendance] = useState<TodayAttendanceState | null>(null);
  const [punchLoading, setPunchLoading] = useState(false);

  const refreshAttendance = useCallback(async () => {
    try {
      const response = await attendanceApi.getTodayAttendance();
      if (response.success && response.data) setTodayAttendance(response.data);
    } catch (error) {
      console.error('Error loading today attendance:', error);
    }
  }, []);

  const punchIn = useCallback(async () => {
    setPunchLoading(true);
    try {
      const loc = location ?? { latitude: 0, longitude: 0, timestamp: Date.now() };
      const response = await attendanceApi.checkIn(loc);
      if (response.success) {
        await refreshAttendance();
      } else Alert.alert('Error', response.error || 'Punch In failed');
    } catch (error: unknown) {
      Alert.alert('Error', (error as Error)?.message || 'Punch In failed');
    } finally {
      setPunchLoading(false);
    }
  }, [location, refreshAttendance]);

  const punchOut = useCallback(async () => {
    setPunchLoading(true);
    try {
      const loc = location ?? { latitude: 0, longitude: 0, timestamp: Date.now() };
      const response = await attendanceApi.checkOut(loc);
      if (response.success) {
        await refreshAttendance();
      } else Alert.alert('Error', response.error || 'Punch Out failed');
    } catch (error: unknown) {
      Alert.alert('Error', (error as Error)?.message || 'Punch Out failed');
    } finally {
      setPunchLoading(false);
    }
  }, [location, refreshAttendance]);

  const value: AttendanceContextType = {
    todayAttendance,
    punchLoading,
    refreshAttendance,
    punchIn,
    punchOut,
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = (): AttendanceContextType => {
  const context = useContext(AttendanceContext);
  if (!context) throw new Error('useAttendance must be used within AttendanceProvider');
  return context;
};
