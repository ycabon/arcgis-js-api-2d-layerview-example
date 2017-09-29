import { declared, subclass } from "esri/core/accessorSupport/decorators";
import LayerView2D = require("esri/views/2d/layers/LayerView2D");

import { IUpdateParameters } from "esri/views/2d/interfaces";
import { IRenderParameters } from "esri/views/2d/engine/interfaces";
import DisplayObject = require("esri/views/2d/engine/DisplayObject");

class CanvasContainer extends DisplayObject<HTMLCanvasElement> {
  createElement(): HTMLCanvasElement {
    const el = document.createElement("canvas");
    el.className = "esri-display-object";
    return el;
  }

  setElement(el: HTMLCanvasElement): void {
    this.element = el;
  }

  doRender(renderParams: IRenderParameters): void {
    [this.element.width, this.element.height] = renderParams.state.size;

    const context = this.element.getContext("2d");
    const zero = renderParams.state.toScreen([0, 0], [0, 0]);
    const size = Math.abs(Math.sin(Date.now() / 1000)) * 90 + 10;
    context.fillRect(zero[0] - size * .5, zero[1] - size * .5, size, size);

    this.requestRender();
  }
}

@subclass("my.custom.layer")
class CustomLayerView2D extends declared(LayerView2D) {

  container = new CanvasContainer();

  update(updateParameters: IUpdateParameters): void {
    // updating code
  }

  attach(): void {

  }

  detach(): void {

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

