<?php get_header(); ?>

	<div class="top-section">
		<div class="container">

			<h1 class="page-title page-title--lg"><?php echo str_replace('Category: ', '', get_the_archive_title()); ?></h1>

		</div>

		<?php
			$term = get_queried_object();
			$field_place = 'option';
			if ($term) {
				$field_place = $term;
			}
			$top_section_background_image = get_field('top_section_background_image', $field_place);
			$bg_image = array();
			if ($top_section_background_image) {
				$bg_image = $top_section_background_image;
			} elseif ($field_place != 'option') {
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

				<?php if (have_posts()) : ?>

					<div class="posts-block">

						<?php while (have_posts()) : the_post(); ?>

							<?php get_template_part( 'template-parts/content', 'post' ); ?>

						<?php endwhile; ?>

					</div>

					<?php get_template_part( 'template-parts/pagination', 'post' ); ?>

				<?php else : ?>
					<?php get_template_part( 'template-parts/content', 'none' ); ?>
				<?php endif; ?>
				
			</div>
		</article>
	</main>

<?php get_footer(); ?>