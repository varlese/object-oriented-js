    const dinosJson = '{"Dinos":[{"species":"Triceratops","weight":13000,"height":114,"diet":"herbavor","where":"North America","when":"Late Cretaceous","fact":"First discovered in 1889 by Othniel Charles Marsh"},{"species":"Tyrannosaurus Rex","weight":11905,"height":144,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"The largest known skull measures in at 5 feet long."},{"species":"Anklyosaurus","weight":10500,"height":55,"diet":"herbavor","where":"North America","when":"Late Cretaceous","fact":"Anklyosaurus survived for approximately 135 million years."},{"species":"Brachiosaurus","weight":70000,"height":"372","diet":"herbavor","where":"North America","when":"Late Jurasic","fact":"An asteroid was named 9954 Brachiosaurus in 1991."},{"species":"Stegosaurus","weight":11600,"height":79,"diet":"herbavor","where":"North America, Europe, Asia","when":"Late Jurasic to Early Cretaceous","fact":"The Stegosaurus had between 17 and 22 seperate places and flat spines."},{"species":"Elasmosaurus","weight":16000,"height":59,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"Elasmosaurus was a marine reptile first discovered in Kansas."},{"species":"Pteranodon","weight":44,"height":20,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"Actually a flying reptile, the Pteranodon is not a dinosaur."},{"species":"Pigeon","weight":0.5,"height":9,"diet":"herbavor","where":"World Wide","when":"Holocene","fact":"All birds are living dinosaurs."}]}';

    const dinosData = JSON.parse(dinosJson);

    // Create Dino Constructor

    function Dino(species, weight, height, diet, where, when, fact) {
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

    // Create Human Object

    function Human(name, height, weight, diet) {
        this.species = 'human';
        this.name = name;
        this.height = parseInt( height, 10 );
        this.weight = parseInt( weight, 10 );
        this.diet = diet;
        this.when = 'current';
        this.where = null;
        this.fact = null;
    }
    
    // Use IIFE to get human data from form

    const form = document.getElementById('dino-compare');

    let humans = []

    const onFormSubmit = function (event){
        event.preventDefault();

        const humanForm = new FormData(event.target);

        let humanEntry = {};
        humanForm.forEach(function(value, key){
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
        
    };
    
    form.addEventListener('submit', onFormSubmit)

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
