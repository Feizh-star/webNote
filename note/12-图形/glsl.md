### *、方法

#### 1. 绘制

##### 1.1 drawArrays

* `gl.drawArrays(mode, first, count)`
* 功能：根据顶点（gl.ARRAY_BUFFER）缓冲区中的顶点数据，绘制图形。

| 参数  | 含义                 | 值                                     |
| :---- | :------------------- | :------------------------------------- |
| mode  | 绘制模式             | gl.LINE_LOOP、gl.LINES、gl.TRIANGLES等 |
| first | 指定从哪个点开始绘制 | 整型数                                 |
| count | 绘制顶点个数         | 整型数                                 |

##### 1.2 drawElements

* `gl.drawElements(mode, count, type, offset)`
* 功能：根据索引（gl.ELEMENT_ARRAY_BUFFER）缓冲区中的顶点索引数据，取出对应的顶点缓冲区中的顶点数据，绘制图形。可以提高重复顶点的利用效率

| 参数   | 含义                                                         | 值                                                           |
| :----- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| mode   | 绘制模式                                                     | gl.LINE_LOOP、gl.LINES、gl.TRIANGLES等                       |
| count  | 绘制顶点个数                                                 | 整型数                                                       |
| type   | 数据类型                                                     | gl.UNSIGNED_BYTE对应Uint8Array，gl.UNSIGNED_SHORT对应Uint16Array |
| offset | 指定元素数组**索引缓冲区**中的字节偏移量。必须是给定类型大小的有效倍数。 | 整型数，以字节为单位                                         |