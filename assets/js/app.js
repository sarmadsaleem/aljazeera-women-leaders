/* replaceAll() - custom function for find and replace multiple occurances */
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
/* custom function for replaceAll end */

/* region data containing name, selectors and hex codes */
var region = {
    'asia':{
      'name': 'Asia',
      'selector': '#asia',
      'mselector': '#m-asia',
      'color': '#cc6600',
      't1': '#de8200',
      't2': '#d65b05',
      'bn': '#ea9900',
    },
    'europe':{
      'name': 'Europe',
      'selector': '#europe',
      'mselector': '#m-europe',
      'color': '#006666',
      't1': '#00544e',
      't2': '#004253',
      'bn': '#00453c',
    },
    'africa':{
      'name': 'Africa',
      'selector': '#africa',
      'mselector': '#m-africa',
      'color': '#993300',
      't1': '#8c2a00',
      't2': '#6d2100',
      'bn': '#802200',
    },
    'australia':{
      'name': 'Australia',
      'selector': '#australia',
      'mselector': '#m-australia',
      'color': '#669900',
      't1': '#5d7d00',
      't2': '#496400',
      'bn': '#556600',
    },
    'north-america':{
      'name': 'North America',
      'selector': '#north-america',
      'mselector': '#m-north-america',
      'color': '#3366cc',
      't1': '#2e549b',
      't2': '#2442a5',
      'bn': '#2a4576',
    },
    'south-america':{
      'name': 'South America',
      'selector': '#south-america',
      'mselector': '#m-south-america',
      'color': '#666699',
      't1': '#5d5474',
      't2': '#49427c',
      'bn': '#7b7baa',
    },
    'middle-east':{
      'name': 'Middle East',
      'selector': '#middle-east',
      'mselector': '#m-middle-east',
      'color': '#CC9966',
      't1': '#ba7d4e',
      't2': '#b07344',
      'bn': '#d3944e',
    }
};
/* region end */

/* populateContent() - populate text paragraph */
function populateContent(){

  var apiEndpoint = 'https://spreadsheets.google.com/feeds/cells/1K3W6IO4vqRljer3XDHAvrt6xSxz3d4dwnXVvdZ339i0/2/public/values?alt=json';
  var content = '';

  $.getJSON(apiEndpoint, function(data) {

    content = data.feed.entry[0].content.$t;
    content = content.replace(/\n/g, "<br>");
    //console.log(content);

  }).done(function(){

    $('.mpara').html(content);
    populateDesktop();
    populateMobile();

  });

}
/* populateContent end */

/* populateDesktiop() - populate desktop by fetching data and appending to respective region */
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

      // pluck start year for sorting purposes 
      start_year = this.gsx$tenure.$t;
      start_year.replace('–', '-');
      start_year = start_year.split('-');

      transformed_region = this.gsx$region.$t;
      transformed_region = transformed_region.toLowerCase();
      transformed_region = transformed_region.replaceAll(' ', '-');

      clone = {
        'name' : this.gsx$leader.$t,
        'designation': this.gsx$designation.$t,
        'tenure': this.gsx$tenure.$t,
        'region': region[transformed_region],
        'image': (this.gsx$image.$t == '') ? 'leaders/no-avatar.png' : 'leaders/'+this.gsx$image.$t,
        'start_year': start_year[0],
      }

      leaders.push(clone);

    });

  }).done(function(){

    // sort leaders based on start_year
    leaders = leaders.sort(function(a,b){return a.start_year - b.start_year});
    
    //console.log('leaders');
    //console.log(leaders);

    // iterate over fetched list
    for (var i = 0; i < leaders.length; i++) {
      
      //console.log('region '  + leaders[i].region.selector)
      // append leader to respective region
      $('#desktop ' + leaders[i].region.selector + ' .body').append('<a style="color:#000" class="modal-trigger" href="#" data-toggle="modal" data-target="#modal-leader'+i+'"><div id="leader-'+i+'" class="leader"><div class="image"><img style="border:solid 5px ' + leaders[i].region.color + ';" src="assets/img/' + leaders[i].image + '"/></div><div class="text"><div class="tenure">'+ leaders[i].tenure + '</div><div class="name" style="border-bottom:5px solid '+leaders[i].region.color+';">'+ leaders[i].name +'</div><div class="designation" style="color:'+leaders[i].region.color+'">'+ leaders[i].designation +'</div></div></div></a>');

      // choose left or right positioning for text
      if($('#desktop ' + leaders[i].region.selector).position().left > ($(window).width() / 2))
      {
        $('#desktop #leader-'+i+' .text').css("left", "-"+($('#leader-'+i+' .text').width()-4)+"px");
      }

      // set leader positioning
      if(i > 0)
      {
          var prev_top = $('#desktop div #leader-'+(i-1)).position().top;
          // to avoid use imagesLoaded
          var prev_height = $('#desktop div #leader-'+(i-1)).width();

          $('#desktop #leader-'+i).css("top", (prev_top + prev_height)+5+"px");

      }

    }

    // set region height
    var last_top = $("#desktop #leader-"+(leaders.length-1)).position().top;
    // to avoid use imagesLoaded
    var last_height = $("#desktop #leader-"+(leaders.length-1)).width();
    var minus_height = $(leaders[leaders.length-1].region.selector).position().top;

    $('#desktop .region .body').css('height', ((last_top + last_height)- minus_height)+'px');

  });

  console.log('populateDesktop executed');
}
/* populateDesktop end */

