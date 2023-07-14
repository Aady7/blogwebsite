//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// Load the full build.
var _ = require('lodash');

const homeStartingContent = "Hello! I'm Aady, and this is my personal blog where I share my thoughts, experiences, and insights on various topics. Through my blog, I aim to inspire, educate, and entertain my readers.Here, you'll find a collection of articles covering a wide range of subjects, including travel, lifestyle, technology, and more. I love exploring new ideas and perspectives, and I'm excited to share them with you.Feel free to browse through my blog posts, leave comments, and engage in discussions. I believe that sharing knowledge and experiences can create meaningful connections and foster personal growth.Thank you for visiting my blog, and I hope you enjoy reading my articles as much as I enjoy writing them!";

const aboutContent =" Welcome to my personal blog! I'm a student at IIT BHU Varanasi, pursuing Mechanical Engineering. While my academic pursuits revolve around the fascinating world of engineering, I have a wide range of interests that keep me engaged beyond the classroom.\n"+

"When I'm not buried in textbooks or designing innovative solutions, you'll often find me lost in the world of words. Writing has always been a passion of mine, allowing me to express my thoughts and share my experiences with others. I believe in the power of storytelling and its ability to inspire, entertain, and create connections.\n"+

"One of my favorite pastimes is diving into the pages of captivating novels, immersing myself in different worlds and exploring the depths of imagination. I find solace in the written word and appreciate the artistry of talented authors who transport readers to new realms of possibilities.\n"+
"Another aspect that drives my curiosity is traveling. I have a deep desire to explore the nooks and crannies of our beautiful planet. From ancient historical sites to vibrant cultural experiences, I believe that traveling broadens our horizons and teaches us invaluable lessons about the world and ourselves.\n"+

"Through this blog, I aim to bring together my varied interests and share insights on a range of topics. From the latest technological advancements and their impact on society to the thrilling world of trading and machine learning, I'll dive into these subjects and present my thoughts in an engaging and informative manner.\n"+

"But it doesn't stop there. I'll also weave in stories from everyday life, drawing inspiration from the world around me. These tales will touch upon various aspects of human existence, from heartwarming encounters to thought-provoking moments that make us reflect on our own journeys.\n"+
"Join me on this adventure as we embark on a quest for knowledge, inspiration, and connection. Let's explore the realm of technology, trading, machine learning, and social stories together, and discover the extraordinary in the ordinary.\n"

"Thank you for visiting my blog, and I hope you find it both enjoyable and enlightening. Stay tuned for exciting updates and feel free to connect with me to share your thoughts and experiences. Let's embark on this blogging journey together!"

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const inputs=[];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(request,response){
  response.render("home",{
    starting_home:"Home",
    homeStartingContent:homeStartingContent,
    inputs:inputs,
    

  })
})

app.get("/about", function(request,response){
  response.render("about",{
    starting_about:"About Me",
    aboutContent:aboutContent

  })
})
app.get("/contact", function(request,response){
  response.render("contact",{
    starting_contact:"Contact Me",
    contactContent:contactContent

  })
})



app.get("/compose", function(request,response){
  response.render("compose",{
    starting_compose:"Compose"
    
  })
})

app.post("/compose", function(request,response){
 const input={
  title:request.body.title,
  text:request.body.composetext
 }
inputs.push(input);
response.redirect("/")

})

app.get("/posts/:post",function(req,res){
  var param=_.lowerCase(req.params.post)
  for( var i=0;i<inputs.length;i++){
    if(param===_.lowerCase(inputs[i].title))
    {
     res.render("post",{
      first_post:inputs[i].title,
      postContent:inputs[i].text
     })
    }
  }
    
  }
)




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
