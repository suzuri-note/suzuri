import note from '../src/services/note'
import dummy from './dummy.js'

describe('note', () => {
  const wrongId = "wrongId"
  let memoId = ''
  // notes.save()
  describe('save()', () => {
    // create
    describe('isn\'t passed id', () => {
      it('returns success status when success', () => {
        expect.assertions(5)
        const data = dummy.createDummy
        // check data
        expect(data.id).toBeFalsy()
        expect(data.title).toBeTruthy()
        return note.save(data).then(result => {
          // check result
          expect(result.data.updatedAt).toBe(result.data.createdAt)
          expect(result.data.id).toBeTruthy()
          memoId = result.data.id
          expect(result.status).toBe('success')
        })
      })

      it('returns an error when wrong arguments', () => {
        expect.assertions(3)
        const data = dummy.createErrDummy
        // check data
        expect(data.id).toBeFalsy()
        expect(data.title).toBeFalsy()
        return note.save(data).catch(err => {
          // check err
          expect(err.message).toMatch('error')
        })
      })
    })
    // update
    describe('is passed id', () => {
      it('returns success status when success', () => {
        expect.assertions(4)
        let data = dummy.updateDummy
        data.id = memoId
        // check data
        expect(data.id).toBeTruthy()
        expect(data.title).toBeTruthy()
        return note.save(data).then(result => {
          // check result
          expect(result.data.updatedAt).toBeGreaterThan(result.data.createdAt)
          expect(result.status).toBe('success')
        })
      })

      it('returns an error when wrong arguments', () => {
        expect.assertions(3)
        let data = dummy.updateErrDummy
        data.id = memoId
        // check data
        expect(data.id).toBeTruthy()
        expect(data.title).toBeFalsy()
        return note.save(data).catch(err => {
          // check err
          expect(err.message).toMatch('error')
        })
      })
    })
  })

  describe('get()', () => {
    describe('is passed id', () => {
      it('returns one data', () => {
        expect.assertions(1)
        return note.get(memoId).then(result => {
          expect(result.title).toBe("数体や大域函数体")
        })
      })
    })
    describe('is passed a wrong id', () => {
      it('returns error', () => {
        expect.assertions(1)
        return note.get(wrongId).catch(err => {
          expect(err.message).toMatch('this id is not available.')
        })
      })
    })
  })

  describe('list()', () => {
    it('returns array object', () => {
      expect.assertions(1)
      return note.list().then(result => {
        expect(Array.isArray(result)).toBeTruthy()
      })
    })
    it('returns data which data structure is correct', () => {
      const dataKeys = ['id', 'title', 'body', 'createdAt', 'updatedAt']
      expect.assertions(dataKeys.length)
      return note.list().then(result => {
        for(let i = 0; i < dataKeys.length; i++) {
          expect(result[0][dataKeys[i]]).toBeTruthy()
        }
      })
    })
  })

  describe('remove()', () => {
    describe('is passed id', () => {
      it('returns success status when success', () => {
        expect.assertions(1)
        return note.remove(memoId).then(result => {
          expect(result.status).toBe('success')
        })
      })
    })
    describe('is passed a wrong id', () => {
      it('returns error', () => {
        expect.assertions(1)
        return note.remove(wrongId).catch(err => {
          expect(err.message).toMatch('this id is not available.')
        })
      })
    })
  })
})
