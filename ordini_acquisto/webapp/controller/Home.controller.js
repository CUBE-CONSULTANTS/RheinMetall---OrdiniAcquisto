sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/PDFViewer",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller,
	BaseController,
	JSONModel,
	MessageBox,Fragment, PDFViewer) {
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

          this._pdfViewer = new PDFViewer();
          this.odaToChange
			    this.getView().addDependent(this._pdfViewer);
        },
        // onOpenBom: function(oEvent){
        //   debugger
        //   let oDatiMat = this.getModel("ordineModel").getData().bom[0]
        //   let oModel = new JSONModel(oDatiMat)
      
        //   if(oEvent.getParameter("cellControl").getBindingInfo("text").binding.getPath() === 'Materiale'){
        //     if(oEvent.getParameter("cellControl").getBindingInfo("text").binding.getValue() === oDatiMat.Materiale){
        //       this.setModel(oModel, "bomDialog");
        //       this.onOpenDialog("nDialog","ordiniacquisto.ordiniacquisto.view.Fragment.dataConsegnaDialog",this,"bomDialog")
        //     }
        //   }
        // },
        onCloseDialog: function(oEvent){
          oEvent.getSource().getParent().close()
        },
          onOpenDetail: function(oEvent){
            debugger
            let orderId = oEvent.getParameter("rowContext").getObject().ordine
            let status = oEvent.getParameter("rowContext").getObject().stato
            status === 'sap-icon://status-positive' ? status = 'ok' : status = 'ko'
            this.getRouter().navTo("Detail",{ Action: orderId, Status: status})
          }
        
      }
    );
  }
);
