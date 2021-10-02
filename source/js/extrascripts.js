$(document).ready(function() {


  var target = $('.text-block p');
  target.html('');

  for ( var i = 0; i < 1; i++ ) {
    name 

    target.append('<span class="name">' + nameYourOldOne() + '</span>. <span class="honorific">' + getAnHonorific() + '</span>.</br>' );
  }

  // $('.name').text(nameYourOldOne());    
  // $('span.honorific').text(getAnHonorific());



});




// make a name
function nameYourOldOne() {

  //the variable for the name
  var oldonesname = "";

  // a selection of name parts
  var nameparts = ["cth", "gg", "la", "ha", "dh", "mb", "xa", "x", "äe", "cy", "ura", "iogh", "obo", "ee", "h", "nar", "lut", "oth", "mo", "rol", "ab", "u", "lu", "z", "v", "ny", 'vhu', 'zil', 'abh', 'ay', 'az', 'bas', 'bya', 'cro', 'cto', 'en'];


  // set odds for how many parts the name will have
  var oddsLengthOfName = {
      2:5,
      3:400,
      4:400,
      5:30,
      6:5,
      7:2
    };

  // use odds to select number of parts in name from list
  var lengthOfName = weighted_randomiser(Object.keys(oddsLengthOfName), Object.values(oddsLengthOfName));

  // //decide whether to include a dash
  var dashPosition;
  var oddsOfDash = {
    "yes": 4,
    "no": 6
  };
  var includesDash =  weighted_randomiser(Object.keys(oddsOfDash), Object.values(oddsOfDash));

  // pick dash position
  if (includesDash == "yes") {
    dashPosition = Math.floor((Math.random() * (lengthOfName-1)));
  }

  //decide whether to include apostrophe
  var apostropheposition;
  var oddsOfApostrophe = {
    "no": 50,
    "yes": 10,
    "opening": 1
  }
  var includeApostrophe = weighted_randomiser(Object.keys(oddsOfApostrophe), Object.values(oddsOfApostrophe));

  // pick apostrophe position
  if (includeApostrophe == "yes") {
    apostropheposition = Math.floor((Math.random() * (lengthOfName-1)));
  } else if (includeApostrophe == "opening") {
    oldonesname = "’";
  }


  // loop for number of name parts and construct name
  for ( var i = 0; i < lengthOfName; i++ ) {


    pickednamepartnumber = Math.floor(Math.random() * nameparts.length);
    pickednamepart = nameparts[pickednamepartnumber];


    nameparts.splice(pickednamepartnumber, 1);

    oldonesname = oldonesname + pickednamepart;

    if (i == dashPosition) {
       oldonesname = oldonesname + '-';
    } else if (i == apostropheposition) {
       oldonesname = oldonesname + '’';
    }

  }


  // name quality control
  var rejectName = false;
  // check if dash by end or by start 
  if (/-.$/.test(oldonesname) || /^.-/.test(oldonesname)) {
    return nameYourOldOne();
  }

  return oldonesname;

}


