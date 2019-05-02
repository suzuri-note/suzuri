import note from '../src/services/note'
import dummy from './dummy.js'

describe('note', () => {
  // notes.save()
  describe('save()', () => {

    it('returns success status when success', () => {
      expect.assertions(1)
      return note.save(dummy.createDummy).then(result => {
        expect(result.status).toBe('success')
      })
    })

    it('returns an error when wrong arguments', () => {
      expect.assertions(1)
      return note.save(dummy.createErrDummy).catch(err => {
        expect(err.message).toMatch('error')
      })
    })
  })
})
