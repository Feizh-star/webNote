# pinia
## 一、基础
### 1.state
#### 1.1 state的基本特性
1. store实例本身就是一个响应式对象
2. state的属性都会被包装成ref：基本类型被包装后的value值就是原始值；引用类型被包装后的value值是一个响应式对象
3. store被解构时，得到的就是上述ref的value
    * 解构会触发getter，proxy会把属性ref的value返回，而不返回真实值
5. storeToRefs()就是把store中属性的值直接放在一个新的普通对象中，此时解构得到的就是ref