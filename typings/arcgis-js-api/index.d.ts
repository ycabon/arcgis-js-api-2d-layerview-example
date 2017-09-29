// import Graphic = require("esri/Graphic");

// import Accessor = require("esri/core/Accessor");
// import Layer = require("esri/layers/Layer");
// import MapView = require("esri/views/MapView");


declare namespace __esri_extra {
  interface IExtent {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    spatialReference: ISpatialReference;

    intersects(geometry: any): boolean;
  }

  interface ISpatialReference {
    wkid: number;
    isWrappable: boolean;
  }

  type vec2 = [number, number];

  interface IFrameBudget {
    done: boolean;
    remaining: number;
  }

  interface IViewState {
    id?: any;
    extent: IExtent;
    center: vec2;
    scale: number;
    resolution: number;
    rotation: number;
    width: number;
    height: number;
    pixelRatio: number;
    size: vec2;
    spatialReference: ISpatialReference;
    worldScreenWidth: number;

    transform: [number, number, number, number, number, number];
    inverseTransform: [number, number, number, number, number, number];

    // todo remove
    viewpoint: any;

    toMap(out: vec2, coords: vec2): vec2;
    toScreen(out: vec2, coords: vec2): vec2;
    clone(): IViewState;
    copy(other: IViewState): this;
  }

  export interface IUpdateParameters {
    budget: IFrameBudget;
    state: IViewState;
    devicePixelRatio: number;
    stationary: boolean;
  }

  export interface IRenderParameters {
    budget: IFrameBudget;
    state: IViewState;
    devicePixelRatio: number;
    stationary: boolean;
  }

  export abstract class DisplayObject<E extends HTMLElement | SVGSVGElement> extends __esri.Evented {
    protected element: E;
    abstract createElement(): E;
    abstract setElement(el: E): void;

    readonly attached: boolean;
    visible: boolean;
    opacity: number;
    readonly renderRequested: boolean;

    attach(renderParams: IRenderParameters): boolean;
    detach(renderParams: IRenderParameters): void;
    abstract doRender(renderParams: IRenderParameters): void;
    protected requestRender(): void;

    on(type: "attach", listener: (target: this) => void): IHandle;
    on(type: "detach", listener: (target: this) => void): IHandle;
    on(type: "post-render", listener: (target: this) => void): IHandle;
  }

  export abstract class LayerView2D {
    readonly view: __esri.MapView;
    readonly layer: __esri.Layer;
    readonly attached: boolean;
    readonly container: DisplayObject<any>;
    readonly moving: boolean;
    readonly rendering: boolean;
    readonly suspended: boolean;
    readonly updateParameters: IUpdateParameters;
    readonly updateRequested: boolean;
    readonly updating: boolean;

    protected requestUpdate(): void;

    abstract hitTest(x: number, y: number): IPromise<__esri.Graphic>;
    abstract update(updateParameters: IUpdateParameters): void;
    abstract attach(): void;
    abstract detach(): void;
    abstract moveStart(): void;
    abstract viewChange(): void;
    abstract moveEnd(): void;

    //--------------------------------------------------------------------------
    //
    //  Internal
    //
    //--------------------------------------------------------------------------

    protected isUpdating(): boolean;
    protected isRendering(): boolean;
    protected canResume(): boolean;
  }
}



declare module "esri/views/2d/layers/LayerView2D" {
  import LayerView2D = __esri_extra.LayerView2D;
  export = LayerView2D;
}

declare module "esri/views/2d/interfaces" {
  export import IUpdateParameters = __esri_extra.IUpdateParameters;
}

declare module "esri/views/2d/engine/interfaces" {
  export import IRenderParameters = __esri_extra.IRenderParameters;
}

declare module "esri/views/2d/engine/DisplayObject" {
  import DisplayObject = __esri_extra.DisplayObject;
  export = DisplayObject;
}
