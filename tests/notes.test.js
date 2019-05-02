import note from '../src/services/note'
import dummy from './dummy.js'

describe('note', () => {
  // notes.save()
  describe('save()', () => {
    // create
    describe('isn\'t passed id', () => {
      it('returns success status when success', () => {
        const data = dummy.createDummy
        expect.assertions(3)
        return note.save(data).then(result => {
          // args don't have id
          expect(data.id).toBeFalsy()
          expect(data.title).toBeTruthy()
          expect(result.status).toBe('success')
        })
      })

      it('returns an error when wrong arguments', () => {
        const data = dummy.createErrDummy
        expect.assertions(3)
        return note.save(data).catch(err => {
          // args don't have title
          expect(data.id).toBeFalsy()
          expect(data.title).toBeFalsy()
          expect(err.message).toMatch('error')
        })
      })
    })
    // update
    describe('passed id', () => {
      it('returns success status when success', () => {
        const data = dummy.updateDummy
        expect.assertions(3)
        return note.save(data).then(result => {
          expect(data.id).toBeTruthy()
          expect(data.title).toBeTruthy()
          expect(result.status).toBe('success')
        })
      })

      it('returns an error when wrong arguments', () => {
        const data = dummy.updateErrDummy
        expect.assertions(3)
        return note.save(data).catch(err => {
          expect(data.id).toBeTruthy()
          expect(data.title).toBeFalsy()
          expect(err.message).toMatch('error')
        })
      })
    })
  })
})
