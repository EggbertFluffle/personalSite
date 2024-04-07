<h1 id="tui-3d-graphics">TUI 3D Graphics</h1>
<p>Three-dimensional graphics are the best thing since 2D graphics, but also many times harder. I&#39;ve wanted to break into 3D graphics for a while now, namely because of its connection to first-person games like Minecraft or the Call of Duty franchise. But after some surface-level digging, I&#39;ve found there is a lot more to the third dimension than I first thought.</p>
<p>Put simply, in 2D graphics, there are pixels in a grid, and that&#39;s it. From there, all you need to do is manipulate those very pixels to look like whatever your heart desires. And at its core, 3D graphics is no different than 2D graphics. It&#39;s still a 2D grid of pixels that you manipulate to look a certain way. The tricky part is that you need to give the illusion of a 3D space with only 2D tools.</p>
<p>I finally decided to tackle a 3D &quot;engine&quot; of my own as a way to become more familiar with Typescript (more on that later) and to also learn a bit more about the Bun all-in-one silver hammer of JavaScript development that has recently come out. I chose Typescript because I&#39;m already familiar with JavaScript and wanted to learn more about the unfamiliar type of safety it offers, but more importantly, I wanted to learn about 3D graphics, not an entirely new language. I knew far ahead of time that what I would be building was going to end up being very simple. With all that out of the way, I present to you, the name, <a href="https://github.com/EggbertFluffle/TUI-3D-Renderer">EggTUI-3D-Renderer</a> (EggTUI for short). Not my best naming work.</p>
<p>At its core, EggTUI is just an extremely bare-bones terminal-based 2D graphics &quot;framework&quot;. That said it also can (drum roll) display the first 2 platonic solids... spinning! This came later after I realized that with a terrible line drawing algorithm, I could draw some terrible 3D shapes. So what exactly can EggTUI do? It can display lines, triangles, quads, tetrahedrons, cubes, rectangular prisms, and octahedrons, all with some scaling functionality. It does this with a simple pixel buffer, update loop, a some matrix math, provided very kindly by Math.js. Here is where I want to document the progression of EggTUI and its &quot;features&quot;.</p>
<p>First up is the pixel buffer, which holds all the 2D pixel-coordinated data. The actual buffer is a 2-dimensional array of strings, meaning that it accesses the pixels in the buffer row-wise, and then column-wise, so ordered pairs are (y, x). This is easily fixed by only allowing the pixel buffer class to interact with the buffer itself, which reverses the x and y for all other classes in the program. Additionally, the pixel buffer class can ensure there are no out-of-bounds exceptions, uses <code>process.stdout.rows</code> and <code>process.stdout.columns</code> to get the native dimensions of the terminal, and translates pixel coordinates to make the center of the screen the origin on all axes. Other than that, it can clear the buffer and convert it into a one-dimensional array of strings that represent each row for easier printing. </p>
<p>Next, the graphics manager is the heart of the system and acts as the arbiter between the draw loop and the pixel buffer, making a lot of necessary shortcuts and optimizations along the way. It lets the user set the fill and stroke &quot;colors&quot; as well as draw lines. Drawing lines, and doing it well, is the first major hurdle I and many other people have to tackle. It takes an understanding of math and what makes programs performant, to write a good line algorithm. I wrestled with Bresenham&#39;s line-drawing algorithm for a while, but couldn&#39;t understand it no matter how hard I tried, so I resorted to writing my own. Bresenham&#39;s is so fast and the industry standard because It relies heavily on addition and subtraction, with less multiplication or division, which are both more costly functions. Despite that, I used what I knew of good ol&#39; <code>y = mx + b</code> to write what&#39;s below.</p>
<pre><code class="language-typescript">line(p1: math.Matrix, p2: math.Matrix): void &rbrace;
    let deltaY: number = p2.get([1]) - p1.get([1]); // y2 - y1
    let deltaX: number = p2.get([0]) - p1.get([0]); // x2 - x1
    let m: number = dy / dx;
    let b = -m * p1.get([0]) + p1.get([1]); // Solve for slope intercept

    for(let x = Math.min(p1.get([0]), p2.get([0])); x &lt; Math.max(p1.get([0]), p2.get([0])); x += 1) &rbrace;
        let coords = matrix([x, m * x + b]); // Solve for y based on the given x
        coords = coords.map(Math.round); // Floor to get valid indicies
        this.pixelBuffer.set(p, this.stroke); // Set the coordinates pixel
    &rbrace;
