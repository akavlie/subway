var zeropad = function (num) {
  return ((num < 10) ? '0' : '') + num;
};
var iso8601 = function (date) {
  return date.getUTCFullYear()
    + "-" + zeropad(date.getUTCMonth()+1)
    + "-" + zeropad(date.getUTCDate())
    + "T" + zeropad(date.getUTCHours())
    + ":" + zeropad(date.getUTCMinutes())
    + ":" + zeropad(date.getUTCSeconds()) + "Z";
};

function prepareDynamicDates() {
  $('abbr.loaded').attr("title", iso8601(new Date()));
  $('abbr.modified').attr("title", iso8601(new Date(document.lastModified)));
}

function loadNumbers() {
  jQuery.timeago.settings.strings.numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
}
function unloadNumbers() {
  jQuery.timeago.settings.strings.numbers = [];
}

function loadPigLatin() {
  jQuery.timeago.settings.strings = {
    suffixAgo: "ago-hay",
    suffixFromNow: "omNow-fray",
    seconds: "ess-lay an-thay a-hay inute-may",
    minute: "about-hay a-hay inute-may",
    minutes: "%d inutes-may",
    hour: "about-hay an-hay hour-hay",
    hours: "about-hay %d hours-hay",
    day: "a-hay ay-day",
    days: "%d ays-day",
    month: "about-hay a-hay onth-may",
    months: "%d onths-may",
    year: "about-hay a-hay ear-yay",
    years: "%d years-yay"
  };
}

function loadRussian() {
  (function() {
    function numpf(n, f, s, t) {
      // f - 1, 21, 31, ...
      // s - 2-4, 22-24, 32-34 ...
      // t - 5-20, 25-30, ...
      var n10 = n % 10;
      if ( (n10 == 1) && ( (n == 1) || (n > 20) ) ) {
        return f;
      } else if ( (n10 > 1) && (n10 < 5) && ( (n > 20) || (n < 10) ) ) {
        return s;
      } else {
        return t;
      }
    }

    jQuery.timeago.settings.strings = {
      prefixAgo: null,
      prefixFromNow: "Ñ‡ÐµÑ€ÐµÐ·",
      suffixAgo: "Ð½Ð°Ð·Ð°Ð´",
      suffixFromNow: null,
      seconds: "Ð¼ÐµÐ½ÑŒÑˆÐµ Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹",
      minute: "Ð¼Ð¸Ð½ÑƒÑ‚Ñƒ",
      minutes: function(value) { return numpf(value, "%d Ð¼Ð¸Ð½ÑƒÑ‚Ð°", "%d Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹", "%d Ð¼Ð¸Ð½ÑƒÑ‚"); },
      hour: "Ñ‡Ð°Ñ",
      hours: function(value) { return numpf(value, "%d Ñ‡Ð°Ñ", "%d Ñ‡Ð°ÑÐ°", "%d Ñ‡Ð°ÑÐ¾Ð²"); },
      day: "Ð´ÐµÐ½ÑŒ",
      days: function(value) { return numpf(value, "%d Ð´ÐµÐ½ÑŒ", "%d Ð´Ð½Ñ", "%d Ð´Ð½ÐµÐ¹"); },
      month: "Ð¼ÐµÑÑÑ†",
      months: function(value) { return numpf(value, "%d Ð¼ÐµÑÑÑ†", "%d Ð¼ÐµÑÑÑ†Ð°", "%d Ð¼ÐµÑÑÑ†ÐµÐ²"); },
      year: "Ð³Ð¾Ð´",
      years: function(value) { return numpf(value, "%d Ð³Ð¾Ð´", "%d Ð³Ð¾Ð´Ð°", "%d Ð»ÐµÑ‚"); }
    };
  })();
}

function loadMillis() {
  var millisSubstitution = function(number, millis) { return millis + " milliseconds"; };
  jQuery.timeago.settings.strings = {
    suffixAgo: "ago",
    suffixFromNow: "from now",
    seconds: millisSubstitution,
    minute: millisSubstitution,
    minutes: millisSubstitution,
    hour: millisSubstitution,
    hours: millisSubstitution,
    day: millisSubstitution,
    days: millisSubstitution,
    month: millisSubstitution,
    months: millisSubstitution,
    year: millisSubstitution,
    years: millisSubstitution
  };
}

function loadNoSpaces() {
  jQuery.extend(jQuery.timeago.settings.strings, {
    minutes: "%dminutes",
    wordSeparator: ""
  });
}

function loadYoungOldYears() {
  jQuery.extend(jQuery.timeago.settings.strings, {
    years: function(value) { return (value < 21) ? "%d young years" : "%d old years"; }
  });
}

$(document).on("click", ".announce", function () {
	var username = $(this).data('id');
	$(".modal-body #UserId").val( username );
    $('#privateMessage').modal('show');
});

$(document).on("click", "#privateSend-button", function () {
  var commandText = [];
  commandText[0] = '/msg';
  commandText[1] = $('#UserId').val();
  commandText[2] = $('#privateMessage-text').val();

  $('#UserId').val('');
  $('#privateMessage-text').val('');
  $('#privateMessage').modal('hide');
  irc.handleCommand(commandText);
});