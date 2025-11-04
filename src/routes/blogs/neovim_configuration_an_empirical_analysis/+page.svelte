<h1 id="neovim-configuration-an-empirical-analysis">Neovim
Configuration: An Empirical Analysis</h1>
<p>OK. Here we go.</p>
<p>I created my first Neovim config when I was in my senior year of high
school. I almost bar for bar copied <a
href="https://youtu.be/w7i4amO_zaE?si=tzJ4hcnQpAHIh6_8">The
Primeagen’s</a> config tutorial that gave you essentially anything you
could ever want. After I got his config, I didn’t make any major changes
for a long time, almost 2 and a half years. Throughout that span of
time, I put the config through it’s paces, and it grew in girth and
convolution. For example, I desired one keymap to run any and all code.
This means one keymap to open a new terminal, compile if necessary then
run the code, for any programming language I threw at it. For some
reason this is how I decided I should go about this.</p>
<div class="sourceCode" id="cb1"><pre
class="sourceCode lua"><code class="sourceCode lua"><span id="cb1-1"><span class="va">vim</span><span class="op">.</span><span class="va">keymap</span><span class="op">.</span>set<span class="op">(</span><span class="st">&quot;n&quot;</span><span class="op">,</span> <span class="st">&quot;&lt;C-Enter&gt;&quot;</span><span class="op">,</span> <span class="kw">function</span> <span class="op">()</span></span>
<span id="cb1-2">    <span class="fu">require</span><span class="op">(</span><span class="st">&quot;beepboop&quot;</span><span class="op">).</span>play_audio<span class="op">(</span><span class="st">&quot;runprogram&quot;</span><span class="op">)</span></span>
<span id="cb1-3"></span>
<span id="cb1-4">    <span class="kw">local</span> <span class="va">terminalCmd</span> <span class="op">=</span> <span class="st">&quot;alacritty --command &quot;</span></span>
<span id="cb1-5">    <span class="kw">local</span> <span class="va">runScriptsPath</span> <span class="op">=</span> <span class="st">&quot;/home/eggbert/.config/nvim/lua/eggbert/scripts/&quot;</span></span>
<span id="cb1-6"></span>
<span id="cb1-7">    <span class="kw">local</span> <span class="va">fileName</span> <span class="op">=</span> <span class="fu">string.lower</span><span class="op">(</span><span class="va">vim</span><span class="op">.</span><span class="va">fn</span><span class="op">.</span>expand<span class="op">(</span><span class="st">&quot;%&quot;</span><span class="op">))</span></span>
<span id="cb1-8">    <span class="kw">local</span> <span class="va">fileExtension</span> <span class="op">=</span> <span class="fu">string.lower</span><span class="op">(</span><span class="va">fileName</span><span class="op">.</span>sub<span class="op">(</span><span class="va">fileName</span><span class="op">,</span> <span class="fu">string.len</span><span class="op">(</span><span class="va">fileName</span><span class="op">)</span> <span class="op">-</span> <span class="dv">2</span><span class="op">,</span> <span class="fu">string.len</span><span class="op">(</span><span class="va">fileName</span><span class="op">)))</span></span>
<span id="cb1-9"></span>
<span id="cb1-10">    <span class="cf">if</span> <span class="va">fileExtension</span> <span class="op">==</span> <span class="st">&quot;ava&quot;</span> <span class="cf">then</span> <span class="co">-- RUN JAVA CODE</span></span>
<span id="cb1-11">        <span class="cf">if</span> <span class="op">(</span><span class="fu">string.find</span><span class="op">(</span><span class="va">fileName</span><span class="op">,</span> <span class="st">&quot;test&quot;</span><span class="op">)</span> <span class="op">==</span> <span class="kw">nil</span><span class="op">)</span> <span class="cf">then</span></span>
<span id="cb1-12">            <span class="fu">print</span><span class="op">(</span><span class="st">&quot;RUN JAVA&quot;</span><span class="op">)</span></span>
<span id="cb1-13">            <span class="fu">os.execute</span><span class="op">(</span><span class="va">terminalCmd</span> <span class="op">..</span> <span class="va">runScriptsPath</span> <span class="op">..</span> <span class="st">&quot;javarun.sh &amp;&quot;</span><span class="op">)</span></span>
<span id="cb1-14">        <span class="cf">else</span></span>
<span id="cb1-15">            <span class="fu">print</span><span class="op">(</span><span class="st">&quot;RUN TESTS&quot;</span><span class="op">)</span></span>
<span id="cb1-16">            <span class="fu">os.execute</span><span class="op">(</span><span class="va">terminalCmd</span> <span class="op">..</span> <span class="va">runScriptsPath</span> <span class="op">..</span> <span class="st">&quot;javatest.sh &amp;&quot;</span><span class="op">)</span></span>
<span id="cb1-17">        <span class="cf">end</span></span>
<span id="cb1-18">    <span class="cf">elseif</span> <span class="op">(</span><span class="va">fileExtension</span> <span class="op">==</span> <span class="st">&quot;cpp&quot;</span> <span class="kw">or</span> <span class="va">fileExtension</span> <span class="op">==</span> <span class="st">&quot;hpp&quot;</span> <span class="kw">or</span> <span class="fu">string.sub</span><span class="op">(</span><span class="va">fileExtension</span><span class="op">,</span> <span class="op">-</span><span class="dv">1</span><span class="op">)</span> <span class="op">==</span> <span class="st">&quot;c&quot;</span><span class="op">)</span> <span class="cf">then</span> <span class="co">-- RUN C++ AND C</span></span>
<span id="cb1-19">        <span class="fu">os.execute</span><span class="op">(</span><span class="va">terminalCmd</span> <span class="op">..</span> <span class="va">runScriptsPath</span> <span class="op">..</span> <span class="st">&quot;cpp.sh &amp;&quot;</span><span class="op">)</span></span>
<span id="cb1-20">    <span class="cf">elseif</span> <span class="op">(</span><span class="va">fileExtension</span> <span class="op">==</span> <span class="st">&quot;lua&quot;</span><span class="op">)</span> <span class="cf">then</span> <span class="co">-- RUN LUA CODE</span></span>
<span id="cb1-21">        <span class="fu">os.execute</span><span class="op">(</span><span class="va">terminalCmd</span> <span class="op">..</span> <span class="va">runScriptsPath</span> <span class="op">..</span> <span class="st">&quot;lua.sh &quot;</span> <span class="op">..</span> <span class="va">fileName</span><span class="op">)</span></span>
<span id="cb1-22">    <span class="cf">elseif</span> <span class="op">(</span><span class="va">fileExtension</span> <span class="op">==</span> <span class="st">&quot;zig&quot;</span><span class="op">)</span> <span class="cf">then</span> <span class="co">-- RUN LUA CODE</span></span>
<span id="cb1-23">        <span class="fu">os.execute</span><span class="op">(</span><span class="va">terminalCmd</span> <span class="op">..</span> <span class="va">runScriptsPath</span> <span class="op">..</span> <span class="st">&quot;zigrun.sh &quot;</span> <span class="op">..</span> <span class="va">fileName</span><span class="op">)</span></span>
<span id="cb1-24">    <span class="cf">else</span></span>
<span id="cb1-25">        <span class="fu">print</span><span class="op">(</span><span class="st">&quot;ion know whut da **** to do wit dis&quot;</span><span class="op">)</span></span>
<span id="cb1-26">    <span class="cf">end</span></span>
<span id="cb1-27"><span class="kw">end</span><span class="op">)</span></span></code></pre></div>
<p>This… is disgusting. First line is off to a good start with <a
href="https://github.com/EggbertFluffle/beepboop/nvim">beepboop</a>
(still working on that by the way). But then, all hell breaks loose. I
use “alacritty” directly instead of something more portable like
<code>os.getenv("TERM")</code>, which bit me back later when I switched
to <a href="https://st.suckless.org">st</a>. The path for the scripts is
aboslute and hardcoded, here we could use
<code>vim.fn.stdpath("config")</code>. The most disgusting part is how I
grossly pick out the filetype from the whole filename. The rest of the
code reaks of unplanned nonsense with terrible comments and <strong>a
lot</strong> of repeating patterns.</p>
<h2 id="my-init.lua-needs-to-be-at-least-65">My init.lua needs to be at
least 6’5”</h2>
<p>So why must I ruin your day by showing you this? Because it is no
more. After randomly finding out that the <a
href="https://github.com/neovim/neovim/releases/nightly">nightly build
of Neovim</a> added a native package manager and lsp support, I nearly
started jumping up and down. Previously I had used <a
href="https://github.com/wbthomason/packer.nvim">packer.nvim</a> which
worked, but was getting old and became unmaintained. Then I switched to
<a href="https://github.com/folke/lazy.nvim">lazy.nvim</a> which was
fine if I’m being honest, but felt a little magical, and since I had
been developing beepboop.nvim, I knew my way around Neovim a little
better. This is when I wanted to understand my config a bit better,
leading me to rewrite it. I had some goals in mind for this:</p>
<ol type="1">
<li>Try to keep everything Neovim native: packaging, lsp, and
completion</li>
<li>Use as few plugins as possible</li>
<li>Keep organized and understandable to me</li>
<li>Experiment with new plugins, keymaps, or features (for fun)</li>
</ol>
<h2 id="forged-from-fire">Forged From Fire</h2>
<p>I’ve decided that as I write this It’s going to become a tutorial of
sorts, to show the process of building a config. So we will start where
all good adventure’s do: the <code>init.lua</code>. This is the only
file Neovim will look for a config in (with a few exceptions). When I
write my config, all the actual configuration happens in other files,
while my <code>init.lua</code> just loads those files together, almost
like a table of contents for my config. So that we are on the same page
here is the file structure of my config (some extraneous files are left
out).</p>
<pre><code>lua/
    options.lua
    plugins.lua
    remaps.lua
