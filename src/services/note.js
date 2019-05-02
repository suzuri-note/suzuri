import shortid from 'shortid'

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
      // set timestamp
      const now = Date.now()
      data.updatedAt = now
      // set id
      if (!data.id) {
        data.id = shortid.generate()
        data.createdAt = now
      }
      // create data for localStorage
      const key = data.id
      const valueObj = Object.assign({}, data)
      delete valueObj.id
      const value = JSON.stringify(valueObj)
      // save
      localStorage.setItem(key, value)
      // return value
      return data
    }
    // main
    try {
      checkKeys(data, required)
      const res= saveLocalStorage(data)
      resolve({
        status: "success",
        data: res
      })
    } catch(err) {
      reject(err)
    }
  })
}
const get= () => {
  return null
}
const list= () => {
  return null
}

export default {
  save: save,
  get: get,
  list: list
}
