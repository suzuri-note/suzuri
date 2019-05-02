import note from '../src/services/note'
import dummy from './dummy.js'

describe('note', () => {
  // notes.save()
  describe('save()', () => {
    // create
    describe('isn\'t passed id', () => {
      it('returns success status when success', () => {
        expect.assertions(4)
        const data = dummy.createDummy
        // check data
        expect(data.id).toBeFalsy()
        expect(data.title).toBeTruthy()
        return note.save(data).then(result => {
          // check result
          expect(result.data.updatedAt).toBe(result.data.createdAt)
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
        const data = dummy.updateDummy
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
        const data = dummy.updateErrDummy
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
})
