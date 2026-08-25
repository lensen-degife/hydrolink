const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function formatEtb(amount: string | number | null | undefined): string {
  if (amount === null || amount === undefined) return '0';
  const n = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (Number.isNaN(n)) return '0';
  return Math.round(n).toLocaleString();
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatMonthYear(month: number, year: number): string {
  const mIndex = Math.max(0, Math.min(11, month - 1));
  return `${MONTHS[mIndex]} ${year}`;
}

export function formatTime12(hhmm: string | null | undefined): string {
  if (!hhmm) return '—';
  const [hStr, m] = hhmm.split(':');
  let h = parseInt(hStr, 10);
  if (Number.isNaN(h)) return hhmm;
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${String(h).padStart(2, '0')}:${m || '00'} ${ampm}`;
}

export function greetingForNow(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning 👋';
  if (h < 17) return 'Good Afternoon 👋';
  return 'Good Evening 👋';
}

export function billStatusLabel(status: string | null | undefined): string {
  switch (status?.toUpperCase()) {
    case 'UNPAID': return 'Pending';
    case 'OVERDUE': return 'Overdue';
    case 'PARTIAL': return 'Partial';
    case 'PAID': return 'Paid';
    default: return status || 'Pending';
  }
}

export function paymentMethodLabel(method: string | null | undefined): string {
  switch (method?.toUpperCase()) {
    case 'TELEBIRR': return 'Telebirr';
    case 'CBE': return 'CBE Birr';
    case 'AWASH': return 'Awash';
    case 'CASH': return 'Cash';
    default: return method || 'Other';
  }
}

export function paymentStatusLabel(status: string | null | undefined): 'Paid' | 'Pending' | 'Failed' {
  const s = status?.toUpperCase();
  if (s === 'SUCCESS' || s === 'PAID') return 'Paid';
  if (s === 'FAILED') return 'Failed';
  return 'Pending';
}

export function supplyStatusLabel(status: string | null | undefined): string {
  switch (status?.toUpperCase()) {
    case 'AVAILABLE': return 'Water Available';
    case 'SCHEDULED_OFF': return 'Scheduled Off';
    case 'UNSCHEDULED_OFF': return 'Outage';
    case 'LOW_PRESSURE': return 'Low Pressure';
    default: return status || 'Water Available';
  }
}

export function requestTypeLabel(type: string | null | undefined): string {
  if (!type) return 'Service Request';
  switch (type.toUpperCase()) {
    case 'LEAK': return 'Pipe Leak Report';
    case 'NO_SUPPLY': return 'No Water Supply';
    case 'LOW_PRESSURE': return 'Low Water Pressure';
    case 'METER_ISSUE': return 'Meter Issue';
    case 'BILLING_ISSUE': return 'Billing Query';
    default: return type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
}

export function requestStatusLabel(status: string | null | undefined): string {
  switch (status?.toUpperCase()) {
    case 'OPEN': return 'Open';
    case 'IN_PROGRESS': return 'In Progress';
    case 'RESOLVED': return 'Resolved';
    case 'REJECTED': return 'Rejected';
    default: return status || 'Open';
  }
}