import appStore, { StatusLevel } from '@/store/modules/app';

test('setStatus', async () => {
    const level = StatusLevel.Info;
    const message = 'TEST';

    appStore.setStatus({ level, message });

    // actionを投げてからmutationが完了するまで待つ
    // TODO: もっと良い待ち方があるはずなので要検討
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect((appStore.status.level === StatusLevel.Info) && (appStore.status.message === message)).toBe(true);
    expect(appStore.statusbar.hidden).toBe(false);
});

test('resetStatus', async () => {
    const level = StatusLevel.Info;
    const message = 'TEST';
    appStore.setStatus({ level, message });

    appStore.resetStatus();

    // actionを投げてからmutationが完了するまで待つ
    // TODO: もっと良い待ち方があるはずなので要検討
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect((appStore.status.level === StatusLevel.None) && (appStore.status.message === '')).toBe(true);
    expect(appStore.statusbar.hidden).toBe(true);
});