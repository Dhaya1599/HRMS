/**
 * Mock data only — no backend, no network.
 */
import { LeaveType, LeaveStatus } from '../types/index';
import type { User } from '../types/index';

export const MOCK_USER: User = {
  id: 'demo-1',
  name: 'Alex Sterling',
  email: 'alex.sterling@company.com',
  employeeId: 'EMP-2024-089',
  department: 'Design & Creative',
  role: 'manager',
  phone: '+1 (555) 012-3456',
  joinDate: '2021-10-12',
};

export const MOCK_PROFILE_EXTENDED = {
  designation: 'Senior Product Designer',
  reportingManager: 'Jordan Vane',
  employmentType: 'Full-Time',
  approvedWorkLocation: 'HQ — Design & Creative Wing, Floor 2',
  address: '123 Oak Street, Apt 4B, San Francisco, CA 94102',
  emergencyContact: {
    name: 'Sarah Sterling',
    relationship: 'Spouse',
    phone: '+1 (555) 987-6543',
  },
  reportingHierarchy: ['Jordan Vane (Manager)', 'Design & Creative'],
};

/** Leave type display labels (CL = Casual, SL = Sick, EL = Earned) */
export const LEAVE_TYPE_LABELS: Record<string, string> = {
  sick: 'SL',
  casual: 'CL',
  earned: 'EL',
  maternity: 'ML',
  paternity: 'PL',
  unpaid: 'UL',
};

export const MOCK_HOLIDAYS = [
  { date: '2025-09-04', name: 'Labor Day' },
  { date: '2025-01-01', name: 'New Year' },
  { date: '2025-03-21', name: 'Holi' },
  { date: '2025-04-18', name: 'Good Friday' },
  { date: '2025-08-15', name: 'Independence Day' },
  { date: '2025-10-02', name: 'Gandhi Jayanti' },
  { date: '2025-12-25', name: 'Christmas' },
];

export const MOCK_ANNOUNCEMENTS = [
  { id: 'a1', title: 'Office closed on Dec 25', body: 'Company holiday — Christmas. All units closed.', date: '2025-12-20', target: 'All' },
  { id: 'a2', title: 'New leave policy', body: 'From Jan 2025, EL carry-forward limit is 5 days. Submit by Mar 31.', date: '2025-01-05', target: 'All' },
  { id: 'a3', title: 'Design & Creative — Team meet', body: 'Monthly sync on first Friday, 3 PM in Conference Room B.', date: '2025-02-01', target: 'Design & Creative' },
];

export const MOCK_LEAVE_RECORDS = [
  {
    id: 'lv-1',
    startDate: '2025-02-10',
    endDate: '2025-02-11',
    type: LeaveType.SICK,
    status: LeaveStatus.APPROVED,
    reason: 'Flu',
    approvedBy: 'Jordan Vane',
    createdAt: '2025-02-05T10:00:00Z',
  },
  {
    id: 'lv-2',
    startDate: '2025-02-20',
    endDate: '2025-02-21',
    type: LeaveType.CASUAL,
    status: LeaveStatus.PENDING,
    reason: 'Personal',
    createdAt: '2025-02-14T09:00:00Z',
  },
];

export const MOCK_LEAVE_BALANCE = { sick: 5, casual: 10, earned: 14 };

export const MOCK_ATTENDANCE_RECORDS = [
  { id: 'att-1', date: '2023-10-23', checkInTime: '09:00', checkOutTime: '18:15', checkInLocation: { latitude: 0, longitude: 0 }, checkOutLocation: { latitude: 0, longitude: 0 }, status: 'present' as const, workingHours: 9.25 },
  { id: 'att-2', date: '2023-10-20', checkInTime: '09:45', checkOutTime: '18:00', checkInLocation: { latitude: 0, longitude: 0 }, checkOutLocation: { latitude: 0, longitude: 0 }, status: 'late' as const, workingHours: 8.25 },
  { id: 'att-3', date: '2023-10-19', checkInTime: '09:00', checkOutTime: '18:30', checkInLocation: { latitude: 0, longitude: 0 }, checkOutLocation: { latitude: 0, longitude: 0 }, status: 'present' as const, workingHours: 9.5 },
  { id: 'att-4', date: '2023-10-18', checkInTime: '—', checkOutTime: '—', checkInLocation: { latitude: 0, longitude: 0 }, checkOutLocation: { latitude: 0, longitude: 0 }, status: 'absent' as const, workingHours: 0 },
  { id: 'att-5', date: '2025-02-14', checkInTime: '09:15', checkOutTime: '18:30', checkInLocation: { latitude: 12.97, longitude: 77.59 }, checkOutLocation: { latitude: 12.97, longitude: 77.59 }, status: 'present' as const, workingHours: 8.25 },
  { id: 'att-6', date: '2025-02-13', checkInTime: '09:00', checkOutTime: '18:00', checkInLocation: { latitude: 12.97, longitude: 77.59 }, checkOutLocation: { latitude: 12.97, longitude: 77.59 }, status: 'present' as const, workingHours: 9 },
];

export const MOCK_TEAM_MEMBERS = [
  { ...MOCK_USER, currentStatus: 'in' as const, lastCheckIn: '09:15', approvedWorkLocation: 'HQ — Design & Creative Wing, Floor 2' },
  {
    id: 'mem-2',
    name: 'Jordan Vane',
    email: 'jordan.v@company.com',
    employeeId: 'EMP-2022-012',
    department: 'Design & Creative',
    role: 'manager' as const,
    joinDate: '2020-03-01',
    currentStatus: 'in' as const,
    lastCheckIn: '08:55',
    approvedWorkLocation: 'HQ — Design & Creative Wing, Floor 2',
  },
  {
    id: 'mem-3',
    name: 'Sam Williams',
    email: 'sam.w@company.com',
    employeeId: 'EMP-2024-022',
    department: 'Design & Creative',
    role: 'employee' as const,
    joinDate: '2024-01-10',
    currentStatus: 'out' as const,
    lastCheckIn: '09:00',
    lastCheckOut: '17:30',
    approvedWorkLocation: 'HQ — Design & Creative Wing, Floor 2',
  },
];

let mockTodayAttendance = {
  hasCheckedIn: false,
  hasCheckedOut: false,
  checkInTime: undefined as string | undefined,
  checkOutTime: undefined as string | undefined,
  workingHours: undefined as number | undefined,
  status: 'absent',
};

export function getMockTodayAttendance() {
  return { ...mockTodayAttendance };
}

export function setMockTodayAttendance(updates: Partial<typeof mockTodayAttendance>) {
  mockTodayAttendance = { ...mockTodayAttendance, ...updates };
}
