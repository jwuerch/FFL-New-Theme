<?php
global $am_option;

$am_option['shortname'] = "am";
$am_option['textdomain'] = "am";

// Functions
require get_parent_theme_file_path( '/includes/fn-core.php' );
require get_parent_theme_file_path( '/includes/fn-custom.php' );

// Extensions
require get_parent_theme_file_path( '/includes/extensions/shortcodes/shortcodes.php' );
require get_parent_theme_file_path( '/includes/extensions/acf-search/acf-search.php' );

/* Theme Init */
require get_parent_theme_file_path( '/includes/theme-widgets.php' );
require get_parent_theme_file_path( '/includes/theme-init.php' );

add_filter( 'avatar_defaults', 'ffl_new_gravatar' );
function ffl_new_gravatar ($avatar_defaults) {
$myavatar = 'http://www.frugalforless.com:5000/wp-content/uploads/2020/01/default-avatar.png';
$avatar_defaults[$myavatar] = "FFL Icon";
return $avatar_defaults;
}

?>

