#### 1.gradle编译失败

> \> Task :app:compileDebugKotlin FAILED e: file:///F:/frontend/studio/ReactAndroid/reactnative-hello/android/app/src/main/java/com/awesomeproject/MainActivity.kt:8:32 Unresolved reference 'fragment'. e: file:///F:/frontend/studio/ReactAndroid/reactnative-hello/android/app/src/main/java/com/awesomeproject/MainActivity.kt:26:46 Unresolved reference 'RNScreensFragmentFactory'.

* 原因：react-native-screens太老，其内部没有RNScreensFragmentFactory这个包，而新版本的文档里面要求在代码中添加这个包，更新后解决。
* 还有一点，不知道有没有影响，在这个过程中使用android studio安装了全部gradle依赖（且设置了国内镜像，好像有一个依赖还是从外网下载的。记得很久之前没有使用RNScreensFragmentFactory这个包的时候，那台台式机也会编译失败，解决上述问题后却直接成功了，可能跟使用国内镜像重新下载所有依赖也有关系。



### 命令记录

#### 1.编译

* 清除gradle编译缓存

  ```
  gradlew clean
  ```

  