var dog,sadDog,happyDog;
var feed,addfood,food
var database


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {

  database = firebase.database();

  createCanvas(1000,400);

  food = new Food()

  database.ref("food").on("value",readStock)
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the dog")
  feed.position (700,95)
  feed.mousePressed(feedDog)

  addfood = createButton("Add food")
  addfood.position(800,95)
  addfood.mousePressed(addFoods)

  food = new Food()

  database.ref("food").on("value",readStock)
}

function draw() {
  background(46,139,87);
  
  food.display();

  drawSprites();
}

function readStock(data){
  foodS = data.val()
  food.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog)

  if(food.getFoodStock()<=0){
    food.updateFoodStock(food.getFoodStock()*0);
  }else{
    food.updateFoodStock(food.getFoodStock()-1);
  }
}

function addFoods(){
 foodS++;
 database.ref('/').update({
   Food:foodS
 })
}




