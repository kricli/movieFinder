$(document).ready(function(){

  var animation;
  var shifted = false;
  $('#movieInput').keyup(function(e){
    if (e.keyCode == 13) {
      if (shifted === false) {
      $("container").animate({
        top: "-=300px",
      },1000);
      shifted = true;
    }
      animation = setInterval(function() {
        if ($('#dotdotdot li').length <= 6) {
          $('#dotdotdot').append('<li> ▩ </li>')
        }else {
          $('#dotdotdot').empty();
        }
      }, 300)
    $('#mainPicture').hide();
    $('#mainInfo').hide();
    $('#mainInfo').empty();
    $('#mainPicture').empty();
    $('#dotdotdot').empty();
    $('#dotdotdot').show();
    getData();
    }
  })


  var getData = function() {
    var query = $('#movieInput').val();
    $.ajax({
      type: "GET",
      url: "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&r=json",
      dataType: "JSON",
      success: function(response){
        for (var key in response) {
          if (key!=='Plot' && key!=='Poster' && key!=='Metascore' && key!=='imdbRating' && key!=='imdbVotes' && key!=='imdbID' && key!=='Type' && key!=='Response') {
            $('#mainInfo').append('<tr><td>' + key + '</td><td>' + response[key] + '</td></tr>')
          }
        }
        $('#mainPicture').append("<img src=" + response.Poster + " alt='Image not found' onError=\"this.src=\'images/noooo.png\'\">")
        $('#mainPicture img').load(function() {
          clearInterval(animation);
          $('#dotdotdot').hide();
          $('#mainPicture').show();
          $('#mainInfo').show();
        });
      }
    })

  }






})
