**grid-template-columns` 和 `grid-template-rows` 的区别 + 它们支持的单位**

---

## 一、它们分别是干嘛的

### 🔹 `grid-template-columns`
👉 定义“列”的宽度

```css
grid-template-columns: 100px 200px 1fr;
```
表示：三列，宽度分别是 100px、200px、剩余空间

---

### 🔹 `grid-template-rows`
👉 定义“行”的高度

```css
grid-template-rows: 100px 1fr;
```
表示：两行，高度分别是 100px 和剩余空间

---

## 二、核心单位（重点）

### 1️⃣ `px`（固定长度）
```css
grid-template-columns: 100px 200px;
```
👉 固定尺寸，不会随容器变化

---

### 2️⃣ `%`（百分比）
```css
grid-template-columns: 50% 50%;
```
👉 相对于容器宽度（rows 则相对于容器高度）

⚠️ 注意：  
如果容器**没有明确高度**，`%` 在 rows 上可能不生效

---

### 3️⃣ `fr`（最重要 ⭐）
👉 Grid 专属单位，表示“剩余空间的比例”

```css
grid-template-columns: 1fr 2fr;
```

👉 含义：
- 总共分成 3 份
- 第一列 1/3
- 第二列 2/3

✔️ 最常用、最推荐

---

### 4️⃣ `auto`
```css
grid-template-columns: auto auto;
```
👉 根据内容自动撑开

---

### 5️⃣ `min-content` / `max-content`
```css
grid-template-columns: min-content max-content;
```

- `min-content`：尽可能小（不溢出）
- `max-content`：内容多宽就多宽

👉 用于精细布局（不常用于简单页面）

---

### 6️⃣ `minmax()` ⭐（非常实用）
```css
grid-template-columns: minmax(100px, 1fr);
```

👉 表示：
- 最小 100px
- 最大可伸展到 1fr

✔️ 响应式布局神器

---

### 7️⃣ `repeat()`（语法糖）
```css
grid-template-columns: repeat(3, 1fr);
```

👉 等价于：
```css
1fr 1fr 1fr
```

---

## 三、总结一句话

👉 `columns` 控制“横向分割”，`rows` 控制“纵向分割`  
👉 **`fr` 是 Grid 的核心单位，用来分配剩余空间**

---

## 四、一个典型组合（推荐写法）

```css
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto 1fr;
}
```

## 五、行列合并

### 1️⃣ 列合并

```html
<div class="container">
  <div class="item1">第一行（占满）</div>
  <div>第二行1</div>
  <div>第二行2</div>
  <div>第三行1</div>
  <div>第三行2</div>
</div>
```

```css
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两列基础网格 */
  gap: 10px;
}

.item1 {
  /* 第一行列合并 */
  grid-column: span 2; /* 第一行占两列 */
  grid-column: 1 / -1; /* 同上，另一种写法：表示从第1列到最后一列（更通用） */
}
/* 效果
[   第一行（占满）   ]
[ 第二行1 ][ 第二行2 ]
[ 第三行1 ][ 第三行2 ]
*/
```

### 2️⃣ 行合并

```html
<div class="container">
  <div class="item1">占两行</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

```css
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 100px; /* 每一行高度 */
  gap: 10px;
}

.item1 {
  grid-row: span 2; /* 占两行 */
  grid-row: 1 / 3; /* 同上，另一种写法：从第1行开始, 到第3行结束（不包含第3行） */
}
/* 效果
[ div1 ][ div2 ]
[ div1 ][ div3 ]
[ div4 ][      ]
*/
```

