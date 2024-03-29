# Wolfenstein Terminal Raycaster

So after watching a video by the youtube [jdh](https://www.youtube.com/watch?v=fSjc8vLMg8c) I was *heavily* inspired to make a Wolfenstein 3D style renderer myself. But after my previous project beign working on the Tui 3D Renderer, I wanted of course to stay int he TUI style. TUI stands for **T**ext **U**ser **I**nterface and most commonly any program with a UI in the terminal will be considered a TUI application. They will almost most commonly be using curses, or in my case [ncurses](https://tldp.org/HOWTO/NCURSES-Programming-HOWTO/), to handle the complex terminal escape codes and portability to other operating systems. I intend to make this an understading of the *math* that goes behind this truely 2d raycast renderer, without delving so much into application. The same principles can be applied in almost any language or graphics medium so I emplore you to come up with a really creative method, shoot me an e-mail if u do! Finnaly, my program in writtenin C++ and is a mess so thats why I'm keeping the actual code present to a minimum.

*Also I like lists to its gonna be a list <3*

## Introduction

Wolfenstein 3D was a revolutionary game that was one of the first "3D" gaming experiences. Thing is, it wasnt actually 3D and the entirety of the game was really happening in 2D. What the player saw was an illusion, the 2D space was "projected" using 2D raycasting. Raycasting in general is a method of graphics where a ray is cast out of every single pixel on the screen to calculate what it collides with and how far it will travel until it collides with something. As you can imagine, thats a lot of math for each pixel, which puts 3 dimensional raycasting way out of the time's computing power. What the authors of Wolfenstein did was extrapolate extra information from ray that were cast only for each x pixel. Additionally, Wolfenstein used a grid to represent it's map, meaning each cell of map was either a wall or empty space and each ray would have to traverse this map grid. Of course raycasting as we know it today hadn't even existed and raycasting in 2 dimensions was actually the first step, 3D came *much* later. 

Put simply, 2D raycasting follows these simple steps:
1. Cast a ray out from the player for each column of pixels on the screen
2. Follow each ray until it collides with a wall or reaches some max distance
3. Use the distance each ray traveled to create vertical lines on the screen
4. Further ray distance = smaller screen line, shorter ray distance = longer screen line

*Thats it.* This was oversimplified to not include some equasions and probably the hardest part, how to calculate distances for each ray but hopefully it demystifies(CHECK THAT SPELLING) how a 2D raycaster like Wolfenstein 3D works.

## First Steps

Again, no platform spesifics, just the math, but first I initialize ncurses and some other important setting inside of ncurses for control handling. At the moment, w, a, s, and d are for strafing, t changes the texturing method which I will touch more on later, m toggles mouse support for the camera and j and k swivel the camera. Finnaly because 2D raycasters are actually 2D, pressing p switches between the perspectives: the top down map, and the actualy 3D projected view. Although the top down is very useful for debugging, the 3D perspective is the real prize.

Here is the map I will be working with. Anything that is not a zero is a wall, the number of each wall comes in later for texturing.

```c++
std::vector<int> map = {
    1, 2, 1, 2, 1, 2,
    2, 0, 0, 0, 0, 1,
    1, 0, 3, 0, 0, 2,
    2, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 2,
    2, 1, 2, 1, 2, 1
};
```

First comes the intial calls to cast rays and as well as collect their distances and a few other bits of data.

```c++
// width is the screen width
int lines = width;
std::vector<float> distances(lines);

// The number assigned to the wall each ray collides with
std::vector<int> hits(lines);

// Important for texturing later
std::vector<float> uTexCoords(lines);

// Cast rays and populate those lists with data
player.TakePerspective(&distances, &hits, &uTexCoords, &map, &scl, &mapWidth, &mapHeight);
```

And `player::TakePerspectives` simply casts a ray for each pixel in the width of the screen and linearly interpolates (lerps) through the players field of view (FOV) to create evently spaced angled for each ray to travel at. This creates a fan of rays centered around the player's angle, or heading. There is also a lot of important map data we pass to almost all of the functions called, those being `scl`, the size of each cell in the map grid, and `map`, `mapWidth`, and `mapHeight`.

```c++
void Player::TakePerspective(std::vector<float>* distances, std::vector<int>* hits, std::vector<float>* uTexCoords, std::vector<int>* map, const float* scl, const int* mapWidth, const int* mapHeight) {
	for(int i = 0; i < distances->size(); i++) {
		distances->at(i) = RayCast(
            hits->at(i), uTexCoords->at(i),
            map, scl, mapWidth, mapHeight,
            // Angle each ray will travel at relative to the player's angle
            lerp(PI * 0.25, PI * -0.25, (float) i / (float) distances->size()));
	}
}
```

## About Raycasting

The actual raycasting is the true meat of this program. There were many edge cases, errors, and **math things** that I had to wrap my head around, but I *think* I got most of them! I will try to put together some good diagrams of the geometry/trig involved, but first things first, what is the most efficient way of doing this raycast? A while ago I had already built a 2D ray caster in JavaScript and an HTML canvas element. Up until this point in code the steps were exactly the same but when it came to actually casting the rays I took a completly different simple, yet far less performant approach. For each ray, a loop will step the ray forward little by little checking after each step until a collision is detected. This isn't great for many reasons, the most glaring being the amount of checks that need to happen for each screen render. 100+ rays are cast and each ray can take anywhere from 25 to 250 checks. Obviously it was a lot easier than the official Wolfenstein implementation and was still a good stepping stoen to the more complex algorithm which I used in the C++ version.

The method I used is performant because of its lack of taxing operations, and being optimized for a grid which is the biggest difference between a Wolfenstein and a DOOM renderer. Wolfenstein took advatage of their map being entirely made out of equally sized squares, while DOOM is a little more complex (or less depending on how comfaterble you are with math). DOOM isn't on a grid meaning it can support different floor/ceiling heights and walls on angles using a system of sectors and portals, while still remaining *computationally* in 2D. Back to Wolfenstein's approach, there are two coodinate systems to keep track of, the map coordinates and the world coordinates. The map coordinates only take into account the map grid. Map space is bound by the `mapWidth` and `mapHeight` variables mentioned before, 8x8 in my case, and is where the coodinates of walls are considered. World coordinates hold the player position and the positions of ray collisions. The main difference is the scale between the two, as I mentioned `mapWidth` and `mapHeight` govern map space, but world space is as wide as the `mapWidth * scl` and as tall as `mapHeight * scl`. World space is entirely the same as the map space, but scalled up by `scl`, in this case 8. With this in mind the `scl` variable is used frequently to flip values between their map space and world space counterparts.

Because player position is held in world space we need a way to get closer to the map space since the walls are held in map space. The first step is to get the slope of our ray from the player angle plus its offset calculated by the `lerp` in the `TakePerspectives` function. From there we find the ray's x and y distance from the wall it is facing. This is done with some modulo (`%`) math but essentiallywe take the players position and find the remainder when divided byt he scale. THis gives us the distance in world space from the right border of the cell the player is currently in, and do the same for player's y position, giving the distance from the bottom of the cell the player is in. That being said the ray may not be pointing down or the right and in that case, we need the same distances but to the left and top of the cell. These are just found by subtracting the values we already calculated from 8. Depending on the direction we will use differnt values to begin finding the ray's distance. We treat the ray as a line in `y = mx + b` form and get it's slope with `float m = -std::tan(rayAngle)`.

Now the actual raycasting happens in two parts, and this is because of the two directions we can step the ray in, the vertical and horizontal directions. First we step the ray forward by 1 map space in the horizontal direciton and some corresponding vertical step based on the slope. We step this ray until we find it has collided with a wall on according to the map vector, the problem being if we only check for collisions after horizontal steps of 1, we could miss a vertical wall since they are being ingnored. For this reason we repeat the proces but instead we step vertically by 1 and use the slope to calculate the corresponding horizontal step. Simmilarly, we continue this until we collide and we collect both collision points. At this point we have two points on the same ray, one colliding with a horizontal wall, and one with a vertical wall. I didn't mention this before, but in case barriers don't exist or the rays stepping either horizontally or vertically never collide with a horizontal or vertical wall respectively, there is a `renderDistance` variable to limit the amount of steps a ray can take. Now the horizontal and vertical ray's have collision points and we can find their distance from the player. The smaller distance is the ray we will return to be our overall collided ray.

In addition to the distance the ray has traveled, we also want to know what exactly it collided with, if anything, and where it collided with that wall, for texturing purposes I will not get into here. What we collided with can be used for simple texturing, for example, colliding with a 2 in the `map` could indicate to the renderer to draw different characters to the screen then if the ray were to collide with a 1 or 3 in the `map`. These values of what is hit and the texture coordinates are stored in the vectors `hits` and `uTexCoords`. These are auxilliary features and the core of the renderer lies in using the distance traveled for each ray *only*.

## The Rendering

From here the process is pretty straight forward. We now have a list of values representing the distance each ray was able to travel before colliding with a wall in a list `distances`. The length of this list is equal to the width of the screen that ncurses provides. This means we will map the length of each ray to the height of a vertical line which are drawn across to populate the screen. Each one is centered vertically and has a value called `fc` or from center. This is the distance from either end of the line, to the vertical center of the window. `fc` is calculated by dividing the height of the screen in pixels, or characters in my case, by the distance of the ray. This gives the effect of having a line almost as high as the window when dividing by a small close ray, which would give the illusion of that rays collision being close. Simmilarly a ray that travels far will divide height by a larger number and produce a shorter line. There is one more thing to mention regarding the raycast itself though. With the algorithm as we have it now, a fisheye effect is created because rays near the end of the player's feild of vision have to travel farther than a ray that is closer because of their off angle. Some slightly more complex trig can be used to rectify this and get the fixed distace for each ray, but I would encourage you to do your own problem solving and research to try to remove this quirk. I hope this helped, if you have any questions feel free to contact me via e-mail or other services. The GitHub repo can be found [here](https://github.com/EggbertFluffle/RaycastRenderer.git). Happy coding!
