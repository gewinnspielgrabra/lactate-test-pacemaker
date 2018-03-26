(function() {
  var stageOptions = [[6, 7, 8, 9, 10, 11, 12], [6.5, 8, 9.5, 11, 12.5, 14]];
  var minTimeOptions = [4, 5, 6];
  var dist = 1200;
  var i = -1;

  var stages = stageOptions[0];
  for (var s = 0, ss = stageOptions.length; s < ss; ++s) {
    $('#stages').append('<li><a href="#">' + stageOptions[s].join(' &ndash; ') + ' km/h</a></li>');
  }
  $('#dropdownMenu1').html($('#stages li a').html() + ' <span class="caret"></span>');
  $('#stages li a').click(function(){
    var selText = $(this).text();
    $('#dropdownMenu1').html(selText + ' <span class="caret"></span>');
    stages = stageOptions[$('#stages li a').index($(this))];
    firstStage();
  });

  var distRemaining = dist;
  function firstStage() {
    i = -1;
    nextStage();
  }
  function nextStage() {
    ++i;
    if (i >= stages.length) {
      $('#stage').html('Done!');
      $('#start').addClass('btn-success').removeClass('btn-danger').removeClass('btn-success');
      $('#start').html('<span class="glyphicon glyphicon-refresh"></span> Reload');
    } else {
      var minPerKm = 60 / stages[i];
      distRemaining = Math.ceil(4 / (minPerKm * 0.4)) * 400;
      $('#start').addClass('btn-success').removeClass('btn-danger').removeClass('btn-default');
      $('#start').html('<span class="glyphicon glyphicon-play"></span> Start');
      $('#stage').html('Stage ' + (i + 1) + ' &mdash; ' + stages[i] + ' km/h');
      $('#dist').html(distRemaining + ' m');
    }
  }

  nextStage();

  var interval;
  var sound = new buzz.sound("beep", {
    formats: [ "ogg", "m4a"]
  });

  $('#start').click(function() {
    if ($('#start').html().indexOf('Start') > -1) {
      sound.play();
      $('#start').addClass('btn-danger').removeClass('btn-success').removeClass('btn-default');
      $('#start').html('<span class="blink glyphicon glyphicon-stop"></span> Stop');
      interval = window.setInterval(function() {
        distRemaining -= 50;
        $('#dist').html(distRemaining + ' m');
        sound.play();
        if (distRemaining <= 0) {
          window.clearInterval(interval);
          nextStage();
        }
      }, 50 / (stages[i] / 3.6) * 1000);
    } else if ($('#start').html().indexOf('Stop') > -1) {
      window.clearInterval(interval);
      nextStage();
    } else {
      firstStage();
    }
  });
})();
