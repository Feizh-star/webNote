/**
 * 判断url是否是http或https
 * @param {string} path
 * @returns {Boolean}
 */
export function isHttp(url: string) {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
}
