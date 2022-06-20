// 封装 getCurrentInstance（）
// Vue3不同于Vue2，在 Vue3的setup中我们是无法访问到this的，所以我们需要借助一个方法，那就是getCurrentInstance，该方法返回了当前的实力对象
import { getCurrentInstance } from '@vue/composition-api'

export function useInstance () {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')

  const instance = vm || {}
  return instance
}
