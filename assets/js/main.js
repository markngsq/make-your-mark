$(document).ready(function() {

  $terminal = new Terminal();
  $terminal.init();


});

function Terminal() {
  this.currentLevel = 1;
  this.currentScore = 5;
  this.scoreUnitVal = 1;
  this.commands = {
    level_1: [
      {
        commands: ["procrastinate", "do nothing"],
        outcome: 0
      },
      {
        commands: ["on computer", "on mac"],
        outcome: 1
      }
    ],
    level_2: [
      {
        commands: ["a"],
        outcome: 2
      },
      {
        commands: ["b"],
        outcome: 3
      },
    ],
    level_3: [
      {
        commands: ["a"],
        outcome: 4
      },
      {
        commands: ["b"],
        outcome: 5
      },
    ],
    level_4: [
      {
        commands: ["a"],
        outcome: 6
      },
      {
        commands: ["b"],
        outcome: 7
      },
    ]
  };

  this.outcomes = {
    0: {
      image: "assets/img/top.png",
      text: "You did nothing you dillhole",
      scoreType: "+"
    },
    1: {
      image: "assets/img/top.png",
      text: "Looks like you figured out how to turn on a damn computer!",
      scoreType: ""
    },
    3: {
      image: "assets/img/top.png",
      text: "some text",
      scoreType: "+"
    },
    4: {
      image: "assets/img/top.png",
      text: "some text",
      scoreType: "-"
    },
    5: {
      image: "assets/img/top.png",
      text: "some text",
      scoreType: "-"
    },
    6: {
      image: "assets/img/top.png",
      text: "some text",
      scoreType: "-"
    },
    7: {
      image: "assets/img/top.png",
      text: "some text",
      scoreType: "-"
    }
  };
}

// Initialize
Terminal.prototype.init = function() {
	var that = this;

  $('#term').terminal(function(command, term) {
    var hasCommand = false;
    var outcome = null;
    // Get all the commands for the level.
    var levelCommands = that.commands["level_" + that.currentLevel];

    // Loop through all the different command items for the level
    $.each(levelCommands, function(index, commandItem) {
      // For each item check if the command is found
      if ($.inArray(command, commandItem.commands) !== -1 ) {
        // Found
        outcome = that.outcomes[commandItem.outcome];
        hasCommand = true;
        return true;
      }
    });

    // If command exist, run the outcome for it, else display error message
    if (hasCommand) {
      // Update image
      $('#visual img').attr('src', outcome.image);
      // Show text
      term.echo(outcome.text);
      // Increase/Decrease score
      if (outcome.scoreType === "+") {
        that.currentScore += that.scoreUnitVal;
      } else if (outcome.scoreType === "-") {
        that.currentScore -= that.scoreUnitVal;
      } else {
        // No change in score
      }
      that.currentLevel++;
    } else {
      term.echo("Oops! That command doesn't seem to exist");
    }
  }, { prompt: '> ', greetings: false });



  return true;
}