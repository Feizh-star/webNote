/**
 * 获取浮点数精度
 * @param {*} num
 * @returns
 */
function getPrecision(num: number) {
  const str = num.toString()
  const decimalIndex = str.indexOf('.')
  if (decimalIndex === -1) {
    return 0
  }
  return str.length - decimalIndex - 1
}
/**
 * 放大10的n次方倍
 * @param {*} num
 * @param {*} precision
 * @returns
 */
function multiplyWithPrecision(num: number, precision: number) {
  const factor = Math.pow(10, precision)
  return num * factor
}
/**
 * 获取小数第一位有效数字在小数点后的位置：1 => 0; 0.33 => 1; 0.033 => 2
 * @param {*} num
 * @returns
 */
function getSignificantDigitsPosition(num: number) {
  if (typeof num !== 'number' || !num) return -1
  num = Math.abs(num)
  if (num === 0 || num >= 1) {
    return 0
  } else {
    return (
      num
        .toString()
        .split('.')[1]
        .split('')
        .filter((c) => c === '0')
        .join('').length + 1
    )
  }
}
/**
 * 将真分数的第一位有效数字后的那一位向下舍去或向上进一：获取小数第一位有效数字在小数点后的位置n，放大10^n倍，向上或向下取整，再缩小10^n
 * 假分数直接向上或向下取整
 * @param {*} num
 * @param {*} type 'floor' 'ceil'
 * @returns
 */
function significantDigitsRound(num: number, type: 'floor' | 'ceil' = 'floor') {
  const significantDigitsPosition = getSignificantDigitsPosition(num)
  if (significantDigitsPosition === -1) return num
  if (significantDigitsPosition === 0) {
    return Math[type](num)
  } else {
    const multiple = Math.pow(10, significantDigitsPosition)
    return parseFloat((Math[type](num * multiple) / multiple).toFixed(significantDigitsPosition))
  }
}

/**
 * 精确加法：处理非常大的数值或极小的差值时依然会导致精度问题，请确认使用场景
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
export function preciseAddition(num1: number, num2: number) {
  const precision = Math.max(getPrecision(num1), getPrecision(num2)) // 获取两个数中较大的精度
  const factor = Math.pow(10, precision) // 计算放大因子
  const result = (num1 * factor + num2 * factor) / factor // 使用放大因子进行计算
  return parseFloat(result.toFixed(precision)) // 将结果保留指定的精度并返回
}

/**
 * 精确减法：处理非常大的数值或极小的差值时依然会导致精度问题，请确认使用场景
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
export function preciseSubtraction(num1: number, num2: number) {
  const precision = Math.max(getPrecision(num1), getPrecision(num2)) // 获取两个数中较大的精度
  const factor = Math.pow(10, precision) // 计算放大因子
  const scaledNum1 = num1 * factor // 将减数1放大
  const scaledNum2 = num2 * factor // 将减数2放大
  const scaledResult = (scaledNum1 - scaledNum2) / factor // 进行放大后的减法计算
  return parseFloat(scaledResult.toFixed(precision)) // 将结果保留指定的精度并返回
}

/**
 * 精确除法：不支持非常大的数和精度非常高的数，请确认使用场景
 * @param {*} dividend
 * @param {*} divisor
 * @returns
 */
export function preciseDivision(dividend: number, divisor: number) {
  const precision = Math.max(getPrecision(dividend), getPrecision(divisor)) // 获取两个数中较大的精度
  const scaledDividend = multiplyWithPrecision(dividend, precision) // 将被除数放大
  const scaledDivisor = multiplyWithPrecision(divisor, precision) // 将除数放大
  const scaledResult = scaledDividend / scaledDivisor // 进行放大后的除法计算
  return parseFloat(scaledResult.toFixed(precision)) // 将结果保留指定的精度并返回
}

const colorsList = Object.freeze([
  '#ff0000',
  '#ff3b1e',
  '#ff703a',
  '#ffa055',
  '#edc86f',
  '#c6e789',
  '#a3f9a0',
  '#7fffb5',
  '#5af8c8',
  '#37e6d8',
  '#10c6e6',
  '#149df1',
  '#386df9',
  '#5c38fd',
  '#8000ff',
])
/**
 * 可以根据指定的最小值和最大值生成图例数组，返回的结构同echarts的visualMap.pieces
 * 图例的长度取决于colors颜色的数量
 * @param {*} min
 * @param {*} max
 * @param {*} colors
 * @returns [
    {gte: 10, lt: 20,  label: '20 ', color: '#386df9', symbolSize: 6, },
    {gte: 0,  lt: 10,  label: '10 ', color: '#8000ff', symbolSize: 6, },
  ]
 */
export function genColorIndicators(min: number, max: number, colors = colorsList) {
  const minNum = significantDigitsRound(min, 'floor')
  const maxNum = significantDigitsRound(max, 'ceil')
  const range = maxNum - minNum
  let tick = minNum
  const rawTickStep = Math.abs(range / colors.length)
  let tickStep = 1
  if (rawTickStep >= 1) {
    tickStep = Math.ceil(rawTickStep)
  } else if (rawTickStep === 0) {
    tickStep = 1
  } else {
    tickStep = significantDigitsRound(rawTickStep, 'ceil')
  }
  const res = []
  while (res.length < colors.length) {
    const ltValue = preciseAddition(tick, tickStep)
    res.push({
      gte: tick,
      lt: ltValue,
      label: `${ltValue}`,
      color:
        colors[colors.length - 1 - preciseDivision(preciseSubtraction(tick, minNum), tickStep)],
      symbolSize: 6,
    })
    tick = preciseAddition(tick, tickStep)
  }
  return res.reverse()
}
