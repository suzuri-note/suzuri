import shortid from 'shortid'

const deleteItem = (obj, keys) => {
  const newObj = Object.assign({}, obj)
  for (let key of keys) {
    delete newObj[key]
  }
  return newObj
}
const dummyMemos = [
  // first data
  {
    id: null,
    title: "数体である定義体",
    body: `複素数体であれば、任意のCM-タイプの A は、実際、[数体](https://ja.wikipedia.org/wiki/%E4%BB%A3%E6%95%B0%E4%BD%93)である定義体（英語版）(field of definition)を持っている。自己準同型環の可能なタイプは、対合（ロサチの対合（英語版）(Rosati involution）をもつ環として既に分類されていて、CM-タイプのアーベル多様体の分類を導き出す。

  * 演算
  * 形式的な構成
  * 抽象的性質
    * 基本性質
    * 位相的性質

  楕円曲線と同じような方法でCM-タイプの多様体を構成するには、Cd の中の格子 Λ から始め、アーベル多様体のリーマンの関係式（英語版）(Riemann relations)を考えに入れる必要がある。`,
  },
  // update data
  {
    title: "数体や大域函数体",
    body: `数論では、ヘッケ指標(Hecke character)はディリクレ指標の一般化であり、エーリッヒ・ヘッケ（英語版）(Erich Hecke)によりディリクレのL-函数よりも大きな L-函数のクラスを構成するために導入された。

* イデールを使う定義
* イデアルを使う定義
* 2つの定義の間の関係
  * 特別の場合
  * 例

ヘッケのL-函数はデデキントゼータ函数の自然な設定とリーマンゼータ函数の満たす函数等式に似た函数等式を持つ。`,
  }
]

const createDummy = Object.assign({}, dummyMemos[0]) 
const updateDummy = Object.assign({}, dummyMemos[1])
const createErrDummy = deleteItem(createDummy, ['title'])
const updateErrDummy = deleteItem(updateDummy, ['title'])

export default {
  createDummy,
  updateDummy,
  createErrDummy,
  updateErrDummy,
}
