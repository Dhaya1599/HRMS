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

export const MOCK_DASHBOARD = {
  presentDaysThisMonth: 11,
  pendingLeaveCount: 1,
  pendingApprovalsCount: 0,
};

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

/** Mock attendance: Oct 2023, Feb 2025, Feb 2026 — varied statuses and hours */
const loc = { latitude: 12.97, longitude: 77.59 };
const loc0 = { latitude: 0, longitude: 0 };
function att(id: string, date: string, checkIn: string, checkOut: string, status: 'present' | 'late' | 'absent' | 'half_day', hours: number) {
  return {
    id,
    date,
    checkInTime: checkIn,
    checkOutTime: checkOut,
    checkInLocation: loc,
    checkOutLocation: loc,
    status,
    workingHours: hours,
  } as const;
}
function attAbsent(id: string, date: string) {
  return { id, date, checkInTime: '—', checkOutTime: '—', checkInLocation: loc0, checkOutLocation: loc0, status: 'absent' as const, workingHours: 0 };
}

export const MOCK_ATTENDANCE_RECORDS = [
  att('att-o1', '2023-10-02', '09:00', '18:00', 'present', 9),
  att('att-o2', '2023-10-03', '09:05', '18:10', 'present', 9.08),
  att('att-o3', '2023-10-04', '09:30', '18:00', 'late', 8.5),
  att('att-o4', '2023-10-05', '09:00', '17:30', 'present', 8.5),
  att('att-o5', '2023-10-06', '09:15', '18:15', 'present', 9),
  attAbsent('att-o6', '2023-10-07'),
  attAbsent('att-o7', '2023-10-08'),
  att('att-o8', '2023-10-09', '08:55', '18:00', 'present', 9.08),
  att('att-o9', '2023-10-10', '09:00', '18:30', 'present', 9.5),
  att('att-o10', '2023-10-11', '09:40', '18:00', 'late', 8.33),
  att('att-o11', '2023-10-12', '09:00', '18:00', 'present', 9),
  att('att-o12', '2023-10-13', '09:00', '13:00', 'half_day', 4),
  att('att-o13', '2023-10-16', '09:10', '18:20', 'present', 9.17),
  att('att-o14', '2023-10-17', '09:00', '18:00', 'present', 9),
  attAbsent('att-o15', '2023-10-18'),
  att('att-o16', '2023-10-19', '09:00', '18:30', 'present', 9.5),
  att('att-o17', '2023-10-20', '09:45', '18:00', 'late', 8.25),
  att('att-o18', '2023-10-23', '09:00', '18:15', 'present', 9.25),
  att('att-o19', '2023-10-24', '08:50', '17:45', 'present', 8.92),
  att('att-o20', '2023-10-25', '09:00', '18:00', 'present', 9),
  att('att-o21', '2023-10-26', '09:20', '18:10', 'present', 8.83),
  att('att-o22', '2023-10-27', '09:00', '18:00', 'present', 9),
  att('att-o23', '2023-10-30', '09:00', '18:30', 'present', 9.5),
  att('att-o24', '2023-10-31', '09:15', '17:45', 'present', 8.5),
  att('att-f1', '2025-02-01', '09:00', '18:00', 'present', 9),
  att('att-f2', '2025-02-02', '09:10', '18:15', 'present', 9.08),
  att('att-f3', '2025-02-03', '08:55', '18:00', 'present', 9.08),
  attAbsent('att-f4', '2025-02-04'),
  att('att-f5', '2025-02-05', '09:00', '18:30', 'present', 9.5),
  att('att-f6', '2025-02-06', '09:35', '18:00', 'late', 8.42),
  att('att-f7', '2025-02-07', '09:00', '18:00', 'present', 9),
  att('att-f8', '2025-02-08', '09:00', '17:00', 'half_day', 8),
  att('att-f9', '2025-02-09', '09:00', '18:00', 'present', 9),
  att('att-f10', '2025-02-10', '09:15', '18:15', 'present', 9),
  att('att-f11', '2025-02-11', '09:00', '18:00', 'present', 9),
  att('att-f12', '2025-02-12', '09:00', '18:45', 'present', 9.75),
  att('att-f13', '2025-02-13', '09:00', '18:00', 'present', 9),
  att('att-f14', '2025-02-14', '09:15', '18:30', 'present', 8.25),
  att('att-f15', '2025-02-15', '09:00', '18:00', 'present', 9),
  att('att-f16', '2025-02-16', '09:25', '18:00', 'late', 8.58),
  att('att-f17', '2025-02-17', '09:00', '18:00', 'present', 9),
  attAbsent('att-f18', '2025-02-18'),
  att('att-f19', '2025-02-19', '09:00', '18:30', 'present', 9.5),
  att('att-f20', '2025-02-20', '09:00', '18:00', 'present', 9),
  att('att-f21', '2025-02-21', '09:40', '18:00', 'late', 8.33),
  att('att-f22', '2025-02-22', '09:00', '18:00', 'present', 9),
  att('att-f23', '2025-02-23', '09:00', '17:30', 'present', 8.5),
  att('att-f24', '2025-02-24', '09:00', '18:00', 'present', 9),
  att('att-f25', '2025-02-25', '09:00', '18:15', 'present', 9.25),
  att('att-f26', '2025-02-26', '09:10', '18:00', 'present', 8.83),
  att('att-f27', '2025-02-27', '09:00', '18:00', 'present', 9),
  att('att-f28', '2025-02-28', '09:00', '18:30', 'present', 9.5),
  att('att-n1', '2026-02-01', '09:00', '18:00', 'present', 9),
  att('att-n2', '2026-02-02', '09:05', '18:10', 'present', 9.08),
  att('att-n3', '2026-02-03', '09:00', '18:00', 'present', 9),
  att('att-n4', '2026-02-04', '09:30', '18:00', 'late', 8.5),
  att('att-n5', '2026-02-05', '09:00', '18:30', 'present', 9.5),
  att('att-n6', '2026-02-06', '09:00', '18:00', 'present', 9),
  att('att-n7', '2026-02-07', '09:15', '18:15', 'present', 9),
  att('att-n8', '2026-02-08', '09:00', '18:00', 'present', 9),
  att('att-n9', '2026-02-09', '09:00', '17:45', 'present', 8.75),
  att('att-n10', '2026-02-10', '09:00', '18:00', 'present', 9),
  att('att-n11', '2026-02-11', '09:20', '18:00', 'present', 8.67),
  att('att-n12', '2026-02-12', '09:00', '18:00', 'present', 9),
  att('att-n13', '2026-02-13', '09:00', '18:30', 'present', 9.5),
  att('att-n14', '2026-02-14', '09:00', '18:00', 'present', 9),
  att('att-n15', '2026-02-15', '09:45', '18:00', 'late', 8.25),
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

/** Notifications (mock) — matches GET /api/v1/notifications */
export const MOCK_NOTIFICATIONS = [
  { id: 'n1', userId: 'demo-1', title: 'Leave approved', body: 'Your casual leave for Feb 20–21 has been approved.', type: 'leave', referenceId: 'lv-2', isRead: false, createdAt: '2025-02-15T10:00:00Z' },
  { id: 'n2', userId: 'demo-1', title: 'Attendance reminder', body: 'Don’t forget to punch out before leaving.', type: 'attendance', referenceId: null, isRead: true, createdAt: '2025-02-14T17:30:00Z' },
  { id: 'n3', userId: 'demo-1', title: 'New announcement', body: 'Office closed on Dec 25 — Christmas.', type: 'announcement', referenceId: 'a1', isRead: true, createdAt: '2025-12-20T09:00:00Z' },
];

export const MOCK_UNREAD_COUNT = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;

/** Geofence zones (mock) — matches GET /api/v1/geofences */
export const MOCK_GEOFENCES = [
  { id: 'gf1', name: 'HQ Main', latitude: 12.9716, longitude: 77.5946, radius: 200, orgId: 'org-1' },
  { id: 'gf2', name: 'Branch North', latitude: 13.0827, longitude: 80.2707, radius: 150, orgId: 'org-1' },
];

/** Employee–geofence assignments (mock) */
export const MOCK_EMPLOYEE_GEOFENCES = [
  { id: 'eg1', employeeId: 'demo-1', geofenceId: 'gf1', approvedBy: 'admin-1' },
];

/** Short permissions / hour-based leave (mock) — GET /api/v1/permissions/my */
export const MOCK_PERMISSIONS = [
  { id: 'perm-1', employeeId: 'demo-1', date: '2025-02-14', fromTime: '10:00', toTime: '11:00', reason: 'Doctor visit', status: 'approved' as const, approvedBy: 'Jordan Vane', createdAt: '2025-02-13T09:00:00Z' },
  { id: 'perm-2', employeeId: 'demo-1', date: '2025-02-18', fromTime: '14:00', toTime: '15:00', reason: 'Personal', status: 'pending' as const, createdAt: '2025-02-16T10:00:00Z' },
];

/** Manager dashboard (mock) — GET /api/v1/dashboard/manager */
export const MOCK_MANAGER_DASHBOARD = {
  teamAttendanceSummary: { present: 8, absent: 1, onLeave: 1, late: 1 },
  pendingLeaveApprovals: 3,
  pendingPermissionApprovals: 1,
  exceptions: [
    { id: 'ex1', employeeId: 'mem-3', employeeName: 'Sam Williams', type: 'late_login', date: '2025-02-14', checkInTime: '09:45' },
    { id: 'ex2', employeeId: 'mem-2', employeeName: 'Jordan Vane', type: 'no_punch_out', date: '2025-02-13' },
  ] as const,
};

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
