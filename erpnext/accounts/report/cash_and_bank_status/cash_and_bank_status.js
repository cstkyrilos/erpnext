// Copyright (c) 2016, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.query_reports["Cash and Bank Status"] = {
    "filters": [
		{
			"fieldname":"company",
			"label": __("Company"),
			"fieldtype": "Link",
			"options": "Company",
			"default": frappe.defaults.get_user_default("Company"),
			"reqd": 1
		},
        {
            "fieldname":"from_date",
            "label": __("From Date"),
            "fieldtype": "Date",
			'reqd': 1,
            "default": frappe.datetime.add_days(frappe.datetime.nowdate(), -30)
        },
        {
            "fieldname":"to_date",
            "label": __("To Date"),
            "fieldtype": "Date",
			'reqd': 1,
            "default":frappe.datetime.nowdate()
        },
    ],
	get_chart_data: function(columns, result) {
		return {
			data: {
				columns: [
					['إجمالى الوارد'].concat($.map(result, function(d) { return d[0]; })),
					['إجمالى المنصرف'].concat($.map(result, function(d) { return d[1]; }))
				]
				// rows: [['Date', 'Mins to first response']].concat(result)
			},
			chart_type: 'bar',
			bar: {
				width: 150
				//		{
				//	ratio: 0.5
				//}
				//	ratio: 0.5 // this makes bar width 50% of length between ticks
				// or
				//width: 100 // this makes bar width 100px
			}
		}
	}
}
