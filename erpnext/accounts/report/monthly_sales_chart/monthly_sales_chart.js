// Copyright (c) 2016, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.query_reports["Monthly Sales Chart"] = {
    "filters": [
        {
            "fieldname":"year",
            "label": __("Year"),
            "fieldtype": "Data",
			'reqd': 1,
            "default": moment(new Date()).year()
        },
        {
            "fieldname":"based_on",
            "label": __("Based On"),
            "fieldtype": "Select",
			"options": ["Grand Total", "Net Total"],
			'reqd': 1,
            "default": "Net Total"
        },
    ],
	get_chart_data: function(columns, result) {
		return {
			data: {
				x: 'Month',
				columns: [
					['Month'].concat($.map(result, function(d) { return d[0]; })),
					['Sales'].concat($.map(result, function(d) { return d[1]; }))
				]
				// rows: [['Date', 'Mins to first response']].concat(result)
			},
			chart_type: 'line',

		}
	}
}
