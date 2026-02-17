/**
 * Mock only — no backend.
 */
import type { ApiResponse } from '../types';
import { MOCK_LEAVE_RECORDS, MOCK_LEAVE_BALANCE } from '../data/mockData';

export interface LeaveRequest {
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
}

export interface LeaveRecord {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  status: string;
  reason: string;
  approvedBy?: string;
  createdAt: string;
}

export interface LeaveBalance {
  sick: number;
  casual: number;
  earned: number;
}

export const leaveApi = {
  async applyLeave(request: LeaveRequest): Promise<ApiResponse<LeaveRecord>> {
    return {
      success: true,
      data: {
        id: `lv-${Date.now()}`,
        ...request,
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    };
  },

  async getLeaveRequests(): Promise<ApiResponse<LeaveRecord[]>> {
    return { success: true, data: [...MOCK_LEAVE_RECORDS] };
  },

  async getLeaveBalance(): Promise<ApiResponse<LeaveBalance>> {
    return { success: true, data: { ...MOCK_LEAVE_BALANCE } };
  },
};
