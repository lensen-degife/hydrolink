import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDashboardTheme } from './ThemeContext';
import { NewsItem } from './CommunityNewsSection';

type ActiveModal =
  | { type: 'pay_bill' }
  | { type: 'schedule' }
  | { type: 'report_issue' }
  | { type: 'notifications' }
  | { type: 'news'; item: NewsItem }
  | { type: 'receipt'; month: string; amount: string; method: string }
  | { type: 'scan_meter' }
  | { type: 'profile' }
  | null;

type DashboardModalsProps = {
  activeModal: ActiveModal;
  onClose: () => void;
};

export function DashboardModals({ activeModal, onClose }: DashboardModalsProps) {
  const { colors, isDark } = useDashboardTheme();
  const [selectedMethod, setSelectedMethod] = useState('telebirr');
  const [reportText, setReportText] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  if (!activeModal) return null;

  return (
    <Modal
      transparent
      animationType="slide"
      visible={!!activeModal}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View
          style={[
            styles.sheetContainer,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          {/* Sheet Handle */}
          <View style={styles.handleBar}>
            <View style={[styles.handle, { backgroundColor: colors.border }]} />
          </View>

          {/* Close Header */}
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
              {activeModal.type === 'pay_bill' && '💳 Pay Water Bill'}
              {activeModal.type === 'schedule' && '📅 Water Schedule'}
              {activeModal.type === 'report_issue' && '🚨 Report Water Issue'}
              {activeModal.type === 'notifications' && '🔔 Notifications'}
              {activeModal.type === 'news' && '📢 Community Announcement'}
              {activeModal.type === 'receipt' && '📄 Official Receipt'}
              {activeModal.type === 'scan_meter' && '📷 Smart Meter Scanner'}
              {activeModal.type === 'profile' && '👤 Customer Profile'}
            </Text>

            <Pressable
              onPress={onClose}
              style={[styles.closeCircle, { backgroundColor: colors.surfaceVariant }]}
            >
              <Ionicons name="close" size={20} color={colors.textPrimary} />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Modal Body 1: Pay Bill */}
            {activeModal.type === 'pay_bill' && (
              <View style={styles.bodyGap}>
                <View style={[styles.summaryBox, { backgroundColor: colors.primaryContainer }]}>
                  <Text style={[styles.boxLabel, { color: colors.onPrimaryContainer }]}>Total Outstanding</Text>
                  <Text style={[styles.boxAmount, { color: colors.primary }]}>450.00 ETB</Text>
                  <Text style={[styles.boxSub, { color: colors.onPrimaryContainer }]}>Due Date: 10 August 2026</Text>
                </View>

                <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>Select Payment Method</Text>

                <View style={styles.methodsList}>
                  {[
                    { id: 'telebirr', name: 'Telebirr', icon: 'phone-portrait-outline', desc: 'Instant mobile money' },
                    { id: 'cbe', name: 'CBE Birr / Mobile Banking', icon: 'card-outline', desc: 'Commercial Bank of Ethiopia' },
                    { id: 'chapa', name: 'Chapa Pay', icon: 'flash-outline', desc: 'Debit / Credit Card & Wallets' },
                  ].map((m) => (
                    <Pressable
                      key={m.id}
                      onPress={() => setSelectedMethod(m.id)}
                      style={[
                        styles.methodOption,
                        { backgroundColor: colors.surfaceVariant, borderColor: colors.border },
                        selectedMethod === m.id && { borderColor: colors.primary, borderWidth: 2 },
                      ]}
                    >
                      <View style={[styles.methodIconWrapper, { backgroundColor: colors.primaryContainer }]}>
                        <Ionicons name={m.icon as any} size={20} color={colors.primary} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.methodName, { color: colors.textPrimary }]}>{m.name}</Text>
                        <Text style={[styles.methodDesc, { color: colors.textMuted }]}>{m.desc}</Text>
                      </View>
                      <Ionicons
                        name={selectedMethod === m.id ? 'radio-button-on' : 'radio-button-off'}
                        size={22}
                        color={selectedMethod === m.id ? colors.primary : colors.textMuted}
                      />
                    </Pressable>
                  ))}
                </View>

                <Pressable
                  onPress={() => {
                    alert('Payment processed successfully! Receipt generated.');
                    onClose();
                  }}
                  style={[styles.actionBtn, { backgroundColor: colors.primary }]}
                >
                  <Text style={styles.actionBtnText}>Confirm 450 ETB Payment</Text>
                </Pressable>
              </View>
            )}

            {/* Modal Body 2: Schedule */}
            {activeModal.type === 'schedule' && (
              <View style={styles.bodyGap}>
                <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>Weekly Distribution Plan</Text>
                {[
                  { day: 'Monday (Today)', area: 'Kebele 01', time: '08:00 AM - 01:00 PM', status: 'Available' },
                  { day: 'Tuesday', area: 'Kebele 02', time: '08:00 AM - 02:00 PM', status: 'Scheduled' },
                  { day: 'Wednesday', area: 'Kebele 03', time: '09:00 AM - 03:00 PM', status: 'Scheduled' },
                  { day: 'Thursday', area: 'Kebele 01 (Filter Maintenance)', time: '02:00 PM - 05:00 PM', status: 'Maintenance' },
                  { day: 'Friday', area: 'Kebele 04 & 05', time: '08:00 AM - 04:00 PM', status: 'Scheduled' },
                ].map((s, idx) => (
                  <View
                    key={idx}
                    style={[styles.scheduleRowItem, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
                  >
                    <View>
                      <Text style={[styles.dayText, { color: colors.textPrimary }]}>{s.day}</Text>
                      <Text style={[styles.areaText, { color: colors.textSecondary }]}>{s.area}</Text>
                      <Text style={[styles.timeText, { color: colors.primary }]}>{s.time}</Text>
                    </View>
                    <View
                      style={[
                        styles.scheduleStatusPill,
                        {
                          backgroundColor:
                            s.status === 'Available'
                              ? colors.successContainer
                              : s.status === 'Maintenance'
                              ? colors.warningContainer
                              : colors.primaryContainer,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.scheduleStatusText,
                          {
                            color:
                              s.status === 'Available'
                                ? colors.onSuccessContainer
                                : s.status === 'Maintenance'
                                ? colors.onWarningContainer
                                : colors.primary,
                          },
                        ]}
                      >
                        {s.status}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Modal Body 3: Report Issue */}
            {activeModal.type === 'report_issue' && (
              <View style={styles.bodyGap}>
                {!reportSubmitted ? (
                  <>
                    <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
                      Submit Issue / Leak Report
                    </Text>

                    <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Issue Location / Kebele</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.surfaceVariant, color: colors.textPrimary, borderColor: colors.border }]}
                      defaultValue="Kebele 01, Near Primary School"
                    />

                    <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Problem Description</Text>
                    <TextInput
                      style={[styles.textArea, { backgroundColor: colors.surfaceVariant, color: colors.textPrimary, borderColor: colors.border }]}
                      multiline
                      numberOfLines={4}
                      placeholder="Describe pipe leak, water pressure drop, or water quality issue..."
                      placeholderTextColor={colors.textMuted}
                      value={reportText}
                      onChangeText={setReportText}
                    />

                    <Pressable
                      onPress={() => setReportSubmitted(true)}
                      style={[styles.actionBtn, { backgroundColor: colors.error }]}
                    >
                      <Ionicons name="alert-circle" size={20} color="#FFFFFF" />
                      <Text style={styles.actionBtnText}>Submit Emergency Ticket</Text>
                    </Pressable>
                  </>
                ) : (
                  <View style={styles.successState}>
                    <View style={[styles.successIconCircle, { backgroundColor: colors.successContainer }]}>
                      <Ionicons name="checkmark-circle" size={54} color={colors.success} />
                    </View>
                    <Text style={[styles.successTitle, { color: colors.textPrimary }]}>Report Submitted!</Text>
                    <Text style={[styles.successSub, { color: colors.textSecondary }]}>
                      Ticket #REQ-4093 generated. Our emergency technician team has been notified.
                    </Text>
                    <Pressable
                      onPress={() => {
                        setReportSubmitted(false);
                        onClose();
                      }}
                      style={[styles.actionBtn, { backgroundColor: colors.primary, marginTop: 20 }]}
                    >
                      <Text style={styles.actionBtnText}>Back to Dashboard</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            )}

            {/* Modal Body 4: Notifications */}
            {activeModal.type === 'notifications' && (
              <View style={styles.bodyGap}>
                {[
                  { title: 'Distribution Notice', time: '10 mins ago', body: 'Water flow restarted in Kebele 01 as scheduled.' },
                  { title: 'Bill Reminder', time: '2 hours ago', body: 'Your current bill of 450 ETB is due on August 10, 2026.' },
                  { title: 'System Maintenance', time: 'Yesterday', body: 'Filter maintenance planned for Thursday 02:00 PM.' },
                ].map((n, i) => (
                  <View
                    key={i}
                    style={[styles.notifItem, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
                  >
                    <View style={[styles.notifIcon, { backgroundColor: colors.primaryContainer }]}>
                      <Ionicons name="notifications" size={18} color={colors.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.notifTop}>
                        <Text style={[styles.notifTitle, { color: colors.textPrimary }]}>{n.title}</Text>
                        <Text style={[styles.notifTime, { color: colors.textMuted }]}>{n.time}</Text>
                      </View>
                      <Text style={[styles.notifBody, { color: colors.textSecondary }]}>{n.body}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Modal Body 5: News Item */}
            {activeModal.type === 'news' && activeModal.item && (
              <View style={styles.bodyGap}>
                <View style={[styles.categoryTag, { backgroundColor: activeModal.item.badgeBg }]}>
                  <Text style={[styles.categoryTagText, { color: activeModal.item.badgeText }]}>
                    {activeModal.item.category}
                  </Text>
                </View>
                <Text style={[styles.newsModalTitle, { color: colors.textPrimary }]}>
                  {activeModal.item.title}
                </Text>
                <Text style={[styles.newsModalDate, { color: colors.textMuted }]}>
                  Published on {activeModal.item.date} • HydroLink Bulletin
                </Text>
                <Text style={[styles.newsModalBody, { color: colors.textSecondary }]}>
                  {activeModal.item.description}
                  {'\n\n'}
                  For more details or emergency inquiries during this period, please reach out to the Boreda Woreda Utility Office or dial hotline 9021.
                </Text>
              </View>
            )}

            {/* Modal Body 6: Receipt */}
            {activeModal.type === 'receipt' && (
              <View style={styles.bodyGap}>
                <View style={[styles.receiptContainer, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
                  <Ionicons name="receipt-outline" size={40} color={colors.primary} style={{ alignSelf: 'center', marginBottom: 8 }} />
                  <Text style={[styles.receiptTitle, { color: colors.textPrimary }]}>HydroLink Water Utility</Text>
                  <Text style={[styles.receiptSub, { color: colors.textMuted }]}>Payment Confirmation</Text>

                  <View style={styles.receiptLine} />

                  <View style={styles.receiptRow}>
                    <Text style={[styles.rLabel, { color: colors.textMuted }]}>Billing Month:</Text>
                    <Text style={[styles.rVal, { color: colors.textPrimary }]}>{activeModal.month}</Text>
                  </View>

                  <View style={styles.receiptRow}>
                    <Text style={[styles.rLabel, { color: colors.textMuted }]}>Amount Paid:</Text>
                    <Text style={[styles.rVal, { color: colors.primary }]}>{activeModal.amount}</Text>
                  </View>

                  <View style={styles.receiptRow}>
                    <Text style={[styles.rLabel, { color: colors.textMuted }]}>Payment Method:</Text>
                    <Text style={[styles.rVal, { color: colors.textPrimary }]}>{activeModal.method}</Text>
                  </View>

                  <View style={styles.receiptRow}>
                    <Text style={[styles.rLabel, { color: colors.textMuted }]}>Transaction ID:</Text>
                    <Text style={[styles.rVal, { color: colors.textPrimary }]}>#TXN-9840291</Text>
                  </View>

                  <View style={styles.receiptRow}>
                    <Text style={[styles.rLabel, { color: colors.textMuted }]}>Status:</Text>
                    <Text style={[styles.rVal, { color: colors.success }]}>COMPLETED (PAID)</Text>
                  </View>
                </View>

                <Pressable onPress={onClose} style={[styles.actionBtn, { backgroundColor: colors.primary }]}>
                  <Ionicons name="download-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.actionBtnText}>Download Receipt PDF</Text>
                </Pressable>
              </View>
            )}

            {/* Modal Body 7: Scan Meter */}
            {activeModal.type === 'scan_meter' && (
              <View style={styles.bodyGap}>
                <View style={[styles.scannerView, { backgroundColor: '#0F172A' }]}>
                  <MaterialCommunityIcons name="qrcode-scan" size={80} color="#42A5F5" />
                  <Text style={{ color: '#FFFFFF', marginTop: 14, fontWeight: '700' }}>
                    Align Meter Barcode / QR Code
                  </Text>
                  <Text style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>
                    Camera active for instant reading submit
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    alert('Meter scanned! Current reading: 32.4 m³ recorded.');
                    onClose();
                  }}
                  style={[styles.actionBtn, { backgroundColor: colors.primary }]}
                >
                  <Text style={styles.actionBtnText}>Simulate Meter Capture</Text>
                </Pressable>
              </View>
            )}

            {/* Modal Body 8: Profile */}
            {activeModal.type === 'profile' && (
              <View style={styles.bodyGap}>
                <View style={styles.profileCard}>
                  <Text style={[styles.profName, { color: colors.textPrimary }]}>Abebe Bikila</Text>
                  <Text style={[styles.profDetail, { color: colors.textSecondary }]}>Customer ID: HL-884920</Text>
                  <Text style={[styles.profDetail, { color: colors.textSecondary }]}>Zone: Boreda Woreda, Kebele 01</Text>
                  <Text style={[styles.profDetail, { color: colors.textSecondary }]}>Meter ID: MTR-9021-X</Text>
                  <Text style={[styles.profDetail, { color: colors.textSecondary }]}>Phone: +251 91 123 4567</Text>
                </View>
                <Pressable onPress={onClose} style={[styles.actionBtn, { backgroundColor: colors.primary }]}>
                  <Text style={styles.actionBtnText}>Close Profile</Text>
                </Pressable>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingBottom: 30,
    maxHeight: '85%',
    borderWidth: 1,
  },
  handleBar: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  closeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  bodyGap: {
    gap: 14,
  },
  summaryBox: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  boxLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  boxAmount: {
    fontSize: 32,
    fontWeight: '800',
    marginVertical: 4,
  },
  boxSub: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
  },
  methodsList: {
    gap: 10,
  },
  methodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    gap: 12,
    borderWidth: 1,
  },
  methodIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodName: {
    fontSize: 14,
    fontWeight: '700',
  },
  methodDesc: {
    fontSize: 11,
    marginTop: 2,
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    marginTop: 10,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  scheduleRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '700',
  },
  areaText: {
    fontSize: 12,
    marginTop: 2,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  scheduleStatusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scheduleStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: -6,
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 14,
  },
  textArea: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  successState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  successSub: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  notifItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
  },
  notifIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  notifTime: {
    fontSize: 10,
  },
  notifBody: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryTagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  newsModalTitle: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
  },
  newsModalDate: {
    fontSize: 12,
  },
  newsModalBody: {
    fontSize: 14,
    lineHeight: 22,
  },
  receiptContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  receiptTitle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  receiptSub: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  receiptLine: {
    height: 1,
    backgroundColor: '#CBD5E1',
    marginVertical: 12,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  rLabel: {
    fontSize: 13,
  },
  rVal: {
    fontSize: 13,
    fontWeight: '700',
  },
  scannerView: {
    height: 200,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    gap: 8,
    padding: 16,
  },
  profName: {
    fontSize: 22,
    fontWeight: '800',
  },
  profDetail: {
    fontSize: 14,
  },
});
