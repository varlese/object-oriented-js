    const dinosJson = '{"Dinos":[{"species":"Triceratops","weight":13000,"height":114,"diet":"herbavor","where":"North America","when":"Late Cretaceous","fact":"First discovered in 1889 by Othniel Charles Marsh"},{"species":"Tyrannosaurus Rex","weight":11905,"height":144,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"The largest known skull measures in at 5 feet long."},{"species":"Anklyosaurus","weight":10500,"height":55,"diet":"herbavor","where":"North America","when":"Late Cretaceous","fact":"Anklyosaurus survived for approximately 135 million years."},{"species":"Brachiosaurus","weight":70000,"height":"372","diet":"herbavor","where":"North America","when":"Late Jurasic","fact":"An asteroid was named 9954 Brachiosaurus in 1991."},{"species":"Stegosaurus","weight":11600,"height":79,"diet":"herbavor","where":"North America, Europe, Asia","when":"Late Jurasic to Early Cretaceous","fact":"The Stegosaurus had between 17 and 22 seperate places and flat spines."},{"species":"Elasmosaurus","weight":16000,"height":59,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"Elasmosaurus was a marine reptile first discovered in Kansas."},{"species":"Pteranodon","weight":44,"height":20,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"Actually a flying reptile, the Pteranodon is not a dinosaur."},{"species":"Pigeon","weight":0.5,"height":9,"diet":"herbavor","where":"World Wide","when":"Holocene","fact":"All birds are living dinosaurs."}]}';

    const dinosData = JSON.parse( dinosJson );

    // Create Dino Constructor

    function Dino( species, weight, height, diet, where, when, fact ) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

    // Create Dino Objects

    let dinos = []

    dinosData.Dinos.forEach( dino => {
        dinos.push( new Dino( ...Object.values( dino ) ) );
    });

    // Create random selection of Dino objects

    function getRandomInt( min, max ) {
        min = Math.ceil( min );
        max = Math.floor( max );
        return Math.floor( Math.random() * ( max - min ) + min);
    }

    function getPigeon( dinos ) {
        let cloneDinos = [...dinos];

        for ( let step = 0; step < cloneDinos.length; step++ ) {
            let dino = cloneDinos[step];

            if( dino.species == "Pigeon") {
                var pigeon = dino;

                cloneDinos.splice( step, 1 );

                break;
            }
        }

        return { 
            dinos: cloneDinos, 
            pigeon: pigeon 
        };
    }

    function getRandomUniqueDinos( dinos, quantity ) {
        let selectedDinos = [];

        let cloneDinos = [...dinos]; 

        for (let step = 0; step < quantity; step++) {
            let dinoIndex = getRandomInt( 0, cloneDinos.length ); 

            selectedDinos.push( cloneDinos[dinoIndex] );

            cloneDinos.splice( dinoIndex, 1 );
        }

        return selectedDinos;
    };

    // Create Human Object

    function Human( name, height, weight, diet ) {
        this.species = 'human';
        this.name = name;
        this.height = parseInt( height, 10 );
        this.weight = parseInt( weight, 10 );
        this.diet = diet;
        this.when = 'Holocene';
        this.where = null;
        this.fact = null;
    }
    
    // Use IIFE to get human data from form

    const form = document.getElementById( 'dino-compare' );

    let humans = []

    const onFormSubmit = function ( event ){
        event.preventDefault();

        const humanForm = new FormData(event.target);

        let humanEntry = {};
        humanForm.forEach(function( value, key ){
            humanEntry[key] = value;
        });

        let humanHeight = ( parseInt( humanEntry.feet, 10)  * 12 ) + parseInt( humanEntry.inches, 10 );

        let humanObject = new Human( 
            humanEntry.name, 
            humanHeight, 
            humanEntry.weight, 
            humanEntry.diet 
        )
        
        humans.push( humanObject );

        const pigeonData = getPigeon( dinos );

        getHighestHeight( dinos, pigeonData.pigeon, humanObject );

        console.log(pigeonData);

        console.log( getRandomUniqueDinos( pigeonData.dinos, 7 ));
        
    };
    
    form.addEventListener('submit', onFormSubmit)

    // Create Dino Compare Method - Weight
    function getHighestWeight( dinos, pigeon, human ) {
        let highestWeight = pigeon;

        if( human.weight > highestWeight.weight ) {
            highestWeight = human;
        }
        
        dinos.forEach( ( dino ) => {
            if( dino.weight > highestWeight.weight) {
                highestWeight = dino;
            }
        } ) 

        return highestWeight;
    };
    
    // Create Dino Compare Method - Height
    function getHighestHeight( dinos, pigeon, human ) {
        let highestHeight = pigeon;

        if( human.height > highestHeight.height ) {
            highestHeight = human;
        }
        
        dinos.forEach( ( dino ) => {
            if( dino.height > highestHeight.height) {
                highestHeight = dino;
            }
        } ) 

        console.log(highestHeight);

        return highestHeight;
    };

    // Create Dino Compare Method - Time Period
    function isOldestPeriod( item ) {
        return item.when == "Late Jurasic";
    }

    function isNewestPeriod( item ) {
        return item.when == "Holocene";
    }

    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
