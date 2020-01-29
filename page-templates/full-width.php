<?php
/*
Template Name: Full Width
Template Post Type: page, post
*/

get_header(); ?>

	<div class="top-section">
		<div class="container" data-aos="fade-right">

			<h1 class="page-title page-title--lg" data-aos="fade-right" data-aos-delay="100"><?php the_title(); ?></h1>

		</div>

		<?php
			$bg_image = array();
			if (has_post_thumbnail()) {
				$thumbnail = wp_get_attachment_image_src(get_post_thumbnail_id( get_the_ID() ), 'wide-bg', false);
				$bg_image = $thumbnail[0];
			} else {
				$bg_image = get_field('top_section_background_image', 'option');
			}
			if ($bg_image){
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
						
						<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
							
							<?php get_template_part( 'template-parts/content', 'page' ); ?>
							
						<?php endwhile; endif; ?>
					
					</div>
				</div>
			</div>
		</div>
	</main>

<?php get_footer(); ?>