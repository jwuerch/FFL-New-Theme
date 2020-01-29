<?php

/**
 * Custom Text widget class
 *
 */
class am_WP_Widget_Text extends WP_Widget {

	function __construct() {
		$widget_ops = array('classname' => 'widget_text', 'description' => __('Arbitrary text or HTML','am'));
		$control_ops = array('width' => 400, 'height' => 350);
		parent::__construct('am_text', __('Text','am'), $widget_ops, $control_ops);
	}

	function widget( $args, $instance ) {
		extract($args);
		$title = apply_filters( 'widget_title', empty( $instance['title'] ) ? '' : $instance['title'], $instance, $this->id_base );
		$text = apply_filters( 'widget_text', empty( $instance['text'] ) ? '' : $instance['text'], $instance );
		echo $before_widget;
		if ( !empty( $title ) ) { echo $before_title . $title . $after_title; } ?>
			<div class="textwidget"><?php echo !empty( $instance['filter'] ) ? wpautop( $text ) : $text; ?></div>
		<?php
		echo $after_widget;
	}

	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);
		if ( current_user_can('unfiltered_html') )
			$instance['text'] =  $new_instance['text'];
		else
			$instance['text'] = stripslashes( wp_filter_post_kses( addslashes($new_instance['text']) ) ); // wp_filter_post_kses() expects slashed
		$instance['filter'] = isset($new_instance['filter']);
		return $instance;
	}

	function form( $instance ) {
		$instance = wp_parse_args( (array) $instance, array( 'title' => '', 'text' => '' ) );
		$title = strip_tags($instance['title']);
		$text = esc_textarea($instance['text']);
?>
		<p><label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:','am'); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>" /></p>

		<textarea class="widefat" rows="16" cols="20" id="<?php echo $this->get_field_id('text'); ?>" name="<?php echo $this->get_field_name('text'); ?>"><?php echo $text; ?></textarea>

		<p><input id="<?php echo $this->get_field_id('filter'); ?>" name="<?php echo $this->get_field_name('filter'); ?>" type="checkbox" <?php checked(isset($instance['filter']) ? $instance['filter'] : 0); ?> />&nbsp;<label for="<?php echo $this->get_field_id('filter'); ?>"><?php _e('Automatically add paragraphs','am'); ?></label></p>
<?php
	}
}


class am_WP_Widget_Popular extends WP_Widget {

	function __construct() {
		$widget_ops = array('classname' => 'widget_posts', 'description' => __('Popular Posts List','am'));
		$control_ops = array('width' => 400, 'height' => 350);
		parent::__construct('am_popular_posts', __('Popular Posts','am'), $widget_ops, $control_ops);
	}

	function widget( $args, $instance ) {
		extract($args);
		$title = apply_filters( 'widget_title', empty( $instance['title'] ) ? '' : $instance['title'], $instance, $this->id_base );
		echo $before_widget;
		if ( !empty( $title ) ) { echo $before_title . $title . $after_title; } ?>

			<?php
				$popular_articles_args = array(
					'numberposts' => 8,
					'post_type'   => 'post',
					'post_status'   => 'publish',
					'meta_key'   => 'am_post_views_count',
					'orderby'   => 'meta_value_num',
					'order'       => 'DESC',
				);
				$is_single = is_single();
				if ($popular_articles = get_posts($popular_articles_args)){
					global $post;
					echo '<ul>';
						foreach ($popular_articles as $post) { setup_postdata($post);
				?>
							<a href="<?php the_permalink(); ?>"><li>
								<?php if ( has_post_thumbnail() ) : ?>

									<div class="widget_posts_visual">
										<?php am_the_post_img( 'post-60x60' ); ?>
									</div>

								<?php endif; ?>

								<div class="widget_posts_description">
									<p><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></p>

								</div>
							</li></a>

					<?php } wp_reset_postdata(); ?>
				
				<?php echo '</ul>'; ?>

			<?php } ?>

		<?php echo $after_widget;
	}

	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);
		return $instance;
	}

	function form( $instance ) {
		$instance = wp_parse_args( (array) $instance, array( 'title' => '' ) );
		$title = strip_tags($instance['title']);
?>
		<p><label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:','am'); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>" /></p>

<?php
	}
}



function am_register_custom_widgets() {
	register_widget('am_WP_Widget_Text');
	register_widget('am_WP_Widget_Popular');
}
add_action( 'widgets_init', 'am_register_custom_widgets' );