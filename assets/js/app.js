String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

/* data */
var regions = {
    'asia':{
      'name': 'Asia',
      'selector': '#asia',
      'mselector': '#m-asia',
      'color': '#cc6600',
    },
    'europe':{
      'name': 'Europe',
      'selector': '#europe',
      'mselector': '#m-europe',
      'color': '#006666',
    },
    'africa':{
      'name': 'Africa',
      'selector': '#africa',
      'mselector': '#m-africa',
      'color': '#993300',
    },
    'australia':{
      'name': 'Australia',
      'selector': '#australia',
      'mselector': '#m-australia',
      'color': '#669900',
    },
    'north-america':{
      'name': 'North America',
      'selector': '#north-america',
      'mselector': '#m-north-america',
      'color': '#3366cc',
    },
    'south-america':{
      'name': 'South America',
      'selector': '#south-america',
      'mselector': '#m-south-america',
      'color': '#666699',
    },
    'middle-east':{
      'name': 'Middle East',
      'selector': '#middle-east',
      'mselector': '#m-middle-east',
      'color': '#cc9966',
    }
  };

/* populate desktop by fetching data and appending to respective region */
function populateDesktop(){

  destroyDesktop();
  
  var leaders = [];
  var apiEndpoint = 'https://spreadsheets.google.com/feeds/list/1K3W6IO4vqRljer3XDHAvrt6xSxz3d4dwnXVvdZ339i0/od6/public/values?alt=json';
  var entry;
  var clone;

  $.getJSON(apiEndpoint, function(data) {

    // fetch entry object from json response
    entry = data.feed.entry;

    // push each entry object in leaders
    $(entry).each(function(){

      start_year = this.gsx$tenure.$t;
      start_year.replace('–', '-');
      start_year = start_year.split('-');
      //console.log(start_year);

      clone = {
        'name' : this.gsx$leader.$t,
        'designation': this.gsx$designation.$t,
        'tenure': this.gsx$tenure.$t,
        'region': regions[this.gsx$region.$t],
        'image': (this.gsx$image.$t == '') ? 'leaders/no-avatar.png' : 'leaders/'+this.gsx$image.$t,
        'start_year': start_year[0],
      }

      leaders.push(clone);

    });

  }).done(function(){

    // sort leaders based on start_year
    leaders = leaders.sort(function(a,b){return a.start_year - b.start_year});

    // iterate over fetched list
    for (var i = 0; i < leaders.length; i++) {

      //console.log(leaders[i]);
      
      // append leader to respective region
      $(leaders[i].region.selector + ' .body').append('<a style="color:#000" class="modal-trigger" href="#" data-toggle="modal" data-target="#modal-leader'+i+'"><div id="leader-'+i+'" class="leader"><div class="image"><img style="border:solid 5px ' + leaders[i].region.color + ';" src="assets/img/' + leaders[i].image + '"/></div><div class="text"><div class="tenure">'+ leaders[i].tenure + '</div><div class="name" style="border-bottom:5px solid '+leaders[i].region.color+';">'+ leaders[i].name +'</div><div class="designation" style="color:'+leaders[i].region.color+'">'+ leaders[i].designation +'</div></div></div></a>');

      // choose left or right positioning for text
      if($(leaders[i].region.selector).position().left > ($(window).width() / 2))
      {
        $('#leader-'+i+' .text').css("left", "-"+($('#leader-'+i+' .text').width()-4)+"px");
      }

      // set leader positioning
      if(i > 0)
      {
          $('#leader-'+i).css("top", ((leaders[i].region.selector == leaders[i-1].region.selector) ? ((($('#leader-'+(i-1)).position().top) + ($('#leader-'+(i-1)).innerHeight())) + 7) : ((($('#leader-'+(i-1)).position().top) + ($('#leader-'+(i-1)).innerHeight())) - 15))+"px");
      }

    }

    // set region height
    $('.region .body').css('height', (($('#leader-'+(leaders.length - 1)).position().top+$('#leader-'+(leaders.length - 1)).innerHeight())-$(leaders[(leaders.length - 1)].region.selector).position().top)+'px');

  });

  console.log('populateDesktop executed');
}
/* function end */

