import shortid from 'shortid';

interface INote {
  title: string;
  body: string;
  id: string;
  createdAt: number;
  updatedAt: number;
}

interface INoteID {
  id: string;
}

interface ISingleResponse {
  status: string;
  data: INote;
}

interface IListResponse {
  status: string;
  data: INote[];
}

interface IIDResponse {
  status: string;
  data: INoteID;
}

const prefix = 'SuzuriMemoId.';

const save = (data: any): Promise<ISingleResponse> => {
  return new  Promise((resolve: (value?: ISingleResponse) => void, reject: (reason?: any) => void) => {
    // check data construnction
    const required = ['title', 'body'];
    const checkKeys = (checkdata: any, keys: string[]) => {
      const resultKeys = keys.filter((key) => { if (!checkdata[key]) {  return key; } });
      if (resultKeys.length) {
        throw new Error('Don\'t have keys error: ' + resultKeys.join(', '));
      }
    };
    // save data
    const saveLocalStorage = (savedata: any) => {
      const now = Date.now();
      savedata.updatedAt = now;
      // create
      if (!savedata.id) {
        savedata.id = shortid.generate();
        savedata.createdAt = now;
      } else {
        const originData = JSON.parse(localStorage.getItem(prefix + savedata.id)!);
        savedata = Object.assign(originData, savedata);
      }
      // create data for localStorage
      const key = savedata.id;
      const value = JSON.stringify(savedata);
      // save
      localStorage.setItem(prefix + key, value);
      // return value
      return savedata;
    };
    // main
    try {
      checkKeys(data, required);
      const res = saveLocalStorage(data);
      resolve({
        status: 'success',
        data: res,
      });
    } catch (err) {
      reject(err);
    }
  });
};
const get = (id: string): Promise<ISingleResponse> => {
  return new Promise((resolve: (value?: ISingleResponse) => void, reject: (reason?: any) => void) => {
    // get Data
    const getLocalStorage = (itemID: string) => {
      const data = JSON.parse(localStorage.getItem(prefix + itemID)!);
      if (!data) { throw new Error('this id is not available.'); }
      return data;
    };
    try {
      const res = getLocalStorage(id);
      resolve({
        status: 'success',
        data: res,
      });
    } catch (err) {
      reject(err);
    }
  });
};
const list = (): Promise<IListResponse> => {
  return new Promise((resolve: (value?: IListResponse) => void, reject: (reason?: any) => void) => {
    // list Data
    const listLocalStorage = () => {
      const correctKeys = Object.keys(localStorage).filter((key) => {
        return key.startsWith(prefix);
      });
      const memos = correctKeys.map((key) => {
        const data = JSON.parse(localStorage.getItem(key)!);
        return data;
      });
      return memos;
    };
    try {
      const res = listLocalStorage();
      resolve({
        status: 'success',
        data: res,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const remove = async (id: string): Promise<IIDResponse> => {
  return new Promise((resolve: (value?: IIDResponse) => void, reject: (reason?: any) => void) => {
    // remove Data
    const removeLocalStorage = (itemID: string) => {
      if (Object.keys(localStorage).indexOf(prefix + itemID) === -1) {
        throw new Error('this id is not available.');
      }
      localStorage.removeItem(prefix + itemID);
      return { id: itemID };
    };
    try {
      const res = removeLocalStorage(id);
      resolve({
        status: 'success',
        data: res,
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default {
  save,
  get,
  list,
  remove,
};
