<aside class="sidebar">

	<?php if ( !dynamic_sidebar('sidebar-default') ) : ?>
		
		<?php the_widget( 'WP_Widget_Categories' ); ?>		
		
	<?php endif; ?>

</aside>