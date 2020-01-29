<main class="main">
	<div class="nav-wrap">
		<div class="container">
			<div class="nav-add hidden--s">
				<ul>
					<li class="current-menu-item"><a href="#all" class="js-load-from-category"><?php _e('All Categories'); ?></a></li>

					<?php $featured_categories = get_categories() ?>
						<?php foreach ($featured_categories as $featured_category){ ?>
							<li><a href="#<?php echo $featured_category->slug; ?>" class="js-load-from-category"><?php echo $featured_category->name; ?></a></li>
						<?php } ?>
				</ul>
			</div>

			<div class="nav-add nav-add-mobile hidden-md visible--s">
				<ul>
					<li class="current-menu-item"><a href="#all" class="js-load-from-category"><?php _e('All Categories'); ?></a></li>

						<?php foreach ($featured_categories as $featured_category){ ?>
							<li><a href="#<?php echo $featured_category->slug; ?>" class="js-load-from-category"><?php echo $featured_category->name; ?></a></li>
						<?php } ?>
				</ul>
				<a href="#" class="cat"><span class="cat-down"><i class="icon-chevron-fat-left"></i></span></a>
			</div>

		</div>
	</div>
	<div class="main-container">
		<div class="container">
			<div class="content">
				<article class="posts-block posts-block-by-category">
					<?php
						$latest_articles_args = array(
							'posts_per_page' => 3,
							'orderby'     => 'date',
							'order'       => 'DESC',
							'post_type'   => 'post',
							'post_status'   => 'publish',
						);
						query_posts($latest_articles_args);
						global $wp_query;
						$need_show = $wp_query->max_num_pages > 1;
						$counter = 1;
					?>
					<?php if (have_posts()) : ?>

						<?php while (have_posts()) : the_post(); ?>

							<?php $filename = $counter == 1? 'lg' : 'md'; ?>
		
							<?php get_template_part( 'template-parts/content', 'post-'.$filename ); ?>

							<?php $counter++; ?>
		
						<?php endwhile;  ?>
					
					<?php endif; wp_reset_query(); ?>
					
				</article>

				<div class="load-more-wrap <?php echo !$need_show? 'hide-load-more' : ''; ?>">
					<a href="#" class="btn btn--primary btn--block js-load-by-category" data-page="1"><?php _e('Load More', ); ?></a>
				</div>

			</div>

			<?php get_sidebar('section'); ?>
			
		</div>
	</div>
</main>