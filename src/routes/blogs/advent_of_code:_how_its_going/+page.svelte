<h1 id="advent-of-code-how-its-going">Advent of Code: How its Going</h1>
<h2 id="first-things-first">First things first</h2>
<p>As of writing this, day 19 is unlocking sortly (as in 1 minute) BUT,
I’m not going to do it. You might be wondering, “All I hear this kid
blad about is Advent of Code.”, “Why isn’t he doing it all of the
sudden?”. In short, I’m washed. The long answer is that day 16 was no
clicking for me, and still doesn’t really, so it’s making doing the
other days more difficult. I also want to enjoy my winter vacationa and
see friends while I still can. One thing That I would like to mention is
that I;m not using zig.</p>
<h3 id="still-washed">Still washed</h3>
<p>I was able to do part 1 and 2 for day 1 in zig, but then day 2 gave
me some challenges, and with everything else going on at school, I
didn’t really have the time to justify doing Advent of Code twice a day.
I still think Zig will be worth learning some day, but I also want to
become even more familliar with C++ and I’ve been in the “really learn
the tools” mood, so I’ve been browsing cppman and watching C+ YouTubers
a lot. As of now, I have 2 stars on every day up until day 16 where I
have 1 start for day 16 and 17. These days both seem pretty tough, I
don’t even know how to approach part 2 of day 16 and part 2 day 17 seems
a little more doable but I really just don’t have the motivation without
having day 16 complete. Nonetheless, I still want to keep working
towards getting those stars, and learning about C++ and good programming
habits on the way. Two things I found out about myself is that I
<em>DON’T</em> work well at night, at all. I found myself frequently
staying up for the Advent of Code drop, only to get stuck on part 2, go
to bed dissappointed and then solve it in as little as 30 minutes when I
woke up the next day. I am not a night person and I destroyed my sleep
schedule which I previously took a great amount of pride in. Second,
talking to myself out loud makes it way easier to program efficiently.
It may just be my innner wannabe YouTuber, but exsplaining things out
loud to myself as I solve the problem makes it easier to stay focused
and to make sense of a the problem (also whiteboarding is a huge
help).</p>
<h2 id="the-c-language">The C++ Language</h2>
<p>Beyond those things about myself there is also A lot about the C++
programming language that I’m learning too. Just listed as some
unorganized tips:</p>
<h3
id="swapping-two-variables-integer-values-without-a-temporary">Swapping
two variables integer values without a temporary:</h3>
<p>If you want to swap two integer values without a temporary variable,
you can actually make use of bitwise XOR. Say I have two variables
<code>int a = 3;</code> and <code>int b = 6;</code>. In order to swap I
first get the XOR of b and a and store into a like so:
<code>a = a ^ b;</code>. Then, XOR a and b into b, this should give the
previous value of a into b. Finally, XOR the two values again but store
into a. This should look something like this.</p>
<div class="sourceCode" id="cb1"><pre class="sourceCode c"><code class="sourceCode c"><span id="cb1-1"><span class="pp">#include </span><span class="im">&lt;stdio.h&gt;</span></span>
<span id="cb1-2"></span>
<span id="cb1-3"><span class="dt">int</span> main<span class="op">()</span> <span class="op">{"{"}</span></span>
<span id="cb1-4">    </span>
<span id="cb1-5">    <span class="dt">int</span> a <span class="op">=</span> <span class="dv">3</span><span class="op">;</span></span>
<span id="cb1-6">    <span class="dt">int</span> b <span class="op">=</span> <span class="dv">6</span><span class="op">;</span></span>
<span id="cb1-7"></span>
<span id="cb1-8">    printf<span class="op">(</span><span class="st">&quot;a: </span><span class="sc">%d</span><span class="st">, b: </span><span class="sc">%d\n</span><span class="st">&quot;</span><span class="op">,</span> a<span class="op">,</span> b<span class="op">);</span> <span class="co">// a: 3, b: 6</span></span>
<span id="cb1-9"></span>
<span id="cb1-10">    a <span class="op">=</span> a <span class="op">^</span> b<span class="op">;</span></span>
<span id="cb1-11">    b <span class="op">=</span> a <span class="op">^</span> b<span class="op">;</span></span>
<span id="cb1-12">    a <span class="op">=</span> a <span class="op">^</span> b<span class="op">;</span></span>
<span id="cb1-13"></span>
<span id="cb1-14">    printf<span class="op">(</span><span class="st">&quot;a: </span><span class="sc">%d</span><span class="st">, b: </span><span class="sc">%d\n</span><span class="st">&quot;</span><span class="op">,</span> a<span class="op">,</span> b<span class="op">);</span> <span class="co">// a: 6, b: 3</span></span>
<span id="cb1-15"></span>
<span id="cb1-16">    <span class="cf">return</span> <span class="dv">0</span><span class="op">;</span></span>
<span id="cb1-17"><span class="op">}</span></span></code></pre></div>
<h3 id="asserts-wow-how-did-i-not-use-these-sooner">Asserts (wow how did
i not use these sooner)</h3>
<p>An assert is <em>EXTREMELY</em> simple to understand. It is a macro
from c and there are two types, static_asserts and good ol’ regular,
run-of-the-mill, ordinary, plain, reliable, asserts.
<code>assert()</code> is for ensuring the properties of values during
runtime, and <code>static_assert()</code> is for checking the properties
of values and types and stuff during compile-time (unfortunately, i have
not delved too deep into compile-time stuff so i can’t speak well to
static assert). What makes assert useful is that, instead of printing
values to the console and trying to piece together what is wrong with
the values in the program, <code>assert()</code> will halt the entire
program if the boolean expression passed returns false. What makes this
even more <em>extra special</em> is that it GIVE YOU A LINE NUMBER! Gone
are the days of being sad when gdb decides to play hard to get with it’s
line numbers for segfaults. Not only can assert garountee some state of
your program, but it’s also far easier to track down the illegal state
if it arises! I certainly see myself taking a closer look at
<code>static_assert()</code> when I find the need to and throwing
<code>assert()</code> calls all over my future code. This also seems to
be a common thing in many languages so I’m happy I understand what
asserts are for now.</p>
<h3 id="templates-are-magic">Templates are Magic</h3>
<p>I still have <em>a lot</em> to learn about C++ templating. There
seems to be a lot more to it that I dont currently understand. I only
just learned that <code>template &lt;typename T&gt;</code> and
<code>template &lt;class T&gt;</code> are subtly different and that you
can extract a lot more from datatypes than I previously relaized. Also
it’s so strange that the code regarding templates looks almost like
standard C++, but it all happens at compile time! The reason I had to
dig so far into templates is because as I was Advent of Code, I was
putting together a useful utilities header file that proved extremely
useful for patters in parsing inputs that happened often, or making a
function that printed all the values in a vector, instead of me having
to spend time typing a for loop with all the necessary line breaks and
commas or however I wanted to format the output. I also wanted some
funcitons like the higer-order array fucntions in JavaScript (map,
for_each, every, some, filter and reduce). Some are present in the C++
algorithm header but I don’t really care for the always defining the
start and end of an interator syntax that C++ uses. I sort of wish that
most of these functions were overloaded to just take a container that
has an iterator, and just run the spesified method on the start to the
end. For example:</p>
<div class="sourceCode" id="cb2"><pre
class="sourceCode cpp"><code class="sourceCode cpp"><span id="cb2-1"><span class="pp">#include </span><span class="im">&lt;algorithm&gt;</span></span>
<span id="cb2-2"><span class="pp">#include </span><span class="im">&lt;iostream&gt;</span></span>
<span id="cb2-3"><span class="pp">#include </span><span class="im">&lt;array&gt;</span></span>
<span id="cb2-4"></span>
<span id="cb2-5"><span class="dt">int</span> main<span class="op">()</span> <span class="op">{"{"}</span></span>
<span id="cb2-6">    <span class="bu">std::</span>array<span class="op">&lt;</span><span class="dt">int</span><span class="op">,</span> <span class="dv">5</span><span class="op">&gt;</span> arr<span class="op">({"{"}</span><span class="dv">1</span><span class="op">,</span> <span class="dv">2</span><span class="op">,</span> <span class="dv">3</span><span class="op">,</span> <span class="dv">4</span><span class="op">,</span> <span class="dv">5</span><span class="op">});</span></span>
<span id="cb2-7"></span>
<span id="cb2-8">    <span class="bu">std::</span>for_each<span class="op">(</span>arr<span class="op">.</span>begin<span class="op">(),</span> arr<span class="op">.</span>end<span class="op">(),</span> <span class="op">[](</span><span class="dt">int</span> i<span class="op">){"{"}</span> <span class="bu">std::</span>cout <span class="op">&lt;&lt;</span> i <span class="op">&lt;&lt;</span> <span class="st">&quot;, &quot;</span><span class="op">;</span> <span class="op">});</span></span>
<span id="cb2-9"></span>
<span id="cb2-10">    <span class="co">// Should perform the same functionality as...</span></span>
<span id="cb2-11">    <span class="bu">std::</span>for_each<span class="op">(</span>arr<span class="op">.</span>begin<span class="op">(),</span> <span class="op">[](</span><span class="dt">int</span> i<span class="op">){"{"}</span> <span class="bu">std::</span>cout <span class="op">&lt;&lt;</span> i <span class="op">&lt;&lt;</span> <span class="st">&quot;, &quot;</span><span class="op">;</span> <span class="op">});</span></span>
<span id="cb2-12"></span>
<span id="cb2-13">    <span class="cf">return</span> <span class="dv">0</span><span class="op">;</span></span>
<span id="cb2-14"><span class="op">}</span></span></code></pre></div>
<p>Regardless, templates start to become a little confusing (admittedly
it could be a skill issue) when concerning functional types like
lambdas. I still have a lot to learn regarding tempalte and compile-time
programming.</p>
<h2 id="the-rest-of-advent-of-code">The rest of Advent of Code</h2>
<p>For the rest of Advent of Code, I still wish to try it, but my
attempts will be at a much more leaisurely pace. Not that the puzzles
are getting really tough, I need to think about them thouroughly, and
can’t just dive in and try to start programming some garbage solutions
in order to finish the puzzle before no one. I do have a leaderboard,
and it’s <em>HUGE</em> this year which I am super psyched about, but I
think I mightve scared some of the participants off by doing so many
puzzles so quick. It’s not even as if they were that hard, just that it
was finals week and I don’t have my priorities straight. Either way I
really hope that this is the year I can finnally complete and Advent of
Code calendar in it’s fullest. Part of me wishes I was still at prep and
I could bring my qualms to Dr. Kender and he would save the day with his
infinite wisdom. That’s about it regarding advent of code. If anyone
wants to join my leaderboard, the code is <code>2111709-786ea57b</code>.
Hope everyone that is doing Advent of Code is enjoying it, and if anyone
has questions about the puzzles or just wants to talk about them, feel
free to e-mail me at <code>hdiambrosio@gmail.com</code>. Ok, bye bye!
:)</p>
