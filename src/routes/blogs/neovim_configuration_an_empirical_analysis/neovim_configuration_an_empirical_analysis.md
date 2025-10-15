# Neovim Configuration: An Empirical Analysis

OK. Here we go. 

I created my first Neovim config when I was in my senior year of high school. I almost bar for bar copied [The Primeagen's](https://youtu.be/w7i4amO_zaE?si=tzJ4hcnQpAHIh6_8) config tutorial that gave you essentially anything you could ever want. After I got his config, I didn't make any major changes for a long time, almost 2 and a half years. Throughout that span of time, I put the config through it's paces, and it grew in girth and convolution. For example, I desired one keymap to run any and all code. This means one keymap to open a new terminal, compile if necessary then run the code, for any programming language I threw at it. For some reason this is how I decided I should go about this.

```lua
vim.keymap.set("n", "<C-Enter>", function ()
	require("beepboop").play_audio("runprogram")

	local terminalCmd = "alacritty --command "
	local runScriptsPath = "/home/eggbert/.config/nvim/lua/eggbert/scripts/"

	local fileName = string.lower(vim.fn.expand("%"))
	local fileExtension = string.lower(fileName.sub(fileName, string.len(fileName) - 2, string.len(fileName)))

	if fileExtension == "ava" then -- RUN JAVA CODE
		if (string.find(fileName, "test") == nil) then
			print("RUN JAVA")
			os.execute(terminalCmd .. runScriptsPath .. "javarun.sh &")
		else
			print("RUN TESTS")
			os.execute(terminalCmd .. runScriptsPath .. "javatest.sh &")
		end
	elseif (fileExtension == "cpp" or fileExtension == "hpp" or string.sub(fileExtension, -1) == "c") then -- RUN C++ AND C
		os.execute(terminalCmd .. runScriptsPath .. "cpp.sh &")
	elseif (fileExtension == "lua") then -- RUN LUA CODE
		os.execute(terminalCmd .. runScriptsPath .. "lua.sh " .. fileName)
	elseif (fileExtension == "zig") then -- RUN LUA CODE
		os.execute(terminalCmd .. runScriptsPath .. "zigrun.sh " .. fileName)
	else
		print("ion know whut da **** to do wit dis")
	end
end)
```

This... is disgusting. First line is off to a good start with [beepboop](https://github.com/EggbertFluffle/beepboop/nvim) (still working on that by the way). But then, all hell breaks loose. I use "alacritty" directly instead of something more portable like `os.getenv("TERM")`, which bit me back later when I switched to [st](https://st.suckless.org). The path for the scripts is aboslute and hardcoded, here we could use `vim.fn.stdpath("config")`. The most disgusting part is how I grossly pick out the filetype from the whole filename. The rest of the code reaks of unplanned nonsense with terrible comments and **a lot** of repeating patterns.

## My init.lua needs to be at least 6'5"

So why must I ruin your day by showing you this? Because it is no more. After randomly finding out that the [nightly build of Neovim](https://github.com/neovim/neovim/releases/nightly) added a native package manager and lsp support, I nearly started jumping up and down. Previously I had used [packer.nvim](https://github.com/wbthomason/packer.nvim) which worked, but was getting old and became unmaintained. Then I switched to [lazy.nvim](https://github.com/folke/lazy.nvim) which was fine if I'm being honest, but felt a little magical, and since I had been developing beepboop.nvim, I knew my way around Neovim a little better. This is when I wanted to understand my config a bit better, leading me to rewrite it. I had some goals in mind for this:

1. Try to keep everything Neovim native: packaging, lsp, and completion
2. Use as few plugins as possible
3. Keep organized and understandable to me
4. Experiment with new plugins, keymaps, or features (for fun)

## Forged From Fire

I've decided that as I write this It's going to become a tutorial of sorts, to show the process of building a config. So we will start where all good adventure's do: the `init.lua`. This is the only file Neovim will look for a config in (with a few exceptions). When I write my config, all the actual configuration happens in other files, while my `init.lua` just loads those files together, almost like a table of contents for my config. So that we are on the same page here is the file structure of my config (some extraneous files are left out).

```
lua/
    options.lua
    plugins.lua
    remaps.lua
scripts/
init.lua
```

Now let's take a look at the **entire action packed** `init.lua`:

```lua
require("options")
require("plugins")
require("remaps")
require("autocmd")
```

Well this looks quite lackluster, doesn't it? If you said yes, you would be right, it is! But that is the beauty of it. All this file does is load the files inside of our `lua/` directory one after the other, simple. Before we look at the other files, Lua is a simple language, but if anything is confusing, fear not and [read the friendly manual](https://www.lua.org/manual/).

## Baby's first steps

According to the `init.lua`, we will run options.lua first, so let's take a look. Options is going to be concerned with Neovim's options, not any external or plugin related settings. The basic structure of setting an option in Neovim looks like this:

```lua
vim.opt.number = true

-- or shortened
vim.o.number = true
```

In this case, `number` is a boolean setting, and we set it to true. But how could a mere boolean make this editing experience any better, you might be asking? Well we can consult the help pages to find out. By using `:help number` we see can "precede each line with its line number". Pretty neat, and guess what, this same pattern exists for most out-of-the-box Neovim settings. The entire config can be found [here](https://github.com/EggbertFluffle/nvim), but below are some of the most common options people use:

```lua 
vim.g.mapleader = " " -- We'll talk about this later

vim.o.number = true
vim.o.relativenumber = true -- Line numbers are relative to your cursor
vim.o.tabstop = 4 -- How many columns should be used to display a tab character
vim.o.shiftwidth = 4 -- Number of columns to use for one level of indentation
vim.o.wrap = false -- Disable line wrapping in all buffers
```

## Let's turn up the heat

The next piece to tackle is the remaps. In `remap.lua` there is, again, one simple pattern to use. When setting a keymap we need to know, what mode it should happen in, what the keys actually are, and where we want the effects to come from. First, the mode, I have three keymaps below, all in different modes:

```lua
-- When in visual mode, if Shift + J is pressed, move the selection down 1 line
vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")

-- When in insert mode, if Control + Backspace is pressed, delete an entire word
vim.keymap.set("i", "<C-BS>", "<C-w>")

-- When in normal mode, if Shift + C is pressed, change the hovered word
vim.keymap.set("n", "C", "ciw")
```

These are quite simple, and give a good taste of keycode maps, where one keycode is mapped to another keycode. In this case `C` to `ciw` or `Control + Backspace` to `Control + w` (deleting a word). The other option we have is to use functions do create more complex keymaps. Here is where we get to see the new and improved "code runner".

```lua
local lookup = {
    lua = "lua.sh",

    cpp = "make.sh",
    c = "make.sh",
    hpp = "make.sh",
    h = "make.sh",

    zig = "zigrun.sh",
}

vim.keymap.set("n", "<C-Enter>", function ()

	local scripts_dir = vim.fn.stdpath("config") .. "/scripts/"
	local filetype = vim.bo.filetype
	local filename = vim.fn.expand("%s")

	vim.uv.spawn(os.getenv("TERM"), {
		detached = true,
		args = { "-e", scripts_dir .. lookup[filetype], filename }
	}, function () end)
end)
```

I won't walk through this function and why it's leagues better than the dumpster fire from before, all that is important is that this uses a function in the place of the resulting keycode. This could have been as simple as the following, printing "Run code" anytime we press`Control + Enter`.

```lua
vim.keymap.set("n", "<C-Enter>", function ()
    vim.print("Run code")
end)
```

## The bread

Get your bib ready, because we are officially entering the meat and potatoes. `plugin.lua` contains all the configuration of external plugins for our editor. As a foreword, many people split the configuration of their plugins so that each plugin gets its own file, but I don't like that for reasons I don't wish to elaborate on (i don't gaf). Now, there is a pattern to adding and configuring plugins, but this changes for each plugin you come across. Fortunately, almost all plugin developers have directions for how to configure their plugin, so be sure to check out the READMEs from their repositories.

To start, note that `vim.pack` will contain all the functionality we need to manage plugins.

1. `vim.pack.add("plugin-repo")` - download a plugin
2. `vim.pack.del("plugin-repo")` - remove a plugin
3. `vim.pack.get()` - lists all the installed plugins
4. `vim.pack.update("plugin-repo)` - update plugin

To note, if `vim.pack.add()` finds the plugin is already installed, it will do nothing, likewise, if `vim.pack.update()` finds no update, it does nothing. `vim.pack` is extremely simple, and easier to understand than lazy.nvim in my opinion, but it is certainly newer and far less feature rich. Nevertheless, here is some basic use.

```lua
vim.pack.add({ "https://github.com/windwp/nvim-autopairs" })
require("nvim-autopairs").setup({
	map_bs = false,
	map_cr = false
})
```

What's going on here? Well first we use `vim.pack` to add a plugin called "nvim-autopairs". After this we have to configure "nvim-autopairs" so we use `require("nvim-autopairs")` to get access to the plugin itself. Afterwards, most all plugins implement a setup function, that the user can call in order for any and all plugin setup to take place. Also notice that we are passinge a table with some fields to the setup function. This is out plugin's configuration. Most plugins take this configuration through the setup function too. In this case, we are telling "nvim-autopairs" to not make keymaps for the backspace or enter keys. Note that even if you aren't passing a configuration to `setup()`, you should still call it, so that the default configuration can be used. And there you have it, your first Neovim plugin!

For any plugin you add, the same pattern can be used, but some plugins require configuration besides the standard `require("name").setup()`. Take a colorscheme for example. Besides adding the plugin via `vim.pack` we also need to apply the plugin, using `vim.cmd`. Here is what this looks like in my configuration:

```lua
vim.pack.add({ "https://github.com/blazkowolf/gruber-darker.nvim" })

-- Set the colorscheme of the editor
vim.cmd("colorscheme gruber-darker")
```

Here we don't need to call `require().setup()`.

## The butter

Typically, people use plugins for lsp, completion, syntax highlighting and code navigation tools. But recently Neovim added support for lsp and completion in-house. Although the completion certainly needs a little time to develop, the lsp works fine, and I will show a bit about how to get it set up. For the uninitiated, lsp stands for "language server protocol" and it exists for most major languages as a way to offer code diagnostics and code completion to an editor. The lsp itself is a server that runs just like any other program, exchanging messages between the editor using it. Here we see the first step of setting up any lsp, and that is getting ahold of the server itself. This can be through your operating system's native package manager, or most lsps also offer downloads with external package manager's like cargo or npm. Additionally, if this method of downloading lsps proves too cumbersome, [mason.nvim](https://github.com/mason-org/mason.nvim) has been popular for quite some time, as a very user friendly way of installing lsps straight from neovim. 

As an example for installing and setting up an lsp, I will setup "clangd", the usual suspect for c/c++ code. But before we start, all lsps we want to use with Neovim need to be confgiured by us. We do this by calling `vim.lsp.config()`, with a table as an argument containing all of our configuration options. I personally don't want to configure every lsp I use, so if you don't either, I can reccommend [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig). This will give us all the lsp configurations we could ask for, and is a nice set and forget. Now with that out of the way, lets take a look at setting up clangd with native Neovim lsp.

```lua
vim.pack.add({ "https://github.com/neovim/nvim-lspconfig" })
vim.lsp.enable({ "clangd" })

vim.lsp.log_levels = "off" -- Just to stop a large log file from building up
```

Can you believe that that's it! The **GOAT** editor strikes again. Finally, lsp isn't that cool without some completion. You could go the route of `vim.lsp.completion`, but I found that it lacks a few options I need. I can reccommend [blink.cmp](https://github.com/Saghen/blink.cmp) for completion, with a really easy configuration process, but I will leave that as a job for the reader.

At this point you should have a decent editing experience. If you ever want a reference for what you can do with Neovim, or pointers in writing your own config, looking at other configurations is always a solid option. My complete configuration, for which most of this blog was based, can be found [here](https://github.com/EggbertFluffle/nvim), and I can also reccommend [Squibid's config](https://git.squi.bid/squibid/nvim) as well as [Phantom's config](https://github.com/Phantomforce260/nvim-config). If you have any questions about Neovim configuration at all, feel free to email be at hdiambrosio@gmail.com. Below I will leave a list of plugins and what they do in case you want some ideas.

1. [blink.cmp](https://github.com/Saghen/blink.cmp) - Completion
2. [gruvbox.nvim](https://github.com/ellisonleao/gruvbox.nvim), [ashen.nvim](https://github.com/ficcdaf/ashen.nvim) and [gruber-darker.nvim](https://github.com/blazkowolf/gruber-darker.nvim) - Colorschemes
3. [snacks.picker](https://github.com/folke/snacks.nvim) or [mini.pick](https://github.com/nvim-mini/mini.pick) - Code navigation and searching
4. [terrible.nvim](https://github.com/folke/trouble.nvim) - Lsp diagnostics tools
5. [donut.nvim](https://github.com/NStefan002/donut.nvim) - Banger screen saver
6. [oil.nvim](https://github.com/stevearc/oil.nvim) - **THE** best file manager on Linux. Must have
7. [nvim-autopairs](https://github.com/windwp/nvim-autopairs) - You're the right parenthesis to my left parenthesis
8. [cord.nvim](https://github.com/vyfor/cord.nvim) - Discord rich presence for Neovim
9. [markview.nvim](https://github.com/OXY2DEV/markview.nvim) - Sleek formatting for Markdown, Typst, and LaTeX
10. [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) - Syntax highlighting and text objects
11. [typst-preview.nvim](https://github.com/chomosuke/typst-preview.nvim) - Take a guess
