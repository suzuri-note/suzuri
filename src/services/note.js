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
      const now = Date.now()
      data.updatedAt = now
      // create
      if(!data.id) {
        data.id= shortid.generate()
        data.createdAt = now
      }
      // update
      else {
        let originData = JSON.parse(localStorage.getItem(data.id))
        data = Object.assign(originData, data)
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
      let data = JSON.parse(localStorage.getItem(id))
      if (!data) throw new Error("this id is not available.")
      data.id = id
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
  return null
}

export default {
  save: save,
  get: get,
  list: list
}
