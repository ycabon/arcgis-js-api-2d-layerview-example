define([
  "esri/layers/Layer",
  "esri/views/2d/layers/BaseLayerView2D"
],
function(
  Layer,
  BaseLayerView2D
) {

  let CustomLayerView = BaseLayerView2D.createSubclass({
    attach: function() {
      let renderer = this.startExportRendering({
        type: "canvas-2d",

        createExport: function(extent, width, height, options) {

          let source = {
            width,
            height,

            render: function(ctx, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
              ctx.strokeRect(dx, dy, dWidth, dHeight);

              var pt = [0, 0];
              ctx.fillStyle = "red";

              options.toScreen(pt, extent.xmin, extent.ymax);
              ctx.fillRect(pt[0], pt[1], 20, 20);

              options.toScreen(pt, extent.xmax, extent.ymax);
              ctx.fillRect(pt[0] - 20, pt[1], 20, 20);

              options.toScreen(pt, extent.xmax, extent.ymin);
              ctx.fillRect(pt[0] - 20, pt[1] - 20, 20, 20);

              options.toScreen(pt, extent.xmin, extent.ymin);
              ctx.fillRect(pt[0], pt[1] - 20, 20, 20);

              ctx.fillText(JSON.stringify(extent.toJSON()), 20, 20);

              //renderer.requestRender(source);
            }
          };

          return source;
        },

        disposeExport: function(imageSource) {

        }
      });
    },
    detach: function() {
      this._renderer && this._renderer.stop();
      this._renderer = null;
    }
  });

  let CustomLayer = Layer.createSubclass({
    createLayerView(view) {
      if (view.type === "2d") {
        return new CustomLayerView({
          view: view,
          layer: this
        });
      }
    }
  });

  return CustomLayer;

});

