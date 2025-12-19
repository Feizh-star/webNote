### 一、瓦片加载机制

#### 1.1 瓦片金字塔结构（Tile Pyramid）

Web 地图通常使用 **金字塔式瓦片系统**：

- 每个缩放级别（zoom level）是一层；
- 每层将地图划分为 2ⁿ × 2ⁿ 个瓦片；
- 每个瓦片固定大小（通常是 256×256 像素）。

```
Zoom = 0 → 1 张瓦片（覆盖整个地球）
Zoom = 1 → 4 张瓦片（2×2）
Zoom = 2 → 16 张瓦片（4×4）
...
```

#### 1.2 瓦片坐标计算公式

在球面墨卡托（EPSG:3857）中，瓦片的索引（x, y, z）遵循以下规则：

```js
function lonLatToTileXY(lon, lat, zoom) {
  const n = Math.pow(2, zoom);
  const x = (lon + 180) / 360;
  const latRad = lat * Math.PI / 180;
  const y = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2;
  return {
    x: Math.floor(x * n),
    y: Math.floor(y * n),
    z: zoom
  };
}
```

对应的瓦片 URL 一般是（以栅格瓦片为例）：

```
https://tile-server/{z}/{x}/{y}.png
```

### 二、常见 Web 瓦片格式简介

下面介绍最常见的几种格式与使用场景：

| 格式                             | 数据类型                               | 后缀                       | 优点               | 缺点                     | 常见来源               |
| -------------------------------- | -------------------------------------- | -------------------------- | ------------------ | ------------------------ | ---------------------- |
| **Raster Tile（栅格瓦片）**      | 位图（影像、渲染后的地图）             | `.png`, `.jpg`             | 简单直观，兼容性强 | 不可交互、放大模糊       | Google Maps, OSM, Bing |
| **Vector Tile（矢量瓦片）**      | 二进制矢量数据（通常是 Protobuf 编码） | `.pbf`                     | 缩放平滑、样式可变 | 渲染复杂，需要客户端解析 | Mapbox, MapLibre       |
| **Terrain Tile（地形瓦片）**     | 高程数据（DEM 或 Mesh）                | `.png`, `.bin`, `.terrain` | 可生成 3D 地形     | 数据量较大，解析复杂     | Cesium, Mapbox Terrain |
| **WMTS（Web Map Tile Service）** | 标准化瓦片接口协议                     | XML 配置                   | 支持多投影坐标系   | 较重，需配置             | ArcGIS, GeoServer      |
| **MBTiles（离线打包格式）**      | SQLite 容器，存储瓦片集合              | `.mbtiles`                 | 便于离线使用       | 需解析数据库             | Mapbox, MapTiler       |