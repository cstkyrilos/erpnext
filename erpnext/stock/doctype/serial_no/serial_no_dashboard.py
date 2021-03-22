from frappe import _

def get_data():
	return {
		'fieldname': 'serial_no',
		'non_standard_fieldnames': {
			'Maintenance Visit': 'machine_serial_no',
			'Sales Invoice': 'machine_serial_no', 
			'Sales Order': 'serial_n'
		},
		'transactions': [
			{
				'label': _('Stock'),
				'items': ['Stock Entry', 'Sales Order', 'Delivery Note', 'Installation Note']
			},
			{
				'label': _('Support'),
				'items': ['Asset','Warranty Claim','Issue','Maintenance Visit']
			},
			{
				'label': _('Accounting'),
				'items': ['Sales Invoice', 'Payment Entry', 'Journal Entry', 'Account extra copies']
			}
		]
	}