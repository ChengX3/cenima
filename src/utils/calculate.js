import { horses, horseOrder } from '../data/horses.js'

/**
 * 根据答题结果计算最终的马类型
 * @param {Array} answers - 用户的答案数组，每项包含 questionId 和 optionIndex
 * @param {Array} questions - 题目数据
 * @returns {Object} 计算结果，包含马类型和得分
 */
export function calculateResult(answers, questions) {
  // 初始化每种马的得分
  const scores = new Array(horseOrder.length).fill(0)

  // 累加每道题选项的得分
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (question) {
      const option = question.options[answer.optionIndex]
      if (option && option.scores) {
        option.scores.forEach((score, index) => {
          scores[index] += score
        })
      }
    }
  })

  // 找出得分最高的马
  let maxScore = -1
  let maxIndex = 0
  scores.forEach((score, index) => {
    if (score > maxScore) {
      maxScore = score
      maxIndex = index
    }
  })

  // 获取对应的马类型
  const horseId = horseOrder[maxIndex]
  const horse = horses.find(h => h.id === horseId)

  return {
    horse,
    scores,
    maxScore
  }
}

/**
 * 生成分享文案
 * @param {Object} horse - 马类型对象
 * @returns {String} 分享文案
 */
export function generateShareText(horse) {
  return `我测出来是【${horse.name}】，${horse.shortDesc} 你是什么马？快来测测！`
}
