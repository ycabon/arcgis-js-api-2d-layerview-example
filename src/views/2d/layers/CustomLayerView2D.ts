/// <amd-dependency path="esri/core/tsSupport/extendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { declared, subclass } from "esri/core/accessorSupport/decorators";
import LayerView2D = require("esri/views/2d/layers/LayerView2D");

import { IUpdateParameters } from "esri/views/2d/interfaces";

import CanvasDrawingExample from "./CanvasDrawingExample";

@subclass("my.custom.layer")
class CustomLayerView2D extends declared(LayerView2D) {

  container = new CanvasDrawingExample();

  update(updateParameters: IUpdateParameters): void {
    // updating code
    // call this.requestUpdate(); to have the layerview update to be called.
  }

  attach(): void {
    // called when the layerview is attached to the view.
    // good to allocate drawing resources
  }

  detach(): void {
    // called when the layerview is detached from the view
    // good to deallocate drawing resources
  }

  moveStart(): void {
    // uncomment if need update to be called on moveStart
    // this.requestUpdate();
  }

  viewChange(): void {
    // uncomment if need update to be called on moveStart
    // this.requestUpdate();
  }

  moveEnd(): void {
    // uncomment if need update to be called on moveStart
    // this.requestUpdate();
  }
  
  hitTest(x: number, y: number): IPromise<__esri.Graphic> { return null; }
}

export default CustomLayerView2D;

