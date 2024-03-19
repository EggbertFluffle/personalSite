import{a as ke,n as ee}from"../chunks/scheduler.DDaOzR71.js";import{S as Ce,i as Pe,e as o,s as n,c as r,g as s,a as l,b as He,d as a,f as i}from"../chunks/index.BfbdwTR0.js";function De(Ie){let h,te="TUI 3D Graphics",_,c,ae="Three-dimensional graphics are the best thing since 2D graphics, but also many times harder. I've wanted to break into 3D graphics for a while now, namely because of its connection to first-person games like Minecraft or the Call of Duty franchise. But after some surface-level digging, I've found there is a lot more to the third dimension than I first thought.",S,p,ie="Put simply, in 2D graphics, there are pixels in a grid, and that's it. From there all you need to do is manipulate those very pixels to look like whatever your heart desires. And at its core, 3D graphics is no different than 2D graphics. It's still a 2D grid of pixels that you manipulate to look a certain way. The tricky part is that you need to give the illusion of a 3D space with only 2D tools.",E,d,oe='I finally decided to tackle a 3D &quot;engine&quot; of my own as a way to become more familiar with Typescript (more on that later) and to also learn a bit more about the Bun all-in-one silver hammer of JavaScript development that has recently come out. I chose Typescript because I&#39;m already familiar with JavaScript and wanted to learn more about the unfamiliar type of safety it offers, but more importantly, I wanted to learn about 3D graphics, not an entirely new language. I knew far ahead of time that what I would be building was going to end up being very simple. With all that out of the way I present to you, the name, <a href="https://github.com/EggbertFluffle/TUI-3D-Renderer">EggTUI-3D-Renderer</a> (EggTUI for short). Not my best naming work.',A,m,re='At its core EggTUI is just an extremely bare-bones terminal-based 2D graphics "framework". That said it also can (drum roll) display the first 2 platonic solids... spinning! This came later after I realized that with a terrible line drawing algorithm, I could draw some terrible 3D shapes. So what exactly can EggTUI do? It can display lines, triangles, quads, tetrahedrons, cubes, rectangular prisms, and octahedrons, all with some scaling functionality. It does this with a simple pixel buffer, update loop, a some matrix math, provided very kindly by Math.js. Here is where I want to document the progression of EggTUI and its "features".',B,u,se="First up is the pixel buffer, which holds all the 2D pixel-coordinated data. The actual buffer is a 2-dimensional array of strings, meaning that it accesses the pixels in the buffer row-wise, and then column-wise, so ordered pairs are (y, x). This is easily fixed by only allowing the pixel buffer class to interact with the buffer itself, which reverses the x and y for all other classes in the program. Additionally, the pixel buffer class can ensure there are no out-of-bounds exceptions, uses <code>process.stdout.rows</code> and <code>process.stdout.columns</code> to get the native dimensions of the terminal, and translates pixel coordinates to make the center of the screen the origin on all axes. Other than that, it can clear the buffer and convert it into a one-dimensional array of strings that represent each row for easier printing.",R,g,ne="Next, the graphics manager is the heart of the system and acts as the arbiter between the draw loop and the pixel buffer, making a lot of necessary shortcuts and optimizations along the way. It lets the user set the fill and stroke &quot;colors&quot; as well as draw lines. Drawing lines, and doing it well, is the first major hurdle I and many other people have to tackle. It takes an understanding of math and what makes programs performant, to write a good line algorithm. I wrestled with Bresenham&#39;s line-drawing algorithm for a while, but couldn&#39;t understand it no matter how hard I tried, so I resorted to writing my own. Bresenham&#39;s is so fast and the industry standard because It relies heavily on addition and subtraction, with less multiplication or division which are both more costly functions. Despite that, I used what I knew of good ol&#39; <code>y = mx + b</code> to write what&#39;s below.",z,f,le=`<code class="language-typescript">line(p1: math.Matrix, p2: math.Matrix): void }
    let deltaY: number = p2.get([1]) - p1.get([1]); // y2 - y1
    let deltaX: number = p2.get([0]) - p1.get([0]); // x2 - x1
    let m: number = dy / dx;
    let b = -m * p1.get([0]) + p1.get([1]); // Solve for slope intercept

    for(let x = Math.min(p1.get([0]), p2.get([0])); x &lt; Math.max(p1.get([0]), p2.get([0])); x += 1) }
        let coords = matrix([x, m * x + b]); // Solve for y based on the given x
        coords = coords.map(Math.round); // Floor to get valid indicies
        this.pixelBuffer.set(p, this.stroke); // Set the coordinates pixel
    }
}
</code>`,F,x,he="This worked for most lines but as soon as the line's slope got greater than 1, issues arose. The loop finds the y values for a line based on every x value, but x only increases by 1. This can leave large gaps in the line's visual representation. For example, if a line has the solutions (0, 0) and (1, 5), there will be a large gap in the line between y = 1 and y = 4, and this would continue leaving a large dotted streak.",q,y,ce=`<code class="language-typescript">Current System       New System 
    ....#..           7....#..
    .......           6...#...
    ...#...           5...#...
    .......           4..#....
    ..#....           3..#....
    .......           2.#.....
    .#.....           1.#.....
   X1234567
</code>`,U,b,pe="By re-arranging <code>y = mx + b</code> to be <code>x = (y - b) / m</code> it&#39;s possible to get the x value for a line by inputting the y values. So by using this, and handling an exception for vertical lines with a slope of <code>undefined</code>,  the line drawing algorithm is done and looks like this.",N,v,de=`<code class="language-typescript">line(p1: math.Matrix, p2: math.Matrix): void }
    let deltaY: number = p2.get([1]) - p1.get([1]); // y2 - y1
    let deltaX: number = p2.get([0]) - p1.get([0]); // x2 - x1
    let m: number = dy / dx;
    let b = -m * p1.get([0]) + p1.get([1]); // Solve for slope intercept
    let coords: math. Matrix;
    
    if(dx = 0) }
        for(let y = Math.min(p1.get([1]), p2.get([1])); y &lt; Math.max(p1.get([1]), p2.get([1])); y+= 1) }
            coords = matrix([p1.get[0]), y]);
            coords = coords.map(Math.round);
            this.pixelBuffer.set(coords, this.stroke);
        }
    } else if(m &lt;= 1 &amp;&amp; m &gt;= -1) }
        for(let x = Math.min(p1.get([0]), p2.get([0])); x &lt; Math.max(p1.get([0]), p2.get([0])); x += 1) }
            coords = matrix([x, m * x + b]);
            coords = coords.map(Math.round);
            this.pixelBuffer.set(coords, this.stroke);
        }
    } else }
        for(let y = Math.min(p1.get([1]), p2.get([1])); y &lt; Math.max(p1.get([1]), p2.get([1])); y += 1) }
            coords = matrix([(y - b) / m, y]);
            coords = coords.map(Math.round);
            this.pixelBuffer.set(coords, this.stroke);
        }
    }
}
</code>`,X,w,me="It&#39;s not the prettiest, and I still want to get around to understanding Bresenham&#39;s, but it&#39;s a start and fine for a very rudimentary project like this. Other than this the graphics manager is now only responsible for connecting the vertices of shapes like the platonic solids and triangles. To explain the 3D capabilities, I&#39;m just going to use the cube code, but the same process applies to the tetrahedron and the octahedron. All of the 3D points, or vectors, are stored as matrices with 3 rows and 1 column. meaning to get the x of some point <code>a</code>, the getter looks like this: <code>a.get([0])</code>.  The reason I store the 3D points as matrices is because of the math capabilities built into Math.js, so for simpler points, and especially ones that don&#39;t need any matrix math, I use a simple array with 3 elements. so x would be <code>a[0]</code>. With that in mind, a new class, the shape factory, is responsible for defining the vertices of the cube based on some scaling parameters and a coordinate for its center. It returns an array of matrices representing the normal vertices of the cube relative to the center. Here is what the shape factory rectPrism (or cube) function looks like in the code.",O,M,ue=`<code class="language-typescript">rectPrism(org: Array&lt;number&gt;, scl: Array&lt;number&gt;): Array&lt;math.Matrix&gt; }
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
    }
</code>`,Y,T,ge="The user defines the center of the cube in space with the array org, for origin. Then the next array is the scale of each axis, x, y, and z. The user enters the scale as the width of the entire cube on that axis but the program divides these values by two because it creates all of the vertices relative to the origin. It's hard to visualize, but a cube has 8 vertices, and they are all found by subtracting or adding from the center, but the order needs to be correct. The order starts with the back face on the top left vertex and wraps around the back face clockwise, before starting back at the front face and also wrapping around clockwise. This can also be seen in the code with the first point in the list being the origin - scale on the x, putting it left, the origin + the scale for y, putting it on top, and the origin plus the scale for z, putting it on the back so in total, back top left. This continues for all the other vertices and is returned. The list of vertices is stored in a variable called box in the main, but now comes the most complex part, rotation matrices, and projection matrices. Here is the code in main.ts, it's kind of a lot, but I encourage you to just take it piece by piece and read the comments.",G,I,fe=`<code class="language-typescript">// Create the program graphics manager and shape factory
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

const init = () =&gt; }
    loop();
}

const loop = () =&gt; }
    // clears the previously drawn code.
    console.clear();
    graphicsManager.background();

    // Applying the projection into a new, properly projected list of points.
    let projectedPoints: Array&lt;math.Matrix&gt; = box.map(p =&gt; }
        p = multiply(orthoProjection, p);
        return p;
    });

    // Connect all of the vertices with lines
    graphicsManager.rectPrism(projectedPoints);

    // Print the buffer results to the terminal
    graphicsManager.render();
    // Loop the function based on the framerate in frames / second
    setTimeout(loop, 1000 / frameRate);
}

// Start the loop
init();
</code>`,J,k,xe='Although the comments are pretty self-explanatory, some parts still may not make sense, namely the matrix multiplication. If you don&#39;t understand the way matrix multiplication works, I think it is better to see a visual representation of it. First, to understand a matrix, it is simply a 2D array of numbers. The reason I don&#39;t just use two-dimensional arrays native to JavaScript is that matrices also come with some unique properties and operations. All of the 3D points in the code need to interact with some sort of matrix, and therefore the points themselves need to be matrices. Finally, any matrix that interacts with our points, such as the orthographic projection matrix and rotation matrices, must have 3 columns. This is due to a constraint of matrix multiplication: for A * B,  the columns of A must match the rows of B. Now I&#39;ll direct you to a good <a href="http://matrixmultiplication.xyz/">visualizer for matrix multiplication</a>, just to see what is happening under the hood. now consider this scenario.',W,C,ye=`<code class="language-typescript">Ortho Matrix 2x3   3D Point 3x1        2D Point 2x1
 | 1 , 0 , 0 |            | 4 |           | 4 |
 | 0 , 1 , 0 |      x     | 6 |     =     | 6 |
                          | 2 |           
</code>`,Z,P,be="The orthographic projection matrix is what is responsible for converting a 3D point into a 2D. It does this by only taking the x and y values of the 3x1 matrix it is multiplied by, zeroing out the z. This 2D point is then sent to the graphics manager to have lines connected to it and BOOM, 3D graphics! But at this point it doesn&#39;t look very 3D, it is very very 2D. There are two ways to solve this: adding rotations and using a perspective projection matrix. Since I added a draw loop I opted for rotations, which are also calculated with matrix math. Each axis has its rotation matrix but unlike the orthographic projection matrix, rotation matrices depend on a variable, the angle of rotation in radians <code>a</code>. This means I&#39;m able to change the angle, get a new rotation matrix, and rotate the cube in an animation over the draw loop. Here are the rotation matrices for each axis.",K,H,ve=`<code class="language-typescript">      Rotation X                  Rotation Y                  Rotation Z
| 1, 0,    , 0       |      | cos(a),  0, sin(a) |      | cos(a), -sin(a), 0 |
| 0, cos(a), -sin(a) |      | 0,       1, 0      |      | sin(a), cos(a),  0 |
| 0, sin(a), cos(a)  |      | -sin(a), 0, cos(a) |      | 0,      0,       1 |
</code>`,Q,D,we="We just have to define these in code and increment the angle by a small amount before calculating the matrices. Finally to use the rotation matrices we just have to rotate the 3D points before they are projected orthographically and we have a SPINNING CUBE.",V,j,Me=`<code class="language-typescript">angle += 0.05;

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

let projectedPoints: Array&lt;math.Matrix&gt; = box.map(p =&gt; }
	p = multiply(rotationY, p);
	p = multiply(rotationX, p);
	p = multiply(rotationZ, p);
	p = multiply(orthoProjection, p);
	return p;
});
</code>`,$,L,Te='In this example, I apply all the rotations at the same time, but it&#39;s perfectly possible to assign different angles to different axes and not apply some rotations at all. This is fine for my purposes and the process is identical for tetrahedrons and octahedrons.<br/>This entire mini-project was just a way to dip my toes into 3D rendering and get a feel for it. I don&#39;t know if it&#39;s a problem with JavaScript, Bun, or the Chromebook I&#39;m doing this on, but there&#39;s some annoying flickering going on and assume one of those is the problem. It could also just be my approach but I&#39;m lazy. Anyway, that&#39;s all for EggTUI and its limited 3D features. If you have any questions about the code, feel free to e-mail me at <a href="mailto:hdiambrosio@gmail.com">hdiambrosio@gmail.com</a> but you&#39;re probably better off googling it.';return{c(){h=o("h1"),h.textContent=te,_=n(),c=o("p"),c.textContent=ae,S=n(),p=o("p"),p.textContent=ie,E=n(),d=o("p"),d.innerHTML=oe,A=n(),m=o("p"),m.textContent=re,B=n(),u=o("p"),u.innerHTML=se,R=n(),g=o("p"),g.innerHTML=ne,z=n(),f=o("pre"),f.innerHTML=le,F=n(),x=o("p"),x.textContent=he,q=n(),y=o("pre"),y.innerHTML=ce,U=n(),b=o("p"),b.innerHTML=pe,N=n(),v=o("pre"),v.innerHTML=de,X=n(),w=o("p"),w.innerHTML=me,O=n(),M=o("pre"),M.innerHTML=ue,Y=n(),T=o("p"),T.textContent=ge,G=n(),I=o("pre"),I.innerHTML=fe,J=n(),k=o("p"),k.innerHTML=xe,W=n(),C=o("pre"),C.innerHTML=ye,Z=n(),P=o("p"),P.innerHTML=be,K=n(),H=o("pre"),H.innerHTML=ve,Q=n(),D=o("p"),D.textContent=we,V=n(),j=o("pre"),j.innerHTML=Me,$=n(),L=o("p"),L.innerHTML=Te,this.h()},l(e){h=r(e,"H1",{id:!0,"data-svelte-h":!0}),s(h)!=="svelte-bzt92e"&&(h.textContent=te),_=l(e),c=r(e,"P",{"data-svelte-h":!0}),s(c)!=="svelte-vkl1a4"&&(c.textContent=ae),S=l(e),p=r(e,"P",{"data-svelte-h":!0}),s(p)!=="svelte-qxp4of"&&(p.textContent=ie),E=l(e),d=r(e,"P",{"data-svelte-h":!0}),s(d)!=="svelte-q1hrwj"&&(d.innerHTML=oe),A=l(e),m=r(e,"P",{"data-svelte-h":!0}),s(m)!=="svelte-s5xomw"&&(m.textContent=re),B=l(e),u=r(e,"P",{"data-svelte-h":!0}),s(u)!=="svelte-1o87gc0"&&(u.innerHTML=se),R=l(e),g=r(e,"P",{"data-svelte-h":!0}),s(g)!=="svelte-178ysgl"&&(g.innerHTML=ne),z=l(e),f=r(e,"PRE",{"data-svelte-h":!0}),s(f)!=="svelte-1rn21d2"&&(f.innerHTML=le),F=l(e),x=r(e,"P",{"data-svelte-h":!0}),s(x)!=="svelte-u5buax"&&(x.textContent=he),q=l(e),y=r(e,"PRE",{"data-svelte-h":!0}),s(y)!=="svelte-1ec5fxq"&&(y.innerHTML=ce),U=l(e),b=r(e,"P",{"data-svelte-h":!0}),s(b)!=="svelte-pei75s"&&(b.innerHTML=pe),N=l(e),v=r(e,"PRE",{"data-svelte-h":!0}),s(v)!=="svelte-rod8y6"&&(v.innerHTML=de),X=l(e),w=r(e,"P",{"data-svelte-h":!0}),s(w)!=="svelte-a4d4jp"&&(w.innerHTML=me),O=l(e),M=r(e,"PRE",{"data-svelte-h":!0}),s(M)!=="svelte-wuesop"&&(M.innerHTML=ue),Y=l(e),T=r(e,"P",{"data-svelte-h":!0}),s(T)!=="svelte-779x4"&&(T.textContent=ge),G=l(e),I=r(e,"PRE",{"data-svelte-h":!0}),s(I)!=="svelte-iu9w4c"&&(I.innerHTML=fe),J=l(e),k=r(e,"P",{"data-svelte-h":!0}),s(k)!=="svelte-aikwlt"&&(k.innerHTML=xe),W=l(e),C=r(e,"PRE",{"data-svelte-h":!0}),s(C)!=="svelte-1tgx1d5"&&(C.innerHTML=ye),Z=l(e),P=r(e,"P",{"data-svelte-h":!0}),s(P)!=="svelte-1cc1ji8"&&(P.innerHTML=be),K=l(e),H=r(e,"PRE",{"data-svelte-h":!0}),s(H)!=="svelte-1hojshf"&&(H.innerHTML=ve),Q=l(e),D=r(e,"P",{"data-svelte-h":!0}),s(D)!=="svelte-1am68z0"&&(D.textContent=we),V=l(e),j=r(e,"PRE",{"data-svelte-h":!0}),s(j)!=="svelte-1m82906"&&(j.innerHTML=Me),$=l(e),L=r(e,"P",{"data-svelte-h":!0}),s(L)!=="svelte-3ey7p"&&(L.innerHTML=Te),this.h()},h(){He(h,"id","tui-3d-graphics")},m(e,t){a(e,h,t),a(e,_,t),a(e,c,t),a(e,S,t),a(e,p,t),a(e,E,t),a(e,d,t),a(e,A,t),a(e,m,t),a(e,B,t),a(e,u,t),a(e,R,t),a(e,g,t),a(e,z,t),a(e,f,t),a(e,F,t),a(e,x,t),a(e,q,t),a(e,y,t),a(e,U,t),a(e,b,t),a(e,N,t),a(e,v,t),a(e,X,t),a(e,w,t),a(e,O,t),a(e,M,t),a(e,Y,t),a(e,T,t),a(e,G,t),a(e,I,t),a(e,J,t),a(e,k,t),a(e,W,t),a(e,C,t),a(e,Z,t),a(e,P,t),a(e,K,t),a(e,H,t),a(e,Q,t),a(e,D,t),a(e,V,t),a(e,j,t),a(e,$,t),a(e,L,t)},p:ee,i:ee,o:ee,d(e){e&&(i(h),i(_),i(c),i(S),i(p),i(E),i(d),i(A),i(m),i(B),i(u),i(R),i(g),i(z),i(f),i(F),i(x),i(q),i(y),i(U),i(b),i(N),i(v),i(X),i(w),i(O),i(M),i(Y),i(T),i(G),i(I),i(J),i(k),i(W),i(C),i(Z),i(P),i(K),i(H),i(Q),i(D),i(V),i(j),i($),i(L))}}}class _e extends Ce{constructor(h){super(),Pe(this,h,null,De,ke,{})}}export{_e as component};
