timely.define(["jquery_timely"],function(e){var t=function(e){var t=e.closest(".ai1ec-feed-container");t.remove()},n=function(e){e.siblings(".ai1ec_delete_ics").removeAttr("disabled"),e.siblings(".ajax-loading").css("visibility","hidden")};return{remove_feed_from_dom:t,restore_normal_state_after_unsuccesful_delete:n}});