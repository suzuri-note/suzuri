import datelib from '@/lib/datelib';

test('datelib.format', () => {
    expect(datelib.format(new Date(1556813426000))).toBe('2019.05.03');
});

test('datelib.formatFromUnixtime(', () => {
    expect(datelib.formatFromUnixtime(1556813426000)).toBe('2019.05.03');
});
