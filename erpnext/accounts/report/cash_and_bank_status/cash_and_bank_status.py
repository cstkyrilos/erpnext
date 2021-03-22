# Copyright (c) 2013, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe

def execute(filters=None):
	columns = [
		{
			'fieldname': 'إجمالى الوارد',
			'label': 'إجمالى الوارد',
			'fieldtype': 'Currency',
			"width": 500
		},
		{
			'fieldname': 'إجمالى المنصرف',
			'label': 'إجمالى المنصرف',
			'fieldtype': 'Currency',
			"width": 500
		},
	]

	data = frappe.db.sql("""select sum(income) as 'إجمالى الوارد', sum(expences) as 'إجمالى المنصرف' from (
					select sum(g.debit) as income, sum(g.credit) as expences from `tabGL Entry` g 
					left join `tabAccount` ac on ac.name=g.account 
					left join `tabAccount` ag on ag.name=g.against 
					where g.posting_date>=%(from_date)s and g.posting_date<=%(to_date)s
					and g.company=%(company)s 
					and ifnull(ac.account_type,'') in ('Cash','Bank') 
					and not ifnull(ag.account_type,'') in ('Cash','Bank')
					) a
					""", {'from_date': filters.from_date, 'to_date': filters.to_date, 'company': filters.company})

	return columns, data
