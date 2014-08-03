(function() {
  var stages = [8, 9, 10, 11, 12];
  var dist = 1200;
  var i = -1;

  function nextStage() {
    ++i;
    if (i >= stages.length) {
      $('#stage').html('Done!');
      $('#start').addClass('btn-success').removeClass('btn-danger').removeClass('btn-success');
      $('#start').html('<span class="glyphicon glyphicon-refresh"></span> Reload');
    } else {
      dist = 1200;
      $('#start').addClass('btn-success').removeClass('btn-danger').removeClass('btn-default');
      $('#start').html('<span class="glyphicon glyphicon-play"></span> Start');
      $('#stage').html('Stage ' + (i + 1) + ' &mdash; ' + stages[i] + ' km/h');
      $('#dist').html(dist + ' m');
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
        dist -= 50;
        $('#dist').html(dist + ' m');
        sound.play();
        if (dist <= 0) {
          window.clearInterval(interval);
          nextStage();
        }
      }, 50 / (stages[i] / 3.6) * 1000);
    } else if ($('#start').html().indexOf('Stop') > -1) {
      window.clearInterval(interval);
      nextStage();
    } else {
      i = -1;
      nextStage();
    }
  });
})();
