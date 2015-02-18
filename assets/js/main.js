$(document).ready(function() {

  $terminal = new Terminal();
  $terminal.init();


});

function Terminal() {
  this.currentLevel = "0";
  this.currentScore = 5;
  this.scoreUnitVal = 1;
  this.scoreThresholds = {
    "bad" : 3,
    "neutral" : 7
  };
  this.endingText = {
    "good" : {
      image: "assets/img/top1.gif",
      text: 'Your boss is amazed at the sheer ingenuity and innovation in the work! He says things like\n\n"seamless execution" and "this will change everything!".\n\nToo bad the client will never accept this.\n\nCONGRATULATIONS YOU HAVE GOT THE "GOOD" ENDING!'
    },
    "neutral" : {
      image: "assets/img/top1.gif",
      text: 'You did such an average job that your boss doesn\'t really know what to say about your\n\nwork. He begins nit picking on your choice of type and art direction...\n\nBasically he just wants you to start again and come up with a "better" idea.\n\nYOU GOT THE SO SO ENDING.'
    },
    "bad" : {
      image: "assets/img/top1.gif",
      text: 'Due to your negligence, your boss berates you on handing in something so shitty.\n\nAs he shreds your work to pieces in front of you, you think back to all the bad decisions\n\nthat you have made. TRY AGAIN (maybe you should make better decision)'
    }
  };
  this.hints = {
      level_0: "",
      level_1: "Maybe you should try jaygo, computer, printer, nigel, procrastinate",
      level_2: "chrome, internet explorer, photoshop",
      level_3: "9gag, reddit, facebook, google",
      level_4: "search inspiration, cat pictures",
      level_5: "illustrator, indesign, photoshop",
      level_5_1: "livetrace, vector, save",
      level_5_2: "article, kern, package, save",
      level_5_3: "user filters, touchup, brush tool, save",
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
        commands: ["internet explorer", "open internet explorer"],
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
        commands: ["search inspiration", "cat pictures"],
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
        commands: ["user filters"],
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
        commands: ["check settings"],
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
      image: "assets/img/start.jpg",
      text: "",
      scoreType: "",
      nextLevel: "1"
    },
    
    // LEVEL 1 OUTCOMES
    "1-jaygo": {
      image: "assets/img/top3.png",
      text: "(tutor) insert jaygo quote here",
      scoreType: "+",
      nextLevel: "1"
    },
    "1-computer": {
      image: "assets/img/on_computer.gif",
      text: "It's alive!\n\nYou can see several applications on your screen.",
      scoreType: "+",
      nextLevel: "2"
    },
    "1-printer": {
      image: "assets/img/top1.gif",
      text: "Its a standard inkjet printer.\n\nNow's not the time to be using this yet...",
      scoreType: "",
      nextLevel: "1"
    },
    "1-nigel": {
      image: "assets/img/top3.png",
      text: "(tutor) insert nigel quote",
      scoreType: "+",
      nextLevel: "1"
    },
    "1-procrastinate": {
      image: "assets/img/top1.gif",
      text: "You do nothing...",
      scoreType: "-",
      nextLevel: "1"
    },

    // LEVEL 2 OUTCOMES
    "2-chrome": {
      image: "assets/img/chrome.gif",
      text: "You look at your bookmarks tab.\n\nYou see 9gag, reddit, facebook, google\n\nWhat should I do...",
      scoreType: "+",
      nextLevel: "3"
    },
    "2-explorer": {
      image: "assets/img/explorer.gif",
      text: "Who the hell uses internet explorer?!\n\nIt 404's on you anyway.\n\nUse another browser you old man.",
      scoreType: "-",
      nextLevel: "2"
    },
    "2-apps": {
      image: "assets/img/on_computer.gif",
      text: "You can't do that yet.",
      scoreType: "",
      nextLevel: "2"
    },

    // LEVEL 3 OUTCOMES
    "3-google": {
      image: "assets/img/google.png",
      text: "Of course...\n\nWhat do I search for?",
      scoreType: "+",
      nextLevel: "4"
    },
    "3-9gag": {
      image: "assets/img/9gag.png",
      text: "You decide to go on 9gag.\n\nNow you are stuck forever scrolling..",
      scoreType: "-",
      nextLevel: "3"
    },
    "3-reddit": {
      image: "assets/img/reddit.png",
      text: "You decide to go on reddit.\n\nYou got so distracted you decide to do something else instead.",
      scoreType: "-",
      nextLevel: "3"
    },
    "3-facebook": {
      image: "assets/img/facebook.png",
      text: "You decide to go on Facebook.\n\nYou end up not doing any work.\n\nAt least you know about your friends' social lives now...",
      scoreType: "-",
      nextLevel: "3"
    },

    // LEVEL 4 OUTCOMES
    "4-search": {
      image: "assets/img/google.png",
      text: "Somehow googling inspiration leads you to being inspired.\n\nWe all know you've just been searching for cat photos mostly...\n\nYou've obtained... A Picture of Cat\n\nMaybe I should draft a design?",
      scoreType: "",
      nextLevel: "5"
    },

    // LEVEL 5 OUTCOMES
    "5-illustrator": {
      image: "assets/img/indesign.gif",
      text: "You open adobe illustrator.\n\nWhat do i do in illustrator again?",
      scoreType: "",
      nextLevel: "5_1"
    },
    "5-indesign": {
      image: "assets/img/indesign.gif",
      text: "You open adobe indesign.\n\nYou need to write an article about cat.\n\nNow what?",
      scoreType: "",
      nextLevel: "5_2"
    },
    "5-photoshop": {
      image: "assets/img/photoshop.gif",
      text: "You open adobe photoshop.\n\nDon't go crazy on the filters...",
      scoreType: "",
      nextLevel: "5_3"
    },

    // LEVEL 5-1 OUTCOMES
    "5-1-livetrace": {
      image: "assets/img/indesign.gif",
      text: "Why would you livetrace anything?!",
      scoreType: "-",
      nextLevel: "5_1"
    },
    "5-1-vector": {
      image: "assets/img/indesign.gif",
      text: "Nothings gonna stop you from blowing it up to A0 size now...",
      scoreType: "+",
      nextLevel: "5_1"
    },
    "5-1-save": {
      image: "assets/img/indesign.gif",
      text: "you save your file.\n\nI guess you gotta go send it to print now!",
      scoreType: "",
      nextLevel: "6"
    },

    // LEVEL 5-2 OUTCOMES
    "5-2-article": {
      image: "assets/img/indesign.gif",
      text: "You write an enthralling tale about cats.\n\nI mean if you didn't what's the alternative?\n\nUse Lorem Ipsum?",
      scoreType: "+",
      nextLevel: "5_2"
    },
    "5-2-kern": {
      image: "assets/img/indesign.gif",
      text: "You remembered to kern the article.\n\nIt looks so beautiful now.",
      scoreType: "+",
      nextLevel: "5_2"
    },
    "5-2-package": {
      image: "assets/img/indesign.gif",
      text: "You remembered to package the .idml file.\n\nThat was close! Imagine if you didn't do that!\n\nyour cats would have become placeholders",
      scoreType: "+",
      nextLevel: "5_2"
    },
    "5-2-save": {
      image: "assets/img/indesign.gif",
      text: "you save your file.\n\nI guess you gotta go send it to print now!",
      scoreType: "",
      nextLevel: "6"
    },

    // LEVEL 5-3 OUTCOMES
    "5-3-filters": {
      image: "assets/img/photoshop.gif",
      text: "You solarize the shit out of the photo.\n\nWOW.",
      scoreType: "-",
      nextLevel: "5_3"
    },
    "5-3-touchup": {
      image: "assets/img/photoshop.gif",
      text: "You removed the acne of cat's face.\n\nSomehow you managed to turn cat into Ryan Gosling.",
      scoreType: "+",
      nextLevel: "5_3"
    },
    "5-3-paint": {
      image: "assets/img/photoshop.gif",
      text: "You decide to digitally repaint the picture of cat.\n\nSeriously, are you an illustrator or a graphic designer?! (or are you both?)",
      scoreType: "+",
      nextLevel: "5_3"
    },
    "5-3-save": {
      image: "assets/img/photoshop.gif",
      text: "you save your file.\n\nI guess you gotta go send it to print now!",
      scoreType: "",
      nextLevel: "6"
    },

    // LEVEL 6 OUTCOMES
    "6-printsettings": {
      image: "assets/img/top1.gif",
      text: "You check your print settings.\n\nLucky you! The settings were all horribly wrong.\n\nYou set it to the correct print settings",
      scoreType: "+",
      nextLevel: "6_1"
    },
    "6-print": {
      image: "assets/img/top1.gif",
      text: "In your lapse of judgement you forgot to check your print settings.\n\nYour printer starts spraying ink all over!\n\nFor some reason it still prints out but it just looks fugly.",
      scoreType: "-",
      nextLevel: "6_2"
    },

    // LEVEL 6-1 OUTCOMES
    "6-1-print": {
      image: "assets/img/top1.gif",
      text: "Lucky for you, you checked your print settings.\n\nThe printer prints out the image beautifully.\n\nYou marvel at its beauty.",
      scoreType: "",
      nextLevel: "6_2"
    },

    // LEVEL END OUTCOMES
    "end": {
      image: "assets/img/top1.gif",
      text: "Your boss appears out of nowhere!",
      scoreType: "",
      nextLevel: "0"
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
    
    console.log(that.currentLevel);
    console.log(levelCommands);

    if (command === "/hints") {
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

        // Update currentLevel
        that.currentLevel = outcome.nextLevel;

        // Check if ended
        if (that.currentLevel === "end") {
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
        if (tries === 3) {
          term.echo(that.hints["level_" + that.currentLevel]);
          tries = 0;
        } else {
          term.echo("I don't know what " + command + " means.");
        }
      }
    }
  }, { prompt: '> ', greetings: false });



  return true;
}
