
const LOCAL_STORAGE_TITLE_KEY = 'SUZURI_TITLE_TMP';
const LOCAL_STORAGE_BODY_KEY = 'SUZURI_BODY_TMP';

interface IMemoTmp {
    title: string;
    body: string;
}

export const saveTitle = (value: string): void => {
    localStorage.setItem(LOCAL_STORAGE_TITLE_KEY, value);
};

export const saveBody = (value: string): void => {
    localStorage.setItem(LOCAL_STORAGE_BODY_KEY, value);
};

export const clear = (): void => {
    localStorage.removeItem(LOCAL_STORAGE_TITLE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_BODY_KEY);
};

export const read = (): IMemoTmp => {
    const title = localStorage.getItem(LOCAL_STORAGE_TITLE_KEY);
    const body = localStorage.getItem(LOCAL_STORAGE_BODY_KEY);
    return {
        title: title ? title : '',
        body: body ? body : '',
    };
};

export default {
    saveTitle,
    saveBody,
    clear,
    read,
};
