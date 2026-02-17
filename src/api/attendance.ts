/**
 * Mock only — no backend.
 */
import { ApiResponse, LocationCoordinates } from '@types/index';
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
      status: 'present',
    });
    return {
      success: true,
      data: {
        id: `att-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        checkInTime: t,
        checkInLocation: { latitude: 0, longitude: 0 },
        status: 'present',
      },
    };
  },
  async checkOut(_location: LocationCoordinates): Promise<ApiResponse<AttendanceRecord>> {
    const outTime = nowTime();
    const today = getMockTodayAttendance();
    setMockTodayAttendance({
      hasCheckedOut: true,
      checkOutTime: outTime,
      workingHours: 8,
      status: 'present',
    });
    return {
      success: true,
      data: {
        id: `att-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        checkInTime: today.checkInTime || '09:00',
        checkOutTime: outTime,
        checkInLocation: { latitude: 0, longitude: 0 },
        checkOutLocation: { latitude: 0, longitude: 0 },
        status: 'present',
        workingHours: 8,
      },
    };
  },
  async getTodayAttendance(): Promise<ApiResponse<TodayAttendance>> {
    return { success: true, data: getMockTodayAttendance() };
  },
  async getAttendanceHistory(
    _page: number = 1,
    pageSize: number = 100
  ): Promise<ApiResponse<{ records: AttendanceRecord[]; total: number }>> {
    const records = MOCK_ATTENDANCE_RECORDS.slice(0, pageSize) as AttendanceRecord[];
    return { success: true, data: { records, total: MOCK_ATTENDANCE_RECORDS.length } };
  },
  async getAttendanceDetails(id: string): Promise<ApiResponse<AttendanceRecord>> {
    const record = MOCK_ATTENDANCE_RECORDS.find((r) => r.id === id);
    if (!record) return { success: false, error: 'Not found' };
    return { success: true, data: record as AttendanceRecord };
  },
};
