/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ordini_acquisto/ordini_acquisto/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
