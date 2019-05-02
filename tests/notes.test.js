import note from '../src/services/note'
import dummy from './dummy.js'

describe('note', () => {
  // notes.save()
  describe('save()', () => {
    // create
    describe('isn\'t passed id', () => {
      it('returns success status when success', () => {
        const data = dummy.createDummy
        expect.assertions(4)
        return note.save(data).then(result => {
          // check data
          expect(data.id).toBeFalsy()
          expect(data.title).toBeTruthy()
          // check result
          expect(result.updatedAt).toBe(result.createdAt)
          expect(result.status).toBe('success')
        })
      })

      it('returns an error when wrong arguments', () => {
        const data = dummy.createErrDummy
        expect.assertions(3)
        return note.save(data).catch(err => {
          // check data
          expect(data.id).toBeFalsy()
          expect(data.title).toBeFalsy()
          // check err
          expect(err.message).toMatch('error')
        })
      })
    })
    // update
    describe('passed id', () => {
      it('returns success status when success', () => {
        const data = dummy.updateDummy
        expect.assertions(4)
        return note.save(data).then(result => {
          // check data
          expect(data.id).toBeTruthy()
          expect(data.title).toBeTruthy()
          // check result
          expect(result.updatedAt).toBeGreaterThan(result.createdAt)
          expect(result.status).toBe('success')
        })
      })

      it('returns an error when wrong arguments', () => {
        const data = dummy.updateErrDummy
        expect.assertions(3)
        return note.save(data).catch(err => {
          // check data
          expect(data.id).toBeTruthy()
          expect(data.title).toBeFalsy()
          // check err
          expect(err.message).toMatch('error')
        })
      })
    })
  })
})
