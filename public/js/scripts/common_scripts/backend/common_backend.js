timely.define(["jquery_timely","domReady","ai1ec_config","scripts/common_scripts/backend/common_event_handlers","external_libs/Placeholders","external_libs/bootstrap_tooltip","external_libs/bootstrap_popover","libs/modal_helper"],function(e,t,n,r){var i=function(){e("#ai1ec-facebook-filter option[value=exportable]:selected").length>0&&e("table.wp-list-table tr.no-items").length===0&&n.facebook_logged_in==="1"&&(e("<option>").val("export-facebook").text("Export to facebook").appendTo("select[name='action']"),e("<option>").val("export-facebook").text("Export to facebook").appendTo("select[name='action2']"))},s=function(){if(n.platform_active==="1"){e("#menu-posts-ai1ec_event li").each(function(){var t=e(this);if(t.has('a[href$="all-in-one-event-calendar-themes"], a[href$="all-in-one-event-calendar-edit-css"], a[href$="all-in-one-event-calendar-settings"]').length){if(t.is(".current")){var n=e("a",t).attr("href");e('#adminmenu a:not(.current)[href="'+n+'"]').parent().andSelf().addClass("current").end().closest("li.menu-top").find("> a.menu-top").andSelf().addClass("wp-has-current-submenu wp-menu-open").removeClass("wp-not-current-submenu"),t.closest("li.menu-top").find("> a.menu-top").andSelf().removeClass("wp-has-current-submenu wp-menu-open").addClass("wp-not-current-submenu")}t.hide()}});if(e("body.options-reading-php").length){var t=function(){e("#page_on_front").attr("disabled","disabled")};t(),e("#front-static-pages input:radio").change(t),e("#page_on_front").after('<span class="description">'+n.page_on_front_description+"</span>")}n.strict_mode==="1"&&(e("#dashboard-widgets .postbox").not("#ai1ec-calendar-tasks, #dashboard_right_now").remove(),e("#adminmenu > li").not(".wp-menu-separator, #menu-dashboard, #menu-posts-ai1ec_event, #menu-media, #menu-appearance, #menu-users, #menu-settings").remove(),e("#menu-appearance > .wp-submenu li, #menu-settings > .wp-submenu li").not(':has(a[href*="all-in-one-event-calendar"])').remove())}},o=function(){e("#ai1ec-video").length&&(e.ajax({cache:!0,async:!0,dataType:"script",url:"//www.youtube.com/iframe_api"}),window.onYouTubeIframeAPIReady=function(){var t=new YT.Player("ai1ec-video",{height:"368",width:"600",videoId:window.ai1ecVideo.youtubeId});e("#ai1ec-video").css("display","block"),e("#ai1ec-video-modal").on("hide",function(){t.stopVideo()})})},u=function(){e(document).on("click",".ai1ec-facebook-cron-dismiss-notification",r.dismiss_plugins_messages_handler).on("click",".ai1ec-dismiss-notification",r.dismiss_notification_handler).on("click",".ai1ec-dismiss-intro-video",r.dismiss_intro_video_handler).on("click",".ai1ec-dismiss-license-warning",r.dismiss_license_warning_handler).on("click",".ai1ec-limit-by-cat, .ai1ec-limit-by-tag, .ai1ec-limit-by-event",r.handle_multiselect_containers_widget_page)},a=function(){e("#ai1ec-support .ai1ec-download a[title]").popover({placement:"left"}),e(".ai1ec-tooltip-toggle").tooltip()};n.page!==""&&(e(".if-js-closed").removeClass("if-js-closed").addClass("closed"),postboxes.add_postbox_toggles(n.page));var f=function(){t(function(){i(),o(),u(),s(),a()})};return{start:f}});