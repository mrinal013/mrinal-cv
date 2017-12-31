<?php

/**
 * Fired during plugin activation
 *
 * @link       https://github.com/mrinal013
 * @since      1.0.0
 *
 * @package    Mrinal
 * @subpackage Mrinal/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Mrinal
 * @subpackage Mrinal/includes
 * @author     Mrinal Haque <mrinalhaque99@gmail.com>
 */
class Mrinal_Activator {

	public static function getData() {
		include_once(plugin_dir_path(__FILE__) . "data/mrinal_cv.php");
		$contents = array(
			'general'=>json_encode($mrinal_general),
	    	'skills'=>json_encode($mrinal_skills),
	    	'employment'=>json_encode($mrinal_employment),
	    	'portfolio'=>json_encode($mrinal_portfolio),
	    	'education'=>json_encode($mrinal_education),
	    	'training'=>json_encode($mrinal_training),
	    	'personal'=>json_encode($mrinal_personal),
	    	'social'=>json_encode($mrinal_social),
	    	'references'=>json_encode($mrinal_references)
		);
		return $contents;
	}

	/**
     * Start up
	 *
	 * hook - admin_menu
	 * function - add_plugin_page
	 * @since    1.0.0
	 */
	public static function activate() {
		/*
		* Set a option for redirct to mrinal_cv_page
		*/
		add_option('my_plugin_do_activation_redirect', true);
		/*
		* Set data in $wpdb->prefix . options table as json format
		*/
		foreach(self::getData() as $key=>$value) {
			update_option( 'mrinal_'.$key, $value );
		}	
	}
}
