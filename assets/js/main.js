(function($) {
  var $el = {
    day: $('#days'),
    hrs: $('#hours'),
    min: $('#minutes'),
    sec: $('#seconds')
  };

  var timeout;
  setDate(new Date(2014, 7, 1, 20, 0));

  function setDate(launch) {
    var now = new Date();

    if (launch < now) {
      zeroOutTimer();
      clearInterval(timeout);
    } else {
      var s = now.getTimezoneOffset() * -60 + (launch.getTime() - now.getTime()) / 1000;

      var d = Math.floor(s / 86400);
      setTimeElement('day', d);
      s -= d * 86400;

      var h = Math.floor(s / 3600);
      setTimeElement('hrs', h);
      s -= h * 3600;

      var m = Math.floor(s / 60);
      setTimeElement('min', m);
      s = Math.floor(s - m * 60);

      setTimeElement('sec', s);

      if (!timeout) {
        timeout = setInterval(setDate, 1000, launch);
      }
    }
  }

  function setTimeElement(unit, time) {
    $el[unit].html('<p>' + unit + '</p><h1>' + (time < 10 ? '0' + time : time) + '</h1>');
  }

  function zeroOutTimer() {
    for (var unit in $el) {
      setTimeElement(unit, 0);
    }
  }
})(jQuery);
