'use strict'

$(window).load(function(){
    $(function(){
     
        var nav = $(".floating_nav_background"); 
        var navHomeY = nav.offset().top; 
        var isVisible = false; 
        var $w = $(window); 
        
        $w.scroll(function(){
            var scrollTop = $w.scrollTop();  
            var shouldBeVisible = scrollTop > navHomeY; 
            if (shouldBeVisible && !isVisible){

                nav.css({
                    
                    visibility: 'visible'
                
                }); 

                isVisible=true; 
            }
            else if (!shouldBeVisible && isVisible) {
               
                nav.css({
                
                    visibility: 'hidden' 
                });
                
                isVisible = false; 

            }
        }); 

    });
});