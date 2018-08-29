const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url)
  request.addEventListener('load', callback);
  request.send();
}

const requestComplete = function(){
  const jsonString = this.responseText;
  const avalanches = JSON.parse(jsonString);

  let shuffledAvas = _.shuffle(avalanches.data.children);
  displaySetup(shuffledAvas);
  const answer = shuffledAvas[1].data.selftext.toLowerCase().replace(/\W/g, ' ');

  const answerButton = document.getElementById('submit-btn');
  answerButton.addEventListener('click', function(){
    checkAnswer(answer);
  })

  const revealButton = document.getElementById('reveal-btn');
  revealButton.addEventListener('click', function(){
    displayPayoff(shuffledAvas);
  });
}

const displaySetup = function(shuffledAvas){
  const setup = document.getElementById('ava-setup');

  const pTag = document.createElement('p');

  pTag.innerText = shuffledAvas[1].data.title;
  console.log(shuffledAvas[1]);
  setup.appendChild(pTag);
}

const displayPayoff = function(shuffledAvas){
  const payoff = document.getElementById('ava-payoff');

  const pTag = document.createElement('p');

  pTag.innerText = shuffledAvas[1].data.selftext;
  payoff.appendChild(pTag);
}

const checkAnswer = function(answer){
  const formBox = document.getElementById('avalanche');
  const answerText = document.getElementById('answer-text').value.toLowerCase().replace(/\W/g, ' ');
      if(answer === answerText){
        alert("BAM! Spot on!")
      }else if(answer.indexOf(answerText) > -1){
      alert("BOOM! Close enough!");
    } else {
      alert("ooooh, not quite!")
    }
  }






const app = function(){

  const url = 'https://www.reddit.com/r/WordAvalanches.json'

  makeRequest(url, requestComplete);

}

window.addEventListener('load', app);
