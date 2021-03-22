// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt



frappe.ui.form.on_change("Installation Note", "customer",
	function(frm) { erpnext.utils.get_party_details(frm); });

frappe.ui.form.on_change("Installation Note", "customer_address",
	function(frm) { erpnext.utils.get_address_display(frm); });

frappe.ui.form.on_change("Installation Note", "contact_person",
	function(frm) { erpnext.utils.get_contact_details(frm); });

frappe.provide("erpnext.selling");
// TODO commonify this code
erpnext.selling.InstallationNote = frappe.ui.form.Controller.extend({
	onload: function(doc, dt, dn) {
		if(!this.frm.doc.status) set_multiple(dt,dn,{ status:'Draft'});
		if(this.frm.doc.__islocal) set_multiple(this.frm.doc.doctype, this.frm.doc.name,
				{inst_date: get_today()});

		this.setup_queries();
	},

	setup_queries: function() {
		var me = this;

		this.frm.set_query("customer_address", function() {
			return {
				filters: {'customer': me.frm.doc.customer }
			}
		});

		this.frm.set_query("contact_person", function() {
			return {
				filters: {'customer': me.frm.doc.customer }
			}
		});

		this.frm.set_query("customer", function() {
			return {
				query: "erpnext.controllers.queries.customer_query"
			}
		});
	},

	refresh: function() {
		if (this.frm.doc.docstatus===0) {
			cur_frm.add_custom_button(__('From Delivery Note'),
				function() {
					//erpnext.utils.map_current_doc({
					//	method: "erpnext.stock.doctype.delivery_note.delivery_note.make_installation_note",
					//	source_doctype: "Delivery Note",
					//	get_query_filters: {
					//		docstatus: 1,
					//		status: ["not in", ["Stopped", "Closed"]],
					//		per_installed: ["<", 99.99],
					//		customer: cur_frm.doc.customer || undefined,
					//		company: cur_frm.doc.company
					//	}
					//})
				cur_frm.cscript.set_dn()}, "fa fa-download", "btn-default"
			);
		}
	},
});

cur_frm.cscript.set_dn = function(doc, cdt, cdn) {
       var dg = new frappe.ui.Dialog({
            title:'Choose Delivery Note',
			width: 400,
			fields: [
				{fieldname:'delivery_note', fieldtype:'Link', options:'Delivery Note', label:'Delivery Note', reqd:1 },
    			{fieldname:'select_dn', fieldtype:'Button', label:'Select'}
			]
		});
    	dg.fields_dict.select_dn.input.onclick = function() {
			var v = dg.get_values();
			if(v) {
				hhh = frappe.call({
					method:'frappe.direction.customizations.get_dn_from_in', 
					args: {delivery_note: dg.get_value("delivery_note")},
					callback: function(r,rt) {
					   $.each(cur_frm.doc.items || [], function(i, d) {
						  if(!d.qty || !d.item_name || (d.qty==0 || d.item_name.trim()=="")) {
							 cur_frm.page.wrapper.find("[data-idx='"+d.idx+"']").data("grid_row").remove();
						  }
					   });
						if (r.message) {
								cur_frm.doc.customer = r.message[0].customer;
								cur_frm.doc.customer_name = r.message[0].customer_name;
								cur_frm.doc.customer_address = r.message[0].customer_address;
								cur_frm.doc.customer_group = r.message[0].customer_group;
								cur_frm.doc.territory = r.message[0].territory;
								cur_frm.doc.contact_email = r.message[0].contact_email;
								cur_frm.doc.contact_person = r.message[0].contact_person;
								cur_frm.doc.company = r.message[0].company;
								$.each(r.message, function(i, d) {
									var c = cur_frm.add_child("items");
									c.item_code = d.item_code;
									c.item_name = d.item_name;
									c.qty = d.qty;
									c.serial_n = d.serial_no;
									c.related_sales_order = d.sales_order;
									c.machine_serial_no = d.machine_serial_no;
									c.installation_time = d.installation_time;
								});
							cur_frm.refresh_fields();
						}
					}
			});
					dg.hide();
			}
        }
        dg.fields_dict.delivery_note.get_query = function() {
			return filters = {
							docstatus: 1,
							status: ["not in", ["Stopped", "Closed"]],
							per_installed: ["<", 99.99],
							customer: cur_frm.doc.customer || undefined,
							company: cur_frm.doc.company
			}
        }
		dg.show();
}
$.extend(cur_frm.cscript, new erpnext.selling.InstallationNote({frm: cur_frm}));
