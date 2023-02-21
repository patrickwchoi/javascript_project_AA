const Sprite = require("./sprite.js");

const salamenceSprite = new Image();
salamenceSprite.src = './assets/salamence_sprites_31x28.png'
salamenceSprite.width = 31*2;
salamenceSprite.height = 28*4;

class Pokemon extends Sprite{

  constructor({pos, image, ctx, frames = {dimx:1, dimy:1, zoom:1}, pokedexpic, game}){
    super({pos, image, ctx, frames, game});
    this.name = ''
    this.feelings = 'nervous :{'
    this.friendshiplevel = 0;
    this.friendshipmax = 1;
  }
  
  addEntryToPokedex(){ 
    // Get the parent container
    const pokedexContainer = document.querySelector('#pokedex-container');

    // Create a new Pokémon item
    const pokemonItem = document.createElement(`div`);
    pokemonItem.id = `${this.name}-pokedex-item`;
    pokemonItem.classList.add(`pokedex-item`);

    // Create the initial content for the Pokémon item
    const initialContent = document.createElement(`div`);
    initialContent.classList.add(`pokedex-item-initial-content`);

    // Add the Pokémon`s image to the initial content
    const pokemonImage = document.createElement(`img`);
    // pokemonImage.src = `./assets/bagon_face.png`;
    pokemonImage.src = this.pokedexpic.src;
    pokemonImage.height = `50`;
    pokemonImage.width = `50`;
    pokemonImage.classList.add(`pokedex-img-right`);
    initialContent.appendChild(pokemonImage);

    // Add the friendship container to the initial content
    const friendshipContainer = document.createElement(`div`);
    friendshipContainer.classList.add(`pokedex-friendship-container`);

    // Add the Pokémon`s name to the friendship container
    const pokemonName = document.createElement(`h2`);
    pokemonName.classList.add(`pokedex-name`);
    pokemonName.textContent = `${this.name}`;
    friendshipContainer.appendChild(pokemonName);

    // Add the friendship level to the friendship container
    const friendshipLevel = document.createElement(`p`);
    friendshipLevel.classList.add(`pokedex-friendshiplevel`);
    friendshipLevel.textContent = `Friendship Level: 0/${this.friendshipmax}`;
    friendshipContainer.appendChild(friendshipLevel);

    // Add the friendship container to the initial content
    initialContent.appendChild(friendshipContainer);

    // Add the initial content to the Pokémon item
    pokemonItem.appendChild(initialContent);

    // Add the Pokémon item to the pokedex container
    pokedexContainer.appendChild(pokemonItem);
  }
  updatePokedexEntry(){
    const friendshipLevel = document.querySelector(`#${this.name}-pokedex-item .pokedex-friendshiplevel`);
    friendshipLevel.textContent = `Friendship Level: ${this.friendshiplevel}/${this.friendshipmax}`;
  }

  draw(){//draw image of sprite
    this.ctx.drawImage(this.image, 
    this.frames.xval*this.width, 
    this.frames.yval*this.height,
    this.width, 
    this.height, //first 4 args are cropping sprite, if needed
    this.pos[0],
    this.pos[1], //where on canvas we place james, from the top left corner
    this.screenWidth,
    this.screenHeight); //how big img is onscreen

    if (!this.moving) { //removing this code will always make bagon animate walking
      this.frames.xval=0;
      return;}
    this.frames.elapsed++
    if (this.frames.elapsed%15===0){
      if (this.frames.xval < this.frames.dimx-1) this.frames.xval++
      else this.frames.xval=0;
    }
  }
  fillDialogue(){
    return {
      empty: '...', 
      roar: 'Rawr!! >:O',
      eating: 'nomnomnom ^~^',
      happy: 'Rawr!! :}'
  }
  }

  clickedOn(){ 
    console.log(`pokemon class clickedOn method!`)
    } 
  defaultInteraction(){
  }

}

module.exports = Pokemon;