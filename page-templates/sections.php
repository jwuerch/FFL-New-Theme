<?php
/*
Template Name: Sections
Template Post Type: page
*/

get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	
		<?php if (have_rows('sections')) : ?>

			<?php while (have_rows('sections')) : the_row();
			
				get_template_part('template-parts/sections/section', get_row_layout());

			endwhile; ?>

		<?php endif; ?>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>