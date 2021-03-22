// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.query_reports["Invoice Profit"] = {
	"filters": [
		{
			"fieldname":"invoice_no",
			"label": __("Invoice No."),
			"fieldtype": "Link",
			"options": "Sales Invoice",
			"get_query": function() {
				return {
					"doctype": "Sales Invoice",
					"filters": {
						"docstatus": 1,
						"sales_invoice_type": 'Sales'
					}
				}
			},
			"reqd": 1
		},
	],
}