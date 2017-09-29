
import { declared, property, subclass } from "esri/core/accessorSupport/decorators";
import * as Layer from "esri/layers/Layer";

@subclass("my.custom.layer")
class CustomLayer extends declared(Layer) {

  viewModulePaths = {
    "2d": "app/views/2d/layers/CustomLayerView2D"
  };

  @property()
  coords = [0, 0];

}

export default CustomLayer;
