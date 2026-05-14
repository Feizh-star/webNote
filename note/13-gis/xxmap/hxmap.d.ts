import type { GeoJSON } from 'geojson'

declare module 'hxmap' {
  import type {
    IMapInstance,
    IMapEvent,
    IScale,
    IColors,
    IGlImgInstance,
    ILayer,
    IGTextInstance,
  } from 'hxmap'
  type IMapInstance2 = IMapInstance & {
    getBounds: () => {
      latlngMin: { lon: number; lat: number }
      latlngMax: { lon: number; lat: number }
    }
    getPxBounds: () => {
      xmin: number
      xmax: number
      ymin: number
      ymax: number
    }
    on: (event: IMapEvent | 'move' | 'zoom', callback: IMapEventCallback) => void
    off: (event: IMapEvent | 'move' | 'zoom', callback: IMapEventCallback) => void
    project: (lat: number, lon: number, zoom: number) => { x: number; y: number }
    unproject: (x: number, y: number, zoom: number) => { lat: number; lon: number }
    removeLayerEvent: (event: IMapEvent, layer: ILayer, callback: IMapEventCallback) => void
    flyToBounds: (latmin: number, latmax: number, lonmin: number, lonmax: number) => void
  }
  interface IGMarkerClickEvent {
    id: string
    lat: number
    lon: number
    x: number
    y: number
  }
  // geojson线
  interface IGeojsonPolygonInstance extends ILayer {}
  const GeojsonPolygon: new (params: {
    data: GeoJSON
    color?: [r: number, g: number, b: number, a: number]
    index?: number
  }) => IGeojsonPolygonInstance
  interface IGMarkerInstance {
    id: string
    setImg: (img: string | HTMLCanvasElement | Image) => void
    openPopup: (map: IMapInstance, content: string, zIndex: number) => void
    closePopup: (map: IMapInstance) => void
  }

  const GlImg: new (params: {
    img: string | HTMLImageElement
    lonmin: number
    lonmax: number
    latmin: number
    latmax: number
    scale: IScale
    colors: IColors
    index?: number
    interval?: number
    grid?: boolean
    linear?: number
    flipy?: 0 | 1
    minOpacity?: boolean
    useCorrect?: boolean
    cut?: boolean
    cutUrl?: string
    cutlatmin?: number
    cutlatmax?: number
    cutlonmin?: number
    cutlonmax?: number
    useCros?: boolean
    preserveDrawingBuffer?: boolean
  }) => IGlImgInstance

  // 网格点
  interface IGridPointParams {
    url: string
    showPoints: true
    showTexts: true
    color: [number, number, number, number]
    interval: number
    pointSize: number
    textOffset: [number, number]
    strokeWidth: number
    strokeColor: string
    fontWeight: number
    fontSize: number
    latmax: number
    latmin: number
    lonmax: number
    lonmin: number
    intervalZoom: number
    getValue: (val: number) => string
    scale: IScale
  }
  interface IGridPointsInstance extends ILayer {
    changeData: (url: string) => void
    changeAllData: (params: Partial<IGridPointParams>) => void
  }

  const GridPoints: new (params: Partial<IGridPointParams>) => IGridPointsInstance

  // 普通标记
  interface IGMarkerGroupInstance extends ILayer {
    setClickEnable: () => void
  }
  const GMarkerGroup: new (params: {
    positions: [lat: number, lon: number][]
    source: string
    imgSize?: [width: number, height: number]
  }) => IGMarkerGroupInstance
}
