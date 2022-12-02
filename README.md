# javascript_project_AA

Background:
I am considering making a simple game where the main character is a Pokemon caretaker and gets to interact with the pokemon in their daycare. Obviously, this game would be inspired by Pokemon and some other games like Stardew Valley or Nintendogs. I am planning on making it look much like the original Gameboy Advanced Pokemon games where you view your “world” through a birds eye view and will have my pokemon spread out on a gridded map with trees, grass, etc.. You can move your character up/down/left/right and interact with a pokemon by going up to them and pressing “A”. Some of my ideas for interaction (from easy to more complex) include: 1)choosing a compliment to tell them. 2) having it follow you around 3)having an inventory of berries I can pick from and feed to my pokemon. I am also thinking of having some sort of EXP/friendship tracking for each pokemon. This would get incremented with each interaction, and when it reaches a certain level I can make something happen. I’m unsure if this would require a backend implementation.
For the resources I am planning on using, I am planning on using canvas and pixelated assets downloaded on itch.io. I found some sprites I can use for my character and pokemon. I am not totally sure about these specifics or what I need exactly FYI.

Functionality & MVPs

In PokeValley, users will be able to:
Choose a starter pokemon to raise
Finish tasks to raise your pokemon and evolve it
Walk and interact with pokemon on the given map

In addition, this project will include:
An inventory to select things you can use such as berries
A text box to display dialogue and hints from the game
Readme documenting the outline and overview of the project

WireFrame:
![main_wireframe](https://user-images.githubusercontent.com/98565804/205261038-3e06076e-faf6-404f-b64c-5be07589ad58.png)
![menu_wireframe](https://user-images.githubusercontent.com/98565804/205261279-c4ba9b54-b0c3-42fd-a396-9a5929e72190.png)

My Main Screen will show my map in a bird’s eye view with the character at the center, much like the original pokemon game. Player will move with either WASD or up/down/left/right arrows. Any text that occurs, such as speech from the character and pokemon to narration will occur in the text box that pops up when needed. On the top right, there is a clock to show roughly what time of day it is (I will only implement this if I can figure out how to change the colors of my screen to match night and sunset). Next to the clock is a menu/backpack button, which opens a screen where I can view both my inventory and the menu settings. I am considering making these two separate buttons and screens.

Technologies: I will use Canvas to create my screen. I am planning on creating a Tileset using assets I find on itch.io to make my map. I will use sprites I find on itch.io or elsewhere. Npm will be used for project dependencies

Schedule
Friday Afternoon & Weekend: Designing and making my map after finding relevant assets. Then, I can get started on setting up the rest of my files while researching more on what technologies I specifically need. Start getting canvas set up and make the basic functionality of walking around and rotating through sprite animations.

Monday: Get my pokemon rendered on screen as another entity. Start Implement game logic such as setting up an experience level to my pokemon, which goes up with the completion of tasks. Start on making your tasks
Tuesday: Finish making tasks and anything else to get the core logic and gameplay down
Wednesday:Finish up the logic of the game and story. Smooth any small bugs that are fixable.
Thursday Morning: Make sure it is up and running smoothly.

