<?php

global $am_option;

load_theme_textdomain( $am_option['textdomain'], get_template_directory() . '/languages' );

add_filter('body_class','am_browser_body_class');
add_action('widgets_init', 'am_unregister_default_wp_widgets', 1);
add_filter('the_content', 'am_texturize_shortcode_before' );

//acf plugin
if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page(array(
		'page_title' 	=> 'Theme General Settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false,
        'position' => 59
	));
	
	// acf_add_options_sub_page(array(
		// 'page_title' 	=> 'Theme Socials Settings',
		// 'menu_title'	=> 'Socials',
		// 'parent_slug'	=> 'theme-general-settings',
	// ));
	
}

// This theme uses wp_nav_menu() in one location.
register_nav_menus( array(
	'mainmenu' => __( 'Main Navigation', 'am' ),
	'footermenu1' => __( 'Footer 1 Navigation', 'am' ),
	'footermenu2' => __( 'Footer 2 Navigation', 'am' ),
	'footermenu3' => __( 'Footer 3 Navigation', 'am' ),
	'footermenu4' => __( 'Footer 4 Navigation', 'am' ),
) );

//remove_filter( 'the_content', 'wpautop' );
//add_filter( 'the_content', 'wpautop' , 99);
//add_filter( 'the_content', 'shortcode_unautop',100 );

//add_image_size('thumb-270x378', 270, 378, true);
//show_admin_bar(false);
//define( 'WPCF7_AUTOP', false );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function am_content_width() {
    $GLOBALS['content_width'] = apply_filters('wfc_content_width', 960);
}
add_action('after_setup_theme', 'am_content_width', 0);


/**
 * Register widgetized areas
 */
function am_the_widgets_init() {
	
    if ( !function_exists('register_sidebars') )
        return;
    
    $before_widget = '<div id="%1$s" class="widget %2$s"><div class="widget_inner">';
    $after_widget = '</div></div>';
    $before_title = '<h3 class="widgettitle">';
    $after_title = '</h3>';

    register_sidebar(array('name' => __('Default','am'),'id' => 'sidebar-default','before_widget' => $before_widget,'after_widget' => $after_widget,'before_title' => $before_title,'after_title' => $after_title));
    register_sidebar(array('name' => __('Posts Section','am'),'id' => 'sidebar-section','before_widget' => $before_widget,'after_widget' => $after_widget,'before_title' => $before_title,'after_title' => $after_title));
}
add_action('widgets_init', 'am_the_widgets_init' );



/**
 * Add CSS styles and JS scripts
 */
function am_add_css_and_js( ) {
    
    global $am_option;
	
	// iclude comment js if needed
	if (is_singular() && get_option('thread_comments')){
        wp_enqueue_script('comment-reply');
	}
	
	// iclude jQuery
	wp_enqueue_script('jquery');
	
	// internal js
	$am_js_files = array('assets/js/jquery.main.js','assets/js/general.js'); // example: array('script1', 'script2');
	
	// external js
	$am_js_external_files = array(); // example: array('https://maps.googleapis.com/maps/api/js');
	
	// internal CSS
	$am_css_files = array('assets/css/style.css', 'assets/css/style-wp.css'); // example: array('style1', 'style2');
	
	// external CSS
	$am_css_external_links = array('https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,600,700,700i,800&display=swap'); // example: array('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700');
	
	// include JS
    if( !is_admin() ) {
		
        if ($am_js_external_files) {
			foreach($am_js_external_files as $link_key => $am_js_external_file){
				wp_enqueue_script('am_external_js_'.sanitize_title($link_key), $am_js_external_file, array( 'jquery' ), '1.0.0', true);
			}
		}
		
        if ($am_js_files) {
			foreach($am_js_files as $am_js_file){
				wp_enqueue_script('am_'.sanitize_title($am_js_file), get_theme_file_uri($am_js_file), array( 'jquery' ), filemtime( get_theme_file_path($am_js_file)), true );
			}
		}

		wp_localize_script('jquery', 'myajax', array('url' => admin_url('admin-ajax.php')));
    }
	
    if ($am_css_external_links){
		foreach($am_css_external_links as $link_key => $am_css_external_link){
			wp_enqueue_style('am_external_css_'.sanitize_title($link_key), $am_css_external_link, array());
		}
	}
	
    if ($am_css_files){
		foreach($am_css_files as $am_css_file){
			wp_enqueue_style('am_'.sanitize_title($am_css_file), get_theme_file_uri($am_css_file), array(), filemtime( get_theme_file_path($am_css_file)));
		}
	}
}

add_action('wp_enqueue_scripts', 'am_add_css_and_js');
am_show_acf(true);