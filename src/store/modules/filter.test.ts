import filterStore, { IFilter } from '@/store/modules/filter';

test('test filter initialization', async () => {
    expect(filterStore.filters[0].active).toBe(true);
});

test('test filter.switch', async() => {
    filterStore.switch(1);
    filterStore.filters.forEach((currentFilter: IFilter, currentIndex: number): void => {
        if (currentIndex === 1) {
            expect(currentFilter.active).toBe(true);
        } else {
            expect(currentFilter.active).toBe(false);
        }
    });
});