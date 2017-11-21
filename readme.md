![Presenting Terminus]( ./src/img/promo_image.jpg )

In a mysterious land, both physical and magical powers had been surpassed by a new power.
The land is very peaceful, but great powers involve great struggles.
Awakened in a strangely familiar place, you discover that you could use this power without knowing how.
Now, you want to learn how to use it.

Terminus is a text adventure game running on your Web browser.

The aim is not to destroy the enemy, no, you'll just have to help people you could meet.


About the project
=================
This project is deviant fork of [mprat's Terminus project](http://mprat.github.io/Terminus/).

Use the game (testing)
======================
Open '''index.html''' in '''src'''.

If you need to change lang,
modify the line containing 'terminus.dialog.lang.js'.

Generate missing files
======================
You need to install NodeJs before.

Do '''make''' in the directory containing Makefile.

This will install dependencies and assemble files.

Update translations
===================
Edit '''.po''' file in '''src/js''' and generate missing files.

The translation "terminal.dialog.lang.js" in "src/js" will be updated.

Get minified versions
=====================
Generate missing files.

The minified will appear in '''webroot'''.

Educational targets
===================
The game aims to

- encourage curiosity
- initiate to terminal / command line
+ be usable for game hacking / creation (aim of the fork)

Why the terminal ?
==================
Our usage of computers are focused on graphical user interfaces,
but most of the advanced settings of a system are only accessible with the console mode.
This is done :

- because this is simplest solution, especially for the server machines
- because it asks less resources to the computer
- because many powerful tools are only usable on command line interface, in order to be used in scripts
- to avoid to fear users about things they don't know how to use

By not knowing the command line and scripting.
The user is limited by usage, and is jailed in waiting that some software will do something approaching to the needs.
Therefore the command line tools are very well documented without asking on the Web.

By learning how work command line, you'll be able to do things on your computer, and on a server, such as :

- installing non-packaged applications
- finding files or a specific informations without installing a new software
- calling scripts and programs with advanced options
- accessing servers
- develop simple scripts for launching a set of applications with one click


Deviant part
============
If you tested the orginal Terminus game, you may discover that :

- the scenario had been altered
- the MIT part and the 'add' locker command had been removed, because these things are really specific to MIT
- there is sounds
- UI has changed in order to be usable with click only
- UI cheats on the accessibility...
