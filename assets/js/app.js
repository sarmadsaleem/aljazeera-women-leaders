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
      $(leaders[i].region.selector + ' .body').append('<div id="leader-'+i+'" class="leader"><div class="image"><img style="border:solid 5px ' + leaders[i].region.color + ';" src="assets/img/' + leaders[i].image + '"/></div><div class="text"><div class="tenure">'+ leaders[i].tenure + '</div><div class="name" style="border-bottom:5px solid '+leaders[i].region.color+';">'+ leaders[i].name +'</div><div class="designation" style="color:'+leaders[i].region.color+'">'+ leaders[i].designation +'</div></div></div>');

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

      console.log(leaders[i].region.mselector + ' .m-items .m-scroll');
      
      // append leader to respective region
      $(leaders[i].region.mselector + ' .m-items .m-scroll').append('<div class="m-item"><a href="#"><img style="width:100%; border-radius:100px;" src="assets/img/'+leaders[i].image+'"/></a></div>');

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

  //destroyDesktop();
  //populateDesktop();
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
    $('.nav-top').addClass('shrink');
    $('.navbar-brand').addClass('shrinklogo');
  } else {
    $('.nav-top').removeClass('shrink');
    $(".navbar-brand").removeClass("shrinklogo");
  }
});
/* shrink end */

