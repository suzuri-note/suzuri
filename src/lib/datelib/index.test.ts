import datelib from '@/lib/datelib';
import en from 'javascript-time-ago/locale/en';

// These tests work only in UTC+9. Watch your timezone.
// If your timezone is not UTC+9, run `export TZ="Asia/Tokyo"` before running tests.

test('datelib.format', () => {
    expect(datelib.format(new Date(1556813426000))).toBe('2019.05.03');
});

test('datelib.formatFromUnixtime', () => {
    expect(datelib.formatFromUnixtime(1556813426000)).toBe('2019.05.03');
});

test('datelib.formatDatetimeFromUnixtime', () => {
    expect(datelib.formatDatetimeFromUnixtime(1556813426000)).toBe('2019.05.03 01:10');
});

test('datelib.', () => {
    const today = new Date().setHours(0, 0, 0, 0);
    expect(datelib.formatForService(today, en).endsWith('ago')).toBeTruthy();
});

test('datelib.', () => {
    expect(datelib.formatForService(1556813426000, en)).toBe('2019.05.03');
});