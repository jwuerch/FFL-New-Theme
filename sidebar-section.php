<aside class="sidebar">

	<?php if ( !dynamic_sidebar('sidebar-section') ) : ?>
		
		<?php the_widget( 'WP_Widget_Categories' ); ?>
				
	<?php endif; ?>

</aside>