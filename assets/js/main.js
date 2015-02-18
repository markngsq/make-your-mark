$(document).ready(function() {

  $terminal = new Terminal();
  $terminal.init();


});

function Terminal() {
  this.hasEnded = false;
  this.currentLevel = "0";
  this.currentScore = 0;
  this.scoreUnitVal = 1;
  this.scoreThresholds = {
    "bad" : 3,
    "neutral" : 7
  };
  this.endingText = {
    "good" : {
      image: "assets/img/goodend.gif",
      text: 'Your boss is impressed by your work!\n As he applauds you, you feel a sense of achievement. \nFor some reason, this causes you to grow a beard.\nYOU HAVE GOT THE "GOOD" ENDING!'
    },
    "neutral" : {
      image: "assets/img/neutralend.gif",
      text: 'You did such an average job that your boss doesn\'t really know what to say. \nBasically he just wants you to start again and come up with a "better" idea.\nYOU GOT THE SO SO ENDING.'
    },
    "bad" : {
      image: "assets/img/badend.gif",
      text: 'Your boss is unimpressed by your work at all.\nAs he shreds your work to pieces in front of you, you feel your soul drifting away...\nTRY AGAIN (maybe you should make better decisions)'
    }
  };
  this.hints = {
    level_0: "",
    level_1: "Don't be silly, try: jaygo, computer, printer, nigel, procrastinate",
    level_2: "Really? try: chrome, internet explorer",
    level_3: "Its on the screen and you can't get it? Try: 9gag, reddit, facebook, google",
    level_4: "search inspiration, cat pictures",
    level_5: "illustrator, indesign, photoshop",
    level_5_1: "livetrace, vector, save",
    level_5_2: "article, kern, package, save",
    level_5_3: "use filters, touchup, brush tool, save",
    level_6: "check settings, print",
    level_6_1: "print",
    level_6_2: "submit work, submit",
  };
  this.commands = {
    level_0: [
      {
        commands: ["start"],
        outcome: "0-start"
      }
    ],
    
    level_1: [
      {
        commands: ["jaygo"],
        outcome: "1-jaygo"
      },
      {
        commands: ["turn on computer", "computer"],
        outcome: "1-computer"
      },
      {
        commands: ["printer", "use printer", "look at printer"],
        outcome: "1-printer"
      },
      {
        commands: ["nigel"],
        outcome: "1-nigel"
      },
      {
        commands: ["procrastinate", "do nothing"],
        outcome: "1-procrastinate"
      }
    ],
    level_2: [
      {
        commands: ["chrome", "open chrome", "browser", "open browser"],
        outcome: "2-chrome"
      },
      {
        commands: ["internet explorer", "open internet explorer", "open explorer"],
        outcome: "2-explorer"
      },
      {
        commands: ["indesign", "illustrator", "photoshop"],
        outcome: "2-apps"
      }
    ],
    level_3: [
      {
        commands: ["9gag"],
        outcome: "3-9gag"
      },
      {
        commands: ["reddit"],
        outcome: "3-reddit"
      },
      {
        commands: ["facebook"],
        outcome: "3-facebook"
      },
      {
        commands: ["google"],
        outcome: "3-google"
      }
    ],
    level_4: [
      {
        commands: ["inspiration", "search inspiration","cats", "cat pictures"],
        outcome: "4-search"
      }
    ],
    level_5: [
      {
        commands: ["illustrator"],
        outcome: "5-illustrator"
      },
      {
        commands: ["indesign"],
        outcome: "5-indesign"
      },
      {
        commands: ["photoshop"],
        outcome: "5-photoshop"
      }
    ],
    level_5_1: [
      {
        commands: ["livetrace"],
        outcome: "5-1-livetrace"
      },
      {
        commands: ["vector"],
        outcome: "5-1-vector"
      },
      {
        commands: ["save file", "save"],
        outcome: "5-1-save"
      }
    ],
    level_5_2: [
      {
        commands: ["write article", "article"],
        outcome: "5-2-article"
      },
      {
        commands: ["kern", "kern article"],
        outcome: "5-2-kern"
      },
      {
        commands: ["package file", "package"],
        outcome: "5-2-package"
      },
      {
        commands: ["save file", "save"],
        outcome: "5-2-save"
      }
    ],
    level_5_3: [
      {
        commands: ["use filters", "solarize", "filters"],
        outcome: "5-3-filters"
      },
      {
        commands: ["touchup", "clone tool", "healing brush"],
        outcome: "5-3-touchup"
      },
      {
        commands: ["paint artwork", "brush tool"],
        outcome: "5-3-paint"
      },
      {
        commands: ["save file", "save"],
        outcome: "5-3-save"
      }
    ],
    level_6: [
      {
        commands: ["check settings", "settings"],
        outcome: "6-printsettings"
      },
      {
        commands: ["print"],
        outcome: "6-print"
      }
    ],
    level_6_1: [
      {
        commands: ["print"],
        outcome: "6-1-print"
      }
    ],
    level_6_2: [
      {
        commands: ["submit work", "submit", "hand in"],
        outcome: "end"
      }
    ]
  };
  this.outcomes = {
    // LEVEL 0 OUTCOMES
    "0-start": {
      image: "assets/img/top.gif",
      text: "",
      scoreType: "",
      nextLevel: "1"
    },
    
    // LEVEL 1 OUTCOMES
    "1-jaygo": {
      image: "assets/img/jaygo.gif",
      text: "(tutor) insert jaygo quote here",
      scoreType: "+",
      nextLevel: "1"
    },
    "1-computer": {
      image: "assets/img/on_computer.gif",
      text: "It's alive!\nYou can see several applications on your screen.",
      scoreType: "+",
      nextLevel: "2"
    },
    "1-printer": {
      image: "assets/img/top.gif",
      text: "Its a standard inkjet printer.\nNow's not the time to be using this yet...",
      scoreType: "",
      nextLevel: "1"
    },
    "1-nigel": {
      image: "assets/img/nigel.gif",
      text: "(tutor) insert nigel quote",
      scoreType: "+",
      nextLevel: "1"
    },
    "1-procrastinate": {
      image: "assets/img/top.gif",
      text: "You do nothing... nothing at all.",
      scoreType: "-",
      nextLevel: "1"
    },

    // LEVEL 2 OUTCOMES
    "2-chrome": {
      image: "assets/img/chrome.gif",
      text: "You look at your bookmarks tab.\nYou see 9gag, reddit, facebook, google\nWhat should I do...",
      scoreType: "+",
      nextLevel: "3"
    },
    "2-explorer": {
      image: "assets/img/explorer.gif",
      text: "Who the hell uses internet explorer?!\nIt 404's on you anyway.\nUse another browser you old man.",
      scoreType: "-",
      nextLevel: "2"
    },
    "2-apps": {
      image: "assets/img/on_computer.png",
      text: "You can't do that yet.",
      scoreType: "",
      nextLevel: "2"
    },

    // LEVEL 3 OUTCOMES
    "3-google": {
      image: "assets/img/google.png",
      text: "Of course...\nWhat do I search for?",
      scoreType: "+",
      nextLevel: "4"
    },
    "3-9gag": {
      image: "assets/img/9gag.png",
      text: "You decide to go on 9gag.\nNow you are stuck forever scrolling..",
      scoreType: "-",
      nextLevel: "3"
    },
    "3-reddit": {
      image: "assets/img/reddit.png",
      text: "You decide to go on reddit.\nYou got so distracted you decide to do something else instead.",
      scoreType: "-",
      nextLevel: "3"
    },
    "3-facebook": {
      image: "assets/img/facebook.png",
      text: "You decide to go on Facebook.\nYou end up not doing any work.\nAt least you know about your friends' social lives now...",
      scoreType: "-",
      nextLevel: "3"
    },

    // LEVEL 4 OUTCOMES
    "4-search": {
      image: "assets/img/googleimage.gif",
      text: "Somehow googling inspiration leads you to being inspired.\nWe all know you've just been searching for cat photos mostly...\nYou've obtained... A Picture of Cat\nMaybe I should draft a design?",
      scoreType: "",
      nextLevel: "5"
    },

    // LEVEL 5 OUTCOMES
    "5-illustrator": {
      image: "assets/img/illustrator.gif",
      text: "You open adobe illustrator.\nWhat do i do in illustrator again?",
      scoreType: "",
      nextLevel: "5_1"
    },
    "5-indesign": {
      image: "assets/img/indesign.gif",
      text: "You open adobe indesign.\nYou need to write an article about cat.\nNow what?",
      scoreType: "",
      nextLevel: "5_2"
    },
    "5-photoshop": {
      image: "assets/img/photoshop.gif",
      text: "You open adobe photoshop.\nDon't go crazy on the filters...",
      scoreType: "",
      nextLevel: "5_3"
    },

    // LEVEL 5-1 OUTCOMES
    "5-1-livetrace": {
      image: "assets/img/livetrace.png",
      text: "Why would you livetrace anything?!",
      scoreType: "-",
      nextLevel: "5_1"
    },
    "5-1-vector": {
      image: "assets/img/vector.png",
      text: "Nothings gonna stop you from blowing it up to A0 size now...",
      scoreType: "+",
      nextLevel: "5_1"
    },
    "5-1-save": {
      image: "assets/img/illustrator.gif",
      text: "you save your file.\nI guess you gotta go send it to print now!",
      scoreType: "",
      nextLevel: "save_illustrator.gif"
    },

    // LEVEL 5-2 OUTCOMES
    "5-2-article": {
      image: "assets/img/article.png",
      text: "You write an enthralling tale about cats.\nI mean if you didn't what's the alternative?\nUse Lorem Ipsum?",
      scoreType: "+",
      nextLevel: "5_2"
    },
    "5-2-kern": {
      image: "assets/img/kern.png",
      text: "You remembered to kern the article.\nIt looks so beautiful now.",
      scoreType: "+",
      nextLevel: "5_2"
    },
    "5-2-package": {
      image: "assets/img/package.png",
      text: "You remembered to package the .idml file.\nThat was close! Imagine if you didn't do that!\nyour cats would have become placeholders",
      scoreType: "+",
      nextLevel: "5_2"
    },
    "5-2-save": {
      image: "assets/img/save_indesign.gif",
      text: "you save your file.\nI guess you gotta go send it to print now!",
      scoreType: "",
      nextLevel: "6"
    },

    // LEVEL 5-3 OUTCOMES
    "5-3-filters": {
      image: "assets/img/solarize.png",
      text: "You solarize the shit out of the photo.\nWOW.",
      scoreType: "-",
      nextLevel: "5_3"
    },
    "5-3-touchup": {
      image: "assets/img/rosling.png",
      text: "You removed the acne of cat's face.\nSomehow you managed to turn cat into Ryan Gosling.",
      scoreType: "+",
      nextLevel: "5_3"
    },
    "5-3-paint": {
      image: "assets/img/paint.png",
      text: "You decide to digitally repaint the picture of cat.\nSeriously, are you an illustrator or a graphic designer?! (or are you both?)",
      scoreType: "+",
      nextLevel: "5_3"
    },
    "5-3-save": {
      image: "assets/img/save_photoshop.gif",
      text: "you save your file.\nI guess you gotta go send it to print now!",
      scoreType: "",
      nextLevel: "6"
    },

    // LEVEL 6 OUTCOMES
    "6-printsettings": {
      image: "assets/img/printsettings.gif",
      text: "You check your print settings.\nLucky you! The settings were all horribly wrong.\nYou set it to the correct print settings",
      scoreType: "+",
      nextLevel: "6_1"
    },
    "6-print": {
      image: "assets/img/no_printsettings.gif",
      text: "In your lapse of judgement you forgot to check your print settings.\nYour printer starts spraying ink all over!\nFor some reason it still prints out but it just looks fugly.",
      scoreType: "-",
      nextLevel: "6_2"
    },

    // LEVEL 6-1 OUTCOMES
    "6-1-print": {
      image: "assets/img/printsettings.gif",
      text: "Lucky for you, you checked your print settings.\nThe printer prints out the image beautifully.\nYou marvel at its beauty.",
      scoreType: "",
      nextLevel: "6_2"
    },

    // LEVEL END OUTCOMES
    "end": {
      image: "assets/img/top1.gif",
      text: "Your boss appears out of nowhere!",
      scoreType: "",
      nextLevel: "end"
    }
  };
}

