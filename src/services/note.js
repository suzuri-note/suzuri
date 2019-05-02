const save = (data) => {
  return new Promise((resolve, reject) => {
    // check data construnction
    const pageKeys = ['title', 'tags', 'body']
    const checkKeys = (keys, data) => {
      const resultKeys = keys.filter((key) => { if (!data[key])  return key })
      if (resultKeys.length) {
        throw new Error('Don\'t have keys error: ' + resultKeys.join(', '))
      }
    }
    // save data
    const saveLocalStorage = (data) => {
      const key = data.date
      const value = JSON.stringify(data.pages)

      localStorage.setItem(key, value)
    }
    // main
    try {
      checkKeys(dataKeys, data)
      for (let i = 0; i < data.pages.length; i++) {
        checkKeys(pageKeys, data.pages[i])
      }
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
