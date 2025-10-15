<h1 id="tui-3d-graphics">TUI 3D Graphics</h1>
<p>Three-dimensional graphics are the best thing since 2D graphics, but
also many times harder. I’ve wanted to break into 3D graphics for a
while now, namely because of its connection to first-person games like
Minecraft or the Call of Duty franchise. But after some surface-level
digging, I’ve found there is a lot more to the third dimension than I
first thought.</p>
<p>Put simply, in 2D graphics, there are pixels in a grid, and that’s
it. From there all you need to do is manipulate those very pixels to
look like whatever your heart desires. And at its core, 3D graphics is
no different than 2D graphics. It’s still a 2D grid of pixels that you
manipulate to look a certain way. The tricky part is that you need to
give the illusion of a 3D space with only 2D tools.</p>
<p>I finally decided to tackle a 3D “engine” of my own as a way to
become more familiar with Typescript (more on that later) and to also
learn a bit more about the Bun all-in-one silver hammer of JavaScript
development that has recently come out. I chose Typescript because I’m
already familiar with JavaScript and wanted to learn more about the
unfamiliar type of safety it offers, but more importantly, I wanted to
learn about 3D graphics, not an entirely new language. I knew far ahead
of time that what I would be building was going to end up being very
simple. With all that out of the way I present to you, the name, <a
href="https://github.com/EggbertFluffle/TUI-3D-Renderer">EggTUI-3D-Renderer</a>
(EggTUI for short). Not my best naming work.</p>
<p>At its core EggTUI is just an extremely bare-bones terminal-based 2D
graphics “framework”. That said it also can (drum roll) display the
first 2 platonic solids… spinning! This came later after I realized that
with a terrible line drawing algorithm, I could draw some terrible 3D
shapes. So what exactly can EggTUI do? It can display lines, triangles,
quads, tetrahedrons, cubes, rectangular prisms, and octahedrons, all
with some scaling functionality. It does this with a simple pixel
buffer, update loop, a some matrix math, provided very kindly by
Math.js. Here is where I want to document the progression of EggTUI and
its “features”.</p>
<p>First up is the pixel buffer, which holds all the 2D
pixel-coordinated data. The actual buffer is a 2-dimensional array of
strings, meaning that it accesses the pixels in the buffer row-wise, and
then column-wise, so ordered pairs are (y, x). This is easily fixed by
only allowing the pixel buffer class to interact with the buffer itself,
which reverses the x and y for all other classes in the program.
Additionally, the pixel buffer class can ensure there are no
out-of-bounds exceptions, uses <code>process.stdout.rows</code> and
<code>process.stdout.columns</code> to get the native dimensions of the
terminal, and translates pixel coordinates to make the center of the
screen the origin on all axes. Other than that, it can clear the buffer
and convert it into a one-dimensional array of strings that represent
each row for easier printing.</p>
<p>Next, the graphics manager is the heart of the system and acts as the
arbiter between the draw loop and the pixel buffer, making a lot of
necessary shortcuts and optimizations along the way. It lets the user
set the fill and stroke “colors” as well as draw lines. Drawing lines,
and doing it well, is the first major hurdle I and many other people
have to tackle. It takes an understanding of math and what makes
programs performant, to write a good line algorithm. I wrestled with
Bresenham’s line-drawing algorithm for a while, but couldn’t understand
it no matter how hard I tried, so I resorted to writing my own.
Bresenham’s is so fast and the industry standard because It relies
heavily on addition and subtraction, with less multiplication or
division which are both more costly functions. Despite that, I used what
I knew of good ol’ <code>y = mx + b</code> to write what’s below.</p>
<div class="sourceCode" id="cb1"><pre
class="sourceCode typescript"><code class="sourceCode typescript"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="fu">line</span>(p1<span class="op">:</span> math<span class="op">.</span><span class="at">Matrix</span><span class="op">,</span> p2<span class="op">:</span> math<span class="op">.</span><span class="at">Matrix</span>)<span class="op">:</span> <span class="dt">void</span> {"{"}</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    <span class="kw">let</span> deltaY<span class="op">:</span> <span class="dt">number</span> <span class="op">=</span> p2<span class="op">.</span><span class="fu">get</span>([<span class="dv">1</span>]) <span class="op">-</span> p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">1</span>])<span class="op">;</span> <span class="co">// y2 - y1</span></span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    <span class="kw">let</span> deltaX<span class="op">:</span> <span class="dt">number</span> <span class="op">=</span> p2<span class="op">.</span><span class="fu">get</span>([<span class="dv">0</span>]) <span class="op">-</span> p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">0</span>])<span class="op">;</span> <span class="co">// x2 - x1</span></span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    <span class="kw">let</span> m<span class="op">:</span> <span class="dt">number</span> <span class="op">=</span> dy <span class="op">/</span> dx<span class="op">;</span></span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    <span class="kw">let</span> b <span class="op">=</span> <span class="op">-</span>m <span class="op">*</span> p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">0</span>]) <span class="op">+</span> p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">1</span>])<span class="op">;</span> <span class="co">// Solve for slope intercept</span></span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    <span class="cf">for</span>(<span class="kw">let</span> x <span class="op">=</span> <span class="bu">Math</span><span class="op">.</span><span class="fu">min</span>(p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">0</span>])<span class="op">,</span> p2<span class="op">.</span><span class="fu">get</span>([<span class="dv">0</span>]))<span class="op">;</span> x <span class="op">&lt;</span> <span class="bu">Math</span><span class="op">.</span><span class="fu">max</span>(p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">0</span>])<span class="op">,</span> p2<span class="op">.</span><span class="fu">get</span>([<span class="dv">0</span>]))<span class="op">;</span> x <span class="op">+=</span> <span class="dv">1</span>) {"{"}</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>        <span class="kw">let</span> coords <span class="op">=</span> <span class="fu">matrix</span>([x<span class="op">,</span> m <span class="op">*</span> x <span class="op">+</span> b])<span class="op">;</span> <span class="co">// Solve for y based on the given x</span></span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>        coords <span class="op">=</span> coords<span class="op">.</span><span class="fu">map</span>(<span class="bu">Math</span><span class="op">.</span><span class="fu">round</span>)<span class="op">;</span> <span class="co">// Floor to get valid indicies</span></span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>        <span class="kw">this</span><span class="op">.</span><span class="at">pixelBuffer</span><span class="op">.</span><span class="fu">set</span>(p<span class="op">,</span> <span class="kw">this</span><span class="op">.</span><span class="at">stroke</span>)<span class="op">;</span> <span class="co">// Set the coordinates pixel</span></span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    }</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div>
<p>This worked for most lines but as soon as the line’s slope got
greater than 1, issues arose. The loop finds the y values for a line
based on every x value, but x only increases by 1. This can leave large
gaps in the line’s visual representation. For example, if a line has the
solutions (0, 0) and (1, 5), there will be a large gap in the line
between y = 1 and y = 4, and this would continue leaving a large dotted
streak.</p>
<div class="sourceCode" id="cb2"><pre
class="sourceCode typescript"><code class="sourceCode typescript"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>Current System       New System </span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>    <span class="op">....</span>#<span class="op">..</span>           <span class="fl">7.</span><span class="op">...</span>#<span class="op">..</span></span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>    <span class="op">.......</span>           <span class="fl">6.</span><span class="op">..</span>#<span class="op">...</span></span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a>    <span class="op">...</span>#<span class="op">...</span>           <span class="fl">5.</span><span class="op">..</span>#<span class="op">...</span></span>
<span id="cb2-5"><a href="#cb2-5" aria-hidden="true" tabindex="-1"></a>    <span class="op">.......</span>           <span class="fl">4.</span><span class="op">.</span>#<span class="op">....</span></span>
<span id="cb2-6"><a href="#cb2-6" aria-hidden="true" tabindex="-1"></a>    <span class="op">..</span>#<span class="op">....</span>           <span class="fl">3.</span><span class="op">.</span>#<span class="op">....</span></span>
<span id="cb2-7"><a href="#cb2-7" aria-hidden="true" tabindex="-1"></a>    <span class="op">.......</span>           <span class="fl">2.</span>#<span class="op">.....</span></span>
<span id="cb2-8"><a href="#cb2-8" aria-hidden="true" tabindex="-1"></a>    <span class="op">.</span>#<span class="op">.....</span>           <span class="fl">1.</span>#<span class="op">.....</span></span>
<span id="cb2-9"><a href="#cb2-9" aria-hidden="true" tabindex="-1"></a>   X1234567</span></code></pre></div>
<p>By re-arranging <code>y = mx + b</code> to be
<code>x = (y - b) / m</code> it’s possible to get the x value for a line
by inputting the y values. So by using this, and handling an exception
for vertical lines with a slope of <code>undefined</code>, the line
drawing algorithm is done and looks like this.</p>
<div class="sourceCode" id="cb3"><pre
class="sourceCode typescript"><code class="sourceCode typescript"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a><span class="fu">line</span>(p1<span class="op">:</span> math<span class="op">.</span><span class="at">Matrix</span><span class="op">,</span> p2<span class="op">:</span> math<span class="op">.</span><span class="at">Matrix</span>)<span class="op">:</span> <span class="dt">void</span> {"{"}</span>
<span id="cb3-2"><a href="#cb3-2" aria-hidden="true" tabindex="-1"></a>    <span class="kw">let</span> deltaY<span class="op">:</span> <span class="dt">number</span> <span class="op">=</span> p2<span class="op">.</span><span class="fu">get</span>([<span class="dv">1</span>]) <span class="op">-</span> p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">1</span>])<span class="op">;</span> <span class="co">// y2 - y1</span></span>
<span id="cb3-3"><a href="#cb3-3" aria-hidden="true" tabindex="-1"></a>    <span class="kw">let</span> deltaX<span class="op">:</span> <span class="dt">number</span> <span class="op">=</span> p2<span class="op">.</span><span class="fu">get</span>([<span class="dv">0</span>]) <span class="op">-</span> p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">0</span>])<span class="op">;</span> <span class="co">// x2 - x1</span></span>
<span id="cb3-4"><a href="#cb3-4" aria-hidden="true" tabindex="-1"></a>    <span class="kw">let</span> m<span class="op">:</span> <span class="dt">number</span> <span class="op">=</span> dy <span class="op">/</span> dx<span class="op">;</span></span>
<span id="cb3-5"><a href="#cb3-5" aria-hidden="true" tabindex="-1"></a>    <span class="kw">let</span> b <span class="op">=</span> <span class="op">-</span>m <span class="op">*</span> p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">0</span>]) <span class="op">+</span> p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">1</span>])<span class="op">;</span> <span class="co">// Solve for slope intercept</span></span>
<span id="cb3-6"><a href="#cb3-6" aria-hidden="true" tabindex="-1"></a>    <span class="kw">let</span> coords<span class="op">:</span> math<span class="op">.</span> <span class="at">Matrix</span><span class="op">;</span></span>
<span id="cb3-7"><a href="#cb3-7" aria-hidden="true" tabindex="-1"></a>    </span>
<span id="cb3-8"><a href="#cb3-8" aria-hidden="true" tabindex="-1"></a>    <span class="cf">if</span>(dx <span class="op">=</span> <span class="dv">0</span>) {"{"}</span>
<span id="cb3-9"><a href="#cb3-9" aria-hidden="true" tabindex="-1"></a>        <span class="cf">for</span>(<span class="kw">let</span> y <span class="op">=</span> <span class="bu">Math</span><span class="op">.</span><span class="fu">min</span>(p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">1</span>])<span class="op">,</span> p2<span class="op">.</span><span class="fu">get</span>([<span class="dv">1</span>]))<span class="op">;</span> y <span class="op">&lt;</span> <span class="bu">Math</span><span class="op">.</span><span class="fu">max</span>(p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">1</span>])<span class="op">,</span> p2<span class="op">.</span><span class="fu">get</span>([<span class="dv">1</span>]))<span class="op">;</span> y<span class="op">+=</span> <span class="dv">1</span>) {"{"}</span>
<span id="cb3-10"><a href="#cb3-10" aria-hidden="true" tabindex="-1"></a>            coords <span class="op">=</span> <span class="fu">matrix</span>([p1<span class="op">.</span><span class="at">get</span>[<span class="dv">0</span>])<span class="op">,</span> y])<span class="op">;</span></span>
<span id="cb3-11"><a href="#cb3-11" aria-hidden="true" tabindex="-1"></a>            coords <span class="op">=</span> coords<span class="op">.</span><span class="fu">map</span>(<span class="bu">Math</span><span class="op">.</span><span class="fu">round</span>)<span class="op">;</span></span>
<span id="cb3-12"><a href="#cb3-12" aria-hidden="true" tabindex="-1"></a>            <span class="kw">this</span><span class="op">.</span><span class="at">pixelBuffer</span><span class="op">.</span><span class="fu">set</span>(coords<span class="op">,</span> <span class="kw">this</span><span class="op">.</span><span class="at">stroke</span>)<span class="op">;</span></span>
<span id="cb3-13"><a href="#cb3-13" aria-hidden="true" tabindex="-1"></a>        }</span>
<span id="cb3-14"><a href="#cb3-14" aria-hidden="true" tabindex="-1"></a>    } <span class="cf">else</span> <span class="cf">if</span>(m <span class="op">&lt;=</span> <span class="dv">1</span> <span class="op">&amp;&amp;</span> m <span class="op">&gt;=</span> <span class="op">-</span><span class="dv">1</span>) {"{"}</span>
<span id="cb3-15"><a href="#cb3-15" aria-hidden="true" tabindex="-1"></a>        <span class="cf">for</span>(<span class="kw">let</span> x <span class="op">=</span> <span class="bu">Math</span><span class="op">.</span><span class="fu">min</span>(p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">0</span>])<span class="op">,</span> p2<span class="op">.</span><span class="fu">get</span>([<span class="dv">0</span>]))<span class="op">;</span> x <span class="op">&lt;</span> <span class="bu">Math</span><span class="op">.</span><span class="fu">max</span>(p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">0</span>])<span class="op">,</span> p2<span class="op">.</span><span class="fu">get</span>([<span class="dv">0</span>]))<span class="op">;</span> x <span class="op">+=</span> <span class="dv">1</span>) {"{"}</span>
<span id="cb3-16"><a href="#cb3-16" aria-hidden="true" tabindex="-1"></a>            coords <span class="op">=</span> <span class="fu">matrix</span>([x<span class="op">,</span> m <span class="op">*</span> x <span class="op">+</span> b])<span class="op">;</span></span>
<span id="cb3-17"><a href="#cb3-17" aria-hidden="true" tabindex="-1"></a>            coords <span class="op">=</span> coords<span class="op">.</span><span class="fu">map</span>(<span class="bu">Math</span><span class="op">.</span><span class="fu">round</span>)<span class="op">;</span></span>
<span id="cb3-18"><a href="#cb3-18" aria-hidden="true" tabindex="-1"></a>            <span class="kw">this</span><span class="op">.</span><span class="at">pixelBuffer</span><span class="op">.</span><span class="fu">set</span>(coords<span class="op">,</span> <span class="kw">this</span><span class="op">.</span><span class="at">stroke</span>)<span class="op">;</span></span>
<span id="cb3-19"><a href="#cb3-19" aria-hidden="true" tabindex="-1"></a>        }</span>
<span id="cb3-20"><a href="#cb3-20" aria-hidden="true" tabindex="-1"></a>    } <span class="cf">else</span> {"{"}</span>
<span id="cb3-21"><a href="#cb3-21" aria-hidden="true" tabindex="-1"></a>        <span class="cf">for</span>(<span class="kw">let</span> y <span class="op">=</span> <span class="bu">Math</span><span class="op">.</span><span class="fu">min</span>(p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">1</span>])<span class="op">,</span> p2<span class="op">.</span><span class="fu">get</span>([<span class="dv">1</span>]))<span class="op">;</span> y <span class="op">&lt;</span> <span class="bu">Math</span><span class="op">.</span><span class="fu">max</span>(p1<span class="op">.</span><span class="fu">get</span>([<span class="dv">1</span>])<span class="op">,</span> p2<span class="op">.</span><span class="fu">get</span>([<span class="dv">1</span>]))<span class="op">;</span> y <span class="op">+=</span> <span class="dv">1</span>) {"{"}</span>
<span id="cb3-22"><a href="#cb3-22" aria-hidden="true" tabindex="-1"></a>            coords <span class="op">=</span> <span class="fu">matrix</span>([(y <span class="op">-</span> b) <span class="op">/</span> m<span class="op">,</span> y])<span class="op">;</span></span>
<span id="cb3-23"><a href="#cb3-23" aria-hidden="true" tabindex="-1"></a>            coords <span class="op">=</span> coords<span class="op">.</span><span class="fu">map</span>(<span class="bu">Math</span><span class="op">.</span><span class="fu">round</span>)<span class="op">;</span></span>
<span id="cb3-24"><a href="#cb3-24" aria-hidden="true" tabindex="-1"></a>            <span class="kw">this</span><span class="op">.</span><span class="at">pixelBuffer</span><span class="op">.</span><span class="fu">set</span>(coords<span class="op">,</span> <span class="kw">this</span><span class="op">.</span><span class="at">stroke</span>)<span class="op">;</span></span>
<span id="cb3-25"><a href="#cb3-25" aria-hidden="true" tabindex="-1"></a>        }</span>
<span id="cb3-26"><a href="#cb3-26" aria-hidden="true" tabindex="-1"></a>    }</span>
<span id="cb3-27"><a href="#cb3-27" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div>
<p>It’s not the prettiest, and I still want to get around to
understanding Bresenham’s, but it’s a start and fine for a very
rudimentary project like this. Other than this the graphics manager is
now only responsible for connecting the vertices of shapes like the
platonic solids and triangles. To explain the 3D capabilities, I’m just
going to use the cube code, but the same process applies to the
tetrahedron and the octahedron. All of the 3D points, or vectors, are
stored as matrices with 3 rows and 1 column. meaning to get the x of
some point <code>a</code>, the getter looks like this:
<code>a.get([0])</code>. The reason I store the 3D points as matrices is
because of the math capabilities built into Math.js, so for simpler
points, and especially ones that don’t need any matrix math, I use a
simple array with 3 elements. so x would be <code>a[0]</code>. With that
in mind, a new class, the shape factory, is responsible for defining the
vertices of the cube based on some scaling parameters and a coordinate
for its center. It returns an array of matrices representing the normal
vertices of the cube relative to the center. Here is what the shape
factory rectPrism (or cube) function looks like in the code.</p>
<div class="sourceCode" id="cb4"><pre
class="sourceCode typescript"><code class="sourceCode typescript"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a><span class="fu">rectPrism</span>(org<span class="op">:</span> <span class="bu">Array</span><span class="op">&lt;</span><span class="dt">number</span><span class="op">&gt;,</span> scl<span class="op">:</span> <span class="bu">Array</span><span class="op">&lt;</span><span class="dt">number</span><span class="op">&gt;</span>)<span class="op">:</span> <span class="bu">Array</span><span class="op">&lt;</span>math<span class="op">.</span><span class="at">Matrix</span><span class="op">&gt;</span> {"{"}</span>
<span id="cb4-2"><a href="#cb4-2" aria-hidden="true" tabindex="-1"></a>        size <span class="op">=</span> size<span class="op">.</span><span class="fu">map</span>(s <span class="kw">=&gt;</span> s <span class="op">/</span> <span class="dv">2</span>)<span class="op">;</span></span>
<span id="cb4-3"><a href="#cb4-3" aria-hidden="true" tabindex="-1"></a>        <span class="cf">return</span> [</span>
<span id="cb4-4"><a href="#cb4-4" aria-hidden="true" tabindex="-1"></a>            <span class="fu">matrix</span>([org[<span class="dv">0</span>] <span class="op">-</span> scl[<span class="dv">0</span>]<span class="op">,</span> org[<span class="dv">1</span>] <span class="op">-</span> scl[<span class="dv">1</span>]<span class="op">,</span> org[<span class="dv">2</span>] <span class="op">+</span> scl[<span class="dv">2</span>]])<span class="op">,</span></span>
<span id="cb4-5"><a href="#cb4-5" aria-hidden="true" tabindex="-1"></a>            <span class="fu">matrix</span>([org[<span class="dv">0</span>] <span class="op">+</span> scl[<span class="dv">0</span>]<span class="op">,</span> org[<span class="dv">1</span>] <span class="op">-</span> scl[<span class="dv">1</span>]<span class="op">,</span> org[<span class="dv">2</span>] <span class="op">+</span> scl[<span class="dv">2</span>]])<span class="op">,</span></span>
<span id="cb4-6"><a href="#cb4-6" aria-hidden="true" tabindex="-1"></a>            <span class="fu">matrix</span>([org[<span class="dv">0</span>] <span class="op">+</span> scl[<span class="dv">0</span>]<span class="op">,</span> org[<span class="dv">1</span>] <span class="op">+</span> scl[<span class="dv">1</span>]<span class="op">,</span> org[<span class="dv">2</span>] <span class="op">+</span> scl[<span class="dv">2</span>]])<span class="op">,</span></span>
<span id="cb4-7"><a href="#cb4-7" aria-hidden="true" tabindex="-1"></a>            <span class="fu">matrix</span>([org[<span class="dv">0</span>] <span class="op">-</span> scl[<span class="dv">0</span>]<span class="op">,</span> org[<span class="dv">1</span>] <span class="op">+</span> scl[<span class="dv">1</span>]<span class="op">,</span> org[<span class="dv">2</span>] <span class="op">+</span> scl[<span class="dv">2</span>]])<span class="op">,</span></span>
<span id="cb4-8"><a href="#cb4-8" aria-hidden="true" tabindex="-1"></a>            <span class="fu">matrix</span>([org[<span class="dv">0</span>] <span class="op">-</span> scl[<span class="dv">0</span>]<span class="op">,</span> org[<span class="dv">1</span>] <span class="op">-</span> scl[<span class="dv">1</span>]<span class="op">,</span> org[<span class="dv">2</span>] <span class="op">-</span> scl[<span class="dv">2</span>]])<span class="op">,</span></span>
<span id="cb4-9"><a href="#cb4-9" aria-hidden="true" tabindex="-1"></a>            <span class="fu">matrix</span>([org[<span class="dv">0</span>] <span class="op">+</span> scl[<span class="dv">0</span>]<span class="op">,</span> org[<span class="dv">1</span>] <span class="op">-</span> scl[<span class="dv">1</span>]<span class="op">,</span> org[<span class="dv">2</span>] <span class="op">-</span> scl[<span class="dv">2</span>]])<span class="op">,</span></span>
<span id="cb4-10"><a href="#cb4-10" aria-hidden="true" tabindex="-1"></a>            <span class="fu">matrix</span>([org[<span class="dv">0</span>] <span class="op">+</span> scl[<span class="dv">0</span>]<span class="op">,</span> org[<span class="dv">1</span>] <span class="op">+</span> scl[<span class="dv">1</span>]<span class="op">,</span> org[<span class="dv">2</span>] <span class="op">-</span> scl[<span class="dv">2</span>]])<span class="op">,</span></span>
<span id="cb4-11"><a href="#cb4-11" aria-hidden="true" tabindex="-1"></a>            <span class="fu">matrix</span>([org[<span class="dv">0</span>] <span class="op">-</span> scl[<span class="dv">0</span>]<span class="op">,</span> org[<span class="dv">1</span>] <span class="op">+</span> scl[<span class="dv">1</span>]<span class="op">,</span> org[<span class="dv">2</span>] <span class="op">-</span> scl[<span class="dv">2</span>]])</span>
<span id="cb4-12"><a href="#cb4-12" aria-hidden="true" tabindex="-1"></a>        ]<span class="op">;</span></span>
<span id="cb4-13"><a href="#cb4-13" aria-hidden="true" tabindex="-1"></a>    }</span></code></pre></div>
<p>The user defines the center of the cube in space with the array org,
for origin. Then the next array is the scale of each axis, x, y, and z.
The user enters the scale as the width of the entire cube on that axis
but the program divides these values by two because it creates all of
the vertices relative to the origin. It’s hard to visualize, but a cube
has 8 vertices, and they are all found by subtracting or adding from the
center, but the order needs to be correct. The order starts with the
back face on the top left vertex and wraps around the back face
clockwise, before starting back at the front face and also wrapping
around clockwise. This can also be seen in the code with the first point
in the list being the origin - scale on the x, putting it left, the
origin + the scale for y, putting it on top, and the origin plus the
scale for z, putting it on the back so in total, back top left. This
continues for all the other vertices and is returned. The list of
vertices is stored in a variable called box in the main, but now comes
the most complex part, rotation matrices, and projection matrices. Here
is the code in main.ts, it’s kind of a lot, but I encourage you to just
take it piece by piece and read the comments.</p>
<div class="sourceCode" id="cb5"><pre
class="sourceCode typescript"><code class="sourceCode typescript"><span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabindex="-1"></a><span class="co">// Create the program graphics manager and shape factory</span></span>
<span id="cb5-2"><a href="#cb5-2" aria-hidden="true" tabindex="-1"></a><span class="kw">const</span> graphicsManager<span class="op">:</span> GraphicsManager <span class="op">=</span> <span class="kw">new</span> <span class="fu">GraphicsManager</span>()<span class="op">;</span></span>
<span id="cb5-3"><a href="#cb5-3" aria-hidden="true" tabindex="-1"></a><span class="kw">const</span> shapeFactory<span class="op">:</span> ShapeFactory <span class="op">=</span> <span class="kw">new</span> <span class="fu">ShapeFactory</span>()<span class="op">;</span></span>
<span id="cb5-4"><a href="#cb5-4" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb5-5"><a href="#cb5-5" aria-hidden="true" tabindex="-1"></a><span class="co">// Use the shape factory to get a cube at (0, 0, 0) with a height width, and depth of 20 units.</span></span>
<span id="cb5-6"><a href="#cb5-6" aria-hidden="true" tabindex="-1"></a><span class="kw">let</span> box<span class="op">:</span> <span class="bu">Array</span><span class="op">&lt;</span>math<span class="op">.</span><span class="at">Matrix</span><span class="op">&gt;</span> <span class="op">=</span> shapeFactory<span class="op">.</span><span class="fu">rectPrism</span>([<span class="dv">0</span><span class="op">,</span> <span class="dv">0</span><span class="op">,</span> <span class="dv">0</span>]<span class="op">,</span> [<span class="dv">20</span><span class="op">,</span> <span class="dv">20</span><span class="op">,</span> <span class="dv">20</span>])<span class="op">;</span></span>
<span id="cb5-7"><a href="#cb5-7" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb5-8"><a href="#cb5-8" aria-hidden="true" tabindex="-1"></a><span class="co">// The orthographic projection matrix and a fix for the stretched resolution.</span></span>
<span id="cb5-9"><a href="#cb5-9" aria-hidden="true" tabindex="-1"></a><span class="kw">const</span> orthoProjection<span class="op">:</span> math<span class="op">.</span><span class="at">Matrix</span> <span class="op">=</span> <span class="fu">matrix</span>([</span>
<span id="cb5-10"><a href="#cb5-10" aria-hidden="true" tabindex="-1"></a>    [<span class="dv">2</span><span class="op">,</span> <span class="dv">0</span><span class="op">,</span> <span class="dv">0</span>]<span class="op">,</span></span>
<span id="cb5-11"><a href="#cb5-11" aria-hidden="true" tabindex="-1"></a>    [<span class="dv">0</span><span class="op">,</span> <span class="dv">1</span><span class="op">,</span> <span class="dv">0</span>]<span class="op">,</span></span>
<span id="cb5-12"><a href="#cb5-12" aria-hidden="true" tabindex="-1"></a>    [<span class="dv">0</span><span class="op">,</span> <span class="dv">0</span><span class="op">,</span> <span class="dv">1</span>]</span>
<span id="cb5-13"><a href="#cb5-13" aria-hidden="true" tabindex="-1"></a>])<span class="op">;</span></span>
<span id="cb5-14"><a href="#cb5-14" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb5-15"><a href="#cb5-15" aria-hidden="true" tabindex="-1"></a><span class="kw">const</span> frameRate<span class="op">:</span> <span class="dt">number</span> <span class="op">=</span> <span class="dv">8</span><span class="op">;</span></span>
<span id="cb5-16"><a href="#cb5-16" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb5-17"><a href="#cb5-17" aria-hidden="true" tabindex="-1"></a><span class="kw">const</span> init <span class="op">=</span> () <span class="kw">=&gt;</span> {"{"}</span>
<span id="cb5-18"><a href="#cb5-18" aria-hidden="true" tabindex="-1"></a>    <span class="fu">loop</span>()<span class="op">;</span></span>
<span id="cb5-19"><a href="#cb5-19" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb5-20"><a href="#cb5-20" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb5-21"><a href="#cb5-21" aria-hidden="true" tabindex="-1"></a><span class="kw">const</span> loop <span class="op">=</span> () <span class="kw">=&gt;</span> {"{"}</span>
<span id="cb5-22"><a href="#cb5-22" aria-hidden="true" tabindex="-1"></a>    <span class="co">// clears the previously drawn code.</span></span>
<span id="cb5-23"><a href="#cb5-23" aria-hidden="true" tabindex="-1"></a>    <span class="bu">console</span><span class="op">.</span><span class="fu">clear</span>()<span class="op">;</span></span>
<span id="cb5-24"><a href="#cb5-24" aria-hidden="true" tabindex="-1"></a>    graphicsManager<span class="op">.</span><span class="fu">background</span>()<span class="op">;</span></span>
<span id="cb5-25"><a href="#cb5-25" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb5-26"><a href="#cb5-26" aria-hidden="true" tabindex="-1"></a>    <span class="co">// Applying the projection into a new, properly projected list of points.</span></span>
<span id="cb5-27"><a href="#cb5-27" aria-hidden="true" tabindex="-1"></a>    <span class="kw">let</span> projectedPoints<span class="op">:</span> <span class="bu">Array</span><span class="op">&lt;</span>math<span class="op">.</span><span class="at">Matrix</span><span class="op">&gt;</span> <span class="op">=</span> box<span class="op">.</span><span class="fu">map</span>(p <span class="kw">=&gt;</span> {"{"}</span>
<span id="cb5-28"><a href="#cb5-28" aria-hidden="true" tabindex="-1"></a>        p <span class="op">=</span> <span class="fu">multiply</span>(orthoProjection<span class="op">,</span> p)<span class="op">;</span></span>
<span id="cb5-29"><a href="#cb5-29" aria-hidden="true" tabindex="-1"></a>        <span class="cf">return</span> p<span class="op">;</span></span>
<span id="cb5-30"><a href="#cb5-30" aria-hidden="true" tabindex="-1"></a>    })<span class="op">;</span></span>
<span id="cb5-31"><a href="#cb5-31" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb5-32"><a href="#cb5-32" aria-hidden="true" tabindex="-1"></a>    <span class="co">// Connect all of the vertices with lines</span></span>
<span id="cb5-33"><a href="#cb5-33" aria-hidden="true" tabindex="-1"></a>    graphicsManager<span class="op">.</span><span class="fu">rectPrism</span>(projectedPoints)<span class="op">;</span></span>
<span id="cb5-34"><a href="#cb5-34" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb5-35"><a href="#cb5-35" aria-hidden="true" tabindex="-1"></a>    <span class="co">// Print the buffer results to the terminal</span></span>
<span id="cb5-36"><a href="#cb5-36" aria-hidden="true" tabindex="-1"></a>    graphicsManager<span class="op">.</span><span class="fu">render</span>()<span class="op">;</span></span>
<span id="cb5-37"><a href="#cb5-37" aria-hidden="true" tabindex="-1"></a>    <span class="co">// Loop the function based on the framerate in frames / second</span></span>
<span id="cb5-38"><a href="#cb5-38" aria-hidden="true" tabindex="-1"></a>    <span class="pp">setTimeout</span>(loop<span class="op">,</span> <span class="dv">1000</span> <span class="op">/</span> frameRate)<span class="op">;</span></span>
<span id="cb5-39"><a href="#cb5-39" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb5-40"><a href="#cb5-40" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb5-41"><a href="#cb5-41" aria-hidden="true" tabindex="-1"></a><span class="co">// Start the loop</span></span>
<span id="cb5-42"><a href="#cb5-42" aria-hidden="true" tabindex="-1"></a><span class="fu">init</span>()<span class="op">;</span></span></code></pre></div>
<p>Although the comments are pretty self-explanatory, some parts still
may not make sense, namely the matrix multiplication. If you don’t
understand the way matrix multiplication works, I think it is better to
see a visual representation of it. First, to understand a matrix, it is
simply a 2D array of numbers. The reason I don’t just use
two-dimensional arrays native to JavaScript is that matrices also come
with some unique properties and operations. All of the 3D points in the
code need to interact with some sort of matrix, and therefore the points
themselves need to be matrices. Finally, any matrix that interacts with
our points, such as the orthographic projection matrix and rotation
matrices, must have 3 columns. This is due to a constraint of matrix
multiplication: for A * B, the columns of A must match the rows of B.
Now I’ll direct you to a good <a
href="http://matrixmultiplication.xyz/">visualizer for matrix
multiplication</a>, just to see what is happening under the hood. now
consider this scenario.</p>
<div class="sourceCode" id="cb6"><pre
class="sourceCode typescript"><code class="sourceCode typescript"><span id="cb6-1"><a href="#cb6-1" aria-hidden="true" tabindex="-1"></a>Ortho Matrix <span class="dv">2</span><span class="er">x3</span>   <span class="dv">3</span><span class="er">D</span> <span class="bu">Point</span> <span class="dv">3</span><span class="er">x1</span>        <span class="dv">2</span><span class="er">D</span> <span class="bu">Point</span> <span class="dv">2</span><span class="er">x1</span></span>
<span id="cb6-2"><a href="#cb6-2" aria-hidden="true" tabindex="-1"></a> <span class="op">|</span> <span class="dv">1</span> <span class="op">,</span> <span class="dv">0</span> <span class="op">,</span> <span class="dv">0</span> <span class="op">|</span>            <span class="op">|</span> <span class="dv">4</span> <span class="op">|</span>           <span class="op">|</span> <span class="dv">4</span> <span class="op">|</span></span>
<span id="cb6-3"><a href="#cb6-3" aria-hidden="true" tabindex="-1"></a> <span class="op">|</span> <span class="dv">0</span> <span class="op">,</span> <span class="dv">1</span> <span class="op">,</span> <span class="dv">0</span> <span class="op">|</span>      x     <span class="op">|</span> <span class="dv">6</span> <span class="op">|</span>     <span class="op">=</span>     <span class="op">|</span> <span class="dv">6</span> <span class="op">|</span></span>
<span id="cb6-4"><a href="#cb6-4" aria-hidden="true" tabindex="-1"></a>                          <span class="op">|</span> <span class="dv">2</span> <span class="op">|</span>           </span></code></pre></div>
<p>The orthographic projection matrix is what is responsible for
converting a 3D point into a 2D. It does this by only taking the x and y
values of the 3x1 matrix it is multiplied by, zeroing out the z. This 2D
point is then sent to the graphics manager to have lines connected to it
and BOOM, 3D graphics! But at this point it doesn’t look very 3D, it is
very very 2D. There are two ways to solve this: adding rotations and
using a perspective projection matrix. Since I added a draw loop I opted
for rotations, which are also calculated with matrix math. Each axis has
its rotation matrix but unlike the orthographic projection matrix,
rotation matrices depend on a variable, the angle of rotation in radians
<code>a</code>. This means I’m able to change the angle, get a new
rotation matrix, and rotate the cube in an animation over the draw loop.
Here are the rotation matrices for each axis.</p>
<div class="sourceCode" id="cb7"><pre
class="sourceCode typescript"><code class="sourceCode typescript"><span id="cb7-1"><a href="#cb7-1" aria-hidden="true" tabindex="-1"></a>      Rotation X                  Rotation Y                  Rotation Z</span>
<span id="cb7-2"><a href="#cb7-2" aria-hidden="true" tabindex="-1"></a><span class="op">|</span> <span class="dv">1</span><span class="op">,</span> <span class="dv">0</span><span class="op">,</span>    <span class="op">,</span> <span class="dv">0</span>       <span class="op">|</span>      <span class="op">|</span> <span class="fu">cos</span>(a)<span class="op">,</span>  <span class="dv">0</span><span class="op">,</span> <span class="fu">sin</span>(a) <span class="op">|</span>      <span class="op">|</span> <span class="fu">cos</span>(a)<span class="op">,</span> <span class="op">-</span><span class="fu">sin</span>(a)<span class="op">,</span> <span class="dv">0</span> <span class="op">|</span></span>
<span id="cb7-3"><a href="#cb7-3" aria-hidden="true" tabindex="-1"></a><span class="op">|</span> <span class="dv">0</span><span class="op">,</span> <span class="fu">cos</span>(a)<span class="op">,</span> <span class="op">-</span><span class="fu">sin</span>(a) <span class="op">|</span>      <span class="op">|</span> <span class="dv">0</span><span class="op">,</span>       <span class="dv">1</span><span class="op">,</span> <span class="dv">0</span>      <span class="op">|</span>      <span class="op">|</span> <span class="fu">sin</span>(a)<span class="op">,</span> <span class="fu">cos</span>(a)<span class="op">,</span>  <span class="dv">0</span> <span class="op">|</span></span>
<span id="cb7-4"><a href="#cb7-4" aria-hidden="true" tabindex="-1"></a><span class="op">|</span> <span class="dv">0</span><span class="op">,</span> <span class="fu">sin</span>(a)<span class="op">,</span> <span class="fu">cos</span>(a)  <span class="op">|</span>      <span class="op">|</span> <span class="op">-</span><span class="fu">sin</span>(a)<span class="op">,</span> <span class="dv">0</span><span class="op">,</span> <span class="fu">cos</span>(a) <span class="op">|</span>      <span class="op">|</span> <span class="dv">0</span><span class="op">,</span>      <span class="dv">0</span><span class="op">,</span>       <span class="dv">1</span> <span class="op">|</span></span></code></pre></div>
<p>We just have to define these in code and increment the angle by a
small amount before calculating the matrices. Finally to use the
rotation matrices we just have to rotate the 3D points before they are
projected orthographically and we have a SPINNING CUBE.</p>
<div class="sourceCode" id="cb8"><pre
class="sourceCode typescript"><code class="sourceCode typescript"><span id="cb8-1"><a href="#cb8-1" aria-hidden="true" tabindex="-1"></a>angle <span class="op">+=</span> <span class="fl">0.05</span><span class="op">;</span></span>
<span id="cb8-2"><a href="#cb8-2" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb8-3"><a href="#cb8-3" aria-hidden="true" tabindex="-1"></a><span class="kw">let</span> rotationX <span class="op">=</span> <span class="fu">matrix</span>([</span>
<span id="cb8-4"><a href="#cb8-4" aria-hidden="true" tabindex="-1"></a>        [<span class="dv">1</span><span class="op">,</span> <span class="dv">0</span><span class="op">,</span>               <span class="dv">0</span>               ]<span class="op">,</span></span>
<span id="cb8-5"><a href="#cb8-5" aria-hidden="true" tabindex="-1"></a>        [<span class="dv">0</span><span class="op">,</span> <span class="bu">Math</span><span class="op">.</span><span class="fu">cos</span>(angle)<span class="op">,</span> <span class="op">-</span><span class="bu">Math</span><span class="op">.</span><span class="fu">sin</span>(angle)]<span class="op">,</span></span>
<span id="cb8-6"><a href="#cb8-6" aria-hidden="true" tabindex="-1"></a>        [<span class="dv">0</span><span class="op">,</span> <span class="bu">Math</span><span class="op">.</span><span class="fu">sin</span>(angle)<span class="op">,</span> <span class="bu">Math</span><span class="op">.</span><span class="fu">cos</span>(angle) ]</span>
<span id="cb8-7"><a href="#cb8-7" aria-hidden="true" tabindex="-1"></a>    ])<span class="op">;</span></span>
<span id="cb8-8"><a href="#cb8-8" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb8-9"><a href="#cb8-9" aria-hidden="true" tabindex="-1"></a>    <span class="kw">let</span> rotationY <span class="op">=</span> <span class="fu">matrix</span>([</span>
<span id="cb8-10"><a href="#cb8-10" aria-hidden="true" tabindex="-1"></a>        [ <span class="bu">Math</span><span class="op">.</span><span class="fu">cos</span>(angle)<span class="op">,</span> <span class="dv">0</span><span class="op">,</span> <span class="bu">Math</span><span class="op">.</span><span class="fu">sin</span>(angle)]<span class="op">,</span></span>
<span id="cb8-11"><a href="#cb8-11" aria-hidden="true" tabindex="-1"></a>        [ <span class="dv">0</span><span class="op">,</span>               <span class="dv">1</span><span class="op">,</span> <span class="dv">0</span>              ]<span class="op">,</span></span>
<span id="cb8-12"><a href="#cb8-12" aria-hidden="true" tabindex="-1"></a>        [<span class="op">-</span><span class="bu">Math</span><span class="op">.</span><span class="fu">sin</span>(angle)<span class="op">,</span> <span class="dv">0</span><span class="op">,</span> <span class="bu">Math</span><span class="op">.</span><span class="fu">cos</span>(angle)]</span>
<span id="cb8-13"><a href="#cb8-13" aria-hidden="true" tabindex="-1"></a>    ])<span class="op">;</span></span>
<span id="cb8-14"><a href="#cb8-14" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb8-15"><a href="#cb8-15" aria-hidden="true" tabindex="-1"></a>    <span class="kw">let</span> rotationZ <span class="op">=</span> <span class="fu">matrix</span>([</span>
<span id="cb8-16"><a href="#cb8-16" aria-hidden="true" tabindex="-1"></a>        [<span class="bu">Math</span><span class="op">.</span><span class="fu">cos</span>(angle)<span class="op">,</span> <span class="op">-</span><span class="bu">Math</span><span class="op">.</span><span class="fu">sin</span>(angle)<span class="op">,</span> <span class="dv">0</span>]<span class="op">,</span></span>
<span id="cb8-17"><a href="#cb8-17" aria-hidden="true" tabindex="-1"></a>        [<span class="bu">Math</span><span class="op">.</span><span class="fu">sin</span>(angle)<span class="op">,</span>  <span class="bu">Math</span><span class="op">.</span><span class="fu">cos</span>(angle)<span class="op">,</span> <span class="dv">0</span>]<span class="op">,</span></span>
<span id="cb8-18"><a href="#cb8-18" aria-hidden="true" tabindex="-1"></a>        [<span class="dv">0</span><span class="op">,</span>                <span class="dv">0</span><span class="op">,</span>               <span class="dv">1</span>]</span>
<span id="cb8-19"><a href="#cb8-19" aria-hidden="true" tabindex="-1"></a>    ])<span class="op">;</span></span>
<span id="cb8-20"><a href="#cb8-20" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb8-21"><a href="#cb8-21" aria-hidden="true" tabindex="-1"></a>    <span class="kw">let</span> projectedPoints<span class="op">:</span> <span class="bu">Array</span><span class="op">&lt;</span>math<span class="op">.</span><span class="at">Matrix</span><span class="op">&gt;</span> <span class="op">=</span> box<span class="op">.</span><span class="fu">map</span>(p <span class="kw">=&gt;</span> {"{"}</span>
<span id="cb8-22"><a href="#cb8-22" aria-hidden="true" tabindex="-1"></a>        p <span class="op">=</span> <span class="fu">multiply</span>(rotationY<span class="op">,</span> p)<span class="op">;</span></span>
<span id="cb8-23"><a href="#cb8-23" aria-hidden="true" tabindex="-1"></a>        p <span class="op">=</span> <span class="fu">multiply</span>(rotationX<span class="op">,</span> p)<span class="op">;</span></span>
<span id="cb8-24"><a href="#cb8-24" aria-hidden="true" tabindex="-1"></a>        p <span class="op">=</span> <span class="fu">multiply</span>(rotationZ<span class="op">,</span> p)<span class="op">;</span></span>
<span id="cb8-25"><a href="#cb8-25" aria-hidden="true" tabindex="-1"></a>        p <span class="op">=</span> <span class="fu">multiply</span>(orthoProjection<span class="op">,</span> p)<span class="op">;</span></span>
<span id="cb8-26"><a href="#cb8-26" aria-hidden="true" tabindex="-1"></a>        <span class="cf">return</span> p<span class="op">;</span></span>
<span id="cb8-27"><a href="#cb8-27" aria-hidden="true" tabindex="-1"></a>    })<span class="op">;</span></span></code></pre></div>
<p>In this example, I apply all the rotations at the same time, but it’s
perfectly possible to assign different angles to different axes and not
apply some rotations at all. This is fine for my purposes and the
process is identical for tetrahedrons and octahedrons.<br />
This entire mini-project was just a way to dip my toes into 3D rendering
and get a feel for it. I don’t know if it’s a problem with JavaScript,
Bun, or the Chromebook I’m doing this on, but there’s some annoying
flickering going on and assume one of those is the problem. It could
also just be my approach but I’m lazy. Anyway, that’s all for EggTUI and
its limited 3D features. If you have any questions about the code, feel
free to e-mail me at hdiambrosio@gmail.com but you’re probably better
off googling it.</p>
