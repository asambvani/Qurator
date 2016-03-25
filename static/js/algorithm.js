'use strict'

$(window).load(function(){
    
    $(function(){
     
        var $w = $(window); 
        var box1 = $("#box1"); 
        var box2 = $("#box2");
        var box3 = $("#box3");
        var box4 = $("#box4");
        var slide_number_container = $("#slide_number"); 
        var algorithm_section = $("#algorithm_section");
        var suggestions_section = $("#suggestions_section");
        var left_button = $('#left_button'); 
        var right_button = $('#right_button'); 
        var box_container = [box1, box2, box3, box4]; 
        var button_container = [left_button, right_button]; 
        var box_hover = [false,false,false,false]; 
        var button_hover = [false,false];
        var box_click = [false,false,false,false]; 
        var all_photos = [];
        var screen_number_urls = ['url("/img/slide1.png")','url("/img/slide2.png")','url("/img/slide3.png")','url("/img/slide4.png")' ];
        var url_container = ['url("/img/inv/thumb/01.jpg")', 'url("/img/inv/thumb/02.jpg")', 'url("/img/inv/thumb/03.jpg")', 'url("/img/inv/thumb/04.jpg")', 'url("/img/inv/thumb/05.jpg")', 'url("/img/inv/thumb/06.jpg")', 'url("/img/inv/thumb/07.jpg")', 'url("/img/inv/thumb/08.jpg")','url("/img/inv/thumb/09.jpg")', 'url("/img/inv/thumb/10.jpg")', 'url("/img/inv/thumb/11.jpg")', 'url("/img/inv/thumb/12.jpg")', 'url("/img/inv/thumb/13.jpg")', 'url("/img/inv/thumb/14.jpg")', 'url("/img/inv/thumb/15.jpg")', 'url("/img/inv/thumb/16.jpg")'];
        var current_screen = 1; 
        var number_of_screens = 4; 
        var number_of_suggestions = 15; 
        const boxes_per_screen = 4; 
        const pic_fade = 600; 
        const total_inventory = 39; 
        var boxes_selected = []; 

        // Initialize Inventory URLS
        for(let i=1; i<=total_inventory; i++){

          var temp_string = "url(\"/img/inv/thumb/"
          
          if( i<10 ){

            temp_string += "0"+ i + '.jpg")';

          } else {

            temp_string += i + '.jpg")';

          }
                  
          all_photos[i] = temp_string;
          

        }
        
        for (let i=0; i<number_of_screens*boxes_per_screen; i++){

            boxes_selected[i] = false; 

        }


        // Lock scrolling
        $('body').css({'overflow':'hidden'});
          $(document).bind('scroll',function () { 
          window.scrollTo(0,0); 
        });

        // Event methods for four algorithm boxes 
        box1.hover(function() { pic_hover_handler(0);}); 
        box1.click(function() { pic_click_handler(0);}); 

        box2.hover(function() { pic_hover_handler(1);}); 
        box2.click(function() { pic_click_handler(1);}); 

        box3.hover(function() { pic_hover_handler(2);}); 
        box3.click(function() { pic_click_handler(2);}); 

        box4.hover(function() { pic_hover_handler(3);}); 
        box4.click(function() { pic_click_handler(3);}); 
       
        left_button.hover(function() { button_hover_handler(0);}); 
        left_button.click(function() { prev_screen();}); 

        right_button.hover(function() { button_hover_handler(1);}); 
        right_button.click(function() { next_screen();});

  		for(let i=0; i<4; i++){

  			box_container[i].css({background: url_container[i]}); 

  		};

    	var pic_hover_handler = function(box_number){
	       
	       if(box_hover[box_number]==false){

	       		box_container[box_number].css({

	       				opacity: '0.8'

       			});

	       		box_hover[box_number] = true; 

	       } else if (box_hover[box_number] == true){

	       		box_container[box_number].css({

	       				opacity: '1.0' 

       			});

	       		box_hover[box_number] = false;
       		}     
       }

      var button_hover_handler = function(button_number){

          if(button_hover[button_number]==false){

              button_container[button_number].css({

                  opacity: '0.8'

              });

              button_hover[button_number]=true; 

          } else if(button_hover[button_number]==true){

             button_container[button_number].css({

                  opacity: '1'

              });

              button_hover[button_number]=false; 
          }
      }

      var pic_click_handler = function(box_number){

         
         if(boxes_selected[(current_screen-1)*4+box_number]==false){

            box_container[box_number].css({

                borderColor: 'rgba(255,255,0,1)'

            });

            boxes_selected[(current_screen-1)*4+box_number] = true; 

         } else if (boxes_selected[(current_screen-1)*4+box_number] == true){

            box_container[box_number].css({

                borderColor: 'rgba(255,255,0,0)'

            });

            boxes_selected[(current_screen-1)*4+box_number] = false;

          }     
   
       }

       var next_screen = function(){
         
          if(current_screen<number_of_screens){
            
            current_screen++;
             slide_number_container.css({

                background: screen_number_urls[current_screen-1]
            }); 

            for(let i=0; i<4; i++){

                box_container[i].fadeOut(pic_fade, function(){

                box_container[i].css({

                  background: url_container[(current_screen-1)*4+i], 
                  borderColor: 'rgba(255,255,0,0)'               

                }); 

                if(boxes_selected[(current_screen-1)*4+i] == true){

                  box_container[i].css({

                    borderColor: 'rgba(255,255,0,1)'               

                  }); 

                }

              }); 

              box_container[i].fadeIn(pic_fade);

            }

          } else if(current_screen=number_of_screens){

            // Algorithm Output
            algorithm_end(); 
          }
          
         
       }

       var prev_screen = function(){
         
          if(current_screen>1){

            current_screen--;
            slide_number_container.css({

                background: screen_number_urls[current_screen-1]
            }); 

            for(let i=0; i<4; i++){
              box_container[i].fadeOut(pic_fade, function(){

                box_container[i].css({

                    background: url_container[(current_screen-1)*4+i], 
                    borderColor: 'rgba(255,255,0,0)'                   

                })

                if(boxes_selected[(current_screen-1)*4+i] == true){

                    box_container[i].css({

                    borderColor: 'rgba(255,255,0,1)'               

                  }); 

                }

              }); 

              box_container[i].fadeIn(pic_fade);

            }

          }
        
       }
     
     // This function is called once the user has reached the last screen and clicks the next button 
       var algorithm_end = function (){

          console.log(boxes_selected);

          // Unlock Scrolling 

          $('body').css({'overflow':'visible'});
          $(document).unbind('scroll');


          suggestions_section.css({

              visibility: 'visible' 

          });

          /*var $anchor = $(this);
          $('html, body').stop().animate({
          scrollTop: (suggestions_section.offset().top - 50)
          }, 1500, 'easeInOutExpo');*/
      
          var $anchor = $(this);
          $('html, body').stop().animate({
          scrollTop: (suggestions_section.offset().top- 50)
          }, 1500);

          // Alternate code that makes the algorithm section disappear//
          /*
          algorithm_section.css({

            visibility: 'hidden', 
            height: '0px' 

          });
          */

          // TEMPORARY CODE THAT LOADS PICTURES INTO EACH OF THE TEMP BOXES

          for(let i=1; i<=number_of_suggestions; i++){

              var random_pic = Math.floor(Math.random()*(total_inventory-1)+1);

              $("#suggestion_"+i).css({

                  // Once algorithm is finished, change the below to pull from algorithm suggestions array
                   
                  background: all_photos[random_pic]

              }); 

          }

       }

        d3.text("/picture_database/database.csv", function(data) {
          var parsedCSV = d3.csv.parseRows(data);
          for(let i=0; i<parsedCSV.length;i++){
            for(let k=0;k<parsedCSV[i].length;k++){

                console.log(parsedCSV[i][k]);

            }
          }
            
        });
          
            

    });


});