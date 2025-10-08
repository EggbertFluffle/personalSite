# Oh Zig my Beloved

For a while now, I have been learning the deep intricacies of C++. The more I learn about the language, the faster I see that I will never know anywhere close to all of it until I embody the life of [Jason Turner](https://www.youtube.com/channel/UCxHAlbZQNFU2LgEtiqd2Maw). I don't expect to know **all** of any language really, but in my struggle with C++ (*which I still hold very near and dear to my heart*), there was one thing that I just could not tolerate: the tooling. The lack of official tooling makes the language harder to use since building a C++ project is only simple if you just press play in VS Code. 

Without hand holding, you need to figure out how you're going to include libraries, pick a compiler to use, think about a build system, worry about cross compilation etc. For [BeepBoop.nvim](https://github.com/EggbertFluffle/beepboop.nvim) this wasn't something I wanted to tackle so I needed a solution to a couple of problems. I need a cross compilable library that would allow me to write cross compilable C++ with it.

Now I will admit, that at this point I wasn't the most comfaterble with C++ and its convoluted ecosystem, but in my defense, I wanted to build a companion binary to beepboop.nvim, not wrangle with C++ annoyances. This is when the idea of approaching with other languages came to mind, and there were two options that made sense to me: Rust and Zig.

## The Start of an Era

The choice boiled down to, Zig has a cooler logo, and the drama around Rust is annoying, so I chose Zig, and what a good decision that turned out to be. I had heard of the language as a reccomendation from a friend at first, but the buzz kept buzzing in my feed so I caved and started the tutorial hell, which didn't last long. This is because knowing systems languages already makes Zig just seem like convenience over magic, which I prefer. The main attractions for me at the time was really straightforward cross compilation. Unfortunately, it wasn't all on easy street, the native zig package manager is very heavily in development right now, and prompted me to look for other options, which led me to land on a quite magic discovery, their "translate c" feature.

I figured there would be far more C libraries for cross platform audio playing than native Zig ones, so I found a quite popular option, miniaudio.h, and simply translated it into Zig for me to use to my heart's content. This was nearly painless (I understand now that it is possible to not even translate the C myself, and include the translation in the build file). From here the rest of the application was a simple model of the logic I had in the C++ version, but with a lot more error checking courtesy of Zig.

## The Ugly

Zig is really exciting, and I find learning about their design decisions to be a lot of fun. For example, one of Zig's defining qualities is the explicit use of allocators throughout the code, instead of just calling any old allocator from the system. This was already true, but recently, Zig has been trying to steer away from what they called "managed" allocation, over to "unmanaged" allocation. The difference lies in when the allocator is given to the data structure, either at intialization of the structure of for each allocation made by it.

```zig
    // Managed ArrayList
    const arr = std.ArrayList(i32).init(std.heap.page_allocator);
    try arr.append(32);

    // Unamanaged ArrayList
    const arr = std.ArrayList(i32).init();
    try arr.append(32, std.heap.page_allocator);
```

The unmanaged approach is something I'm not used to, but willing to try out. But as the header suggests, this is about the ugly. Although the error handling is comprehensive, I find when I just want to crank out some code to solve a problem, or for [Advent of Code](https://adventofcode.com), it just gets in the way. In the end this is a design decision so that Zig can be as error prone as possible, among a plethura of other measures, just me being picking. Ok enough waffling.
