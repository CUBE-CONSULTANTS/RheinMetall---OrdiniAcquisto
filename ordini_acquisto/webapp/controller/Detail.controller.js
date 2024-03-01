sap.ui.define([
	"sap/ui/core/mvc/Controller",
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment"
], function(
	Controller,
  BaseController,
  JSONModel,Fragment
) {
	"use strict";

	return BaseController.extend("ordiniacquisto.ordiniacquisto.controller.Detail", {
    onInit: async function () {
      debugger
      this.userType = this.getOwnerComponent().getModel("userModel").getProperty("/tipoUtente");
      debugger;
      // let objJSon = await fetch("/model/modMock.json");
      // let data = await objJSon.json();
      // let datiRichiesta = data.dati[1].posizioni
      // let oModel= new JSONModel(datiRichiesta)
      // this.setModel(oModel,"detailModel");          
    },
    onNav: function(oEvent){
      this.getRouter().navTo("RouteHome")
    },
	});
});