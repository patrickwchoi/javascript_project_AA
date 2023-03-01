<h2>Bagon Adventures</h2>

Link: https://patrickwchoi.github.io/javascript_project_AA/ 

<h3>Overview:</h3>
Instructions: As a member of Team Rocket, you find yourself lost and separated from your crew after being blasted into space yet again. When you wake up, you find a friendly Bagon by your side. You realize that if you evolve this Bagon, you can use them to fly back home! 
<hr>

GOAL: Evolve Bagon by finding ways to increase your friendship level! You can check friendship level with the pokedex on the menu.

Controls: Use WASD to move, use your mouse to interact with things on screen.

<h3>Features: </h3>

<li>Using WASD to move background image, boundaries, and in-game objects</li>
<li> Adding collision detection to match the setting </li>
<li> Interacting with pokemon in-game by clicking </li>
<li> DRY DOM manipulation to update components based on in-game statistcs and actions </li>
<li> Algorithms to traverse spritesheet in relevant manner depending on action </li>


![image](https://user-images.githubusercontent.com/98565804/221733509-3662d713-41c2-4f7f-b711-0d115d32a235.png)

<hr>


Technologies: HTML Canvas, Vanilla JS, HTML/CSS. Used Tiled to build a gridded map along with an array of boundary tiles.

<hr>

<h3>Implementation: </h3>

My code can loosely be broken down to two parts: Game functionality and Game Content/Progression.

<h4> Functinoality </h4>

My first week was largely spent getting my movement and interaction with canvas to work.

My first step was setting up my background. On tiled, I made a map that I exported as a png. I also exported the collisions layer as an array filled with red tiles for where I want my collisions. In my code, I use convert this array into 2d so the indices match their positions. Then, I generate an array of Boundary objects with the corresponding position for each collision tile. This boundaries array is moved along with my background x amount of pixels everytime I walk a direction. Before I move, I check the distance I'd move to see if a boundary exists. If it does, then I prevent movement(aka I don't move my background).

![image](https://user-images.githubusercontent.com/98565804/206592484-d82975c3-e202-4acf-86ac-2bd9b793dc8f.png)

![image](https://user-images.githubusercontent.com/98565804/206592407-c23d5d7f-17e5-4eae-806d-8b94fa3c0469.png)

To draw out my sprites, I used the drawImage() function for canvas and used all 8 pos args to crop out and resize my sprite. Having a screenWidth and screenHeight property helped me out a lot because they account for the zoom that I apply to the original png of my sprites. I also have a this.moving attribute for all my sprites and if this is set to true, I rotate through the sprite's spritesheet.
![image](https://user-images.githubusercontent.com/98565804/222202160-5425c96d-222b-47e5-b0c0-08081e86f6a6.png)


<h4> Game Content</h4>

Game Content was contained in its respective classes. First I need to DOM manipulate the bottom and right components of my screen as the player interacts with the game. This was a challenge I faced early on as I was having trouble update these efficiently with vanilla JS. But as I began refactoring my work after I worked on other projects, I had a much easier time DRYing my code and working more efficiently. In my utils file, I created functions such as these to DOM manipulate my components anywhere in my code.
![image](https://user-images.githubusercontent.com/98565804/221798939-61532a52-209b-4672-897a-c9868aaf2b1a.png)



<hr>
