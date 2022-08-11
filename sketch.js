const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var rope;
var fruta;
var melon;
var fundo;
var coelho;
var bixo;
var botao;
var botao2;
var botao3;
var piscando;
var comendo;
var triste;
var balao;
var background_som;
var triste_som;
var corte;
var comendo_som;
var balao_som;
var somb;
var rope2;
var rope3;
var restriction2;
var restriction3;

function preload(){
  fundo = loadImage("assets/background.png");
  melon = loadImage("assets/melon.png");
  coelho = loadImage("assets/Rabbit-01.png");
  
  piscando = loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png");
  comendo = loadAnimation("assets/eat_0.png","assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png");
  triste = loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png");
  
  piscando.playing = true;
  comendo.playing = true;
  triste.playing = true;
  comendo.looping = false;
  triste.looping = false;

  background_som = loadSound("assets/sound1.mp3");
  triste_som = loadSound("assets/sad.wav");
  corte = loadSound("assets/rope_cut.mp3");
  comendo_som = loadSound("assets/eating_sound.mp3");
  balao_som = loadSound("assets/air.wav");

}


function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile){
    W = displayWidth;
    H = displayHeight;
    createCanvas(W+80,H)
  }
  else{
    W = windowWidth;
    H = windowHeight;
    createCanvas(W, H);
  }
  frameRate(80);
  background_som.play();
  background_som.setVolume(0.5);
  engine = Engine.create();
  world = engine.world;
  piscando.frameDelay = 20;
  comendo.frameDelay = 20;
  triste.frameDelay = 20;
  var fruta_options = {
    density: 0.001,
  }
  fruta = Bodies.circle(300, 300, 15, fruta_options);
  ground = new Ground(W/2,H,W,20);// ultimo numero e altura deixa 20
  rope = new Rope(6,{x:245, y:30});
  rope2 = new Rope(6,{x:370, y:40});
  rope3 = new Rope(6,{x:400, y:225});

  bixo = createSprite(W*0.25,H-80,100,100);
  bixo.addAnimation("piscando",piscando);
  bixo.addAnimation("comendo",comendo);
  bixo.addAnimation("triste",triste);
  bixo.changeAnimation("piscando")
  bixo.scale = 0.2
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  Matter.Composite.add(rope.body, fruta);
  restriction = new Link(rope, fruta);
  restriction2 = new Link(rope2, fruta);
  restriction3 = new Link(rope3, fruta);
  botao = createImg("assets/cut_btn.png");
  botao.position(220, 30);
  botao.size(50,50);
  botao.mouseClicked(drop);
  botao2 = createImg("assets/cut_btn.png");
  botao2.position(330, 35);
  botao2.size(50,50);
  botao2.mouseClicked(drop2);
  botao3  = createImg("assets/cut_btn.png");
  botao3.position(360, 200);
  botao3.size(50,50);
  botao3.mouseClicked(drop3);




  balao = createImg("assets/balloon.png");
  balao.position(10, 250);
  balao.size(150, 100);
  balao.mouseClicked(air_force);
  somb = createImg("assets/mute.png");
  somb.position(450, 20);
  somb.size(50,50);
  somb.mouseClicked(musica);
  textSize(50);
}

function draw() 
{
  background(51);
  image(fundo,W/2,H/2,W+80,H);
  Engine.update(engine);
  ground.show();
  rope.show();
  rope2.show();
  rope3.show();
  if(fruta!=null){
    image(melon,fruta.position.x, fruta.position.y, 70, 70);
  }
  if(collide(fruta, bixo) == true){
    bixo.changeAnimation("comendo");
    comendo_som.play();
  }
  if(fruta!=null && fruta.position.y>=H*0.9){
    bixo.changeAnimation("triste");
    triste_som.play();
    fruta = null;
  }
  drawSprites();
}

function drop(){
  rope.break();
  restriction.separate();
  restriction = null;
  corte.play();
}

function drop2(){
  rope2.break();
  restriction2.separate();
  restriction2 = null;
  corte.play();
}

function drop3(){
  rope3.break();
  restriction3.separate();
  restriction3 = null;
  corte.play();
}


function collide(body,sprite){
  if(body!=null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if(d < 80){
      World.remove(engine.world, fruta);
      fruta = null;
      return true;
    }
    else{
      return false;
    }
  }
}

function air_force(){
  Matter.Body.applyForce(fruta,{x:0,y:0}, {x:0.01,y:0});
  balao_som.play()
}

function musica(){
  if(background_som.isPlaying()){
    background_som.stop();
  }
  else{
    background_som.play();
  }
}

