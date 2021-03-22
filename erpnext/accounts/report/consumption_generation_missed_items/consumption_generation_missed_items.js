// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.query_reports["Consumption Generation Missed Items"] = {
	"filters": [
		{
			"fieldname":"month",
			"label": __("Month"),
			"fieldtype": "Select",
			"options": ["1","2","3","4","5","6","7","8","9","10","11","12"],
			"reqd": 1,
			"width": "120px"
		},
		{
			"fieldname":"year",
			"label": __("Year"),
			"fieldtype": "Data",
			"default": "2017",
			"reqd": 1,
			"width": "60px"
		},
	]
}