// Initialize
Terminal.prototype.init = function() {
	var that = this;
  var tries = 0;

  $('#term').terminal(function(command, term) {
    var hasCommand = false;
    var outcome = null;
    // Get all the commands for the level.
    var levelCommands = that.commands["level_" + that.currentLevel];
    
    // If ended and key pressed go back to start
    if (that.currentLevel === "end" && that.hasEnded) {
      that.hasEnded = false;
      that.currentLevel = "0";
      that.currentScore = 0;
      $('#visual img').attr('src', "assets/img/startpage.png");
      return;
    }

    if (command === "hints") {
      term.echo(that.hints["level_" + that.currentLevel]);
    } else {
      tries++;
      // Loop through all the different command items for the level
      $.each(levelCommands, function(index, commandItem) {
        // For each item check if the command is found
        if ($.inArray(command, commandItem.commands) !== -1 ) {
          // Found
          outcome = that.outcomes[commandItem.outcome];
          hasCommand = true;
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

        // Update currentLevel
        that.currentLevel = outcome.nextLevel;

        // Check if ended
        if (that.currentLevel === "end") {
          that.hasEnded = true;
          if (that.currentScore <= that.scoreThresholds["bad"]) {
            $('#visual img').attr('src', that.endingText["bad"].image);
            term.echo(that.endingText["bad"].text);
          } else if (that.currentScore > that.scoreThresholds["bad"] && that.currentScore <= that.scoreThresholds["neutral"]) {
            $('#visual img').attr('src', that.endingText["neutral"].image);
            term.echo(that.endingText["neutral"].text);
          } else {
            $('#visual img').attr('src', that.endingText["good"].image);
            term.echo(that.endingText["good"].text);
          }
        }
      } else {
        console.log(tries);
        if (tries === 3) {
          term.echo(that.hints["level_" + that.currentLevel]);
          tries = 0;
        } else {
          term.echo("What does " + command + " mean?");
        }
      }
    }
  }, { prompt: '> ', greetings: false });



  return true;
}
