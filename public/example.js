class Example extends Phaser.Scene {
	constructor() {
		super({key:"Example"});
	}

	preload(){
		//loading progress bar
		var progress = this.add.graphics();

    this.load.on('progress', function (value) {

        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, 270, 800 * value, 60);

    });

    this.load.on('complete', function () {

        progress.destroy();

    });
    /////////////////////////////////////////////

    //load image assets
		this.load.image('logo', 'assets/servbot.png');
		this.load.image('background', 'assets/cityScape.jpg');
		this.load.image('tiles', 'assets/map/tileset_forest.png');
		this.load.image('me1', 'assets/braids.JPG');
		this.load.image('me2', 'assets/theChair.JPG');
		// this.load.image('big-hills', 'assets/map/hills1.png');
		// this.load.image('small-hills', 'assets/map/hills2.png');
		// this.load.image('green-hills', 'assets/map/hills3.png');
		// this.load.image('treeLayer', 'assets/map/hills4.png');
		// this.load.image('floorLayer', 'assets/map/hills5.png');
		// this.load.image('dark-hills', 'assets/map/hills6.png');
		this.load.tilemapTiledJSON('map', 'assets/map/aboutMeMap.json');
		this.load.spritesheet('player', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
		
		var map;
	}


	create() {
		//loads an image object or sprite
		// this.add.image(400,300, 'big-hills');
		// this.image = this.add.image(400,300,'logo');
		this.image = this.add.image(900,250,'background');
		this.image2 = this.add.image(73,60, 'me1');
		this.image3 = this.add.image(1468, 325,'me2');

		this.image2.setScale(.1);
		this.image3.setScale(.16);
		//Lets Add Text For Controls
		let controlsArr = [
        'The Controls',
				'A : Camera Left',
				'D : Camera Right',
				'Up : Jump',
				'Left : Run Left',
				'Right : Run Right' 
    ];

    let contactInfo = [
    		'			 			Contact Info',
    		'Email : brendenw7@gmail.com'
    ];

    let intro = [
    	'HI. Welcome to my beta About-Me level design.',
    	'It is definately not perfect but, I love to challenge',
    	'myself to go beyond.'
    ];

    let funFacts = [
    	': Some fun facts to get to know me : ',
    	' I danced on a spanish dance team.',
    	' I am an avid reader and Philosopher.',
    	' I take all challengers in all games.',
    	' I started an LLC once.'
    ];

    let details = [
    	'I was drawn to computers as a kid and have seen',
    	'that coding gives me the freedom to deep dive into',
    	'a topics and build something with my hardwork.',
    	'There may be great money in coding but my passion',
    	'is building working applications that can help ',
    	'others.'
    ];

    var controlsText = this.add.text(25, 200, controlsArr, 'Shadow Fill', { fontFamily: 'Arial', color: '#c20ed5' });
    controlsText.setStroke('#7d0f4e', 10);

    let contactText = this.add.text(1135, 350, contactInfo, 'Shadow Fill', { fontFamily: 'Arial', color: '#6b3136', linespacing:10});
    contactText.setStroke('#6b3136', 14);

    let introText = this.add.text(350,10, intro, 'Shadow Fill',{ fontFamily: 'Arial', color: '#2edb97', fontSize:16});
    introText.setStroke('#7d0f4e', 10)

    let detailsText = this.add.text(1000,75, details, 'Shadow Fill',{ fontFamily: 'Arial', color: '#7d0f4e', fontSize:14});
    detailsText.setStroke('#7d0f4e', 8);

    let funFactsText = this.add.text(475, 215, funFacts, 'Shadow Fill',{ fontFamily: 'Arial', color: '#6b3136'});
    funFactsText.setStroke('#7d0f4e', 8);

		//lets add a tile map
		var map = this.make.tilemap({ key: 'map' });
    var tileset = map.addTilesetImage('magicForest', 'tiles');

    var layer = map.createStaticLayer(0, tileset, 0, -100);
    //let floor = [30,31,32,33,68,69,72,74,75,77,113,117,118,182,190,175,176,177,250,251,222,204,233,79,80];

    map.setCollision([30,31,32,33,68,69,72,74,75,77,79,80,113,117,118,175,176,177,182,190,204,222,233,250,251])

    //create sprites68
    //let platforms;
    //platforms = this.physics.add.staticGroup();
   // let ground = this.add.sprite(180,400, 'magicForest');
    //this.physics.add.existing(ground);

    //sprite physics
    player = this.physics.add.sprite(100, 400, 'player', 0);

		player.setBounce(0.2);
		player.setCollideWorldBounds(false);
		player.body.setGravityY(200);

		this.anims.create({
		    key: 'left',
		    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
		    frameRate: 10,
		    repeat: -1
		});

		this.anims.create({
		    key: 'turn',
		    frames: [ { key: 'player', frame: 4 } ],
		    frameRate: 20
		});

		this.anims.create({
		    key: 'right',
		    frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
		    frameRate: 10,
		    repeat: -1
		});

		this.physics.add.collider(player, layer);


    // var floorLayer = map.createStaticLayer('floorLayer', tileset, 0, 0);
    // var bigHills = map.createStaticLayer('big-hills', tileset, 0, 0);
    // var smallHills = map.createStaticLayer('small-hills', tileset, 0, 0);
    // var greenHills = map.createStaticLayer('green-hills', tileset, 0, 0);
    // var treesLayer = map.createStaticLayer('treeLayer', tileset, 0, 0);
    // var darkHills = map.createStaticLayer('dark-hills', tileset, 0, 0);


    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: this.cameras.main,
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        // up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        // down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),        
        speed: 0.5
    };

    controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
    //controls = new Phaser.Cameras.pan();


		//////////////////////////////////////////////////

		//event handling method to movment input
		// this.input.keyboard.on('keyup_D', function(event){
		// 	this.image.x += 10;
		// },this);

		// this.input.on('pointerdown', function(event){
		// 	this.image.x = event.x;
		// 	this.image.y = event.y;
		// },this);

		// this.input.keyboard.on('keyup_P', function(event){
		// 	var physicsImage = this.physics.add.image(this.image.x, this.image.y, 'logo');
		// 	physicsImage.setVelocity(Phaser.Math.RND.integerInRange(-100,100),-300);
		// },this);

		this.physics.add.collider(player, platforms);

		//move right
		this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		//polling method to input / move left
		this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

		console.log(player);
	}

	//updates as long as the key is down. can be fast
	update(time, delta){
		// if(this.key_A.isDown){
		// 	this.player.x--;
		// }
		// if(this.key_D.isDown){
		// 	this.player.x++;
		// }
		// if(this.key_W.isDown){
		// 	this.player.y--;
		// }
		// if(this.key_S.isDown){
		// 	this.player.y++;
		// }

		////////sprite control
		 if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-200);
    }

		controls.update(delta);
	}
}

/*
<div class="controls">
		<p><span>The Controls:</span><br>
			<strong>A</strong> = Camera Left<br>
			<strong>D</strong> = Camera Right<br>
			<strong>Up</strong> = Jump<br>
			<strong>Left</strong> = Run Left<br>
			<strong>Right</strong> = Run Right 
		</p>
	</div>	
*/