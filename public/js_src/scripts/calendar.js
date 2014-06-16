define(
	[
		"jquery_timely",
		"scripts/calendar/load_views",
		"scripts/calendar/print",
		"scripts/calendar/agenda_view",
		"scripts/calendar/month_view",
		"ai1ec_calendar",
		"ai1ec_config",
		"scripts/common_scripts/frontend/common_frontend",
		"libs/utils",
		"libs/select2_multiselect_helper",
		"external_libs/bootstrap/transition",
		"external_libs/bootstrap/modal",
		"external_libs/jquery.scrollTo",
		'external_libs/jquery_cookie',
	],
	function( $, load_views, print, agenda_view,
		month_view, ai1ec_calendar, ai1ec_config, common_frontend,
		AI1EC_UTILS, select2_multiselect_helper ) {
	"use strict"; // jshint ;_;

	/**
	 * Moves calendar into CSS selector defined by advanced settings.
	 */
	var css_selector_replacement = function() {
		if( ai1ec_calendar.selector !== undefined && ai1ec_calendar.selector !== '' &&
			$( ai1ec_calendar.selector ).length === 1 ) {
			// Try to find an <h#> element containing the title
			var $title = $( ":header:contains(" + ai1ec_calendar.title + "):first" );
			// If none found, create one
			if( ! $title.length ) {
				$title = $( '<h1 class="page-title"></h1>' );
				$title.text( ai1ec_calendar.title ); // Do it this way to automatically generate HTML entities
			}
			var $calendar = $( '#ai1ec-container' )
				.detach()
				.before( $title );

			$( ai1ec_calendar.selector )
				.empty()
				.append( $calendar )
				.hide()
				.css( 'visibility', 'visible' )
				.fadeIn( 'fast' );
		}
	};

	/**
	 * Event handler for multiday events. When being hovered, add hover class
	 * to its clones.
	 */
	var handle_multiday_enter = function() {
		var id = $( this ).data( 'instanceId' );
		$( '.ai1ec-event-instance-id-' + id ).addClass( 'ai1ec-hover' );
	};

	/**
	 * Event handler for multiday events. When leaving hover, remove hover class
	 * from its clones.
	 */
	var handle_multiday_leave = function() {
		var id = $( this ).data( 'instanceId' );
		$( '.ai1ec-event-instance-id-' + id ).removeClass( 'ai1ec-hover' );
	};

	/**
	 * Event handler for events in week/day view. Issue a delayed raising effect
	 * on this event and all its multiday clones.
	 */
	var handle_raise_enter = function() {
		var $this = $( this ),
				id = $this.data( 'instanceId' );
		$this.delay( 500 ).queue( function() {
			$( '.ai1ec-event-instance-id-' + id ).addClass( 'ai1ec-raised' );
		} );
	};

	/**
	 * Event handler for events in week/day view. Cancel raising effect on this
	 * event and all its multiday clones.
	 */
	var handle_raise_leave = function( e ) {
		var $this = $( this ),
				id = $this.data( 'instanceId' ),
				$target = $( e.toElement || e.relatedTarget );
		// Don't cancel the effect if moving onto a clone of the same instance.
		if ( $target.is( '.ai1ec-event-instance-id-' + id ) ||
				 $target.parent().is( '.ai1ec-event-instance-id-' + id ) ) {
			return;
		}
		$( '.ai1ec-event-instance-id-' + id )
			.clearQueue()
			.removeClass( 'ai1ec-raised' );
	};

	/**
	 * General calendar page initialization.
	 */
	var init = function() {
		// Do the replacement of the calendar and create title if not present
		css_selector_replacement();
	};


	/**
	 * Attach event handlers for calendar page.
	 */
	var attach_event_handlers = function() {
		// ======================================
		// = Month/week/day view multiday hover =
		// ======================================
		$( document ).on(
			{
				mouseenter: handle_multiday_enter,
				mouseleave: handle_multiday_leave
			},
			'.ai1ec-event-container.ai1ec-multiday'
		);

		// ====================================
		// = Week/day view hover-raise effect =
		// ====================================
		$( document ).on(
			{
				mouseenter: handle_raise_enter,
				mouseleave: handle_raise_leave
			},
			'.ai1ec-oneday-view .ai1ec-oneday .ai1ec-event-container, ' +
				'.ai1ec-week-view .ai1ec-week .ai1ec-event-container'
		 );

		// ===============
		// = Agenda view =
		// ===============
		// Register click handlers for Agenda View event title
		$( document ).on( 'click', '.ai1ec-agenda-view .ai1ec-event-header', agenda_view.toggle_event );

		// Register click handlers for expand/collapse all buttons
		$( document ).on( 'click', '#ai1ec-agenda-expand-all', agenda_view.expand_all );
		$( document ).on( 'click', '#ai1ec-agenda-collapse-all', agenda_view.collapse_all );

		// =============
		// = All views =
		// =============

		// Register navigation click handlers
		$( document ).on( 'click',      'a.ai1ec-load-view',
			load_views.handle_click_on_link_to_load_view
		);

		// Register minical datepicker events.
		$( document ).on( 'click',      '.ai1ec-minical-trigger',
			load_views.handle_minical_trigger );

		// Handle clearing filters.
		$( document ).on( 'click',      '.ai1ec-clear-filter',
			load_views.clear_filters
		);

		// Handle click on print button.
		$( document ).on( 'click',      '#ai1ec-print-button',
			print.handle_click_on_print_button
		);

		// Handle click on reveal full day button.
		$( document ).on( 'click',      '.ai1ec-reveal-full-day button',
			function() {
				// Hide the button (no longer serves a purpose).
				$( this ).fadeOut();
				var $actual_table = $(
					'.ai1ec-oneday-view-original, .ai1ec-week-view-original'
				);
				// Scroll window down the same amount that the upper portion of the
				// table is being revealed.
				var vertical_offset =
					$( '.tablescroll_wrapper' ).offset().top -
					$actual_table.offset().top;
				$( window ).scrollTo( '+=' + vertical_offset + 'px', 400 );
				// At the same time, expand height to reveal 1 full day (24 hours).
				var height = 24 * 60 + 2;
				$( '.tablescroll_wrapper' )
					.scrollTo( '-=' + vertical_offset + 'px', 400 )
					.animate( { height: height + 'px' } );
			}
		);

		// Bind to statechange event.
		History.Adapter.bind( window,   'statechange',
			load_views.handle_state_change
		);

		$( document ).on( 'click',      '#ai1ec-calendar-view .ai1ec-load-event',
			function( e ) {
				e.preventDefault();
				$.cookie.raw = false;
				$.cookie( 'ai1ec_calendar_url', document.URL );
				window.location.href = this.href;
			}
		);
	};

	var initialize_select2 = function() {
		select2_multiselect_helper.init( $( '.ai1ec-select2-filters' ) );
		$( document ).on(
			'change',
			'.ai1ec-select2-multiselect-selector',
			load_views.load_view_from_select2_filter
		);
	};

	/**
	 * Affixed toolbar.
	 * Uses Bootstrap Affix plugin.
	 * @param  {object} $calendar jQuery object
	 */
	var initialize_affixed_toolbar = function ( $calendar ) {
		var 
			$toolbar = $calendar.find( '.ai1ec-calendar-toolbar' ),
			$buttons = $calendar.find( '.ai1ec-btn-toolbar' ),
			$toggle = $toolbar.find( '.ai1ec-dropdown-toggle' ),
			$view_container = $calendar.find( '#ai1ec-calendar-view-container' ),
			$wpadminbar = $( '#wpadminbar' ),
			hide_toggle_text = function () {
				$toggle.each( function () {
					$( this )
						.contents()
						    .eq( -3 )
						      .wrap( '<div class="ai1ec-hidden" />' );
				});
			},
			show_hidden_toggle_text = function () {
				$toggle
					.find( '.ai1ec-hidden' )
						.contents()
							.unwrap();
			},
			height_with_margins = function ( $object ) {
				return $object.outerHeight()
					+ parseInt( $object.css( 'margin-top' ) )
					+ parseInt( $object.css( 'margin-bottom' ) );
			},
			reinitialize = function () {
				$buttons = $calendar.find( '.ai1ec-btn-toolbar' );
				$toggle = $toolbar.find( '.ai1ec-dropdown-toggle' );
				$toolbar
					.trigger( 'ai1ec-affix-top.bs.affix' )
					.data( {
						'original_height' : height_with_margins( $toolbar )
					} )
					.filter( '.ai1ec-affix' )
						.trigger( 'ai1ec-affix.bs.affix' );
			};

		$toolbar
			.data( {
				'original_height' :  height_with_margins( $toolbar )
			} )
			.css( 'width', $calendar.width() )
			.affix( {
				offset: {
					top: $toolbar.offset().top - ( ai1ec_config.affix_offset_top || 0 ) - $wpadminbar.height(),
					bottom: 0
				}
			} )
			.on( 'ai1ec-affix.bs.affix', function () {
				$buttons
					.hide()
					.appendTo( $toolbar )
					.show() // We have its full height here but the fade-in process is not finished yet.
					.css( 'opacity', 0 )
					.animate( {
						opacity: 1
					}, 200 );

				$view_container
					.data( 'original_margin_top', $view_container.css( 'margin-top' ) )
					.css( 'margin-top', $toolbar.data( 'original_height' ) );
					
				if ( $toolbar.height() > $toolbar.data( 'original_height' ) ) {
					hide_toggle_text();
				} else {
					show_hidden_toggle_text();
				}
			} )
			.on( 'ai1ec-affix-top.bs.affix', function () {
				$buttons
					.hide()
					.insertAfter( '.ai1ec-calendar-title' )
					.show()
					.css( 'opacity', 0 )
					.animate( {
						opacity: 1
					}, 200 );
					
				$view_container
					.css( 'margin-top', $view_container.data( 'original_margin_top' ) );

				show_hidden_toggle_text();
			} )
			.on( 'ai1ec-affix.reinit', reinitialize );
	};

	/**
	 * Start calendar page.
	 */
	var start = function() {
		$( document ).on( 'page_ready.ai1ec', function() {
			init();
			if( ai1ec_config.use_select2 ) {
				initialize_select2();
			}

			attach_event_handlers();
			// Initialize the calendar view for the first time.
			load_views.initialize_view();
			
			// Affixed toolbar.
			if( ai1ec_config.affix_toolbar || 1 ) {
				initialize_affixed_toolbar( $('#ai1ec-calendar') );
			}
		} );
	};

	return {
		start : start
	};
} );
