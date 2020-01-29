<?php
/*
Template Name: Blog
Template Post Type: page
*/

global $more;
$more = 0;
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

get_header(); ?>

	<div class="top-section">
		<div class="container">

			<h1 class="page-title page-title--lg"><?php the_title(); ?></h1>

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
	<main class="main">
		<article class="article article--add">
			<div class="container">

				<?php query_posts('post_type=post&paged='.$paged); ?>

				<?php if (have_posts()) : ?>

					<div class="posts-block">

						<?php while (have_posts()) : the_post(); ?>

							<?php get_template_part( 'template-parts/content', 'post' ); ?>

						<?php endwhile; ?>

					</div>

					<?php get_template_part( 'template-parts/pagination', 'post' ); ?>

				<?php else : ?>
					<?php get_template_part( 'template-parts/content', 'none' ); ?>
				<?php endif; wp_reset_query();?>
				
			</div>
		</article>
	</main>

<?php get_footer(); ?>