
<section id="" class="intro">
		<div class="container">
			<div class="intro_columns">

				<?php 
					global $post;
					$post = get_post(247);
					setup_postdata($post);
				?>

					<div class="intro_col intro_col--post">
						<div class="container">

		
								<?php
							$categories = wp_get_post_categories($post->ID, ['fields' => 'all', 'orderby' => 'count']);
							if ($categories){
						?>
							<span class="badge badge--green">Featured Post</span>
						<?php } ?>
							

							<div class="intro-blockquote">

									<a href="<?php the_permalink(); ?>/?FP"><h1 class="h"><?php the_title(); ?></h1></a>


								<div class="intro-blockquote_cite">
								<?php
									$avatar = get_avatar(get_the_author_meta('ID'), 36);
								?>
								<div class="intro-blockquote_avatar">
									<?php echo $avatar; ?>
								</div>
								<strong><?php the_author() ?></strong>
							</div>

							</div>

							<a href="<?php the_permalink(); ?>" class="btn btn--default btn--sm"><?php _e('Read Now'); ?></a>
						</div>
						<?php wp_reset_postdata(); ?>


					</div>

			
			
				<div class="intro_col intro_col--form">
					<div class="subscription-box">
						

						<script src="https://f.convertkit.com/ckjs/ck.5.js"></script>
      <form action="https://app.convertkit.com/forms/1138503/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="1138503" data-uid="8dec747102" data-format="inline" data-version="5" data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;:&quot;message&quot;,&quot;success_message&quot;:&quot;Thank you very much! Check your email to confirm your delivery.&quot;,&quot;redirect_url&quot;:&quot;&quot;},&quot;analytics&quot;:{&quot;google&quot;:null,&quot;facebook&quot;:null,&quot;segment&quot;:null,&quot;pinterest&quot;:null},&quot;modal&quot;:{&quot;trigger&quot;:null,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:null,&quot;devices&quot;:null,&quot;show_once_every&quot;:null},&quot;powered_by&quot;:{&quot;show&quot;:false,&quot;url&quot;:&quot;https://convertkit.com?utm_source=dynamic&amp;utm_medium=referral&amp;utm_campaign=poweredby&amp;utm_content=form&quot;},&quot;recaptcha&quot;:{&quot;enabled&quot;:false},&quot;return_visitor&quot;:{&quot;action&quot;:&quot;show&quot;,&quot;custom_content&quot;:&quot;asdfasdfasfsf&quot;},&quot;slide_in&quot;:{&quot;display_in&quot;:null,&quot;trigger&quot;:null,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:null,&quot;devices&quot;:null,&quot;show_once_every&quot;:null},&quot;sticky_bar&quot;:{&quot;display_in&quot;:null,&quot;trigger&quot;:null,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:null,&quot;devices&quot;:null,&quot;show_once_every&quot;:null}},&quot;version&quot;:&quot;5&quot;}" min-width="400 500 600 700 800"><div class="formkit-background"></div><div data-style="minimal"><div class="formkit-header" data-element="header"><h2 class="h">Want to make<br class="hidden--xxs"> extra money <br class="hidden--xxs">right away?</h2></div><div class="formkit-subheader" data-element="subheader"><p>​Join 10,000+ readers to get updates on exclusive content and freebies:</p></div><ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul><div data-element="fields" data-stacked="true" class="seva-fields formkit-fields"><div class="formkit-field"><input class="formkit-input" aria-label="Your name" name="fields[first_name]" placeholder="Your name" type="text"></div><div class="formkit-field"><input class="formkit-input" name="email_address" placeholder="Your email" required="" type="email"></div><button data-element="submit" class="btn btn--default formkit-submit formkit-submit"><div class="formkit-spinner"><div></div><div></div><div></div></div><span>Subscribe</span></button></div></div></form>
							
							<div class="form-subscription">
							</div>

						

					</div>
				</div>
			</div>


		</div>

		<div class="bg-stretch"><img src="https://frugalforless.com/wp-content/uploads/2020/01/hero-image-1600x640.jpg"></div>

</section>
