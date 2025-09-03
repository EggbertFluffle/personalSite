# Hello? Is Anyone There?

YES YES, I am still here. Fear not. I've simply been a little too scattered to put together a "cohesive" post, but I figured "eh, i dont care". Also, I missed writting a little bit, ***but only a little***. My last post was on the Advent of Code, which I had a *LOT* of fun doing, and I'm very thankful to everyone who participated with me, especially [_Orange](https://www.onocu.com)! Since that, I enjoyed the break quite a bit, and enjoyed seeing family. 

## BeepBoop.nvim

One project I did work on, and eventually got to a semi-polished working state (shocker), was [beepboop.nvim](https://github.com/EggbertFluffle/beepboop.nvim). I was origionally planning to make an entire post just about that, but I kinda didn't do it. Essentially it is a pretty simple Neovim plugin that makes it easy to incorporate audio cues into neovim. I do this for fun, but I can see this being useful for accecibility reasons or notifications, there are a lot of options. I have a demo and (hopefully) everything one would need to get beepboop.nvim up and running in their Neovim config ont he (GitHub repo[(https://github.com/EggbertFluffle/beepboop.nvim]. I really love it, use it all the time, and am open to suggestions and the code is completely open source, although I have never ran an open source project and could really use a real reason to dig into git. Despite that, I'm pretty proud of the state of beepboop.nvim and I received a lot of good feedback on Reddit when I made a post to [r/neovim](https://www.reddit.com/r/neovim/comments/1hqtyg5/make_neovim_noisy_with_beepboopnvim/).

## Olivia

Additionally, while I was home, my dad finaly caved and let us get a cat. Now we are the proud owners of Olivia, a beautiful tuxedo cat that we adopted from the [Clifton Animal Shelter](https://cliftonanimalshelter.com/). She initially did *eveything* in my room for about a week, but then we got her used to the rest of the house. It's always nice hearing her playing with some random toy at 2AM or sleeping wherever she pleases during the entire day. Of course I need to leave some pictures so enjoy!

![Olivia T-Rex](./olivia_trex.jpg)
![Olivia Woah](./olivia_woah.jpg)
![Olivia Sleeping](./olivia_eepington.jpg)
![Olivia Being Tupperwear](./olivia_tupperwear.jpg)

## New Year's Resolutions!

I have none!

## Things I want to do in 2025

I hope this is somehow different than New Year's resolutions, but there are some things I'd like to do this year at some point. Some things I have already made pretty good headway on. One of which was learning a bit about assembly language. To do this, I decided upon the [flat assembler](https://flatassembler.net/) or fasm. It was really just the first one that I heard about, and would allow me to just start writing as soon as possible, even though eventually the boilerplate will be important to learn. I figured some things out and have a couple smaller projects to familliarize myself with how data is moved around, system calls are used, and how functions are generally executed. One of the cooler pet projects I made was a small working shell! I don't have it hosted remotely, but if anyone wants access to it, just shoot me an email!

The big ticket item though is the chat app I want to put together. I've gotten into messaging recently, and looked into services like matrix and irc, which the latter stuck as something I use semi-regularly! It's actually a lot of fun too. I've figured out a znc as a bouncer and how to use weechat as my client. I'm only on libera right now, but the communities they have there are so knoledgable, I don't see myself needing much more than what they have already. As you can probably see where this is going, I want to build my own chat app, but in assembly. I think (hope) it will be a good learning oppourtunity, interfacing with the unix socket api through system calls. 

I have already started progress... kinda. I figured since I've never used the socket api before, it would be beneficial for me to build a chat app where I have access to the C library and all the functions that make the general process a little easier. This also let me figure out the general order of operations for a server that is connecting with multiple clients and interfacing between all of them at once. Irc was again a super useful resource for this but somone on #c reccommended [Beej's Guide to Network Programming](https://beej.us/guide/bgnet/). Beej did a fantastic job at making network programming approachable, make sense and interesting to read about. One thing I've learned to love is when teacher remind you that they are human too, and have an interesting personality. Beej does this by being corny or making a funny analogy, but it really makes the material easier to digest. So with all these amazing resources, I finnally put together the chat app in C, which can be found on my GitHub [here](https://github.com/EggbertFluffle/c_chat_app).

This is about where I am now, and I need to figure out how to do some of the basics in assembly without the C library like managing structs, arrays, integer parsing, reversing the order of bytes, et cetera. I will probably post about the assembly chat app when it's finished but It's taking a quick hiatus while I have some other big ticket items on my list.

## New Keeb

Not really much to say here. Had been wanting a new keyboard for a while now and finnaly decided to stop being to frugal and do some good research. I origionally wanted a standard kit that just looked nice, but I eventually thought "I'll probably be typing until I get my government issue neuralink", so I opted for a **split keyboard**. Simply, it is the [Iris PE](https://keeb.io/products/iris-keyboard-split-ergonomic-keyboard) with the Cherry MX Browns from my old keyboard. Also with a nice new keycap set, courteous of a good ol' secret santa.

![Beutifully immaculate split keybaord](my_beloved_keyboard.jpg)

## "It's the Little Things"

There's also a ton of very little things that are always fun to mention. I've started the C term as a student at WPI and I've been taking System's Programming and Discrete Mathematics. System's is find, but I'm already pretty familliar with the material. Discrete Mathematics however, is one of the most interesting classes I've taking here. It's completely foreign to any "math" I've done before, but everything lines up nicely and it makes me approach problems far differently than before, which I always love. I've also always wanted to collect two books (and maybe read them) just because of how much I hear about them in the computing scene, but now I only want to collect one. I just got my hand on [Design Patterns: Elements of Reusable Objest-Oriented Software](https://en.wikipedia.org/wiki/Design_Patterns) for only $2.00! Such a steal, and I will absolutely be chipping away at it throughout the year. Besides all that nonsense, myself and some friends are plotting to participate in the [Brackey's Game Jam](https://itch.io/jam/brackeys-13) this Saturday, and I've been thinking about making a devlog about it and posting it on YouTube, but that does seem like a lot of work concerning recording and editing, which I don't know how to do. I'm really excited because we have a musician, and artist and two programmers, so I'm hoping we can pump out something really cool! Until next time, who needs outros for blogs.
