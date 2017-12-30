<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://github.com/mrinal013
 * @since      1.0.0
 *
 * @package    Mrinal
 * @subpackage Mrinal/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Mrinal
 * @subpackage Mrinal/admin
 * @author     Mrinal Haque <mrinalhaque99@gmail.com>
 */
class Mrinal_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

		/*
		* add a page at Users > Mrinal
		*/
		add_action( 'admin_menu', array( $this, 'mrinal_cv_page' ) );
		add_action('admin_init', array( $this, 'my_plugin_redirect' ));
		add_action( 'wp_ajax_tab_content_general', array( $this, 'tab_content_general' ) );
		add_action( 'wp_ajax_tab_content_skill', array( $this, 'tab_content_skill' ) );
		add_action( 'wp_ajax_tab_content_employment', array( $this, 'tab_content_employment' ) );
		add_action( 'wp_ajax_tab_content_portfolio', array( $this, 'tab_content_portfolio' ) );
		add_action( 'wp_ajax_tab_content_education', array( $this, 'tab_content_education' ) );
		add_action( 'wp_ajax_tab_content_training', array( $this, 'tab_content_training' ) );
		add_action( 'wp_ajax_tab_content_personal', array( $this, 'tab_content_personal' ) );
		add_action( 'wp_ajax_tab_content_social', array( $this, 'tab_content_social' ) );
		add_action( 'wp_ajax_tab_content_references', array( $this, 'tab_content_references' ) );
	}
	/*
	* Load General Tab Content
	*/
	public function tab_content_general() {
		echo get_option('mrinal_general', false);
		exit();
	}

	/*
	* Load Skill Tab Content
	*/
	public function tab_content_skill() {
		echo get_option('mrinal_skills', false);
		exit();
	}

	/*
	* Load Employment Tab Content
	*/
	public function tab_content_employment() {
		echo get_option('mrinal_employment', false);
		exit();
	}

	/*
	* Load Portfolio Tab Content
	*/
	public function tab_content_portfolio() {
		echo get_option('mrinal_portfolio', false);
		exit();
	}

	/*
	* Load Education Tab Content
	*/
	public function tab_content_education() {
		echo get_option('mrinal_education', false);
		exit();
	}

	/*
	* Load Training Tab Content
	*/
	public function tab_content_training() {
		echo get_option('mrinal_training', false);
		exit();
	}

	/*
	* Load Social Tab Content
	*/
	public function tab_content_personal() {
		echo get_option('mrinal_personal', false);
		exit();
	}

	/*
	* Load Social Tab Content
	*/
	public function tab_content_social() {
		echo get_option('mrinal_social', false);
		exit();
	}

	/*
	* Load References Tab Content
	*/
	public function tab_content_references() {
		echo get_option('mrinal_references', false);
		exit();
	}

	/*
	* Auto Redirect to mrinal_cv_page after plugin activate
	*/
	public function my_plugin_redirect() {
	    if (get_option('my_plugin_do_activation_redirect', false)) {
	        delete_option('my_plugin_do_activation_redirect');
	         exit( wp_redirect("users.php?page=mrinal_cv_page") );
	    }
	}

	/**
     * Add mrinal_cv_page
     * This page will be under "Users"
     */
    public function mrinal_cv_page() {
        add_users_page(
        	__('Mrinal','mrinal'), __('Mrinal','mrinal'), 'manage_options', 'mrinal_cv_page',
            array( $this, 'create_admin_page') );
    }

    /**
    * Options page callback
    */
    public function create_admin_page() {
    ?>
    <div class="wrap">
        <h1>Curriculum Vitae</h1>
        <?php
        $tabs = array(
        	'General',
        	'Skill',
        	'Employment',
        	'Portfolio',
        	'Education',
        	'Training',
        	'Personal',
        	'Social',
        	'References'
        );
        ?>
        <!-- Tab links -->
        <div class="tab">
        <?php
        foreach( $tabs as $tab ) { ?>
			<button class="tablinks" onclick="cvTab(event, '<?php echo $tab; ?>')" ><?php echo $tab; ?></button>
		<?php
       	}
        ?>
        </div>
		<!-- Tab content -->
        <?php
        foreach( $tabs as $tab ) {
        ?>
        <div id="<?php echo $tab; ?>" class="tabcontent">
        </div>
        <?php
        }
        ?> 
    </div>
    <?php
    }

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Mrinal_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Mrinal_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/mrinal-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Mrinal_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Mrinal_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/mrinal-admin.js', array( 'jquery' ), $this->version, true );
		wp_localize_script( $this->plugin_name, 'ajax_object',
            array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
	}

}
