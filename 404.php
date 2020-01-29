<?php get_header(); ?>

    <div class="top-section">
        <div class="container">

            <h1 class="page-title page-title--lg"><?php _e('Error 404', 'am') ?></h1>

        </div>

        <?php
            if ($bg_image = get_field('top_section_background_image', 'option')){
                am_the_retina_bg(array(
                    'image' => $bg_image,
                    'size' => 'wide-bg'
                ));
            }
        ?>

    </div>
	<main class="main main--gray">
        <div class="main-container">
            <div class="container container--lg">
                <div class="content fullwidth">
                    <div class="entry-wrap">
                        <div class="post page">

                            <div class="title">
                                <h2><?php _e('Page not found!', 'am') ?></h2>
                            </div>
                            <div class="entry"><p><?php _e('The page you trying to reach does not exist, or has been moved. Please use the menus or the search box to find what you are looking for.', 'am') ?></p></div>

                        </div>
	                </div>
                </div>
            </div>
        </div>
    </main>

<?php get_footer(); ?>