import shortid from 'shortid'

const save = (data) => {
  return new Promise((resolve, reject) => {
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
      if (data.id) data.createdAt = now
      // set key and value
      const key = data.id || shortid.generate()
      const value = JSON.stringify(data)
      // save
      localStorage.setItem(key, value)
    }
    // main
    try {
      checkKeys(data, required)
      saveLocalStorage(data)
      resolve({ status: 'success' })
    } catch(err) {
      console.log(err.message)
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
