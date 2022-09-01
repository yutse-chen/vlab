// Code By Webdevtrick ( https://webdevtrick.com )
$.fn.stairwayNav = function(options) {
  
    var defaults = {
       stairs: 3
    };
    this.options = $.extend({}, defaults, options);
    var stairs = this.options.stairs;
      
    var allLinks = this.find("a");
      
    allLinks
      .mouseenter(function() {
        $(this).addClass("active-1");
        var index = $(this).index(), i, bef, aft;
        for(i = 1; i < stairs; i++) {
          
          bef = index - i;
          aft = index + i;
         
          allLinks.eq(aft).addClass("active-" + (i+1));
          if (bef > 0) {
            allLinks.eq(bef).addClass("active-" + (i+1));
          }
        }   
      })
      .mouseleave(function() {
        allLinks.removeClass("active-1 active-2 active-3 active-4");
      });
    return this;
  };
   
  $("#example-one").stairwayNav({
    stairs: 1
  });
   
  $("#example-two").stairwayNav({
    stairs: 2
  });
   
  $("#example-three").stairwayNav({
    
  });
   
  $("#example-four").stairwayNav({
    stairs: 4  
  });