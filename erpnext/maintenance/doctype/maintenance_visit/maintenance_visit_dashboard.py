from frappe import _

def get_data():
	return {
		'fieldname': 'maintenance_visit',
		'non_standard_fieldnames': {
			'Quotation': 'related_maintenance_visit',
			'Delivery Note': 'related_maintenance_visit',
			'Sales Invoice': 'related_maintenance_visit'
		},
		'internal_links': {
			'Maintenance Schedule': ['schedules', 'maintenance_visit'],
		},
		'transactions': [
			{
				'label': _('Transactions'),
				'items': ['Sales Invoice', 'Delivery Note']
			},
			{
				'label': _('Other'),
				'items': ['Maintenance Schedule', 'Quotation']
			}
		]
	}