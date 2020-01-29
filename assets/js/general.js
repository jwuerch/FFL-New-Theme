(function($) {
    
    $(document).on('ready', function (e) {
        
        $('.js-load-by-category').on('click', function(e){
            e.preventDefault();
            am_load_category_posts();
        });
        $('.js-load-from-category').on('click', function(e){
            e.preventDefault();
            $('.js-load-by-category').data('page', 0);
            $('.nav-add li').removeClass('current-menu-item');
            $(this).closest('li').addClass('current-menu-item');
            am_load_category_posts(true);
        });

        $('.js-load-latest').on('click', function(e){
            e.preventDefault();
            am_load_latest_posts();
        });
    });


    function am_load_latest_posts(){
        var $btn = $('.js-load-latest');
        var page = $btn.data('page') + 1;

        $.ajax({
            type: "post",
            dataType: "json",
            url: myajax.url,
            data: {action: "am_load_more_latest", page: page},
            beforeSend: function () {
                $btn.parent().removeClass('hide-load-more');
                $btn.addClass('is-loading');
            },
            success: function (response) {
                $btn.removeClass('is-loading');
                if (response.post){
                    
                    $btn.data('page', page);
                    $(".posts-block-latest").append(response.post)
                    if (!response.button){
                        $btn.parent().addClass('hide-load-more');
                    }
                }
                else{
                    $btn.parent().addClass('hide-load-more');
                }
            }
        });
    }

    function am_load_category_posts(needClear){
        var needClear = needClear? needClear : false;
        var $btn = $('.js-load-by-category');
        var category = $('.nav-add .current-menu-item a').attr('href').substring(1);
        var page = $btn.data('page') + 1;
        
        if (needClear){
            $(".posts-block-by-category").empty();
            page = 1;
        }

        $.ajax({
            type: "post",
            dataType: "json",
            url: myajax.url,
            data: {action: "am_load_more", page: page, category: category},
            beforeSend: function () {
                $btn.parent().removeClass('hide-load-more');
                $btn.addClass('is-loading');
            },
            success: function (response) {
                $btn.removeClass('is-loading');
                if (response.post){
                    
                    $btn.data('page', page);
                    $(".posts-block-by-category").append(response.post)
                    if (!response.button){
                        $btn.parent().addClass('hide-load-more');
                    }
                }
                else{
                    $btn.parent().addClass('hide-load-more');
                }
            }
        });
    }
    
    $(window).on('load', function (e) {
        $('.cat, .nav-add li').on('click', function(e) {
            if ($('.nav-add').hasClass('cat--active')) {
                $('.nav-add').removeClass('cat--active');
            } else {
                $('.nav-add').addClass('cat--active');
            }
            e.preventDefault();
        });




        $('.nav-add-mobile li').click(function() {
                        // the clicked LI
                        var clicked = $(this);

                        // all the LIs above the clicked one
                        var previousAll = clicked.prevAll();

                        // only proceed if it's not already on top (no previous siblings)
                        if(previousAll.length > 0) {
                        // top LI
                        var top = $(previousAll[previousAll.length - 1]);

                        // immediately previous LI
                        var previous = $(previousAll[0]);

                        // how far up do we need to move the clicked LI?
                        var moveUp = clicked.attr('offsetTop') - top.attr('offsetTop');

                        // how far down do we need to move the previous siblings?
                        var moveDown = (clicked.offset().top + clicked.outerHeight()) - (previous.offset().top + previous.outerHeight());

                        // let's move stuff
                        clicked.css('position', 'relative');
                        previousAll.css('position', 'relative');
                        clicked.animate({'top': -moveUp});
                        previousAll.animate({'top': moveDown}, {complete: function() {
                          // rearrange the DOM and restore positioning when we're done moving
                        clicked.parent().prepend(clicked);
                        clicked.css({'position': 'static', 'top': 0});
                        previousAll.css({'position': 'static', 'top': 0}); 
                    }});
              }
        });
		
    });
    
})(jQuery);