<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://github.com/mrinal013
 * @since             1.0.0
 * @package           Mrinal
 *
 * @wordpress-plugin
 * Plugin Name:       Application for Wordpress Programmer
 * Plugin URI:        https://github.com/mrinal013/mrinal-cv
 * Description:       This is a micro plugin to show my CV for Wordpress Programmer position
 * Version:           1.0.0
 * Author:            Mrinal Haque
 * Author URI:        https://github.com/mrinal013
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       mrinal
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently pligin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PLUGIN_NAME_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-mrinal-activator.php
 */
function activate_mrinal() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-mrinal-activator.php';
	Mrinal_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-mrinal-deactivator.php
 */
function deactivate_mrinal() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-mrinal-deactivator.php';
	Mrinal_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_mrinal' );
register_deactivation_hook( __FILE__, 'deactivate_mrinal' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-mrinal.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_mrinal() {

	$plugin = new Mrinal();
	$plugin->run();

}
run_mrinal();
