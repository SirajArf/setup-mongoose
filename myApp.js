
const mongoose = require("mongoose");
require('dotenv').config();
var Schema = mongoose.Schema;

//install and set up mongoose -1
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//create a model  -2
var personSchema = new Schema({
  name:{type:String, required:true},
  age:Number,
  favoriteFoods:[String]
});

var Person = mongoose.model('Person',personSchema);

// let a = new Person({
//   name:"Abc",
//   age:22,
//   favoriteFoods:["pizza","chat"]
// })




// let b = function(done){
//   return new Person({
//   name:"Abc",
//   age:22,
//   favoriteFoods:["pizza","chat"]
// })
// if(error) return done(error);
// done(null, result);
// };

//create and save one record -3

var createAndSavePerson = (done) => {
  let b = new Person({name: 'b', age:22, favoriteFoods: ['Chocolate mousse']});

  b.save((err, data) =>{
  if(err){
    console.log(err);
  }else {
    done(null,data)
  }
  });
  
};
// use model.create -4
var arrayOfPeople=[
  {name:"a",age: 15,favoriteFoods:"pizza"},
  {name:"b",age: 16,favoriteFoods:"jalebi"},
  {name:"c",age: 17,favoriteFoods:"dhi badha"},
]

var createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error,data) => {
    if(error){
      console.log(error);

    }else{
      done(null,data);
    }
  })
  
};
// Person.find({name:"c"}, (error, data) => {
//   if(error){
//     console.log(error);
//   }else{
//     console.log("data);
//   }
// })

// use model.find -5
const findPeopleByName = (personName, done) => {
  Person.find({personName:"c"}, (error, data) => {
    if(error){
      console.log(error);
    }else{
      done(null, data);
    }
  })
  
};
//find one -6
const findOneByFood = (food, done) => {
  Person.findOne({food:"pizza"}, (error, data) => {
    if(error){
      console.log(error)
    }else{
       done(null , data);
    }
  })
 
};
// find by id -7
const findPersonById = (personId, done) => {
Person.findById(personId, (error, data) => {
    if(error){
      console.log(error)
    }else{
       done(null , data);
    }
  })
};

// update by classic way -8
const findEditThenSave = (personId, done) => {
  var foodToAdd = "hamburger";

  Person.findById(personId,(error,data) => {
    if(error){
      console.log(error);
    }else{
      data.favoriteFoods.push(foodToAdd)
      data.save((err, Data) => {
        if(err){
          console.log(err);
        }else{
          done(null, Data)
        }
      })
    }
  })

 
};
// find and update -9
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet}, {new: true},(error, data) => {
    if(error){
      console.log(error);
    }else{
      done(null, data)
    }
  })

 
};
// remove by id-10
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error,data) => {
    if(error){
      console.log(error)
    }else {
      done(null, data)
    }
  })
 
};

//12

// const removeManyPeople = (done) => {
//   var nameToRemove = "Mary";
//   Person.remove({name:nameToRemove}, (error, data) => {
//     if(error){
//       console.log(error)
//     }else{
//       done(null, data)
//     }
//   })
//}

//delete many records with remove -11
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({"name": nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

//chain query -12
  
const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  Person.find({favoriteFoods: foodToSearch}).sort({name:'asc'}).limit(2).select("-age")
  .exec(function(err,data){
    if(err) return console.log(err);
    done(null, data)
  })

 
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