&rbrace;
</code></pre>
<p>This worked for most lines, but as soon as the line&#39;s slope got greater than 1, issues arose. The loop finds the y values for a line based on every x value, but x only increases by 1. This can leave large gaps in the line&#39;s visual representation. For example, if a line has the solutions (0, 0) and (1, 5), there will be a large gap in the line between y = 1 and y = 4, and this would continue, leaving a large dotted streak.</p>
<pre><code class="language-typescript">Current System       New System 
    ....#..           7....#..
    .......           6...#...
    ...#...           5...#...
    .......           4..#....
    ..#....           3..#....
    .......           2.#.....
    .#.....           1.#.....
   X1234567
</code></pre>
<p>By rearranging <code>y = mx + b</code> to be <code>x = (y - b) / m</code> it&#39;s possible to get the x value for a line by inputting the y value. So by using this, and handling an exception for vertical lines with a slope of <code>undefined</code>,  the line drawing algorithm is done and looks like this.</p>
<pre><code class="language-typescript">line(p1: math.Matrix, p2: math.Matrix): void &rbrace;
    let deltaY: number = p2.get([1]) - p1.get([1]); // y2 - y1
    let deltaX: number = p2.get([0]) - p1.get([0]); // x2 - x1
    let m: number = dy / dx;
    let b = -m * p1.get([0]) + p1.get([1]); // Solve for slope intercept
    let coords: math. Matrix;
    
    if(dx = 0) &rbrace;
        for(let y = Math.min(p1.get([1]), p2.get([1])); y &lt; Math.max(p1.get([1]), p2.get([1])); y+= 1) &rbrace;
            coords = matrix([p1.get[0]), y]);
            coords = coords.map(Math.round);
            this.pixelBuffer.set(coords, this.stroke);
        &rbrace;
    &rbrace; else if(m &lt;= 1 &amp;&amp; m &gt;= -1) &rbrace;
        for(let x = Math.min(p1.get([0]), p2.get([0])); x &lt; Math.max(p1.get([0]), p2.get([0])); x += 1) &rbrace;
            coords = matrix([x, m * x + b]);
            coords = coords.map(Math.round);
            this.pixelBuffer.set(coords, this.stroke);
        &rbrace;
    &rbrace; else &rbrace;
        for(let y = Math.min(p1.get([1]), p2.get([1])); y &lt; Math.max(p1.get([1]), p2.get([1])); y += 1) &rbrace;
            coords = matrix([(y - b) / m, y]);
            coords = coords.map(Math.round);
            this.pixelBuffer.set(coords, this.stroke);
        &rbrace;
    &rbrace;
&rbrace;
</code></pre>
<p>It&#39;s not the prettiest, and I still want to get around to understanding Bresenham&#39;s, but it&#39;s a start and fine for a very rudimentary project like this. Other than this the graphics manager is now only responsible for connecting the vertices of shapes like the platonic solids and triangles. To explain the 3D capabilities, I&#39;m just going to use the cube code, but the same process applies to the tetrahedron and the octahedron. All of the 3D points, or vectors, are stored as matrices with 3 rows and 1 column. meaning to get the x of some point <code>a</code>, the getter looks like this: <code>a.get([0])</code>.  The reason I store the 3D points as matrices is because of the math capabilities built into Math.js, so for simpler points, and especially ones that don&#39;t need any matrix math, I use a simple array with 3 elements. so x would be <code>a[0]</code>. With that in mind, a new class, the shape factory, is responsible for defining the vertices of the cube based on some scaling parameters and a coordinate for its center. It returns an array of matrices representing the normal vertices of the cube relative to the center. Here is what the shape factory rectPrism (or cube) function looks like in the code.</p>
<pre><code class="language-typescript">rectPrism(org: Array&lt;number&gt;, scl: Array&lt;number&gt;): Array&lt;math.Matrix&gt; &rbrace;
        size = size.map(s =&gt; s / 2);
        return [
             matrix([org[0] - scl[0], org[1] - scl[1], org[2] + scl[2]]),
            matrix([org[0] + scl[0], org[1] - scl[1], org[2] + scl[2]]),
            matrix([org[0] + scl[0], org[1] + scl[1], org[2] + scl[2]]),
            matrix([org[0] - scl[0], org[1] + scl[1], org[2] + scl[2]]),
            matrix([org[0] - scl[0], org[1] - scl[1], org[2] - scl[2]]),
            matrix([org[0] + scl[0], org[1] - scl[1], org[2] - scl[2]]),
            matrix([org[0] + scl[0], org[1] + scl[1], org[2] - scl[2]]),
            matrix([org[0] - scl[0], org[1] + scl[1], org[2] - scl[2]])
        ];
    &rbrace;
