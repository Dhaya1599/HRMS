/**
 * Mock only — no backend.
 */
import type { ApiResponse, LocationCoordinates } from '../types';
import {
  MOCK_ATTENDANCE_RECORDS,
  getMockTodayAttendance,
  setMockTodayAttendance,
} from '../data/mockData';

export interface AttendanceRecord {
  id: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  checkInLocation: { latitude: number; longitude: number };
  checkOutLocation?: { latitude: number; longitude: number };
  status: 'present' | 'absent' | 'late' | 'half_day';
  workingHours?: number;
}

export interface TodayAttendance {
  hasCheckedIn: boolean;
  hasCheckedOut: boolean;
  checkInTime?: string;
  checkOutTime?: string;
  workingHours?: number;
  status: string;
}

function nowTime(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export const attendanceApi = {
  async checkIn(_location: LocationCoordinates): Promise<ApiResponse<AttendanceRecord>> {
    const t = nowTime();
    setMockTodayAttendance({
      hasCheckedIn: true,
      hasCheckedOut: false,
      checkInTime: t,
      checkOutTime: undefined,
      workingHours: undefined,
      status: 'present',
    });
    return {
      success: true,
      data: {
        id: `att-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        checkInTime: t,
        checkInLocation: _location,
        status: 'present',
      },
    };
  },

  async checkOut(_location: LocationCoordinates): Promise<ApiResponse<AttendanceRecord>> {
    const t = nowTime();
    const today = getMockTodayAttendance();
    setMockTodayAttendance({
      ...today,
      hasCheckedOut: true,
      checkOutTime: t,
      workingHours: today.workingHours ?? 0,
      status: 'present',
    });
    return {
      success: true,
      data: {
        id: `att-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        checkInTime: today.checkInTime ?? '09:00',
        checkOutTime: t,
        checkInLocation: _location,
        checkOutLocation: _location,
        status: 'present',
        workingHours: today.workingHours,
      },
    };
  },

  async getTodayAttendance(): Promise<ApiResponse<TodayAttendance>> {
    const data = getMockTodayAttendance();
    return { success: true, data };
  },

  async getAttendanceHistory(_page: number, _limit: number): Promise<ApiResponse<AttendanceRecord[]>> {
    return { success: true, data: [...MOCK_ATTENDANCE_RECORDS] };
  },

  getAttendanceByMonth(_year: number, _month: number): Promise<ApiResponse<AttendanceRecord[]>> {
    return Promise.resolve({ success: true, data: MOCK_ATTENDANCE_RECORDS.filter((r) => r.date.startsWith(`${_year}-${String(_month).padStart(2, '0')}`)) });
  },
};
