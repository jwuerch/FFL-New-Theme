<?php $post_id = get_the_ID(); ?>
<section class="post-section post-section--lg" data-aos="fade-up">
	<a href="<?php echo get_permalink(); ?>"><div class="post-section_visual">
		<div class="badge-wrap">
			<span class="badge badge--green badge--lg"><?php _e('Trending', 'am'); ?></span>
		</div>

		<?php if ( has_post_thumbnail() ) : ?>

			<div class="bg-stretch">
				<?php am_the_post_img( 'post-833x507' ); ?>
			</div>

		<?php endif; ?>
	
	</div>
	<div class="description-block post-section_text description-block--lg">

		<?php
			$categories = wp_get_post_categories(get_the_ID(), ['fields' => 'all', 'orderby' => 'count']);
			if ($categories){
		?>
			<strong class="description-block_tag"><a href="<?php echo get_term_link($categories[0]->term_id, $categories[0]->taxonomy); ?>"><?php echo $categories[0]->name; ?></a></strong>
		<?php } ?>

		<?php am_the_custom_title( [ 'tag' => 'h3', 'link' => true, 'class' => 'description-block_title h5' ] ); ?>

		<div class="description-block_meta">
			<?php
				$avatar = get_avatar(get_the_author_meta('ID'), 30);
			?>
			<div class="description-block_avatar">
				<?php echo $avatar; ?>
			</div>
			<strong class="description-block_author"><?php the_author() ?></strong>
		</div>
	</div></a>
</section>