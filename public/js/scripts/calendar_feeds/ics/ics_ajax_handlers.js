timely.define(["jquery_timely","libs/utils"],function(e,t){var n=function(n){var r=e("#ai1ec_add_new_ics"),s=e("#ai1ec_feed_url");r.button("reset");if(n.error){var o=t.make_alert(n.message,"error");e("#ics-alerts").append(o)}else{s.val(" ").prop("readonly",!1),e('#ai1ec-feeds-after input[type="checkbox"]').prop("checked",!1),e("#ai1ec_feed_id").remove(),e("#ai1ec_feed_category").select2("val",""),e("#ai1ec_feed_tags").select2("val","");var u=n.update.data.ics_id,a=e(n.message),f=e("#ai1ec_ics_add_new, #ai1ec_add_new_ics > i"),l=e("#ai1ec_ics_update"),c=e('.ai1ec_feed_id[value="'+u+'"] ').closest(".ai1ec-feed-container");f.removeClass("ai1ec-hidden"),l.addClass("ai1ec-hidden"),a.find(".ai1ec-collapse").removeClass("ai1ec-collapse");var c=e('.ai1ec_feed_id[value="'+u+'"] ').closest(".ai1ec-feed-container");c.length?c.replaceWith(a):e("#ai1ec-feeds-after").after(a),n.update&&n.update.data&&!n.update.data.error&&i(n.update.data)}},r=function(n){var r=e("input[value="+n.ics_id+"]").closest(".ai1ec-feed-container"),i=n.error?"error":"success",s=t.make_alert(n.message,i);n.error?e(".ai1ec_update_ics",r).button("reset"):r.remove(),e("#ics-alerts").append(s)},i=function(n){var r=e("input[value="+n.ics_id+"]").closest(".ai1ec-feed-container"),i=n.error?"error":"success",s=t.make_alert(n.message,i);e(".ai1ec_update_ics",r).button("reset"),e("#ics-alerts").append(s)};return{handle_add_new_ics:n,handle_delete_ics:r,handle_update_ics:i}});