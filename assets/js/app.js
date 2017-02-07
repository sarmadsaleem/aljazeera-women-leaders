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

var leaders = [

  {
    'name' : 'Sirimavo Bandaranaike',
    'designation' : 'Sri Lankan President',
    'tenure' : '1960-65, 1970-77, 1994-2000',
    'region' : regions.asia,
    'image' : 'bb.jpg'
  },
  {
    'name' : 'Sirimavo Bandaranaike',
    'designation' : 'Sri Lankan President',
    'tenure' : '1960-65, 1970-77, 1994-2000',
    'region' : regions.africa,
    'image' : 'bb.jpg'
  },
  {
    'name' : 'Sirimavo Bandaranaike',
    'designation' : 'Sri Lankan President',
    'tenure' : '1960-65, 1970-77, 1994-2000',
    'region' : regions.australia,
    'image' : 'bb.jpg'
  },
  {
    'name' : 'Sirimavo Bandaranaike',
    'designation' : 'Sri Lankan President',
    'tenure' : '1960-65, 1970-77, 1994-2000',
    'region' : regions['south-america'],
    'image' : 'bb.jpg'
  },
  {
    'name' : 'Sirimavo Bandaranaike',
    'designation' : 'Sri Lankan President',
    'tenure' : '1960-65, 1970-77, 1994-2000',
    'region' : regions['north-america'],
    'image' : 'bb.jpg'
  },
  {
    'name' : 'Sirimavo Bandaranaike',
    'designation' : 'Sri Lankan President',
    'tenure' : '1960-65, 1970-77, 1994-2000',
    'region' : regions['middle-east'],
    'image' : 'bb.jpg'
  },
  {
    'name' : 'Sirimavo Bandaranaike',
    'designation' : 'Sri Lankan President',
    'tenure' : '1960-65, 1970-77, 1994-2000',
    'region' : regions.asia,
    'image' : 'bb.jpg'
  },
  {
    'name' : 'Sirimavo Bandaranaike',
    'designation' : 'Sri Lankan President',
    'tenure' : '1960-65, 1970-77, 1994-2000',
    'region' : regions.africa,
    'image' : 'bb.jpg'
  },
  {
    'name' : 'Sirimavo Bandaranaike',
    'designation' : 'Sri Lankan President',
    'tenure' : '1960-65, 1970-77, 1994-2000',
    'region' : regions.australia,
    'image' : 'bb.jpg'
  },
  {
    'name' : 'Sirimavo Bandaranaike',
    'designation' : 'Sri Lankan President',
    'tenure' : '1960-65, 1970-77, 1994-2000',
    'region' : regions['south-america'],
    'image' : 'bb.jpg'
  },
  {
    'name' : 'Sirimavo Bandaranaike',
    'designation' : 'Sri Lankan President',
    'tenure' : '1960-65, 1970-77, 1994-2000',
    'region' : regions['north-america'],
    'image' : 'bb.jpg'
  },
  {
    'name' : 'Sirimavo Bandaranaike',
    'designation' : 'Sri Lankan President',
    'tenure' : '1960-65, 1970-77, 1994-2000',
    'region' : regions['middle-east'],
    'image' : 'bb.jpg'
  },

];


$.each(leaders, function(index, value){
  
  var position = $(value.region.selector).position();
  var classname = (position.left > ($(window).width() / 2)) ? 'left' : 'right';

  $(value.region.selector + ' .body').append('<div class="leader" style="margin-top:'+ (index*125) +'px"><div class="image"><img style="border:solid 5px ' + value.region.color + ';" src="assets/img/' + value.image + '"/></div><div class="text '+ classname +'"><div class="tenure">'+ value.tenure + '</div><div class="name" style="border-bottom:5px solid '+value.region.color+';">'+ value.name +'</div><div class="designation" style="color:'+value.region.color+'">'+ value.designation +'</div></div></div>');

});




