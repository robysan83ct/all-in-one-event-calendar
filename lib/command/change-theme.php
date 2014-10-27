<?php

/**
 * The concrete command that change active theme.
 *
 * @author     Time.ly Network Inc.
 * @since      2.0
 *
 * @package    AI1EC
 * @subpackage AI1EC.Command
 */
class Ai1ec_Command_Change_Theme extends Ai1ec_Command {

	/**
	 * Alternative constructor, useful to invoke theme change without an HTTP
	 * request.
	 *
	 * @param Ai1ec_Registry_Object $registry
	 */
	public function __construct( Ai1ec_Registry_Object $registry ) {
		$this->_registry = $registry;
	}

	/**
	 * Executes the command to change the active theme.
	 *
	 * NOTE: {@see self::is_this_to_execute} must return true for this command
	 * to execute; we can trust that input has been checked for injections.
	 */
	public function do_execute() {
		// Update the active theme in the options table.
		$stylesheet = preg_replace(
			'|[^a-z_\-]+|i',
			'',
			$_GET['ai1ec_stylesheet']
		);
		$this->switch_theme( array(
			'theme_root' => realpath( $_GET['ai1ec_theme_root'] ),
			'theme_dir'  => realpath( $_GET['ai1ec_theme_dir'] ),
			'theme_url'  => $_GET['ai1ec_theme_url'],
			'stylesheet' => $stylesheet,
			'legacy'     => (bool)intval( $_GET['ai1ec_legacy'] )
		) );

		// Return user to themes list page with success message.
		return array(
			'url' => admin_url(
				'edit.php?post_type=ai1ec_event&page=all-in-one-event-calendar-themes'
			),
			'query_args' => array(
				'activated' => 1
			)
		);
	}

	/* (non-PHPdoc)
	 * @see Ai1ec_Command_Save_Abstract::set_render_strategy()
	 */
	public function set_render_strategy( Ai1ec_Request_Parser $request ) {
		$this->_render_strategy = $this->_registry->get(
			'http.response.render.strategy.redirect'
		);
	}

	/* (non-PHPdoc)
	 * @see Ai1ec_Command::is_this_to_execute()
	*/
	public function is_this_to_execute() {
		if (
			isset( $_GET['ai1ec_action'] ) &&
			$_GET['ai1ec_action'] === 'activate_theme' &&
			current_user_can( 'switch_ai1ec_themes' ) &&
			is_dir( $_GET['ai1ec_theme_dir'] ) &&
			is_dir( $_GET['ai1ec_theme_root'] )
		) {
			check_admin_referer(
				'switch-ai1ec_theme_' . $_GET['ai1ec_stylesheet']
			);
			return true;
		}
		return false;
	}

	/**
	 * Switch to the given calendar theme.
	 *
	 * @param  array $theme The theme's settings array
	 */
	public function switch_theme( array $theme ) {
		$option = $this->_registry->get( 'model.option' );
		$option->set(
			'ai1ec_current_theme',
			$theme
		);
		$lessphp = $this->_registry->get( 'less.lessphp' );
		// Initialize theme variables with fresh ones from config file(s) and save
		// to DB.
		$option->set(
			$lessphp::DB_KEY_FOR_LESS_VARIABLES,
			$lessphp->get_less_variable_data_from_config_file()
		);
		// Recompile CSS for new theme.
		$css_controller = $this->_registry->get( 'css.frontend' );
		$css_controller->invalidate_cache( null, false );
	}
}
