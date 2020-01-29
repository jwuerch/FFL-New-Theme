<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
	<meta name="format-detection" content="telephone=no">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>
	<?php /*<link rel="shortcut icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicon.png">*/ ?>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div class="wrapper">
		<div class="w1">
	

			<header class="header">
				<div class="container">
					<div class="header_wrap">
						<div class="header_panel">

							<div class="logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/Logo@2x.png" width="255" alt="Frugal For Less Logo"></a></div>

							<nav class="navbar">
							<div class="navbar_collapse">

								<div class="nav nav-header">
									<ul>
										<?php if ( has_nav_menu( 'mainmenu' ) ) : ?>
											<?php wp_nav_menu( array( 'theme_location' => 'mainmenu', 'menu_class' => 'mainmenu', 'menu_id'=>'mainmenu', 'container'=>'', 'depth'=>0, 'items_wrap' => '%3$s') ); ?>
										<?php endif; ?>
										<li class="search-opener hidden--md"><a href="#"><?php _e('Search'); ?><i class="icon-search"></i></a></li>
									</ul>
								</div>
								<div class="social-network-header visible--xs">
									<ul class="social-network">
										<li class="search-opener visible--md">
										<a href="#">Search<i class="icon-search"></i></a>
										</li>
									    <?php am_social_networks(); ?>           
							
									</ul>
								</div>
							</div>
						</nav>
							
							<div class="social-network-header hidden--lg visible--md hidden--xs">
								<ul class="social-network">
									    <?php am_social_networks(); ?>
										<li class="search-opener visible--md">
										<a href="#"><?php _e('Search'); ?><i class="icon-search"></i></a>
									</li>
								</ul>
								<li class="search-opener hidden--md">
										<a href="#"><?php _e('Search'); ?><i class="icon-search"></i></a>
									</li>
							</div>
						</div>
						
						<?php $search_query = get_search_query(); ?>
						<div class="search-slide">
							<form method="get" action="<?php echo esc_url(home_url().'/'); ?>" class="search-form" id="searchform-header" role="search">
								<input id="s-header" name="s" type="search" placeholder="<?php echo esc_attr(__('Search')); ?>" value="<?php echo esc_attr($search_query); ?>">
								<button type="submit"><i class="icon-search"></i></button>
							</form>
						</div>

						<a href="#" class="nav-opener"><span class="nav-opener_item"><?php _e('Menu'); ?></span></a>
					</div>
				</div>
			</header>


