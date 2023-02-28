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

My first step was setting up my background. On tiled, I made a map that I exported as a png. I also exported the collisions layer as an array filled with red tiles for where I want my collisions. In my code, I use convert this array into 2d so the indices match their positions. Then, I generate an array of Boundary objects with the corresponding position for each collision tile. This boundaries array is moved along with my background x amount of pixels everytime I walk a direction. Before I move, I check the distance I'd move to see if a boundary exists. If it does, then I prevent movement(aka I don't move my background).

![image](https://user-images.githubusercontent.com/98565804/206592484-d82975c3-e202-4acf-86ac-2bd9b793dc8f.png)

![image](https://user-images.githubusercontent.com/98565804/206592407-c23d5d7f-17e5-4eae-806d-8b94fa3c0469.png)

To draw out my sprites, I used the drawImage() function for canvas and used all 8 pos args to crop out and resize my sprite. Having a screenWidth and screenHeight property helped me out a lot because they account for the zoom that I apply to the original png of my sprites.
![image](https://user-images.githubusercontent.com/98565804/206596370-03fe211b-390a-4f84-8717-9af6479b92a8.png)

A lot of my other logic came from OOP and defining objects and how to interact between them. Something dificult was having my code interact and update HTML elements because of how much code I felt like I had to write for very simple tasks. 

<hr>