/* populateMobile() - populate mobile view by fetching data and appending to respective region - second rendition */
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

      transformed_region = this.gsx$region.$t;
      transformed_region = transformed_region.toLowerCase();
      transformed_region = transformed_region.replaceAll(' ', '-');

      /* style leader last name */
      var tn = this.gsx$leader.$t;
      tn = tn.split(' ');
      tnz = '<span style="font-weight:800;">' + tn[tn.length - 1] + '</span>';
      tn[tn.length - 1] = tnz;
      boo = tn.join();
      boo = boo.replaceAll(',',' ');

      clone = {
        'name' : this.gsx$leader.$t,
        'name_m': boo,
        'designation': this.gsx$designation.$t,
        'tenure': this.gsx$tenure.$t,
        'region': region[transformed_region],
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
      
      // append leader to respective region
      $('#mobile ' + leaders[i].region.mselector + ' .body').append('<a style="color:#000" class="modal-trigger" href="#" data-toggle="modal" data-target="#modal-leader'+i+'"><div id="m-leader-'+i+'" class="leader"><div class="image"><img style="border:solid 5px ' + leaders[i].region.color + ';" src="assets/img/' + leaders[i].image + '"/></div></div></a>');

      // set leader positioning
      if(i > 0)
      {
          var prev_top = $('#mobile div #m-leader-'+(i-1)).position().top;
          // to avoid use imagesLoaded
          var prev_height = $('#mobile div #m-leader-'+(i-1)).width();

          $('#mobile #m-leader-'+i).css("top", (prev_top + prev_height)+5+"px");
      }

      // append modal boxes
      // la = left avatar on each modal
      // ra = right avatar on each modal
      var la, ra, lever;

      if(i == 0)
      {
        la = '<div class="la" style="visibility:hidden;"><img style="border:5px solid " src="assets/img/leaders/no-avatar.png"/></div>';
        ra = '<a class="modal-trigger pull-right" data-dismiss="modal" href="#" data-toggle="modal" data-target="#modal-leader'+(i+1)+'"><div class="ra"><img style="border:5px solid '+leaders[i+1].region.bn+'" src="assets/img/'+leaders[i+1].image+'"/></div></a>';
        lever = '';
      }

      else if(i == leaders.length - 1)
      {
        la = '<a class="modal-trigger" data-dismiss="modal" href="#" data-toggle="modal" data-target="#modal-leader'+(i-1)+'"><div class="la"><img style="border:5px solid '+leaders[i-1].region.bn+'" src="assets/img/'+leaders[i-1].image+'"/></div></a>';
        ra = '';
        lever = '';
      }

      else{

        var la = '<a class="modal-trigger" data-dismiss="modal" href="#" data-toggle="modal" data-target="#modal-leader'+(i-1)+'"><div class="la"><img style="border:5px solid '+leaders[i-1].region.bn+'" src="assets/img/'+leaders[i-1].image+'"/></div></a>';
        var ra = '<a class="modal-trigger pull-right" data-dismiss="modal" href="#" data-toggle="modal" data-target="#modal-leader'+(i+1)+'"><div class="ra"><img style="border:5px solid '+leaders[i+1].region.bn+'" src="assets/img/'+leaders[i+1].image+'"/></div></a>';
        var lever = '<div class="lever" style="background:'+leaders[i].region.bn+'">&nbsp;</div>';

      }

      // bottom bar
      var bb = '<div class="bottom_bar"><a class="close-trigger" href="#" data-dismiss="modal" aria-label="Close"><div class="cm"><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></div></a><div class="cr">@AJLABS <img src="assets/img/aj-logo-cred.png"/></div></div>';
      // consolidate and append modal
      $('#leader-modal-container').append('<div id="m-leader-'+i+'" class="m-leader"><div class="modal fade" id="modal-leader'+i+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content" style="background:'+leaders[i].region.color+';"><div class="triangle1" style="border-left: 100vw solid ' + leaders[i].region.t1 + ';"></div><div class="triangle2" style="border-bottom: 50vh solid '+ leaders[i].region.t2 + ';">&nbsp;</div><div class="modal-body"><nav id="head2" class="navbar nav-top navbar-default navbar-fixed-top shrink"><div class="container-fluid"><div class="navbar-header"><a style="left: 75px;" class="navbar-brand navbar-brand-centered" href="http://aljazeera.com" target="_blank"><img alt="Al Jazeera" width="100" height="auto" src="assets/img/aj-logo.jpg"></a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"></div></div></nav><button type="button" class="close close-trigger" data-dismiss="modal" style="margin-top:20px;position: absolute;left: 100vw;margin-left: -30px;">&times;</button><div class="m-image" style=""><img style="border:5px solid '+leaders[i].region.color+'" src="assets/img/'+leaders[i].image+'"/></div><div class="m-tc"><div class="m-title" style="">Women leaders around the world</div></div><h1 class="m-name" style="">'+leaders[i].name+'</h1><h2 class="m-designation" style="">'+leaders[i].designation+'</h2><div class="m-tenure" style="background:'+leaders[i].region.bn+'">'+leaders[i].tenure.replaceAll(',','<br/>')+'</div><div class="m-info" style=""><p>'+leaders[i].info+'</p></div>'+la + ra + lever + '</div>'+bb+'</div></div></div></div>');

    }

    // set region height
    var last_top = $("#mobile #m-leader-"+(leaders.length-1)).position().top;
    var last_height = $("#mobile #m-leader-"+(leaders.length-1)).width();
    var minus_height = $(leaders[leaders.length-1].region.mselector).position().top;
    $('#mobile .region .body').css('height', ((last_top + last_height)- minus_height)+'px');

    var win = $(window);

    var allMods = $(".leader");

    allMods.each(function(i, el) {
      var el = $(el);
      if (el.visible(true)) {
        el.addClass("already-visible");
      } 
    });

    win.scroll(function(event) {
    
      allMods.each(function(i, el) {
        var el = $(el);
        if (el.visible(true)) {
          el.addClass("come-in"); 
        } 
      });
    
    });

  });

  

  console.log('populateMobile executed');
}
/* populateMobile end */

