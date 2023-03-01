const Sprite = require("./sprite.js");
const Utils = require("../utils.js");

const james = new Image();
james.src = "./assets/james_sprites.png";
james.width = 16*3;
james.height = 20*4;

const jessie = new Image();
jessie.src = "./assets/Jessie_16x20.png";
jessie.width = 16*3;
jessie.height = 20*4;

class Player extends Sprite{

  constructor({pos, image, ctx, frames, game, pokemon}){
    super({pos, image, ctx, frames, game})
    this.pokemon = pokemon;
    this.prevPos = this.pos
    this.stepsMoved = 0;
    this.posForPokemon = [this.pos[0]-this.pokemon.width*2, this.pos[1]] //25 is guess for pokemons width
    this.moving = false;
    this.inventory={};
    this.metTogepiMom = false;
  }

  metMom(){
    this.metTogepiMom = true;
  }
  changeToJessie(){
    this.image = jessie;
    console.log('player')
  }
  changeToJames(){
    this.image = james;
  }
  pickupItem(item){
    if (this.inventory[item.name]){
      this.inventory[item.name] += 1
      this.addItemToInventoryRight(item)
    } else {
      this.inventory[item.name] = 1
      this.addItemToInventoryRight(item)
    }
    item.pickedup = true;
    Utils.changeDialogueText2(`Picked up an ${item.name}`)
  }
  addItemToInventoryRight(item){
    const inventory = document.getElementById('inventory-container');
    let inventoryItem;
    if (item.pickedup === false){
      inventoryItem = document.createElement(`div`);
      inventoryItem.id = `${item.name}-inventory-element`;
      inventoryItem.classList.add(`inventory-element`);
    } else {
      inventoryItem = document.getElementById(`${item.name}-inventory-element`);
    }
    
    const itemImage = document.createElement(`img`);
    itemImage.src = item.pokedexpic.src;
    itemImage.height = `50`;
    itemImage.width = `50`;
    itemImage.classList.add(`inventory-img-right`);
    inventoryItem.appendChild(itemImage);

    const itemName = document.createElement(`h2`);
    itemName.classList.add(`inventory-name`);
    itemName.textContent = `${item.name}`;
    inventoryItem.appendChild(itemName);

    const itemQuantity = document.createElement(`p`);
    itemQuantity.classList.add(`inventory-quantity`);
    itemQuantity.textContent = `Quantity: ${this.inventory[item.name]}`;
    inventoryItem.appendChild(itemQuantity);

    inventory.appendChild(inventoryItem);
  }

  // updateInventoryRightScreen(){ //I realized this doesnt work bc player.inventory only carries strings and numbers, not the actual item objects
  //   const inventory = document.getElementById('inventory-container');
  //   inventory.innerHTML = '';
  //   for (let item in this.inventory){
  //     this.addItemToInventoryRight(item)
  //   }
  // }

  removeItemFromRight(itemName){
    const inventory = document.getElementById('inventory-container');
    const item = document.getElementById(`${itemName}-inventory-element`);
    inventory.removeChild(item);
  }
  removeItem(itemName){
    if (this.inventory[itemName]){
      this.inventory[itemName] -= 1
      this.removeItemFromRight(itemName);
    } else{
      Utils.changeDialogueText2(`You don't have an ${itemName}!`)
    }
  }
  
}
module.exports = Player;