</code></pre>
<p>The user defines the center of the cube in space with the array org, for origin. Then the next array is the scale of each axis, x, y, and z. The user enters the scale as the width of the entire cube on that axis but the program divides these values by two because it creates all of the vertices relative to the origin. It&#39;s hard to visualize, but a cube has 8 vertices, and they are all found by subtracting or adding from the center, but the order needs to be correct. The order starts with the back face on the top left vertex and wraps around the back face clockwise, before starting back at the front face and also wrapping around clockwise. This can also be seen in the code with the first point in the list being the origin - scale on the x, putting it left, the origin + the scale for y, putting it on top, and the origin plus the scale for z, putting it on the back so in total, back top left. This continues for all the other vertices and is returned. The list of vertices is stored in a variable called box in the main, but now comes the most complex part, rotation matrices, and projection matrices. Here is the code in main.ts, it&#39;s kind of a lot, but I encourage you to just take it piece by piece and read the comments.</p>
<pre><code class="language-typescript">// Create the program graphics manager and shape factory
const graphicsManager: GraphicsManager = new GraphicsManager();
const shapeFactory: ShapeFactory = new ShapeFactory();

// Use the shape factory to get a cube at (0, 0, 0) with a height width, and depth of 20 units.
let box: Array&lt;math.Matrix&gt; = shapeFactory.rectPrism([0, 0, 0], [20, 20, 20]);

