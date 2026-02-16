/**
 * Mock only — no backend.
 */
import { ApiResponse } from '@types/index';
import type { User } from '@types/index';
import { MOCK_TEAM_MEMBERS } from '../data/mockData';

export interface TeamMember extends User {
  currentStatus?: 'in' | 'out' | 'on_leave';
  lastCheckIn?: string;
  lastCheckOut?: string;
}

export interface TeamMemberAttendance {
  date: string;
  status: string;
  checkInTime?: string;
  checkOutTime?: string;
}

export const teamApi = {
  async getTeamMembers(): Promise<ApiResponse<{ members: TeamMember[]; total: number }>> {
    return { success: true, data: { members: MOCK_TEAM_MEMBERS as TeamMember[], total: MOCK_TEAM_MEMBERS.length } };
  },
  async getTeamMemberDetails(id: string): Promise<ApiResponse<TeamMember>> {
    const m = MOCK_TEAM_MEMBERS.find((x) => x.id === id);
    if (!m) return { success: false, error: 'Not found' };
    return { success: true, data: m as TeamMember };
  },
  async getTeamMemberAttendance(): Promise<ApiResponse<TeamMemberAttendance[]>> {
    return {
      success: true,
      data: [
        { date: '2025-02-14', status: 'present', checkInTime: '09:00', checkOutTime: '18:00' },
        { date: '2025-02-13', status: 'present', checkInTime: '09:15', checkOutTime: '18:30' },
      ],
    };
  },
};
