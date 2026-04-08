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