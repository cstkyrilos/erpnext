// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.query_reports["Contract Profit"] = {
	"filters": [
		{
			"fieldname":"order_no",
			"label": __("Sales Order"),
			"fieldtype": "Link",
			"options": "Sales Order",
			"get_query": function() {
				return {
					"doctype": "Sales Order",
					"filters": {
						"docstatus": 1,
						"order_type": 'Sales',
						"sales_type": ["!=","Cash"]
					}
				}
			},
			"reqd": 1
		},
	],
}
