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
	 * NOTICE: {@see self::is_this_to_execute} for details, why input is trusted
	 * and not check for injections.
	 */
	public function do_execute() {
		// Invalidate the cached data so that the next request recompiles the css
		$css_controller = $this->_registry->get( 'css.frontend' );
		$css_controller->invalidate_cache( null, false );
		$stylesheet     = preg_replace(
			'|[^a-z_\-]+|i',
			'',
			$_GET['ai1ec_stylesheet']
		);
		update_option(
			'ai1ec_current_theme',
			array(
				'theme_dir'  => realpath( $_GET['ai1ec_theme_dir'] ),
				'theme_root' => realpath( $_GET['ai1ec_theme_root'] ),
				'legacy'     => (bool)intval( $_GET['ai1ec_legacy'] ),
				'stylesheet' => $stylesheet,
			)
		);
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
			current_user_can( 'switch_themes' ) &&
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

}