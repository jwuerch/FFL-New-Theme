<?php get_header(); ?>
	
	<?php if (have_posts()) : ?>

		<?php while (have_posts()) : the_post(); ?>

			<?php
				$post_id = get_the_ID();
				am_set_post_views($post_id);
			?>

			<div class="top-section top-section--lg">
				<div class="container">

					<?php
						$categories = wp_get_post_categories($post_id, ['fields' => 'all', 'orderby' => 'count']);
						if ($categories){
					?>
						<span class="badge badge--green">
							<a href="<?php echo get_term_link($categories[0]->term_id, $categories[0]->taxonomy); ?>"><?php echo $categories[0]->name; ?></a>
						</span>
					<?php } ?>
					
					<?php am_the_custom_title( [ 'tag' => 'h1', 'class' => 'page-title' ] ); ?>
										
				</div>

				<?php if ( has_post_thumbnail() ) : ?>

					<div class="bg-stretch">
						<?php am_the_post_img( 'wide-bg' ); ?>
					</div>

				<?php endif; ?>
			
			</div>
			<main class="main main--gray">
				<div class="main-container">
					<div class="container container--lg">
						<div class="content">
							<div class="entry-wrap">

								<div class="meta-author">
									<?php
										$avatar = get_avatar(get_the_author_meta('ID'), 58);
									?>
									<div class="meta-author_avatar">
										<?php echo $avatar; ?>
									</div>
									<div class="meta-author_desr">
										<strong><?php the_author() ?></strong>
										<strong><?php the_time(get_option('date_format')) ?></strong>
									</div>
								</div>
								<div class="post-info">Disclosure: This page contains affiliate links and we may receive a commission through them, but this is at no additional cost to you. For more information, please read our <a href="//www.frugalforless.com/privacy-policy">privacy policy</a>.</div>
								<div class="content-box extra-money"><h6 class="h6">Want to Earn Some Extra Money?</h6><ul><li><strong>Survey Junkie:</strong>&nbsp;Earn up to $50 per survey with one of the highest-paying survey sites on the web.&nbsp;<a href="https://bmv.biz/?a=553&amp;c=1&amp;s1=MB-ohmconnect-review/" target="_blank" rel="noopener noreferrer">Join Survey Junkie Now</a></li><li><strong>Swagbucks:</strong>&nbsp;Make money watching videos, taking surveys, shopping online and more.&nbsp;<a href="https://swagbucks.7eer.net/c/300204/19503/799?sharedid=MB-ohmconnect-review/" target="_blank" rel="noopener noreferrer">Join Swagbucks Now &amp; Get a $5 Bonus </a></li><li><strong>LifePoints:</strong>&nbsp;Quickly becomming one of the best survey sites out there. Earn up to $10 per survey in a short time. <a href="http://www.anrdoezrs.net/click-7590917-13689525?sid=MB-ohmconnect-review/" target="_blank" rel="noopener noreferrer">Join LifePoints Now For a 10 Point Bonus</a></li><li><strong>MobileXpression:</strong>&nbsp;Earn free money (passive income) just by leaving an app installed on your phone.&nbsp;<a href="https://www.bigcattracks.com/aff_c?offer_id=140&amp;aff_id=10816&amp;aff_sub=MB-ohmconnect-review/" target="_blank" rel="noopener noreferrer">Join MobileXpression Now &amp; Get a Free Gift Card in One Week</a></li></ul></div>
								<div class="social-network-absolute">
									<?php am_social_networks_share(); ?>
								</div>
								
								<?php the_content(__('Read more', 'am')); ?>
								<div class="clear clearfix"></div>
								<?php wp_link_pages( array( 'before' => '<div class="page-link"><span>' . __( 'Pages:', 'am' ) . '</span>', 'after' => '</div>' ) ); ?>

								<div class="content-box">
									<div class="blockquote">
										<?php
											$avatar = get_avatar(get_the_author_meta('ID'), 78);
										?>
										<div class="blockquote_avatar">
											<?php echo $avatar; ?>
										</div>
										<div class="blockquote_body">
											<strong class="blockquote_title"><?php the_author() ?></strong>
											<?php 
												$bio = get_the_author_meta('description');
												echo $bio? wpautop(get_the_author_meta('description')) : '';
											?>
										</div>
									</div>
								</div>
							</div>
						</div>

						<?php get_sidebar(); ?>

					</div>
				</div>

				<?php
					$related_articles = array();
					if ($categories){
						$related_articles = get_posts( array(
							'numberposts' => 3,
							'category'    => [$categories[0]->term_id],
							'orderby'     => 'date',
							'order'       => 'DESC',
							'post_type'   => 'post',
							'exclude'   => $post_id,
						) );
					}
				?>

				<?php if ($related_articles) { ?>

					<article class="article article--related">
						<div class="container">
							<h2 class="main-title h5"><?php _e('Related posts', 'am'); ?></h2>
							<div class="posts-block">

								<?php foreach( $related_articles as $post ){ setup_postdata($post); ?>
									<?php get_template_part( 'template-parts/content', 'post' ); ?>
								<?php } wp_reset_postdata(); ?>
							</div>
						</div>
					</article>
				
				<?php } ?>

				<div class="comments-section">
					<div class="container">
									
						<?php
							// If comments are open or we have at least one comment, load up the comment template.
							if ( comments_open() || get_comments_number() ) :
								comments_template();
							endif;
						?>
						
					</div>
				</div>
			</main>

		<?php endwhile; ?>
		
	<?php endif; ?>

	

<?php get_footer(); ?>