const Meme = require("../data/schema.js")
require("dotenv").config()

const meme1 = new Meme({
  tags: "Pop culture",
  memeTitle: "Friends are worse",
  memeId: 1,
  image: "https://i.pinimg.com/originals/5f/41/03/5f4103dc46c5789613954854bfe2f903.jpg",
  likes: 50,
  comments: [
    { user: "Parth", comment: "🤣" },
    { user: "Aayush", comment: "Relatable!" },
    { user: "Shreyas", comment: "Put more memes like this!" },
  ],
});

const meme2 = new Meme({
  tags: "Pop culture",
  memeTitle: "SpongeBob Logic",
  memeId: 2,
  image: "https://i.pinimg.com/originals/e3/13/3e/e3133e21f98f5e86372cd4d0f758cd3f.jpg",
  likes: 75,
  comments: [
    { user: "Sandy", comment: "Haha, classic SpongeBob!" },
    { user: "Patrick", comment: "I don't get it..." },
  ],
});

const meme3 = new Meme({
  tags: "Animals and Pets",
  memeTitle: "Cat Nap",
  memeId: 3,
  image: "https://i.pinimg.com/originals/1f/47/2f/1f472fbf612fb71cfed7f3d175035db9.jpg",
  likes: 90,
  comments: [
    { user: "CatLover123", comment: "Aww, so cute!" },
    { user: "DogPerson456", comment: "Why can't dogs sleep this peacefully?" },
  ],
});

const meme4 = new Meme({
  tags: "Food",
  memeTitle: "Pizza Priorities",
  memeId: 4,
  image: "https://i.pinimg.com/originals/9d/9d/05/9d9d05a22e0413d98b1e5f165e0a84fb.jpg",
  likes: 120,
  comments: [
    { user: "PizzaLover", comment: "Pizza always comes first!" },
    { user: "HealthNut", comment: "But what about salads?" },
  ],
});

const meme5 = new Meme({
  tags: "Technology",
  memeTitle: "Tech Support",
  memeId: 5,
  image: "https://i.pinimg.com/originals/4f/07/9c/4f079cebe7b8652cd61f64a07ebfc4a4.jpg",
  likes: 85,
  comments: [
    { user: "TechGuru", comment: "This is so accurate!" },
    { user: "User123", comment: "Why is it always like this?" },
  ],
});

const meme6 = new Meme({
  tags: "Gaming",
  memeTitle: "Gamer Logic",
  memeId: 6,
  image: "https://i.pinimg.com/originals/51/04/24/510424ff9934802020099e93a6a1816b.jpg",
  likes: 110,
  comments: [
    { user: "GamerGirl", comment: "Story of my life!" },
    { user: "NoobPlayer", comment: "I don't get it..." },
  ],
});

const meme7 = new Meme({
  tags: "Relationships",
  memeTitle: "Texting Fails",
  memeId: 7,
  image: "https://i.pinimg.com/originals/b9/65/84/b96584e7ba42a53c42b33b0fd1f8fc51.jpg",
  likes: 95,
  comments: [
    { user: "LoveBird", comment: "Story of my relationship!" },
    { user: "SingleLife", comment: "Why can't I relate?" },
  ],
});

const meme8 = new Meme({
  tags: "Sports",
  memeTitle: "Sports Fail",
  memeId: 8,
  image: "https://i.pinimg.com/originals/49/0a/3e/490a3e2ab04f78b27c9533679442a285.jpg",
  likes: 80,
  comments: [
    { user: "SportsFanatic", comment: "Ouch, that's gotta hurt!" },
    { user: "Athlete123", comment: "Been there, done that..." },
  ],
});

const meme9 = new Meme({
  tags: "School",
  memeTitle: "Late for Class",
  memeId: 9,
  image: "https://i.pinimg.com/originals/df/80/02/df80020880d90c42e62a48f3bb65405f.jpg",
  likes: 105,
  comments: [
    { user: "NerdLife", comment: "Always running late!" },
    { user: "TeacherPet", comment: "I never miss a class!" },
  ],
});

const meme10 = new Meme({
  tags: "Corporate",
  memeTitle: "Meeting Madness",
  memeId: 10,
  image: "https://i.pinimg.com/originals/03/ba/2b/03ba2bf3f4a81a8ef3666878e362e032.jpg",
  likes: 100,
  comments: [
    { user: "OfficeWorker", comment: "Every. Single. Meeting." },
    { user: "CEO123", comment: "Can we make these more productive?" },
  ],
});



const mongoose = require("mongoose")
// Connect to your local MongoDB instance
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to local MongoDB'))
  .catch(err => console.error('Error connecting to local MongoDB:', err));

const memeData = [meme1, meme2, meme3, meme4, meme5, meme6, meme7, meme8, meme9, meme10];

Meme.insertMany(memeData)
  .then(() => console.log('Meme added successfully!'))
  .catch(err => console.error('Could not add the meme:', err));

  module.exports = memeData;