//make an honorific
function getAnHonorific() {

  //set variable for honorific
  var honorific = "";

  // set odds of preceding the honorific with an article
  var oddsOfThe = {
    "The " : 105,
    "A " : 1,
    "" : 15
  }

  // decide if/which article to include and add it
  var includeThe = weighted_randomiser(Object.keys(oddsOfThe), Object.values(oddsOfThe));


  // set the possible descriptor parts, divided up based on needs
  var descriptorsOnlyFirst = ['watery', 'shining', 'faceless', 'silent', 'terrifying', 'great', 'many', 'swallowing', 'oceanic', 'ravenous', 'serpent-bearded', 'crooked', 'burning', 'dream', 'offspring', 'destroying', 'tentacled', 'contagious', 'unspeakable', 'unknowable', 'grey', 'birth womb', 'eternal', 'harbringer of', 'many-faced', 'forgotten', 'suppurating', 'festering', 'wicked', 'tenebrous', 'horned', 'blood-mad', 'dissonant', 'dread', 'oldest', 'fiery', 'many-tentacled','whirling', 'wretched', 'twisted'];
  var descriptorsOnlySecond = ['mist', 'god', 'woods', 'water', 'of illusions', 'of reality', 'of diseases', 'dust', 'who dwells beneath our feet', 'endless void', 'beneath', 'which should not be'];
  var descriptorsEither = ['dark', 'twin', 'devourer', 'fallen', 'beast', 'devil', 'demon', 'demon-god', 'angel', 'master', 'all-consuming', 'defiler', 'burrower', 'mistress', 'worm', 'one', 'haunter', 'blind', 'kraken', 'squid', 'toad', 'widow', 'eyes', 'spider', 'serpent', 'mother', 'horror', 'feeder', 'ever-living', 'ever-consuming', 'terror', 'worm-god', 'thing', 'lizard', 'matriarch', 'horror', 'spawn', 'unknown', 'abomination', 'cancer', 'stalker', 'leech', 'blasphemy', 'walker', 'blood', 'pain', 'goat', 'being', 'obscenity', 'black lord'];
  var requiresConnectorIfFirst = ['devourer', 'one', 'birth womb', 'lord', 'blasphemy', 'walker'];
  var requiresConnectorIfSecond = ['woods', 'water', 'dust', 'endless void'];
  var hatesConnectorIfFirst = ['watery', 'shining', 'faceless', 'silent', 'terrifying', 'great', 'many', 'swallowing', 'oceanic', 'ravenous', 'all-consuming', 'great', 'oceanic', 'destroying', 'tentacled', 'contagious', 'unspeakable', 'unknowable', 'grey', 'many-tentacled', 'eternal', 'harbringer of', 'many-faced', 'forgotten', 'suppurating', 'festering', 'tenebrous', 'horned', 'blood-mad', 'dissonant', 'dread', 'oldest', 'fiery', 'whirling', 'twisted'];
  var hatesConnectorIfSecond = ['defiler', 'burrower', "one", "demon-god", 'feeder', 'of illusions', 'of reality', 'in the pit', 'devourer', 'of diseases', 'who dwells beneath our feet', 'beneath', 'which should not be'];
  var onlyNonAbstractConnectorIfFirst= ['birth womb', 'walker']
  var onlyNonAbstractConnectorIfSecond = ['mistress', 'toad', 'haunter', 'worm', 'widow', 'eyes', 'mother', 'terror', 'thing', 'master', 'crooked', 'serpent', 'blind', 'lizard', 'dust', 'endless void', 'demon', 'pain', 'goat', 'being', 'obscenity']

  //test set of descriptors
  // var descriptorsOnlyFirst = ['happy'];
  // var descriptorsOnlySecond = ['woods', 'cheese'];
  // var descriptorsEither = [];
  // var requiresConnectorIfFirst = [];
  // var requiresConnectorIfSecond = ['woods'];
  // var hatesConnectorIfFirst = [];
  // var hatesConnectorIfSecond = [];
  // var onlyAbstractConnectorIfSecond = []

  // combine descriptor sets for first and second descriptors 
  var firstDescriptors = $.merge(descriptorsOnlyFirst, descriptorsEither);
  var secondDescriptors = $.merge(descriptorsOnlySecond, descriptorsEither);

  //pick a random first and second decriptor
  var pickedFirstDescriptor = firstDescriptors[(Math.floor(Math.random() * firstDescriptors.length))];
  var pickedSecondDescriptor = secondDescriptors[(Math.floor(Math.random() * secondDescriptors.length))];


  //set odds of connector
  var oddsOfConnector = {
    "" : 400,
    "of the" : 80,
    "of" : 40,
    "between" : 20,
    "between the" : 10,
    "under the": 10,
    "under": 8,
    "who moves in the": 4
  }


  // check if requires a connector, if it should be non-abstract, check if hates connector
  // set default values first
  var requireConnector = false;
  var onlyNonAbstractConnector = false;
  var hateConnector = false;
  // revise values based on lists
  if (requiresConnectorIfFirst.includes(pickedFirstDescriptor) || requiresConnectorIfSecond.includes(pickedSecondDescriptor)) {
    requireConnector = true;
  }
  if (onlyNonAbstractConnectorIfSecond.includes(pickedSecondDescriptor)) {
    onlyNonAbstractConnector = true;
  }
  if (hatesConnectorIfFirst.includes(pickedFirstDescriptor) || hatesConnectorIfSecond.includes(pickedSecondDescriptor)) {
    hateConnector = true;
    console.log('CONNECTOR DESPISED');
  }
  console.log("require connector: " + requireConnector + "; only non-abstract connector = " + onlyNonAbstractConnector + '; hate connector = ' + hateConnector);


  if (requireConnector == true && hateConnector == true) {
    
    return getAnHonorific();
  } else if (requireConnector == true && hateConnector == false) {
    console.log('CONNECTOR REQUIRED');
    oddsOfConnector[''] = 0;
  }

  if (onlyNonAbstractConnector == true) {
    oddsOfConnector['of'] = 0;
    oddsOfConnector['between'] = 0;
    oddsOfConnector['between the'] = 0;
    oddsOfConnector['under the'] = 0;
    oddsOfConnector['under'] = 0;
  }



  console.log(oddsOfConnector);
  //pick a connector
  var connector = "";
  if (hateConnector == false) {
    connector = weighted_randomiser(Object.keys(oddsOfConnector), Object.values(oddsOfConnector));
  }
  if (connector != "") {
    connector = connector + " ";
  } 
  console.log('connector is ' + connector);


  honorific = includeThe + pickedFirstDescriptor + " " + connector + pickedSecondDescriptor;

  return honorific;

}



//using odds to make a random choice
function weighted_randomiser(possibilities, odds) {
  
  var totalodds = odds.reduce(sum,0);

  function sum(total, number) {
    return total + number;
  }

  randomtotal = Math.floor((Math.random() * totalodds) + 1);

  var i;

  for (i = 0; i < odds.length; i++) {

    randomtotal = randomtotal - odds[i];

    if (randomtotal <= 0) {
      break;
    }  
   }
  return possibilities[i];
}
