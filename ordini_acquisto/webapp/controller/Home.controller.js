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
          
          let order = oEvent.getSource().getBindingContext("ordineModel").getObject().ordine
          if(order === '6500000160'){
            let oAllegatiMat = this.getModel("ordineModel").getData().allegati[0]
            let oModel = new JSONModel(oAllegatiMat)        
            this.setModel(oModel, "allegatiDialog");
            this.onOpenDialog("pDialog","ordiniacquisto.ordiniacquisto.view.Fragment.listAllegati",this,"allegatiDialog")
          }else if( order === '4500041619'){
            let oAllegatiMat=  this.getModel("ordineModel").getData().allegati[1]
            let oModel = new JSONModel(oAllegatiMat)        
            this.setModel(oModel, "allegatiDialog");
            this.onOpenDialog("pDialog","ordiniacquisto.ordiniacquisto.view.Fragment.listAllegati",this,"allegatiDialog")
          } 
        },
        onSelectAllegato: function (oEvent){
          debugger
          let src = oEvent.getSource().getBindingContext("allegatiDialog").getObject().src
          let pdfModel = new JSONModel()
          pdfModel.setProperty("/source",src)
          this.setModel(pdfModel,"pdfModel")
          this.onOpenDialog("lDialog","ordiniacquisto.ordiniacquisto.view.Fragment.allegato",this,"pdfModel")       
          },
          onCloseAllegati: function (oEvent){
            oEvent.getSource().getParent().getParent().close()
          },
          onConsegnaPress: function (oEvent) {
            debugger
            this.odaToChange = oEvent.getSource().getBindingContext("ordineModel").getPath()
            this.onOpenDialog("pDialog","ordiniacquisto.ordiniacquisto.view.Fragment.dataConsegnaDialog",this,"ordineModel")
          
          },
          onDatePickerChange: function (oEvent) {
            debugger
            let newPropDate = oEvent.getParameters().value
            this.getModel("ordineModel").setProperty(this.odaToChange + "/nuovaData", newPropDate)
            
          }

      }
    );
  }
);
