/**
 * Mock only — no backend.
 */
import { ApiResponse } from '@types/index';
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
  async getLeaveRequests(): Promise<ApiResponse<{ records: LeaveRecord[]; total: number }>> {
    return { success: true, data: { records: [...MOCK_LEAVE_RECORDS] as LeaveRecord[], total: MOCK_LEAVE_RECORDS.length } };
  },
  async getLeaveBalance(): Promise<ApiResponse<LeaveBalance>> {
    return { success: true, data: MOCK_LEAVE_BALANCE };
  },
};
