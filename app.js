//API Info
const imageURL = "https://api.thecatapi.com/v1/images/search";
let voteURL = "https://api.thecatapi.com/v1/votes";
const apiHeader = {
  mode: "cors",
  //this would usually be hidden by env doc as I would use a Node.js environment
  headers: {
    "x-api-key": "4b950ee0-b3c8-4b8d-9ac5-8b1b33388eef",
  },
};


const postMethod = {method:"POST"}

//Function to get image from api
getImage().catch((error) => {
  console.error(error);
});

//Defining Async function
async function getImage() {
  //Getting response and storing it
  const res = await fetch(imageURL, apiHeader);

  //Storing Json data
  let data = await res.json();
  console.log(data);
  show(data);

  // Function to show image
  function show(data) {
    let arrItems = [];
    arrItems = data;

    let div = document.getElementById("catsImage");

    //Loop through the array
    for (i = 0; i <= arrItems.length - 1; i++) {
      let img = document.createElement("img");
      img.src = arrItems[i].url;
      img.alt = "cats";
      img.width = 500;
      img.height = 500;

      //Add to parent Div
      div.appendChild(img);
    }
  }
}
  
const SubmitLoveBtn = document.querySelector('#lovebtn')
const SubmitNahBtn = document.querySelector('#nahbtn')

//Getting IP user address for sub_id 

async function getIP(url) {
  const res = await fetch(url);
  return await res.text();
}

getIP('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
  let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
  let ip = data.match(ipRegex)[0];
  console.log(ip);
});


//Function to create a Vote
postLoveVote = async () => {
let sub_id = getIP()
let body = {
  image_id: this.image_id,
  sub_id: sub_id,
  value: 1,
};

try{
// Send the body to create a Vote 
  const Response = await fetch(voteURL, apiHeader, body, postMethod);
  const data = await Response.json();
  console.log("Post success"); 
  return data;
 
 //error catch
}
catch (e) {
  return e;
}   

}

SubmitLoveBtn.addEventListener("click", postLoveVote);

postNahVote = async () => {
 
  let sub_id = getIP(ip)
  let body = {
    image_id: this.image_id,
    sub_id: sub_id,
    value: 0,
  };
  
  try{
  // Send the body to create a Vote 
    const Response = await fetch(voteURL, apiHeader, body, postMethod);
    const data = await Response.json();
    console.log("Post success") 
    return data;
   
   //error catch
  }
  catch (e) {
    return e;
  }   
  
  }
  SubmitNahBtn.addEventListener("click", postNahVote);
