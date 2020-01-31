<?php
    function am_social_networks(){
        ?>
            <li><a href="https://www.facebook.com/frugalforless" target="blank"><i class="icon-facebook"></i></a></li>
            <li><a href="https://www.twitter.com/frugalforless" target="blank"><i class="icon-twitter"></i></a></li>
            <li><a href="https://www.pinterest.com/frugalforless" target="blank"><i class="icon-pinterest"></i></a></li>
            <li><a href="https://www.youtube.com/channel/UC22CPuu0tBl5A5KXkHnPF0g" target="blank"><i class="icon-youtube"></i></a></li>
        <?php
    }
    function am_social_networks_share(){
        ?>
            <ul class="social-network">

                <li>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo esc_url(get_permalink()); ?>" target="blank"><?php _e('Facebook', 'am'); ?><i class="icon-facebook"></i></a>
                </li>

                <li>
                    <a href="https://twitter.com/intent/tweet?text=<?php echo esc_attr(get_the_title()); ?>&url=<?php echo esc_url(get_permalink()); ?>" target="blank"><?php _e('Twitter', 'am'); ?><i class="icon-twitter"></i></a>
                </li>

                <?php
                    $thumbnail_id = get_post_thumbnail_id();
                    $thumbnail = wp_get_attachment_image_src($thumbnail_id,'full');
                    $thumbnail_link = '';
                    if(isset($thumbnail[0])) :
                        $thumbnail_link = $thumbnail[0];
                    endif;
                ?>
                <li>
                    <a href="https://www.pinterest.com/pin/create/button/?url=<?php echo esc_url(get_permalink()); ?>&media=<?php echo $thumbnail_link; ?>&description=<?php echo esc_attr(get_the_title()); ?>" target="blank"><?php _e('Pinterest', 'am'); ?><i class="icon-pinterest"></i></a>
                </li>

            </ul>
        <?php
    }

    add_filter('comment_form_fields', 'kama_reorder_comment_fields' );
    function kama_reorder_comment_fields( $fields ){
        // die(print_r( $fields )); // посмотрим какие поля есть

        $new_fields = array(); // сюда соберем поля в новом порядке

        $myorder = array('comment','author','email','url'); // нужный порядок

        foreach( $myorder as $key ){
            $new_fields[ $key ] = $fields[ $key ];
            unset( $fields[ $key ] );
        }

        // если остались еще какие-то поля добавим их в конец
        if( $fields )
            foreach( $fields as $key => $val )
                $new_fields[ $key ] = $val;

        return $new_fields;
    }

    // Add Shortcode
    function am_shortcode_post_info( $atts , $content = null ) {

        return '<div class="post-info">'.wpautop($content).'</div>';

    }
    add_shortcode( 'post-info', 'am_shortcode_post_info' );

    // Add Shortcode
    function am_shortcode_content_box( $atts , $content = null ) {

        return '<div class="content-box">'.wpautop($content).'</div>';

    }
    add_shortcode( 'content-box', 'am_shortcode_content_box' );

    // Add Shortcode
    function am_shortcode_heading( $atts , $content = null ) {

        return '<div class="entry--heading">'.wpautop($content).'</div>';

    }
    add_shortcode( 'heading', 'am_shortcode_heading' );

    function am_get_post_views($postID = '') {
        $count = 0;
        if ($postID){
            $count_key = 'am_post_views_count';
            $count = get_post_meta($postID, $count_key, true);
            if($count==''){
                $count = 0;
            }
        }
        return $count;
    }

    function am_set_post_views($postID = '', $add = false) {
        if ($postID){
            $count_key = 'am_post_views_count';
            $count = get_post_meta($postID, $count_key, true);
            if($count==''){
                $count = 0;
                delete_post_meta($postID, $count_key);
                add_post_meta($postID, $count_key, '0');
            }else{
                if (!$add){
                    $count++;
                    update_post_meta($postID, $count_key, $count);
                }
            }
        }
    }

    add_action( 'save_post', 'am_add_views_count', 10, 1 );

    function am_add_views_count( $post_id ) {

        $post_object = get_post($post_id);
        if ( wp_is_post_revision( $post_id ) || $post_object->post_status != 'publish' || $post_object->post_type != 'post' )
            return;

        am_set_post_views($post_id, true);
        
    }

    add_action("wp_ajax_am_load_more", "am_load_more");
    add_action("wp_ajax_nopriv_am_load_more", "am_load_more");

    function am_load_more() {
        $post_content = '';
        
        $current_page = (int) $_POST["page"];
        $current_page = max( 1, $current_page );
        $per_page = get_option( 'posts_per_page');
        $offset_start = 3;
        $offset = ( $current_page - 2 ) * $per_page + $offset_start;

        if ($current_page == 1){
            $per_page = 3;
            $offset = 0;
        }

        $args = array(
            'paged' => $current_page,
            'offset' => $offset,
            'post_type' => 'post',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'orderby' => 'date',
            'order' => 'DESC',
        );
        if ($_POST["category"] != 'all'){
            $args['category_name'] = $_POST['category'];
        }
        
        query_posts($args);
        $post_content = '';
        $show_button = false;
        $counter = 1;
        global $wp_query;
        if (have_posts()) :
            while (have_posts()) : the_post();
                $filename = $current_page == 1 && $counter == 1? 'lg' : 'md';
                $post_content .= load_template_part('template-parts/content', 'post-'.$filename);
                $counter++;
            endwhile;
        else :
            $post_content .= load_template_part('template-parts/content', 'none-md');
        endif;
        if ($wp_query->max_num_pages > $current_page) :
            $show_button = true;
        endif;
        wp_reset_query();
        
        
        $response['post'] = $post_content;
        $response['button'] = $show_button;
        echo json_encode($response);
        die();
    }

    add_action("wp_ajax_am_load_more_latest", "am_load_more_latest");
    add_action("wp_ajax_nopriv_am_load_more_latest", "am_load_more_latest");

    function am_load_more_latest() {
        $post_content = '';
        
        $current_page = (int) $_POST["page"];
        $current_page = max( 1, $current_page );
        $per_page = get_option( 'posts_per_page');

        $args = array(
            'paged' => $current_page,
            'post_type' => 'post',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'orderby' => 'date',
            'order' => 'DESC',
        );
        
        query_posts($args);
        $post_content = '';
        $show_button = false;
        global $wp_query;
        if (have_posts()) :
            while (have_posts()) : the_post();
                $post_content .= load_template_part('template-parts/content', 'post');
            endwhile;
        else :
            $post_content .= load_template_part('template-parts/content', 'none-md');
        endif;
        if ($wp_query->max_num_pages > $current_page) :
            $show_button = true;
        endif;
        wp_reset_query();
        
        
        $response['post'] = $post_content;
        $response['button'] = $show_button;
        echo json_encode($response);
        die();
    }
    
    add_filter( 'big_image_size_threshold', 'am_big_image', 10, 1 );
    function am_big_image( $size ){
        return 3600;
    }

    add_image_size('wide-bg', 1600, 0, false);
    add_image_size('post-352x280', 352, 280, true);
    add_image_size('post-833x507', 833, 507, true);
    add_image_size('post-401x280', 401, 280, true);
    add_image_size('post-60x60', 60, 60, true);
?>