/* positionLeaders() - set positioning for absolute leader elements */
function positionLeaders(){

  // fetch leaders in mobile view and position based on order
  var mobile_leaders = $('#mobile .leader');
  mobile_leaders.each(function(i, obj) {

    if(i > 0)
    {
        var prev_top = $('#mobile div #m-leader-'+(i-1)).position().top;
        // to avoid use imagesLoaded
        var prev_height = $('#mobile div #m-leader-'+(i-1)).width();
        $('#mobile #m-leader-'+i).css("top", (prev_top + prev_height)+5+"px");
    }

  });

  // adjust region body height
  var last_top = $("#mobile #m-leader-"+(mobile_leaders.length-1)).position().top;
  var last_height = $("#mobile #m-leader-"+(mobile_leaders.length-1)).width();
  $('#mobile .region .body').css('height', ((last_top + last_height))+'px');


  // fetch leaders in desktop view and position based on order
  var desktop_leaders = $('#desktop .leader');
  desktop_leaders.each(function(i, obj) {

    if(i > 0)
    {
        var prev_top = $('#desktop div #leader-'+(i-1)).position().top;
        // to avoid use imagesLoaded
        var prev_height = $('#desktop div #leader-'+(i-1)).width();
        $('#desktop #leader-'+i).css("top", (prev_top + prev_height)+5+"px");

    }

  });

  // adjust region body height
  var last_top = $("#desktop #leader-"+(desktop_leaders.length-1)).position().top;
  var last_height = $("#desktop #leader-"+(desktop_leaders.length-1)).width();
  $('#desktop .region .body').css('height', ((last_top + last_height))+'px');

  console.log('positionLeaders executed');
}
/* end positionLeaders */

/* handle absolute positions on window resize */
$(window).resize(function(){

    positionLeaders();
  
});
/* end windowResize */


/* trigger content populate after dom is ready */
$(document).ready(function(){

  populateContent();

  $('.modal-trigger').on("click", function(){console.log('modal triggered');$("body").addClass("modal-open")});
  $('.close-trigger').on("click", function(){console.log('close triggered');$("body").removeClass("modal-open")});



});
/* documentReady end */

/* shrink logo - copied from previous interactives */
$(window).scroll(function() {

  if ($(document).scrollTop() > 50) {
    $('#head').addClass('shrink');
    $('#head .navbar-brand').addClass('shrinklogo');
  } 
  else {
    $('#head').removeClass('shrink');
    $("#head .navbar-brand").removeClass("shrinklogo");
  }

  /* sticky continent titles */
  if(($(document).scrollTop() > ($('#tcon').height() + 75)) && ($(document).scrollTop() < ($('#mobile').height() + ($('#tcon').height() - 10))))
  {
    console.log('condition true');

    var mrw = $('#mobile .region').width() - 26;
    $('#mobile .region .title').css('margin-left', (mrw/2)).addClass('stick').removeClass('rotate');
    
  }
  else{
  
    console.log('condition false');
    $('#mobile .region .title').css('margin-left', 0).removeClass('stick').addClass('rotate');
  }

});
/* shrink end */


/* vertically center modal */
$('.modal-trigger').on("click", function(){

  // Reposition when a modal is shown
  $('.modal').on('show.bs.modal', reposition);
  // Reposition when the window is resized
  $(window).on('resize', function() {
      $('.modal:visible').each(reposition);
  });

});
/* */

/* vertically center modal - reposition */
function reposition() {
  var modal = $(this),
      dialog = modal.find('.modal-dialog');
  modal.css('display', 'block');
  
  // Dividing by two centers the modal exactly, but dividing by three 
  // or four works better for larger screens.
  dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
}