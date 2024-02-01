sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller,
	BaseController,
	JSONModel,
	MessageBox) {
    "use strict";

    return BaseController.extend(
      "ordiniacquisto.ordiniacquisto.controller.Home",
      {
        onInit: async function () {
          debugger;
          let objJSon = await fetch("/model/modMock.json");
          let data = await objJSon.json();

          let oModel = new JSONModel(data);
          this.setModel(oModel, "ordineModel");
        },
        onOpenBom: function(oEvent){
          debugger
          let oColumn = oEvent.getParameters().columnIndex
          //bindingContext
          if (oColumn === "2"){
          this.onOpenDialog("nDialog","ordiniacquisto.ordiniacquisto.view.Fragment.bomDialog",this,"modelloDialog")

          }
        }
      }
    );
  }
);
