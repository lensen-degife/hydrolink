const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function formatEtb(amount: string | number): string {
  const n = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (Number.isNaN(n)) return '0';
  return Math.round(n).toLocaleString();
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatMonthYear(month: number, year: number): string {
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatTime12(hhmm: string): string {
  const [hStr, m] = hhmm.split(':');
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${String(h).padStart(2, '0')}:${m} ${ampm}`;
}

export function greetingForNow(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning 👋';
  if (h < 17) return 'Good Afternoon 👋';
  return 'Good Evening 👋';
}

export function billStatusLabel(status: string): string {
  switch (status) {
    case 'UNPAID': return 'Pending';
    case 'OVERDUE': return 'Overdue';
    case 'PARTIAL': return 'Partial';
    case 'PAID': return 'Paid';
    default: return status;
  }
}

export function paymentMethodLabel(method: string): string {
  switch (method?.toUpperCase()) {
    case 'TELEBIRR': return 'Telebirr';
    case 'CBE': return 'CBE Birr';
    case 'AWASH': return 'Awash';
    case 'CASH': return 'Cash';
    default: return method || 'Other';
  }
}

export function paymentStatusLabel(status: string): 'Paid' | 'Pending' | 'Failed' {
  if (status === 'SUCCESS') return 'Paid';
  if (status === 'FAILED') return 'Failed';
  return 'Pending';
}

export function supplyStatusLabel(status: string): string {
  switch (status) {
    case 'AVAILABLE': return 'Water Available';
    case 'SCHEDULED_OFF': return 'Scheduled Off';
    case 'UNSCHEDULED_OFF': return 'Outage';
    case 'LOW_PRESSURE': return 'Low Pressure';
    default: return status;
  }
}

export function requestTypeLabel(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function requestStatusLabel(status: string): string {
  switch (status) {
    case 'OPEN': return 'Open';
    case 'IN_PROGRESS': return 'In Progress';
    case 'RESOLVED': return 'Resolved';
    case 'REJECTED': return 'Rejected';
    default: return status;
  }
}