sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller,
	BaseController,
	JSONModel,
	MessageBox,Fragment) {
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
          let oDatiMat = this.getModel("ordineModel").getData().bom[0]
          let oModel = new JSONModel(oDatiMat)
      
          if(oEvent.getParameter("cellControl").getBindingInfo("text").binding.getPath() === 'Materiale'){
            if(oEvent.getParameter("cellControl").getBindingInfo("text").binding.getValue() === oDatiMat.Materiale){
              this.setModel(oModel, "bomDialog");
              this.onOpenDialog("nDialog","ordiniacquisto.ordiniacquisto.view.Fragment.bomDialog",this,"bomDialog")
            }
          }
        },
        onCloseDialog: function(oEvent){
          oEvent.getSource().getParent().close()
        },
        onCloseAllegati: function(oEvent){
          oEvent.getSource().getParent().getParent().close()
        },
        onOpenTesti:function(oEvent){
          debugger
          this.setModel(new JSONModel(), "testiModel");
          let oButton = oEvent.getSource()
          let oView = this.getView()
          let objSel = oEvent.getSource().getBindingContext("ordineModel").getObject().testiPop
          this.getModel("testiModel").setProperty("/", objSel);

          if (!this._qPopover) {
            this._pPopover = Fragment.load({
              id: oView.getId(),
              name: "ordiniacquisto.ordiniacquisto.view.Fragment.testi",
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
          let oAllegatiMat = this.getModel("ordineModel").getData().allegati[0]
          let oModel = new JSONModel(oAllegatiMat)
          let order = oEvent.getSource().getBindingContext("ordineModel").getObject().ordine
          if(oAllegatiMat.Ordine === order){
          this.setModel(oModel, "allegatiDialog");
          this.onOpenDialog("pDialog","ordiniacquisto.ordiniacquisto.view.Fragment.listAllegati",this,"allegatiDialog")     
          }    
        },
        onSelectAllegato: function (oEvent){
          oEvent.getSource()
        }
      }
    );
  }
);
