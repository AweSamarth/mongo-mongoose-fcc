require('dotenv').config();
const mongoose = require('mongoose')

const Schema = mongoose.Schema

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: {type:String, required:true},
  age:Number,
  favoriteFoods:[String]
})


const Person = mongoose.model("Person", personSchema)
var createPerson = function(done){
  var someName = new Person({name:"Something Else", age:23, favoriteFoods: ["eggs", "fish", "fresh fruit"]})
  someName.save(function(err, data){
    if (err) return console.error(err)
    done(null, data)
  })
}


const createAndSavePerson = (done) => {
  var someName = new Person({name:"Something Else", age:23, favoriteFoods: ["eggs", "fish", "fresh fruit"]})
  someName.save(function(err, data){
    if (err) return console.error(err)
    done(null, data)
  })
}

const arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people){
    if(err) return console.error(error)
    done(null,people);
  })
}

const findPeopleByName = (personName, done) => {
  const data = Person.find({name:personName}, function(err, personFound){
    if (err) return console.error(err)
    done(null, personFound)
  })
};

const findOneByFood = (food, done) => {
  const data = Person.findOne({favoriteFoods:food}, function(err, personFound){
    if(err) return console.error(err)
    done(null, personFound)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, personFound){
    if(err) return console.error(err)
    done(null, personFound)
  })
  
};
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err, updatedDoc)=>{
    if(err) return console.error(err)
    done(null, updatedDoc)
  } )
};

const removeById = (personId, done) => {
 Person.findByIdAndRemove(personId, (err, removedDoc)=>{
   if(err) return console.log(err)
   done(null, removedDoc)
 })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err,response)=>{
    if (err) return console.error(err)
    return done(null, response)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods:foodToSearch})
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(error, people) {
    done(null, people);
    //do something here
  });
  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
