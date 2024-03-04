sap.ui.define([
	"sap/ui/core/mvc/Controller",
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment",
  "sap/m/MessageBox"
], function(
	Controller,
	BaseController,
	JSONModel,
	Fragment,
	MessageBox
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
      let orderAllegato = oEvent.getSource().getBindingContext("detailModel").getObject()       
      let pdfModel = new JSONModel()       
      this.setModel(pdfModel,"pdfModel")
      this.getModel("pdfModel").setProperty("/source",orderAllegato.src)
      this.onOpenDialog("pDialog","ordiniacquisto.ordiniacquisto.view.Fragment.Detail.imageAll",this,"pdfModel")     
    },
    onCloseAllegati: function (oEvent){
        oEvent.getSource().getParent().getParent().close()
    },
    modDataConsegna: function (oEvent) {
      debugger;
      let oTable = oEvent.getSource().getParent().getParent();
      let aSelectedIndices = oTable.getSelectedIndices();
      let oModel = oTable.getModel("detailModel"); 
      if(aSelectedIndices.length > 0){
      for (let i = aSelectedIndices.length - 1; i >= 0; i--) {
        let index = aSelectedIndices[i];
       
        let oData = oModel.getProperty("/posizioni/" + index); 
        let oNewData = Object.assign({}, oData);
        oModel.getData().posizioni.splice(index + 1, 0, oNewData);

        let oRow = oEvent.getSource().getParent().getParent().getRows()[index];
        let oNewRow = oEvent.getSource().getParent().getParent().getRows()[index +1];
        oRow.getCells()[3].setProperty("editable", true);
        oRow.getCells()[4].setProperty("editable", true);
        oRow.getCells()[5].setProperty("editable", true);
        
        oNewRow.getCells()[3].setProperty("editable", true);
        oNewRow.getCells()[4].setProperty("editable", true);
        oNewRow.getCells()[5].setProperty("editable", true);
      }
      oModel.refresh(true);    
      oTable.clearSelection();
      }else{
        MessageBox.error("Seleziona almeno un elemento")
      }
    },
    onNav: function(oEvent){
      debugger
      this.getRouter().navTo("RouteHome")

       let oTable = this.getView().byId("idTreeTable"); 
        if (oTable) {
          let aRows = oTable.getRows();
          aRows.forEach(function(row) {
            let aCells = row.getCells();
            aCells.forEach(function(cell) {
              if (cell.setEditable) {
                cell.setEditable(false);
              }
            });
          });
        }
    },
	});
});