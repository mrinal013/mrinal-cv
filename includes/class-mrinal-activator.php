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
		include_once(plugin_dir_path(__FILE__) . "data/mrinal_cv.php");
		update_option( 'mrinal_general', json_encode($mrinal_general) );
		update_option( 'mrinal_skills', json_encode($mrinal_skills) );
		update_option( 'mrinal_employment', json_encode($mrinal_employment) );
		update_option( 'mrinal_portfolio', json_encode($mrinal_portfolio) );
		update_option( 'mrinal_education', json_encode($mrinal_education) );
		update_option( 'mrinal_training', json_encode($mrinal_training) );
		update_option( 'mrinal_personal', json_encode($mrinal_personal) );
		update_option( 'mrinal_social', json_encode($mrinal_social) );
		update_option( 'mrinal_references', json_encode($mrinal_references) );		
	}
}
