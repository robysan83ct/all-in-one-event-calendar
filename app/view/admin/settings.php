<?php
class Ai1ec_View_Admin_Settings extends Ai1ec_View_Admin_Abstract {
	public function display_page() {
		$settings = $this->_registry->get( 'model.settings' );
		$args = array(
				'title'             => __(
					'All-in-One Event Calendar: Calendar Feeds',
					AI1EC_PLUGIN_NAME
				),
				'nonce' => array(
					'action' => 'meta-box-order',
					'name' => 'meta-box-order-nonce',
					'referrer' => false,
				),
				'metabox' => array(
					'screen' => $settings->get( 'settings_page' ),
					'action' => 'left',
					'object' => null
				
				),
		);
		$loader = $this->_registry->get( 'theme.loader' );
		$file = $loader->get_file( 'base_page.twig', $args, true );
		$file->render();
	}

	public function add_page() {
		$settings = $this->_registry->get( 'model.settings' );
		$settings_page = add_submenu_page(
			AI1EC_ADMIN_BASE_URL,
			__( 'Settings', AI1EC_PLUGIN_NAME ),
			__( 'Settings', AI1EC_PLUGIN_NAME ),
			'manage_ai1ec_options',
			AI1EC_PLUGIN_NAME . '-settings',
			array( $this, 'display_page' )
		);
		// Add the 'General Settings' meta box.
		add_meta_box(
			'ai1ec-general-settings',
			_x( 'General Settings', 'meta box', AI1EC_PLUGIN_NAME ),
			array( $this, 'display_meta_box' ),
			$settings_page,
			'left',
			'default'
		);
		$settings->set( 'settings_page', $settings_page );

	}
	public function handle_post() {
	}
	
	/**
	 * Dump output buffers before starting output
	 *
	 * @return bool True unless an error occurs
	 */
	protected function _dump_buffers() {
		// ob_end_clean() fails if any level of compression is set.
		$result = true;
		while ( ob_get_level() ) {
			$result &= ob_end_clean();
		}
		return $result;
	}

	public function display_meta_box( $object, $box )  {
		$tabs = array(
			'viewing-events' => array(
				'name' => Ai1ec_I18n::__( 'Viewing Events' ),
			),
			'editing-events' => array(
				'name' => Ai1ec_I18n::__( 'Adding/Editing Events' ),
			),
			'advanced' => array(
				'name' => Ai1ec_I18n::__( 'Advanced' ),
				'items' => array(
					'advanced' => Ai1ec_I18n::__( 'Advanced Settings' ),
					'email' => Ai1ec_I18n::__( 'E-mail Templates' ),
					'apis' => Ai1ec_I18n::__( 'External Services' ),
				)
			),
		);
		$settings = $this->_registry->get( 'model.settings' );
		$plugin_settings = $settings->get_options();
		$tabs = $this->_get_tabs_to_show( $plugin_settings, $tabs );
		$loader = $this->_registry->get( 'theme.loader' );
		$args = array(
			'tabs' => $tabs
		);
		
		$file = $loader->get_file( 'bootstrap_tabs.twig', $args, true );
		$file->render();
	}
	
	protected function _get_tabs_to_show( $plugin_settings, $tabs ) {
		foreach ( $plugin_settings as $id => $setting ) {
			// if the setting is shown
			if ( isset ( $setting['renderer'] ) ) {
				// check if it's the first one of the 
				if ( ! isset ( $tabs[$setting['renderer']['tab']]['elements'] ) ) {
					$tabs[$setting['renderer']['tab']]['elements'] = array();
				}
				$renderer = $setting['renderer']['class'];
				$setting['id'] = $id;
				$renderer = $this->_registry->get( 
					'html.element.setting.' . $renderer, 
					$setting
				);
				$tabs[$setting['renderer']['tab']]['elements'][] = array(
					'html' => $renderer->render()
				);
			}
		}
		return $tabs;
	}
}

?>