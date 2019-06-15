import noteStore from '@/store/modules/note';
import datelib from '@/lib/datelib';

test('dailyNote getter', async () => {
    const ts = 1556813426000;
    noteStore.save({
        id: 'a',
        title: 'b',
        body: 'c',
        createdAt: ts,
        updatedAt: ts,
    });


    // actionを投げてからmutationが完了するまで待つ
    // TODO: もっと良い待ち方があるはずなので要検討
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(noteStore.dailyNote[datelib.formatFromUnixtime(ts)][0].id).toBe('a');
});
