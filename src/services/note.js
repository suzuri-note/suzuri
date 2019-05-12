import shortid from 'shortid'

const prefix = 'SuzuriMemoId.'
const save = (data) => {
  return new  Promise((resolve, reject) => {
    // check data construnction
    const required = ['title', 'body']
    const checkKeys = (data, keys) => {
      const resultKeys = keys.filter((key) => { if (!data[key])  return key })
      if (resultKeys.length) {
        throw new Error('Don\'t have keys error: ' + resultKeys.join(', '))
      }
    }
    // save data
    const saveLocalStorage = (data) => {
      const now = Date.now()
      data.updatedAt = now
      // create
      if(!data.id) {
        data.id = shortid.generate()
        data.createdAt = now
      }
      // update
      else {
        let originData = JSON.parse(localStorage.getItem(prefix + data.id))
        data = Object.assign(originData, data)
      }
      // create data for localStorage
      const key = data.id
      const value = JSON.stringify(data)
      // save
      localStorage.setItem(prefix + key, value)
      // return value
      return data
    }
    // main
    try {
      checkKeys(data, required)
      const res = saveLocalStorage(data)
      resolve({
        status: "success",
        data: res
      })
    } catch(err) {
      reject(err)
    }
  })
}
const get = (id) => {
  return new Promise((resolve, reject) => {
    // get Data
    const getLocalStorage = (id) => {
      let data = JSON.parse(localStorage.getItem(prefix + id))
      if (!data) throw new Error("this id is not available.")
      return data
    }
    try {
      const res = getLocalStorage(id)
      resolve(res)
    } catch(err) {
      reject(err)
    }
  })
}
const list = () => {
  return new Promise((resolve, reject) => {
    // list Data
    const listLocalStorage = () => {
      const correctKeys = Object.keys(localStorage).filter((key) => {
        return key.startsWith(prefix)
      })
      const memos = correctKeys.map((key) => {
        let data = JSON.parse(localStorage.getItem(key))
        return data
      })
      return memos
    }
    try {
      const res = listLocalStorage()
      resolve({
        status: "success",
        data: res
      })
    } catch(err) {
      reject(err)
    }
  })
}

const remove = (id) => {
  return new Promise((resolve, reject) => {
    // remove Data
    const removeLocalStorage = (id) => {
      console.log(id)
      if (Object.keys(localStorage).indexOf(prefix + id) == -1) {
        throw new Error('this id is not available.')
      }
      localStorage.removeItem(prefix + id)
      return id
    }
    try {
      const res = removeLocalStorage(id)
      resolve({
        status: "success",
        data: res
      })
    } catch(err) {
      reject(err)
    }
  })
}

export default {
  save,
  get,
  list,
  remove,
}
