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
      this.getRouter().getRoute("Detail").attachPatternMatched(this._onRouteMatched, this);      
    },
    _onRouteMatched: async function (oEvent) {
      debugger
      const orderId = oEvent.getParameter("arguments").Action;
      const status = oEvent.getParameter("arguments").Status
      let objJSon = await fetch("/model/modMock.json");
      let data = await objJSon.json();
      let orderDetail = data.dati.find(element => element.ordine === orderId)
      let oModelDetail = new JSONModel(orderDetail);
      this.setModel(oModelDetail, "detailModel");
    },
    onOpenTesti:function(oEvent){
      this.setModel(new JSONModel(), "testiModel");
      let oButton = oEvent.getSource()
      let oView = this.getView()
      let objSel = oEvent.getSource().getBindingContext("detailModel").getObject().testiPop
      this.getModel("testiModel").setProperty("/", objSel);

      if (!this._qPopover) {
        this._pPopover = Fragment.load({
          id: oView.getId(),
          name: "ordiniacquisto.ordiniacquisto.view.Fragment.Detail.testi",
          controller: this,
        }).then(function (oPopover) {
          oView.addDependent(oPopover);
          let ogg = oView.getModel("testiModel").getData();
          const oJsonModel = new JSONModel();
          oPopover.setModel(oJsonModel, "testiPopover");
          oPopover.getModel("testiPopover").setProperty("/", ogg);
          return oPopover;
        });
      }
      this._pPopover.then(function (oPopover) {
        oPopover.openBy(oButton);
      });        
    },
    onOpenAllegati:function(oEvent){
      debugger       
      let order = oEvent.getSource().getBindingContext("ordineModel").getObject().ordine
      if(order === '6500000160'){
        let oAllegatiMat = this.getModel("ordineModel").getData().allegati[0]
        let oModel = new JSONModel(oAllegatiMat)        
        this.setModel(oModel, "allegatiDialog");
        this.onOpenDialog("pDialog","ordiniacquisto.ordiniacquisto.view.Fragment.Detail.listAllegati",this,"allegatiDialog")
      }else if( order === '4500041619'){
        let oAllegatiMat=  this.getModel("ordineModel").getData().allegati[1]
        let oModel = new JSONModel(oAllegatiMat)        
        this.setModel(oModel, "allegatiDialog");
        this.onOpenDialog("pDialog","ordiniacquisto.ordiniacquisto.view.Fragment.Detail.listAllegati",this,"allegatiDialog")
      } 
    },
    onCloseAllegati: function(oEvent){
      oEvent.getSource().getParent().getParent().close()
    },
    onSelectAllegato: function (oEvent){
      debugger
      let src = oEvent.getSource().getBindingContext("allegatiDialog").getObject().src
      let pdfModel = new JSONModel()
      pdfModel.setProperty("/source",src)
      this.setModel(pdfModel,"pdfModel")
      this.onOpenDialog("lDialog","ordiniacquisto.ordiniacquisto.view.Fragment.Detail.allegato",this,"pdfModel")       
      },
      onCloseAllegati: function (oEvent){
        oEvent.getSource().getParent().getParent().close()
      },
    onNav: function(oEvent){
      this.getRouter().navTo("RouteHome")
    },
	});
});