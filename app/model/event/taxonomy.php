<?php

/**
 * Modal class representing an event or an event instance.
 *
 * @author       Time.ly Network, Inc.
 * @since        2.0
 * @instantiator new
 * @package      Ai1EC
 * @subpackage   Ai1EC.Model
 */
class Ai1ec_Event_Taxonomy {

	/**
	 * @var string Name of categories taxonomy.
	 */
	const CATEGORIES    = 'events_categories';

	/**
	 * @var string Name of tags taxonomy.
	 */
	const TAGS          = 'events_tags';

	/**
	 * @var string Name of feeds taxonomy.
	 */
	const FEEDS         = 'events_feeds';

	/**
	 * @var int ID of related post object
	 */
	protected $_post_id = 0;

	public function __construct( $post_id = 0 ) {
		$this->_post_id = (int)$post_id;
	}

	/**
	 * Get ID of term. Optionally create it if it doesn't exist.
	 *
	 * @param string $term     Name of term to create.
	 * @param string $taxonomy Name of taxonomy to contain term within.
	 * @param bool   $is_id    Set to true if $term is ID.
	 * @param array  $attrs    Attributes to creatable entity.
	 *
	 * @return int|bool Created term ID or false on failure.
	 */
	public function initiate_term(
		$term,
		$taxonomy,
		$is_id       = false,
		array $attrs = array()
	) {
		$field = ( $is_id ) ? 'id' : 'name';
		$term  = get_term_by( $field, $term, $taxonomy );
		if ( false === $term ) {
			$term = wp_insert_term( $term, $taxonomy, $attrs );
			if ( is_wp_error( $term ) ) {
				return false;
			}
			$term = (object)$term;
		}
		return (int)$term->term_id;
	}

	/**
	 * Wrapper for terms setting to post.
	 *
	 * @param array  $terms    List of terms to set.
	 * @param string $taxonomy Name of taxonomy to set terms to.
	 * @param append 
	 * 
	 * @return 
	 */
	public function set_terms( array $terms, $taxonomy, $append = false ) {
		$result = wp_set_post_terms(
			$this->post_id,
			$terms,
			$taxonomy,
			$append
		);
		if ( is_wp_error( $result ) ) {
			return false;
		}
		return $result;
	}

	public function set_categories( array $categories ) {
		return $this->set_terms( $categories, self::CATEGORIES );
	}

	public function set_tags( array $tags ) {
		return $this->set_terms( $tags, self::TAGS );
	}

	public function set_feed( $feed ) {
		$feed_name = $feed->feed_url;
		// If the feed is not from an imported file, parse the url.
		if ( ! isset( $feed->feed_imported_file ) ) {
			$url_components = parse_url( $feed->feed_url );
			$feed_name      = $url_components['host'];
		}
		$term_id = $this->initiate_term(
			$feed_name,
			self::FEEDS,
			false,
			array(
				'description' => $feed->feed_url,
			)
		);
		if ( false === $term_id ) {
			return false;
		}
		return $this->set_terms( array( $term_id ), self::FEEDS );
	}

}