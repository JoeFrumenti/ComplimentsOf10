//dist

import './style.css'

import Phaser from '/node_modules/phaser/src'

var h;
var w;

var numberToAdd;
var numberAddImage;
var numbers = [];



var timer = 0;
var timerRunning = false;
var startButton;

var gameObjects = [];

var config = {
        type: Phaser.AUTO,
        width: 1280,
        height: 720,
        // Sets game scaling
        scale: {
            // Fit to window
            mode: Phaser.Scale.FIT,
            // Center vertically and horizontally
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        parent:"gameContainer",
        backgroundColor: '#3fc6f0',

        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);

    function preload ()
    {
      for(let i = 1; i <=10; i++)
      {
        this.load.image('' + i, 'public/assets/' + i + '.png');
      }
      this.load.image('+', 'public/assets/+.png');
      this.load.image('=', 'public/assets/=.png');
      this.load.image('?', 'public/assets/questionmark.png');
      this.load.image('start', 'public/assets/start.png');
      this.load.image('again', 'public/assets/again.png');
    }

    function create ()
    {
      h = this.scale.height;
      w = this.scale.width;
      startButton = this.add.image(w/2, h/2, 'start').setScale(w/6000,w/6000).setInteractive().on('pointerdown', () => {loadGame(this);});
    }

    function shuffle(array) {
      let currentIndex = array.length;

      // While there remain elements to shuffle...
      while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
      }
    }

    function update (time, delta)
    {
      if(timerRunning)
        timer+= delta;
    }

    function newNumberToAdd(game)
    {
      if(numberAddImage != null && numbers.length > 0)
        numberAddImage.destroy();

      if(numbers.length != 0){
        numberToAdd = numbers.pop();
        numberAddImage = game.add.image(w * 0.3, h*0.2, '' + numberToAdd).setScale(w/3000,w/3000);
        console.log(numbers.length);
      }
      else{
        timerRunning = false;
        timer = Math.floor(timer).toFixed(1);
        gameObjects.push(game.add.text(w/2, h/2, "Good job! You finished in " + timer/1000 + " seconds!", {
            fontFamily: '"Press Start 2P"',
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5,0.5).setScale(w/2000,w/2000));

        startButton = game.add.image(w *0.5, h *0.65, 'again').setScale(w/6000, w/6000).setInteractive().on('pointerdown', () => {restart(game);})
      }
    }  

    function populateNumbers()
    {
      for(let i = 1; i < 10; i++)
        numbers.push(i);

      shuffle(numbers);
    }
    
    function restart(game)
    {
      gameObjects.forEach(element => {
        element.destroy();
      });
      timer = 0;
      numberAddImage.destroy();
      
      loadGame(game);
    }

    function loadGame(game)
    {
      startButton.destroy();
      for(let i = 1; i < 10; i++)
      {
        game.add.image(w * i/10, h*0.9, '' + i).setScale(w/6000,w/6000).setInteractive().on('pointerdown', () => {handleClick(i, game);});
        
      }
      populateNumbers();

      
      game.add.image(w * 0.4, h*0.2, '+').setScale(w/1500,w/1500);
      game.add.image(w * 0.5, h*0.2, '?').setScale(w/3000,w/3000);
      game.add.image(w * 0.6, h*0.2, '=').setScale(w/1500,w/1500);
      game.add.image(w * 0.7, h*0.2, '10').setScale(w/3000,w/3000);

      newNumberToAdd(game);


      startTimer();
    }

    function handleClick(number, game)
    {
      if(number + numberToAdd === 10)
        newNumberToAdd(game);
    }

    function startTimer()
    {
      timer = 0;
      timerRunning = true;
    }
