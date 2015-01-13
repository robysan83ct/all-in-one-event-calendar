timely.define(["jquery_timely","scripts/calendar/print","scripts/calendar/agenda_view","scripts/calendar/month_view","libs/frontend_utils","libs/utils","ai1ec_calendar","ai1ec_config","scripts/common_scripts/frontend/common_frontend","libs/select2_multiselect_helper","external_libs/twig","agenda","oneday","month","external_libs/jquery_history","external_libs/jquery.tablescroller","external_libs/jquery.scrollTo","external_libs/bootstrap_datepicker","external_libs/bootstrap/alert","external_libs/jquery_cookie"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p){e.cookie.json=!0;var d="ai1ec_saved_filter",v=!e("#save_filtered_views").hasClass("ai1ec-hide"),m=function(e){var t=e.find("#ai1ec-view-dropdown .ai1ec-dropdown-menu .ai1ec-active a"),n=u.week_view_ends_at-u.week_view_starts_at,i=n*60;e.find("table.ai1ec-week-view-original").tableScroll({height:i,containerClass:"ai1ec-week-view ai1ec-popover-boundary",scroll:!1}),e.find("table.ai1ec-oneday-view-original").tableScroll({height:i,containerClass:"ai1ec-oneday-view ai1ec-popover-boundary",scroll:!1});if(e.find(".ai1ec-week-view").length||e.find(".ai1ec-oneday-view").length)e.find(".ai1ec-oneday-view .tablescroll_wrapper, .ai1ec-week-view .tablescroll_wrapper").scrollTo(e.find(".ai1ec-hour-marker:eq("+u.week_view_starts_at+")")),e.find(".ai1ec-hour-marker:eq("+u.week_view_starts_at+")").addClass("ai1ec-first-visible");e.find(".ai1ec-month-view .ai1ec-multiday").length&&r.extend_multiday_events(e),e.find(".ai1ec-calendar-view-container").trigger("initialize_view.ai1ec"),e.find(".ai1ec-calendar-toolbar").trigger("ai1ec-affix.reinit")},g=function(t){t.find(".ai1ec-calendar-view-container").trigger("destroy_view.ai1ec");var n=t.find(".ai1ec-minical-trigger").data("datepicker");typeof n!="undefined"&&(n.picker.remove(),e(document).off("changeDate",".ai1ec-minical-trigger")),t.find(".ai1ec-tooltip.ai1ec-in, .ai1ec-popup").remove(),t.find(".ai1ec-calendar-toolbar .ai1ec-btn-toolbar").remove()},y=function(){var t=[],n=[],r=[],i;e(".ai1ec-category-filter .ai1ec-dropdown-menu .ai1ec-active").each(function(){t.push(e(this).data("term"))}),e(".ai1ec-tag-filter .ai1ec-dropdown-menu .ai1ec-active").each(function(){n.push(e(this).data("term"))}),e(".ai1ec-author-filter .ai1ec-dropdown-menu .ai1ec-active").each(function(){r.push(e(this).data("term"))});var s={};return s.cat_ids=t,s.tag_ids=n,s.auth_ids=r,i=e(".ai1ec-views-dropdown .ai1ec-dropdown-menu .ai1ec-active").data("action"),s.action=i,s},b=function(){var t=History.getState(),n=e.cookie(d);if(null===n||undefined===n)n={};var r=y();u.is_calendar_page?n.calendar_page=r:n[t.url]=r,e.cookie(d,n,{path:"/",expires:365}),e("#save_filtered_views").addClass("ai1ec-active").attr("data-original-title",u.clear_saved_filter_text);var i=s.make_alert(u.save_filter_text_ok,"success");e("#ai1ec-calendar").prepend(i)},w=function(t){t.stopImmediatePropagation();var n=e.cookie(d);if(u.is_calendar_page)delete n.calendar_page;else{var r=History.getState();delete n[r.url]}e.cookie(d,n,{path:"/",expires:365}),e("#save_filtered_views").removeClass("ai1ec-active").attr("data-original-title",u.reset_saved_filter_text),v||e("#save_filtered_views").addClass("ai1ec-hide");var i=s.make_alert(u.remove_filter_text_ok,"success");e("#ai1ec-calendar").prepend(i)},E=function(t,n,r){t.find(".ai1ec-calendar-view-loading").fadeIn("fast").end().find(".ai1ec-calendar-view").fadeTo("fast",.3,function(){var i={request_type:r,ai1ec_doing_ajax:!0};e("#ai1ec-container > .ai1ec-alert").remove();var o=e.ajax({url:n,dataType:r,data:i,method:"get"});o.done(function(r){e(document).trigger("calendar_view_loaded.ai1ec",t),g(t),typeof r.views_dropdown=="string"&&t.find(".ai1ec-views-dropdown").replaceWith(r.views_dropdown),typeof r.categories=="string"&&t.find(".ai1ec-category-filter").replaceWith(r.categories),typeof r.authors=="string"&&t.find(".ai1ec-author-filter").replaceWith(r.authors),typeof r.tags=="string"&&t.find(".ai1ec-tag-filter").replaceWith(r.tags),typeof r.custom_filters=="string"&&($parent=t.find("li.ai1ec-custom-filter").parent(),t.find("li.ai1ec-custom-filter").remove(),$parent.append(r.custom_filters)),typeof r.subscribe_buttons=="string"&&t.find(".ai1ec-subscribe-container").empty().append(r.subscribe_buttons),typeof r.save_view_btngroup=="string"&&t.find("#save_filtered_views").closest(".ai1ec-btn-group").replaceWith(r.save_view_btngroup),v=r.are_filters_set;var i;if(n.match(/\brequest_format\~json\b/)){var s=e.parseJSON(r.html).type,o={agenda:c,oneday:h,week:h,month:p};if(!o[s])return;i=o[s]}t.find(".ai1ec-calendar-view").html(i?i.render(e.parseJSON(r.html)):e(r.html).find(".ai1ec-calendar-view").length?e(r.html).find(".ai1ec-calendar-view").html():r.html),m(t)}),o.fail(function(n,r,i){var o=u.load_views_error;o=o.replace("%STATUS%",n.status),o=o.replace("%ERROR%",i);var a=s.make_alert(o,"error",!0);e("#ai1ec-container").prepend(a),g(t),m(t)}),o.always(function(){t.find(".ai1ec-calendar-view-loading").fadeOut("fast"),t.find(".ai1ec-calendar-view").fadeTo("fast",1)})})},S=!1,x=function(t){var n=History.getState(),r=e(".ai1ec-calendar:first");if(n.data.ai1ec!==undefined&&!0===n.data.ai1ec||!0===S)S=!0,E(r,n.url,"json")},T=function(e,t,n){if(t==="json"){var r={ai1ec:!0};History.pushState(r,document.title,decodeURI(n))}else E(e,n,"jsonp")},N=function(t){var n=e(this);$calendar=n.closest(".ai1ec-calendar"),t.preventDefault(),T($calendar,n.data("type"),n.attr("href"))},C=function(t){var n=e(this);t.preventDefault();if(typeof n.data("datepicker")=="undefined"){n.datepicker({todayBtn:"linked",todayHighlight:!0,language:n.data("lang")});var r=n.data("datepicker");if(n.closest(".ai1ec-pull-right").length>0){r.picker.addClass("ai1ec-right-aligned");var i=r.place;r.place=function(){i.call(this);var t=this.component?this.component:this.element,n=t.offset();this.picker.css({left:"auto",right:e(document).width()-n.left-t.outerWidth()})}}e(document).one("changeDate",".ai1ec-minical-trigger",k)}n.datepicker("show")},k=function(t){var n,r=e(this),i=r.closest(".ai1ec-calendar"),s;r.datepicker("hide"),n=r.data("href"),s=t.format(),s=s.replace(/\//g,"-"),n=n.replace("__DATE__",s),T(i,r.data("type"),n)},L=function(t){var n;typeof t.added!="undefined"?n=e(t.added.element).data("href"):n=e("option[value="+t.removed.id+"]",t.target).data("href"),data={ai1ec:!0},History.pushState(data,null,n)},A=function(){var t=e(this).closest(".ai1ec-calendar");T(t,e(this).data("type"),e(this).data("href"))};return{initialize_view:m,handle_click_on_link_to_load_view:N,handle_minical_trigger:C,handle_minical_change_date:k,clear_filters:A,handle_state_change:x,load_view:E,save_current_filter:b,remove_current_filter:w,load_view_from_select2_filter:L,load_view_according_to_datatype:T}});