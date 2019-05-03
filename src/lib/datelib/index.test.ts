import datelib from '.';

test('', () => {
    expect(datelib.format(new Date(1556813426000))).toBe('2019.05.03');
})

test('', () => {
    expect(datelib.formatFromUnixtime(1556813426000)).toBe('2019.05.03');
})