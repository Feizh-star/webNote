/**
 * @description 将 vite 的原始环境变量转成正确的类型
 * @param env 原始的 vite 环境变量
 * @returns 转换成正确类型的 vite 环境变量
 */
const numReg = /^(-|\+)?\d+(\.\d+)?$/
export const useEnv = (env: Recordable): ImportMetaEnv => {
  const ret: any = {}

  for (const envKey of Object.keys(env)) {
    let envValue = env[envKey]

    // 转成正确的布尔类型
    envValue = envValue === 'true' ? true : envValue === 'false' ? false : envValue

    // 转换 number
    if (numReg.test(envValue)) {
      envValue = Number(envValue)
    }

    ret[envKey] = envValue
  }

  return ret
}
