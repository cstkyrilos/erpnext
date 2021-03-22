// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.query_reports["Customer History"] = {
	"filters": [
		{
			"fieldname":"customer",
			"label": __("Customer"),
			"fieldtype": "Link",
			"options": "Customer",
			"reqd": 1
		},
	],
	"formatter":function (row, cell, value, columnDef, dataContext, default_formatter) {
    value = default_formatter(row, cell, value, columnDef, dataContext);
	if (dataContext.x==1) {
		value = "<span style='color:red;font-weight:bold'>" + value + "</span>";
	}
	return value;
	}
}
