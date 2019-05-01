import notes from '../src/services/notes'

test('save notes return null', () => {
  expect(notes.save()).toBe(null)
})