scripts/
init.lua</code></pre>
<p>Now let’s take a look at the <strong>entire action packed</strong>
<code>init.lua</code>:</p>
<div class="sourceCode" id="cb3"><pre
class="sourceCode lua"><code class="sourceCode lua"><span id="cb3-1"><span class="fu">require</span><span class="op">(</span><span class="st">&quot;options&quot;</span><span class="op">)</span></span>
<span id="cb3-2"><span class="fu">require</span><span class="op">(</span><span class="st">&quot;plugins&quot;</span><span class="op">)</span></span>
<span id="cb3-3"><span class="fu">require</span><span class="op">(</span><span class="st">&quot;remaps&quot;</span><span class="op">)</span></span>
<span id="cb3-4"><span class="fu">require</span><span class="op">(</span><span class="st">&quot;autocmd&quot;</span><span class="op">)</span></span></code></pre></div>
<p>Well this looks quite lackluster, doesn’t it? If you said yes, you
would be right, it is! But that is the beauty of it. All this file does
is load the files inside of our <code>lua/</code> directory one after
the other, simple. Before we look at the other files, Lua is a simple
language, but if anything is confusing, fear not and <a
href="https://www.lua.org/manual/">read the friendly manual</a>.</p>
<h2 id="babys-first-steps">Baby’s first steps</h2>
<p>According to the <code>init.lua</code>, we will run options.lua
first, so let’s take a look. Options is going to be concerned with
Neovim’s options, not any external or plugin related settings. The basic
structure of setting an option in Neovim looks like this:</p>
<div class="sourceCode" id="cb4"><pre
class="sourceCode lua"><code class="sourceCode lua"><span id="cb4-1"><span class="va">vim</span><span class="op">.</span><span class="va">opt</span><span class="op">.</span><span class="va">number</span> <span class="op">=</span> <span class="kw">true</span></span>
<span id="cb4-2"></span>
<span id="cb4-3"><span class="co">-- or shortened</span></span>
<span id="cb4-4"><span class="va">vim</span><span class="op">.</span><span class="va">o</span><span class="op">.</span><span class="va">number</span> <span class="op">=</span> <span class="kw">true</span></span></code></pre></div>
<p>In this case, <code>number</code> is a boolean setting, and we set it
to true. But how could a mere boolean make this editing experience any
better, you might be asking? Well we can consult the help pages to find
out. By using <code>:help number</code> we see can “precede each line
with its line number”. Pretty neat, and guess what, this same pattern
exists for most out-of-the-box Neovim settings. The entire config can be
found <a href="https://github.com/EggbertFluffle/nvim">here</a>, but
below are some of the most common options people use:</p>
<div class="sourceCode" id="cb5"><pre
class="sourceCode lua"><code class="sourceCode lua"><span id="cb5-1"><span class="va">vim</span><span class="op">.</span><span class="va">g</span><span class="op">.</span><span class="va">mapleader</span> <span class="op">=</span> <span class="st">&quot; &quot;</span> <span class="co">-- We&#39;ll talk about this later</span></span>
<span id="cb5-2"></span>
<span id="cb5-3"><span class="va">vim</span><span class="op">.</span><span class="va">o</span><span class="op">.</span><span class="va">number</span> <span class="op">=</span> <span class="kw">true</span></span>
<span id="cb5-4"><span class="va">vim</span><span class="op">.</span><span class="va">o</span><span class="op">.</span><span class="va">relativenumber</span> <span class="op">=</span> <span class="kw">true</span> <span class="co">-- Line numbers are relative to your cursor</span></span>
<span id="cb5-5"><span class="va">vim</span><span class="op">.</span><span class="va">o</span><span class="op">.</span><span class="va">tabstop</span> <span class="op">=</span> <span class="dv">4</span> <span class="co">-- How many columns should be used to display a tab character</span></span>
<span id="cb5-6"><span class="va">vim</span><span class="op">.</span><span class="va">o</span><span class="op">.</span><span class="va">shiftwidth</span> <span class="op">=</span> <span class="dv">4</span> <span class="co">-- Number of columns to use for one level of indentation</span></span>
<span id="cb5-7"><span class="va">vim</span><span class="op">.</span><span class="va">o</span><span class="op">.</span><span class="va">wrap</span> <span class="op">=</span> <span class="kw">false</span> <span class="co">-- Disable line wrapping in all buffers</span></span></code></pre></div>
<h2 id="lets-turn-up-the-heat">Let’s turn up the heat</h2>
<p>The next piece to tackle is the remaps. In <code>remap.lua</code>
there is, again, one simple pattern to use. When setting a keymap we
need to know, what mode it should happen in, what the keys actually are,
and where we want the effects to come from. First, the mode, I have
three keymaps below, all in different modes:</p>
<div class="sourceCode" id="cb6"><pre
class="sourceCode lua"><code class="sourceCode lua"><span id="cb6-1"><span class="co">-- When in visual mode, if Shift + J is pressed, move the selection down 1 line</span></span>
<span id="cb6-2"><span class="va">vim</span><span class="op">.</span><span class="va">keymap</span><span class="op">.</span>set<span class="op">(</span><span class="st">&quot;v&quot;</span><span class="op">,</span> <span class="st">&quot;J&quot;</span><span class="op">,</span> <span class="st">&quot;:m &#39;&gt;+1&lt;CR&gt;gv=gv&quot;</span><span class="op">)</span></span>
<span id="cb6-3"></span>
<span id="cb6-4"><span class="co">-- When in insert mode, if Control + Backspace is pressed, delete an entire word</span></span>
<span id="cb6-5"><span class="va">vim</span><span class="op">.</span><span class="va">keymap</span><span class="op">.</span>set<span class="op">(</span><span class="st">&quot;i&quot;</span><span class="op">,</span> <span class="st">&quot;&lt;C-BS&gt;&quot;</span><span class="op">,</span> <span class="st">&quot;&lt;C-w&gt;&quot;</span><span class="op">)</span></span>
<span id="cb6-6"></span>
<span id="cb6-7"><span class="co">-- When in normal mode, if Shift + C is pressed, change the hovered word</span></span>
<span id="cb6-8"><span class="va">vim</span><span class="op">.</span><span class="va">keymap</span><span class="op">.</span>set<span class="op">(</span><span class="st">&quot;n&quot;</span><span class="op">,</span> <span class="st">&quot;C&quot;</span><span class="op">,</span> <span class="st">&quot;ciw&quot;</span><span class="op">)</span></span></code></pre></div>
<p>These are quite simple, and give a good taste of keycode maps, where
one keycode is mapped to another keycode. In this case <code>C</code> to
<code>ciw</code> or <code>Control + Backspace</code> to
<code>Control + w</code> (deleting a word). The other option we have is
to use functions do create more complex keymaps. Here is where we get to
see the new and improved “code runner”.</p>
<div class="sourceCode" id="cb7"><pre
class="sourceCode lua"><code class="sourceCode lua"><span id="cb7-1"><span class="kw">local</span> <span class="va">lookup</span> <span class="op">=</span> <span class="op">{"{"}</span></span>
<span id="cb7-2">    <span class="va">lua</span> <span class="op">=</span> <span class="st">&quot;lua.sh&quot;</span><span class="op">,</span></span>
<span id="cb7-3"></span>
<span id="cb7-4">    <span class="va">cpp</span> <span class="op">=</span> <span class="st">&quot;make.sh&quot;</span><span class="op">,</span></span>
<span id="cb7-5">    <span class="va">c</span> <span class="op">=</span> <span class="st">&quot;make.sh&quot;</span><span class="op">,</span></span>
<span id="cb7-6">    <span class="va">hpp</span> <span class="op">=</span> <span class="st">&quot;make.sh&quot;</span><span class="op">,</span></span>
<span id="cb7-7">    <span class="va">h</span> <span class="op">=</span> <span class="st">&quot;make.sh&quot;</span><span class="op">,</span></span>
<span id="cb7-8"></span>
<span id="cb7-9">    <span class="va">zig</span> <span class="op">=</span> <span class="st">&quot;zigrun.sh&quot;</span><span class="op">,</span></span>
<span id="cb7-10"><span class="op">}</span></span>
<span id="cb7-11"></span>
<span id="cb7-12"><span class="va">vim</span><span class="op">.</span><span class="va">keymap</span><span class="op">.</span>set<span class="op">(</span><span class="st">&quot;n&quot;</span><span class="op">,</span> <span class="st">&quot;&lt;C-Enter&gt;&quot;</span><span class="op">,</span> <span class="kw">function</span> <span class="op">()</span></span>
<span id="cb7-13"></span>
<span id="cb7-14">    <span class="kw">local</span> <span class="va">scripts_dir</span> <span class="op">=</span> <span class="va">vim</span><span class="op">.</span><span class="va">fn</span><span class="op">.</span>stdpath<span class="op">(</span><span class="st">&quot;config&quot;</span><span class="op">)</span> <span class="op">..</span> <span class="st">&quot;/scripts/&quot;</span></span>
<span id="cb7-15">    <span class="kw">local</span> <span class="va">filetype</span> <span class="op">=</span> <span class="va">vim</span><span class="op">.</span><span class="va">bo</span><span class="op">.</span><span class="va">filetype</span></span>
<span id="cb7-16">    <span class="kw">local</span> <span class="va">filename</span> <span class="op">=</span> <span class="va">vim</span><span class="op">.</span><span class="va">fn</span><span class="op">.</span>expand<span class="op">(</span><span class="st">&quot;%s&quot;</span><span class="op">)</span></span>
<span id="cb7-17"></span>
<span id="cb7-18">    <span class="va">vim</span><span class="op">.</span><span class="va">uv</span><span class="op">.</span>spawn<span class="op">(</span><span class="fu">os.getenv</span><span class="op">(</span><span class="st">&quot;TERM&quot;</span><span class="op">),</span> <span class="op">{"{"}</span></span>
<span id="cb7-19">        <span class="va">detached</span> <span class="op">=</span> <span class="kw">true</span><span class="op">,</span></span>
<span id="cb7-20">        <span class="va">args</span> <span class="op">=</span> <span class="op">{"{"}</span> <span class="st">&quot;-e&quot;</span><span class="op">,</span> <span class="va">scripts_dir</span> <span class="op">..</span> <span class="va">lookup</span><span class="op">[</span><span class="va">filetype</span><span class="op">],</span> <span class="va">filename</span> <span class="op">}</span></span>
<span id="cb7-21">    <span class="op">},</span> <span class="kw">function</span> <span class="op">()</span> <span class="kw">end</span><span class="op">)</span></span>
<span id="cb7-22"><span class="kw">end</span><span class="op">)</span></span></code></pre></div>
<p>I won’t walk through this function and why it’s leagues better than
the dumpster fire from before, all that is important is that this uses a
function in the place of the resulting keycode. This could have been as
simple as the following, printing “Run code” anytime we
press<code>Control + Enter</code>.</p>
<div class="sourceCode" id="cb8"><pre
class="sourceCode lua"><code class="sourceCode lua"><span id="cb8-1"><span class="va">vim</span><span class="op">.</span><span class="va">keymap</span><span class="op">.</span>set<span class="op">(</span><span class="st">&quot;n&quot;</span><span class="op">,</span> <span class="st">&quot;&lt;C-Enter&gt;&quot;</span><span class="op">,</span> <span class="kw">function</span> <span class="op">()</span></span>
<span id="cb8-2">    <span class="va">vim</span><span class="op">.</span>print<span class="op">(</span><span class="st">&quot;Run code&quot;</span><span class="op">)</span></span>
<span id="cb8-3"><span class="kw">end</span><span class="op">)</span></span></code></pre></div>
<h2 id="the-bread">The bread</h2>
<p>Get your bib ready, because we are officially entering the meat and
potatoes. <code>plugin.lua</code> contains all the configuration of
external plugins for our editor. As a foreword, many people split the
configuration of their plugins so that each plugin gets its own file,
but I don’t like that for reasons I don’t wish to elaborate on (i don’t
gaf). Now, there is a pattern to adding and configuring plugins, but
this changes for each plugin you come across. Fortunately, almost all
plugin developers have directions for how to configure their plugin, so
be sure to check out the READMEs from their repositories.</p>
<p>To start, note that <code>vim.pack</code> will contain all the
functionality we need to manage plugins.</p>
<ol type="1">
<li><code>vim.pack.add("plugin-repo")</code> - download a plugin</li>
<li><code>vim.pack.del("plugin-repo")</code> - remove a plugin</li>
<li><code>vim.pack.get()</code> - lists all the installed plugins</li>
<li><code>vim.pack.update("plugin-repo)</code> - update plugin</li>
</ol>
<p>To note, if <code>vim.pack.add()</code> finds the plugin is already
installed, it will do nothing, likewise, if
<code>vim.pack.update()</code> finds no update, it does nothing.
<code>vim.pack</code> is extremely simple, and easier to understand than
lazy.nvim in my opinion, but it is certainly newer and far less feature
rich. Nevertheless, here is some basic use.</p>
<div class="sourceCode" id="cb9"><pre
class="sourceCode lua"><code class="sourceCode lua"><span id="cb9-1"><span class="va">vim</span><span class="op">.</span><span class="va">pack</span><span class="op">.</span>add<span class="op">({"{"}</span> <span class="st">&quot;https://github.com/windwp/nvim-autopairs&quot;</span> <span class="op">})</span></span>
<span id="cb9-2"><span class="fu">require</span><span class="op">(</span><span class="st">&quot;nvim-autopairs&quot;</span><span class="op">).</span>setup<span class="op">({"{"}</span></span>
<span id="cb9-3">    <span class="va">map_bs</span> <span class="op">=</span> <span class="kw">false</span><span class="op">,</span></span>
<span id="cb9-4">    <span class="va">map_cr</span> <span class="op">=</span> <span class="kw">false</span></span>
<span id="cb9-5"><span class="op">})</span></span></code></pre></div>
<p>What’s going on here? Well first we use <code>vim.pack</code> to add
a plugin called “nvim-autopairs”. After this we have to configure
“nvim-autopairs” so we use <code>require("nvim-autopairs")</code> to get
access to the plugin itself. Afterwards, most all plugins implement a
setup function, that the user can call in order for any and all plugin
setup to take place. Also notice that we are passinge a table with some
fields to the setup function. This is out plugin’s configuration. Most
plugins take this configuration through the setup function too. In this
case, we are telling “nvim-autopairs” to not make keymaps for the
backspace or enter keys. Note that even if you aren’t passing a
configuration to <code>setup()</code>, you should still call it, so that
the default configuration can be used. And there you have it, your first
Neovim plugin!</p>
<p>For any plugin you add, the same pattern can be used, but some
plugins require configuration besides the standard
<code>require("name").setup()</code>. Take a colorscheme for example.
Besides adding the plugin via <code>vim.pack</code> we also need to
apply the plugin, using <code>vim.cmd</code>. Here is what this looks
like in my configuration:</p>
<div class="sourceCode" id="cb10"><pre
class="sourceCode lua"><code class="sourceCode lua"><span id="cb10-1"><span class="va">vim</span><span class="op">.</span><span class="va">pack</span><span class="op">.</span>add<span class="op">({"{"}</span> <span class="st">&quot;https://github.com/blazkowolf/gruber-darker.nvim&quot;</span> <span class="op">})</span></span>
<span id="cb10-2"></span>
<span id="cb10-3"><span class="co">-- Set the colorscheme of the editor</span></span>
<span id="cb10-4"><span class="va">vim</span><span class="op">.</span>cmd<span class="op">(</span><span class="st">&quot;colorscheme gruber-darker&quot;</span><span class="op">)</span></span></code></pre></div>
<p>Here we don’t need to call <code>require().setup()</code>.</p>
<h2 id="the-butter">The butter</h2>
<p>Typically, people use plugins for lsp, completion, syntax
highlighting and code navigation tools. But recently Neovim added
support for lsp and completion in-house. Although the completion
certainly needs a little time to develop, the lsp works fine, and I will
show a bit about how to get it set up. For the uninitiated, lsp stands
for “language server protocol” and it exists for most major languages as
a way to offer code diagnostics and code completion to an editor. The
lsp itself is a server that runs just like any other program, exchanging
messages between the editor using it. Here we see the first step of
setting up any lsp, and that is getting ahold of the server itself. This
can be through your operating system’s native package manager, or most
lsps also offer downloads with external package manager’s like cargo or
npm. Additionally, if this method of downloading lsps proves too
cumbersome, <a
href="https://github.com/mason-org/mason.nvim">mason.nvim</a> has been
popular for quite some time, as a very user friendly way of installing
lsps straight from neovim.</p>
<p>As an example for installing and setting up an lsp, I will setup
“clangd”, the usual suspect for c/c++ code. But before we start, all
lsps we want to use with Neovim need to be confgiured by us. We do this
by calling <code>vim.lsp.config()</code>, with a table as an argument
containing all of our configuration options. I personally don’t want to
configure every lsp I use, so if you don’t either, I can reccommend <a
href="https://github.com/neovim/nvim-lspconfig">nvim-lspconfig</a>. This
will give us all the lsp configurations we could ask for, and is a nice
set and forget. Now with that out of the way, lets take a look at
setting up clangd with native Neovim lsp.</p>
<div class="sourceCode" id="cb11"><pre
class="sourceCode lua"><code class="sourceCode lua"><span id="cb11-1"><span class="va">vim</span><span class="op">.</span><span class="va">pack</span><span class="op">.</span>add<span class="op">({"{"}</span> <span class="st">&quot;https://github.com/neovim/nvim-lspconfig&quot;</span> <span class="op">})</span></span>
<span id="cb11-2"><span class="va">vim</span><span class="op">.</span><span class="va">lsp</span><span class="op">.</span>enable<span class="op">({"{"}</span> <span class="st">&quot;clangd&quot;</span> <span class="op">})</span></span>
<span id="cb11-3"></span>
<span id="cb11-4"><span class="va">vim</span><span class="op">.</span><span class="va">lsp</span><span class="op">.</span><span class="va">log_levels</span> <span class="op">=</span> <span class="st">&quot;off&quot;</span> <span class="co">-- Just to stop a large log file from building up</span></span></code></pre></div>
<p>Can you believe that that’s it! The <strong>GOAT</strong> editor
strikes again. Finally, lsp isn’t that cool without some completion. You
could go the route of <code>vim.lsp.completion</code>, but I found that
it lacks a few options I need. I can reccommend <a
href="https://github.com/Saghen/blink.cmp">blink.cmp</a> for completion,
with a really easy configuration process, but I will leave that as a job
for the reader.</p>
<p>At this point you should have a decent editing experience. If you
ever want a reference for what you can do with Neovim, or pointers in
writing your own config, looking at other configurations is always a
solid option. My complete configuration, for which most of this blog was
based, can be found <a
href="https://github.com/EggbertFluffle/nvim">here</a>, and I can also
reccommend <a href="https://git.squi.bid/squibid/nvim">Squibid’s
config</a> as well as <a
href="https://github.com/Phantomforce260/nvim-config">Phantom’s
config</a>. If you have any questions about Neovim configuration at all,
feel free to email be at hdiambrosio@gmail.com. Below I will leave a
list of plugins and what they do in case you want some ideas.</p>
<ol type="1">
<li><a href="https://github.com/Saghen/blink.cmp">blink.cmp</a> -
Completion</li>
<li><a
href="https://github.com/ellisonleao/gruvbox.nvim">gruvbox.nvim</a>, <a
href="https://github.com/ficcdaf/ashen.nvim">ashen.nvim</a> and <a
href="https://github.com/blazkowolf/gruber-darker.nvim">gruber-darker.nvim</a>
- Colorschemes</li>
<li><a href="https://github.com/folke/snacks.nvim">snacks.picker</a> or
<a href="https://github.com/nvim-mini/mini.pick">mini.pick</a> - Code
navigation and searching</li>
<li><a href="https://github.com/folke/trouble.nvim">terrible.nvim</a> -
Lsp diagnostics tools</li>
<li><a href="https://github.com/NStefan002/donut.nvim">donut.nvim</a> -
Banger screen saver</li>
<li><a href="https://github.com/stevearc/oil.nvim">oil.nvim</a> -
<strong>THE</strong> best file manager on Linux. Must have</li>
<li><a
href="https://github.com/windwp/nvim-autopairs">nvim-autopairs</a> -
You’re the right parenthesis to my left parenthesis</li>
<li><a href="https://github.com/vyfor/cord.nvim">cord.nvim</a> - Discord
rich presence for Neovim</li>
<li><a href="https://github.com/OXY2DEV/markview.nvim">markview.nvim</a>
- Sleek formatting for Markdown, Typst, and LaTeX</li>
<li><a
href="https://github.com/nvim-treesitter/nvim-treesitter">nvim-treesitter</a>
- Syntax highlighting and text objects</li>
<li><a
href="https://github.com/chomosuke/typst-preview.nvim">typst-preview.nvim</a>
- Take a guess</li>
</ol>
