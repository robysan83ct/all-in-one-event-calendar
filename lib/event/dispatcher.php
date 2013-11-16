<?php

/**
 * Event Dispatcher processing.
 *
 * @author     Time.ly Network Inc.
 * @since      2.0
 * 
 * @package      AI1EC
 * @subpackage   AI1EC.Event
 */
class Ai1ec_Event_Dispatcher {
    
	/**
	 * Register callback object.
	 *
     * @param string               $hook          Name of the event hook.
	 * @param Ai1ec_Event_Callback $entity        Event Callback object.
     * @param integer              $priority      Priorify of the event hook execution.
     * @param integer              $accepted_args Number of accepted method parameters.
	 *
	 * @return Ai1ec_Event_Dispatcher Event Dispatcher Object.
	 */    
    public function register( 
        $hook, 
        Ai1ec_Event_Callback $entity, 
        $priority = 10, 
        $accepted_args = 1 
    ) {
        if ( !isset( $this->_registered[$hook] ) ) {
            $this->_registered[$hook] = array();
        }
        
        $this->_registered[$hook][] = compact( 
            'entity', 
            'priority', 
            'accepted_args' 
        );
        add_action( 
            $hook, 
            array( $this, 'execute' ), 
            $priority, 
            $accepted_args 
        );        
        return $this;
    }

	/**
	 * Execute current action/filter event hook.
	 *
	 * @return mixed Value returned by the current action/filter event hook.
	 */
    public function execute() {
        $hook = current_filter();
        if ( !isset( $this->_registered[$hook] ) ) {
            return null;
        }
        
        $argv = func_get_args();
        $response = null;
        foreach ( $this->_registered[$hook] as $runnable ) {
            $response = $runnable['entity']->execute( $argv );
        }
        
        return $response;
    }    
}
