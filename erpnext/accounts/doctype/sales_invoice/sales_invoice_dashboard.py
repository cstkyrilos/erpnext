from frappe import _

def get_data():
	return {
		'fieldname': 'sales_invoice',
		'non_standard_fieldnames': {
			'Delivery Note': 'against_sales_invoice',
			'Journal Entry': 'reference_name',
			'Payment Entry': 'reference_name',
			'Payment Request': 'reference_name',
			'Sales Invoice': 'return_against'
		},
		'internal_links': {
			'Sales Order': ['items', 'sales_order'],
			'Delivery Note': ['items', 'delivery_note'],
		},
		'transactions': [
			{
				'label': _('Payment'),
				'items': ['Payment Entry', 'Payment Request', 'Journal Entry']
			},
			{
				'label': _('Reference'),
				'items': ['Timesheet', 'Delivery Note', 'Sales Order', 'Account extra copies']
			},
			{
				'label': _('Returns'),
				'items': ['Sales Invoice']
			},
		]
	}