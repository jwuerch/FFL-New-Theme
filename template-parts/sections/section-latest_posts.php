<article class="article">
	<div class="container">

		<h2 class="main-title h5">LATEST POSTS</h2>

		<?php
			$latest_articles_args = array(
				'numberposts' => 6,
				'orderby'     => 'date',
				'order'       => 'DESC',
				'post_type'   => 'post',
				'post_status'   => 'publish',
			);
			if ($latest_articles = get_posts($latest_articles_args)){
				global $post;
		?>

			<div class="posts-block posts-block-latest">

				<?php foreach ($latest_articles as $post) { setup_postdata($post); ?>

					<?php get_template_part( 'template-parts/content', 'post' ); ?>

				<?php } wp_reset_postdata(); ?>

			</div>
			<div class="load-more-wrap" data-aos="fade-up">
				<a href="#" class="btn btn--primary js-load-latest" data-page="1"><?php _e('Load more', 'am'); ?></a>
			</div>

		<?php } ?>
	</div>
</article>