// The orthographic projection matrix and a fix for the stretched resolution.
const orthoProjection: math.Matrix = matrix([
    [2, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
]);

const frameRate: number = 8;

const init = () =&gt; &rbrace;
    loop();
&rbrace;

const loop = () =&gt; &rbrace;
    // clears the previously drawn code.
    console.clear();
    graphicsManager.background();

    // Applying the projection into a new, properly projected list of points.
    let projectedPoints: Array&lt;math.Matrix&gt; = box.map(p =&gt; &rbrace;
        p = multiply(orthoProjection, p);
        return p;
    &rbrace;);

    // Connect all of the vertices with lines
    graphicsManager.rectPrism(projectedPoints);

    // Print the buffer results to the terminal
    graphicsManager.render();
    // Loop the function based on the framerate in frames / second
    setTimeout(loop, 1000 / frameRate);
&rbrace;

// Start the loop
init();
</code></pre>
<p>Although the comments are pretty self-explanatory, some parts still may not make sense, namely the matrix multiplication. If you don&#39;t understand the way matrix multiplication works, I think it is better to see a visual representation of it. First, to understand a matrix, it is simply a 2D array of numbers. The reason I don&#39;t just use two-dimensional arrays native to JavaScript is that matrices also come with some unique properties and operations. All of the 3D points in the code need to interact with some sort of matrix, and therefore the points themselves need to be matrices. Finally, any matrix that interacts with our points, such as the orthographic projection matrix and rotation matrices, must have 3 columns. This is due to a constraint of matrix multiplication: for A * B,  the columns of A must match the rows of B. Now I&#39;ll direct you to a good <a href="http://matrixmultiplication.xyz/">visualizer for matrix multiplication</a>, just to see what is happening under the hood. now consider this scenario.</p>
<pre><code class="language-typescript">Ortho Matrix 2x3   3D Point 3x1        2D Point 2x1
 | 1 , 0 , 0 |            | 4 |           | 4 |
 | 0 , 1 , 0 |      x     | 6 |     =     | 6 |
                          | 2 |           
</code></pre>
<p>The orthographic projection matrix is what is responsible for converting a 3D point into a 2D. It does this by only taking the x and y values of the 3x1 matrix it is multiplied by, zeroing out the z. This 2D point is then sent to the graphics manager to have lines connected to it and BOOM, 3D graphics! But at this point it doesn&#39;t look very 3D, it is very very 2D. There are two ways to solve this: adding rotations and using a perspective projection matrix. Since I added a draw loop I opted for rotations, which are also calculated with matrix math. Each axis has its rotation matrix but unlike the orthographic projection matrix, rotation matrices depend on a variable, the angle of rotation in radians <code>a</code>. This means I&#39;m able to change the angle, get a new rotation matrix, and rotate the cube in an animation over the draw loop. Here are the rotation matrices for each axis.</p>
<pre><code class="language-typescript">      Rotation X                  Rotation Y                  Rotation Z
| 1, 0,    , 0       |      | cos(a),  0, sin(a) |      | cos(a), -sin(a), 0 |
| 0, cos(a), -sin(a) |      | 0,       1, 0      |      | sin(a), cos(a),  0 |
| 0, sin(a), cos(a)  |      | -sin(a), 0, cos(a) |      | 0,      0,       1 |
</code></pre>
<p>We just have to define these in code and increment the angle by a small amount before calculating the matrices. Finally to use the rotation matrices we just have to rotate the 3D points before they are projected orthographically and we have a SPINNING CUBE. </p>
<pre><code class="language-typescript">angle += 0.05;

let rotationX = matrix([
	[1, 0,               0               ],
	[0, Math.cos(angle), -Math.sin(angle)],
	[0, Math.sin(angle), Math.cos(angle) ]
]);

let rotationY = matrix([
	[ Math.cos(angle), 0, Math.sin(angle)],
	[ 0,               1, 0              ],
	[-Math.sin(angle), 0, Math.cos(angle)]
]);

let rotationZ = matrix([
	[Math.cos(angle), -Math.sin(angle), 0],
	[Math.sin(angle),  Math.cos(angle), 0],
	[0,                0,               1]
]);

let projectedPoints: Array&lt;math.Matrix&gt; = box.map(p =&gt; &rbrace;
	p = multiply(rotationY, p);
	p = multiply(rotationX, p);
	p = multiply(rotationZ, p);
	p = multiply(orthoProjection, p);
	return p;
&rbrace;);
</code></pre>
<p>In this example, I apply all the rotations at the same time, but it&#39;s perfectly possible to assign different angles to different axes and not apply some rotations at all. This is fine for my purposes and the process is identical for tetrahedrons and octahedrons.</p>
<p>This entire mini-project was just a way to dip my toes into 3D rendering and get a feel for it. I don&#39;t know if it&#39;s a problem with JavaScript, Bun, or the Chromebook I&#39;m doing this on, but there&#39;s some annoying flickering going on and assume one of those is the problem. It could also just be my approach but I&#39;m lazy. Anyway, that&#39;s all for EggTUI and its limited 3D features. If you have any questions about the code, feel free to e-mail me at <a href="mailto:&#x68;&#x64;&#105;&#97;&#x6d;&#98;&#114;&#x6f;&#115;&#x69;&#x6f;&#64;&#x67;&#109;&#x61;&#x69;&#108;&#x2e;&#x63;&#x6f;&#x6d;">&#x68;&#x64;&#105;&#97;&#x6d;&#98;&#114;&#x6f;&#115;&#x69;&#x6f;&#64;&#x67;&#109;&#x61;&#x69;&#108;&#x2e;&#x63;&#x6f;&#x6d;</a> but you&#39;re probably better off googling it.</p>
