/* data */
var regions = {
  'asia':{
    'name': 'Asia',
    'selector': '#asia',
    'color': '#cc6600',
  },
  'europe':{
    'name': 'Europe',
    'selector': '#europe',
    'color': '#006666',
  },
  'africa':{
    'name': 'Africa',
    'selector': '#africa',
    'color': '#993300',
  },
  'australia':{
    'name': 'Australia',
    'selector': '#australia',
    'color': '#669900',
  },
  'north-america':{
    'name': 'North America',
    'selector': '#north-america',
    'color': '#3366cc',
  },
  'south-america':{
    'name': 'South America',
    'selector': '#south-america',
    'color': '#666699',
  },
  'middle-east':{
    'name': 'Middle East',
    'selector': '#middle-east',
    'color': '#cc9966',
  }
};

var leaders = [];
var apiEndpoint = 'https://spreadsheets.google.com/feeds/list/1K3W6IO4vqRljer3XDHAvrt6xSxz3d4dwnXVvdZ339i0/od6/public/values?alt=json';
var entry;
var clone;

$.getJSON(apiEndpoint, function(data) {

  // fetch entry object from json response
  entry = data.feed.entry;

  // push each entry object in leaders
  $(entry).each(function(){

    clone = {
      'name' : this.gsx$leader.$t,
      'designation': this.gsx$designation.$t,
      'tenure': this.gsx$tenure.$t,
      'region': regions[this.gsx$region.$t],
      'image': (this.gsx$image.$t == '') ? 'leaders/no-avatar.png' : 'leaders/'+this.gsx$image.$t
    }

    leaders.push(clone);

  });

}).done(function(){

  // iterate over fetched list
  for (var i = 0; i < leaders.length; i++) {
    
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

