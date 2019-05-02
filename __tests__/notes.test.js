import notes from '../src/services/notes'

describe('notes', () => {
  // notes.save()
  describe('save()', () => {
    const data = {
      date: '2019.04.29',
      pages: [
        {
          title: "数体である定義体",
          tags: [
              {title: "アーベル多様体", id: "abcdefg"},
              {title: "数論", id: "hjklmn"},
          ],
          body: `複素数体であれば、任意のCM-タイプの A は、実際、[数体](https://ja.wikipedia.org/wiki/%E4%BB%A3%E6%95%B0%E4%BD%93)である定義体（英語版）(field of definition)を持っている。自己準同型環の可能なタイプは、対合（ロサチの対合（英語版）(Rosati involution）をもつ環として既に分類されていて、CM-タイプのアーベル多様体の分類を導き出す。

* 演算
* 形式的な構成
* 抽象的性質
* 基本性質
* 位相的性質

楕円曲線と同じような方法でCM-タイプの多様体を構成するには、Cd の中の格子 Λ から始め、アーベル多様体のリーマンの関係式（英語版）(Riemann relations)を考えに入れる必要がある。`
        }
      ]
    }

    const errData = {
      pages: [
        {
          title: "数体である定義体",
          tags: [
              {title: "アーベル多様体", id: "abcdefg"},
              {title: "数論", id: "hjklmn"},
          ],
          body: `複素数体であれば、任意のCM-タイプの A は、実際、[数体](https://ja.wikipedia.org/wiki/%E4%BB%A3%E6%95%B0%E4%BD%93)である定義体（英語版）(field of definition)を持っている。自己準同型環の可能なタイプは、対合（ロサチの対合（英語版）(Rosati involution）をもつ環として既に分類されていて、CM-タイプのアーベル多様体の分類を導き出す。

* 演算
* 形式的な構成
* 抽象的性質
* 基本性質
* 位相的性質

楕円曲線と同じような方法でCM-タイプの多様体を構成するには、Cd の中の格子 Λ から始め、アーベル多様体のリーマンの関係式（英語版）(Riemann relations)を考えに入れる必要がある。`
        }
      ]
    }

    it('returns success status when success', () => {
      expect.assertions(1)
      return notes.save(data).then(result => {
        expect(result.status).toBe('success')
      })
    })

    it('returns an error when wrong arguments', () => {
      expect.assertions(1)
      return notes.save(errData).catch(err => {
        expect(err.message).toMatch('error')
      })
    })
  })
})