/* populate desktop by fetching data and appending to respective region */
function populateMobile(){
  
  var leaders = [];
  var apiEndpoint = 'https://spreadsheets.google.com/feeds/list/1K3W6IO4vqRljer3XDHAvrt6xSxz3d4dwnXVvdZ339i0/od6/public/values?alt=json';
  var entry;
  var clone;

  $.getJSON(apiEndpoint, function(data) {

    // fetch entry object from json response
    entry = data.feed.entry;
    //console.log(entry);

    // push each entry object in leaders
    $(entry).each(function(){

      start_year = this.gsx$tenure.$t;
      start_year.replace('–', '-');
      start_year = start_year.split('-');
      //console.log(start_year);

      clone = {
        'name' : this.gsx$leader.$t,
        'designation': this.gsx$designation.$t,
        'tenure': this.gsx$tenure.$t,
        'region': regions[this.gsx$region.$t],
        'image': (this.gsx$image.$t == '') ? 'leaders/no-avatar.png' : 'leaders/'+this.gsx$image.$t,
        'start_year': start_year[0],
        'info': this.gsx$information.$t,
      }

      leaders.push(clone);

    });

  }).done(function(){

    // sort leaders based on start_year
    leaders = leaders.sort(function(a,b){return a.start_year - b.start_year});

    // iterate over fetched list
    for (var i = 0; i < leaders.length; i++) {

      //console.log(leaders[i].region.mselector + ' .m-items .m-scroll');
      
      // append leader to respective region
      $(leaders[i].region.mselector + ' .m-items .m-scroll').append('<div class="m-item"><a class="modal-trigger" href="#" data-toggle="modal" data-target="#modal-leader'+i+'"><img style="width:100%; border-radius:100px;" src="assets/img/'+leaders[i].image+'"/></a></div>');
      

      $('#leader-modal-container').append('<div id="m-leader-'+i+'" class="m-leader"><div class="modal fade" id="modal-leader'+i+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content" style="background:#CC6600;"><div class="triangle1"></div><div class="triangle2">&nbsp;</div><div class="modal-body"><nav id="head2" class="navbar nav-top navbar-default navbar-fixed-top shrink"><div class="container-fluid"><div class="navbar-header"><a style="left: 75px;" class="navbar-brand navbar-brand-centered" href="http://aljazeera.com" target="_blank"><img alt="Al Jazeera" width="100" height="auto" src="assets/img/aj-logo.jpg"></a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"></div></div></nav><button type="button" class="close" data-dismiss="modal" style="margin-top:20px;position: absolute;left: 100vw;margin-left: -30px;">&times;</button><div class="m-image" style=""><img style="" src="assets/img/'+leaders[i].image+'"/></div><div class="m-tc"><div class="m-title" style="">Women leaders around the world</div></div><h1 class="m-name" style="">'+leaders[i].name+'</h1><h2 class="m-designation" style="">'+leaders[i].designation+'</h2><div class="m-tenure" style="">'+leaders[i].tenure.replaceAll(',','<br/>')+'</div><div class="m-info" style=""><p>'+leaders[i].info+'</p></div></div></div></div></div></div>');



    }

  });

  console.log('populateMobile executed');
}
/* function end */

/* */
function destroyDesktop(){

  $( ".leader" ).each(function(index){

    $(this).remove();

  });

  $( ".region .body" ).each(function(index){

    $(this).empty();

  });

  

  $('.region .body').css('height', 'auto');

  console.log('destroyDesktop executed');

}
/* */

/* */
function resizeMobile(){

  $.each(regions, function(index,value){
    boo = (100 - (($(value.mselector + ' .m-title').width() / $(value.mselector).width())*100))-5;
    $(value.mselector + ' .m-items').css('width', boo+'%');
  });
}
/* */

/* */
$(window).resize(function(){

    populateDesktop();
    resizeMobile();
  
  
});
/* */


/* */
$(document).ready(function(){

  populateDesktop();
  resizeMobile();
  populateMobile();

  

});
/* */


/* shrink */
$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('#head').addClass('shrink');
    $('#head .navbar-brand').addClass('shrinklogo');
  } else {
    $('#head').removeClass('shrink');
    $("#head .navbar-brand").removeClass("shrinklogo");
  }
});
/* shrink end */

/**
 * Vertically center Bootstrap 3 modals so they aren't always stuck at the top
 */

$('.modal-trigger').on("click", function(){
    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);
    // Reposition when the window is resized
    $(window).on('resize', function() {
        $('.modal:visible').each(reposition);
    });

})


    function reposition() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');
        
        // Dividing by two centers the modal exactly, but dividing by three 
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);
    // Reposition when the window is resized
    $(window).on('resize', function() {
        $('.modal:visible').each(reposition);
    });


