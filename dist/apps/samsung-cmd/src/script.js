/*
//	Made with <3 by Marcus Bizal
//	github.com/marcbizal
//	linkedin.com/in/marcbizal
*/

$(document).ready(function() {
		"use strict";

		// UTILITY
		function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min)) + min;
		}
		// END UTILITY

		// COMMANDS
		function hi() {
				terminal.text("hello");
		}
	function name() {
				terminal.text("samsung cmd");
		}
	function developer() {
				terminal.text("ansh ahlawat");
		}
	function company() {
				terminal.text("the future web");
		}
	function birthday() {
				terminal.text("30/8/2021");
		}
	function website() {
				terminal.text("thefutureweb.renderforestsites.com");
		}
	function phone() {
				terminal.text("+917357133910");
		}
	function address() {
				terminal.text("790c,5r,hafed road,prem nagar,near new bus stand,rohtak,haryana,india.");
		}
	function about() {
				terminal.text("my name is samsung cmd designed by ansh ahlawat");
		}
			function help() {
				terminal.append("Type any command like hi , name ,developer  >:D\n");
		}
	function system() {
				terminal.append("laptop , computer  >:D\n");
		}
	function storage() {
				terminal.append("ram - 67% <br>rom - 46% <br>drive-c - 78% <br> drive-d - 10%<br>drive-d - 0% <br>cd-drive - none ");
		}
	function requirements() {
				terminal.append(" browser-chrome , edge , firefox >:D\n");
		}
	function partof() {
				terminal.append("samsung operating system  >:D\n");
		}
	function designer(){
				terminal.append("designed by ansh ahlawat  >:D\n");
		}
	
	
		function next(args) {
				var str = args.join(" ");
				terminal.append(str + "\n");
		   }
		// END COMMANDS

		var title = $(".title");
		var terminal = $(".terminal");
		var prompt = "➜";
		var path = "~";

		var commandHistory = [];
		var historyIndex = 0;

		var command = "";
		var commands = [{
						"name": "hi",
						"function": hi
				},{
						"name": "name",
						"function": name
				},{
						"name": "developer",
						"function": developer
				},{
						"name": "company",
						"function": company
				},{
						"name": "birthday",
						"function": birthday
				},{
						"name": "website",
						"function": website
				},{
						"name": "phone",
						"function": phone
				},{
						"name": "address",
						"function": address
				},{
						"name": "about",
						"function": about
				},{
						"name": "help",
						"function": help
				},{
						"name": "system",
						"function": system
				},{
						"name": "requirements",
						"function": requirements
				},{
						"name": "storage",
						"function": storage
				},{
						"name": "partof",
						"function": partof
				},{
						"name": "designer",
						"function": designer
				},{
						"name": "next",
						"function": next
				}];

function processCommand() {
		var isValid = false;

		// Create args list by splitting the command
		// by space characters and then shift off the
		// actual command.

		var args = command.split(" ");
		var cmd = args[0];
		args.shift();

		// Iterate through the available commands to find a match.
		// Then call that command and pass in any arguments.
		for (var i = 0; i < commands.length; i++) {
				if (cmd === commands[i].name) {
						commands[i].function(args);
						isValid = true;
						break;
				}
		}

		// No match was found...
		if (!isValid) {
				terminal.append("Samsung os : command not found: " + command + "\n");
		}

		// Add to command history and clean up.
		commandHistory.push(command);
		historyIndex = commandHistory.length;
		command = "";
}

function displayPrompt() {
		terminal.append("<span class=\"prompt\">" + prompt + "</span> ");
		terminal.append("<span class=\"path\">" + path + "</span> ");
}

// Delete n number of characters from the end of our output
function erase(n) {
		command = command.slice(0, -n);
		terminal.html(terminal.html().slice(0, -n));
}

function clearCommand() {
		if (command.length > 0) {
				erase(command.length);
		}
}

function appendCommand(str) {
		terminal.append(str);
		command += str;
}

/*
	//	Keypress doesn't catch special keys,
	//	so we catch the backspace here and
	//	prevent it from navigating to the previous
	//	page. We also handle arrow keys for command history.
	*/

$(document).keydown(function(e) {
		e = e || window.event;
		var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

		// BACKSPACE
		if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
				e.preventDefault();
				if (command !== "") {
						erase(1);
				}
		}

		// UP or DOWN
		if (keyCode === 38 || keyCode === 40) {
				// Move up or down the history
				if (keyCode === 38) {
						// UP
						historyIndex--;
						if (historyIndex < 0) {
								historyIndex++;
						}
				} else if (keyCode === 40) {
						// DOWN
						historyIndex++;
						if (historyIndex > commandHistory.length - 1) {
								historyIndex--;
						}
				}

				// Get command
				var cmd = commandHistory[historyIndex];
				if (cmd !== undefined) {
						clearCommand();
						appendCommand(cmd);
				}
		}
});

$(document).keypress(function(e) {
		// Make sure we get the right event
		e = e || window.event;
		var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

		// Which key was pressed?
		switch (keyCode) {
				// ENTER
				case 13:
						{
								terminal.append("\n");

								processCommand();
								displayPrompt();
								break;
						}
				default:
						{
								appendCommand(String.fromCharCode(keyCode));
						}
		}
});

// Set the window title
title.text("Samsung cmd ///");

// Get the date for our fake last-login
var date = new Date().toString(); date = date.substr(0, date.indexOf("GMT") - 1);

// Display last-login and promt
terminal.append("Type any command"); displayPrompt();
});