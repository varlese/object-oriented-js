(function(){
    // String with all dinos
   const dinosJson = '{"Dinos":[{"species":"Triceratops","weight":13000,"height":114,"diet":"herbavor","where":"North America","when":"Late Cretaceous","fact":"First discovered in 1889 by Othniel Charles Marsh"},{"species":"Tyrannosaurus Rex","weight":11905,"height":144,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"The largest known skull measures in at 5 feet long."},{"species":"Anklyosaurus","weight":10500,"height":55,"diet":"herbavor","where":"North America","when":"Late Cretaceous","fact":"Anklyosaurus survived for approximately 135 million years."},{"species":"Brachiosaurus","weight":70000,"height":"372","diet":"herbavor","where":"North America","when":"Late Jurasic","fact":"An asteroid was named 9954 Brachiosaurus in 1991."},{"species":"Stegosaurus","weight":11600,"height":79,"diet":"herbavor","where":"North America, Europe, Asia","when":"Late Jurasic to Early Cretaceous","fact":"The Stegosaurus had between 17 and 22 seperate places and flat spines."},{"species":"Elasmosaurus","weight":16000,"height":59,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"Elasmosaurus was a marine reptile first discovered in Kansas."},{"species":"Pteranodon","weight":44,"height":20,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"Actually a flying reptile, the Pteranodon is not a dinosaur."},{"species":"Pigeon","weight":0.5,"height":9,"diet":"herbavor","where":"World Wide","when":"Holocene","fact":"All birds are living dinosaurs."}]}';

   // Definition of Dinos object
   function Animals( data ){
        this.items = JSON.parse( data ).Dinos;

        // Create Dino Objects
        this.items = this.items.map( item => {
            return new Dino( ...Object.values( item ) );
        });

        console.log( this.items );

        // Add new object to array
        this.addItem = function( item ){
            this.items.push( item );
        }

        // Compare #1: Gets objects with highest and lowest weight
        this.getHighestWeight = function(){
            let highestWeight;

            this.items.forEach( ( item ) => {
                if( ! highestWeight ){
                    highestWeight = item;
    
                    return;
                }
    
                if( item.weight > highestWeight.weight ){
                    highestWeight = item;
                }
            } ) 
    
            return highestWeight;
        };

        this.getLightestWeight = function() {
            let lightestWeight;
    
            this.items.forEach( ( item ) => {
                if( ! lightestWeight ){
                    lightestWeight = item;
    
                    return;
                }
    
                if( item.weight < lightestWeight.weight ){
                    lightestWeight = item;
                }
            } ) 
    
            return lightestWeight;
        };

        // Compare #2: Gets tallest and shortest object
        this.getTallest = function(){
            let tallest;

            this.items.forEach( ( item ) => {
                if( ! tallest ){
                    tallest = item;

                    return;
                }

                if( item.height > tallest.height ){
                    tallest = item;
                }
            } ) 

            return tallest;
        };

        this.getShortest = function(){
            let shortest;

            this.items.forEach( ( item ) => {
                if( ! shortest ){
                    shortest = item;

                    return;
                }

                if( item.height < shortest.height ){
                    shortest = item;
                }
            } ) 

            return shortest;
        };

        // Get pigeon item
        this.getPigeon = function(){   
            for ( let step = 0; step < this.items.length; step++ ) {
                let dino = this.items[step];
    
                if( dino.species == "Pigeon" ){
                    return dino;
                }
            }

            return null;
        }
    }
    
    // Create random selection of objects
    function getRandomInt( min, max ){
        min = Math.ceil( min );
        max = Math.floor( max );
        return Math.floor( Math.random() * ( max - min ) + min);
    }

    // Dino Constructor
    function Dino( species, weight, height, diet, where, when, fact ){
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
        this.isHeaviest = false;
        this.isLightest = false;
        this.isTallest = false;
        this.isShortest = false;

        // Compare #3: Gets oldest and newest time period
        this.isOldestPeriod = function(){
            return this.when == "Late Jurasic";
        }

        this.isNewestPeriod = function(){
            return this.when == "Holocene";
        }

        // Construct image URL for tiles
        this.getImageUrl = function(){
            return './images/' + this.species + ".png"
        }
    }

    // Human Constructor 
    function Human( name, height, weight, diet ){
        this.species = 'Human';
        this.name = name;
        this.height = parseInt( height, 10 );
        this.weight = parseInt( weight, 10 );
        this.diet = diet;
        this.when = 'Holocene';
        this.where = null;
        this.fact = null;
        this.isHeaviest = false;
        this.isLightest = false;
        this.isTallest = false;
        this.isShortest = false;

        if( ! this.weight ){
            this.weight = 0;
        }

        if( ! this.height ){
            this.height = 0;
        }

        // Compare #3: Gets oldest and newest time period
        this.isOldestPeriod = function(){
            return this.when == "Late Jurasic";
        }

        this.isNewestPeriod = function(){
            return this.when == "Holocene";
        }

        // Construct image URL for tiles
        this.getImageUrl = function(){
            return './images/' + this.species + ".png"
        }
    }
    
    // Generate Tiles for each Dino in Array
    function createTile ( item ){
        const tileClass = document.createAttribute( "class" );

        tileClass.value = "grid-item";

        const tile = document.createElement( 'div' );

        tile.setAttributeNode( tileClass );

        const title = document.createElement( 'h3' );

        const titleContent = document.createTextNode( item.species );
        
        title.appendChild( titleContent );

        tile.appendChild( title );

        const speciesImage = document.createElement( 'img' );

        const speciesImageSrc = document.createAttribute( 'src' );

        speciesImageSrc.value = item.getImageUrl();

        speciesImage.setAttributeNode( speciesImageSrc );

        tile.appendChild( speciesImage );

        const speciesLabel = ( item.species == "Human" ? "human" : ( item.species == "Pigeon" ? "pigeon" : "dino" ) );

        tile.appendChild( createDataEl( "This " + speciesLabel + " belongs to the " + item.when + " era." ) )

        tile.appendChild( createDataEl( "This " + speciesLabel + " is an " + item.diet.toLowerCase() + "." ) )

        tile.appendChild( createDataEl( "This " + speciesLabel + " weighs " + item.weight + " lbs." ) )

        tile.appendChild( createDataEl( "This " + speciesLabel + " is " + item.height + " inches tall." ) )

        if( item.isHeaviest ) {
            tile.appendChild ( createDataEl( item.species + " is the heaviest." ) );
        }

        if ( item.isLightest ) {
            tile.appendChild ( createDataEl( item.species + " is the lightest." ) );
        }

        if( item.isTallest ) {
            tile.appendChild ( createDataEl( item.species + " is the tallest." ) );
        }

        if ( item.isShortest ) {
            tile.appendChild ( createDataEl( item.species + " is the shortest." ) );
        }

        if ( item.species == "Pigeon" ){
            tile.appendChild ( createDataEl( "All birds are dinosaurs." ) );
        }

        return tile;
    };

    function createDataEl ( data ){
        const paragraph = document.createElement( 'p' );

        const addData = document.createTextNode ( data );

        paragraph.appendChild( addData );

        return paragraph;
    };

    // @TODO move into object data
    function generateTiles( items ) {
        animals.getHighestWeight().isHeaviest = true;

        animals.getLightestWeight().isLightest = true;

        animals.getTallest().isTallest = true;

        animals.getShortest().isShortest = true;

        items = items.sort(() => Math.random() - 0.5);

        let human;

        for( let index = 0; index < items.length; index++) {
            if( items[index].species == "Human" ) {
                human = items.splice( index, 1 )[0];
            }
        }

        items.splice( Math.floor(items.length/2), 0, human );

        return items.map( createTile );
    };

    function insertTiles( insertTo, tiles ) {
        tiles.forEach( tile => insertTo.appendChild( tile ) );
    };

    // Remove form from screen
    function removeForm( form ){
        form.remove();
    }

    // Get human data when form is submitted
    const onFormSubmit = function ( event ){
        event.preventDefault();

        const humanForm = new FormData( event.target );

        let humanEntry = {};
        humanForm.forEach(function( value, key ){
            humanEntry[key] = value;
        });

        let humanHeight = ( parseInt( humanEntry.feet, 10)  * 12 ) + parseInt( humanEntry.inches, 10 );

        human = new Human( 
            humanEntry.name, 
            humanHeight, 
            humanEntry.weight, 
            humanEntry.diet 
        )

        animals.addItem(human);

        insertTiles( 
            grid, 
            generateTiles( animals.items ) 
        );

        removeForm( event.target );
    };

    // On button click, prepare and display infographic
    const animals = new Animals( dinosJson );

    const form = document.getElementById( 'dino-compare' );

    const grid = document.getElementById( 'grid' );

    let human;

    form.addEventListener( 'submit', onFormSubmit );

    return; 
})();