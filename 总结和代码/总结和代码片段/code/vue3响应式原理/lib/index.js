let reactiveWeakMap = new WeakMap()
let activeEffect

function getSubscribersForProperty(target, key) {
  let keyMapSet = reactiveWeakMap.get(target)
  if (!keyMapSet) keyMapSet = new Map(), reactiveWeakMap.set(target, keyMapSet)
  let effectsSet = keyMapSet.get(key)
  if (!effectsSet) effectsSet = new Set(), keyMapSet.set(key, effectsSet)
  return effectsSet
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}

function track(target, key) {
  if (activeEffect) {
    const effects = getSubscribersForProperty(target, key)
    effects.add(activeEffect)
  }
}

function trigger(target, key) {
  const effects = getSubscribersForProperty(target, key)
  effects.forEach((effect) => effect())
}

function watchEffect(update) {
  const effect = () => {
    activeEffect = effect
    update()
    activeEffect = null
  }
  effect()
}

const a = ref(1)
const b = ref(1)
const c = ref(0)

watchEffect(() => {
  c.value = a.value + b.value
})

watchEffect(() => {
  console.log('c', c.value)
})

setInterval(() => {
  a.value++
  b.value++
}, 1000)