import { IRenderParameters } from "esri/views/2d/engine/interfaces";
import DisplayObject = require("esri/views/2d/engine/DisplayObject");

export default class ASquareOnACanvas extends DisplayObject<HTMLCanvasElement> {
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

    // requestRender will trigger a re-render at the next frame.
    this.requestRender();
  }
}