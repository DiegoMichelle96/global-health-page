let africaRight = document.getElementById('africa-right');
let africaLeft = document.getElementById('africa-left');
let europe = document.getElementById('europe');
let footerCaption = document.getElementById('pop-up-footer');


africaRight.onclick =  function(){
    let x = getOffset(africaRight).left;
    let y = getOffset(africaRight).top;
    let popUp = document.getElementById('ora-custom-pop-up');
    popUp.style.display = 'flex';
    popUp.style.left = (x + 10)+'px';
    popUp.style.top = (y + 10)+'px';
    footerCaption.innerHTML = 'Ghana';

    let customLabel = document.getElementById('custom-label');
    let cardTitle = document.getElementById('card-title');
    let cardText = document.getElementById('card-text');
    let cardImage = document.getElementById('card-image');
    let cardButton2 = document.getElementById('card-button-2');

    customLabel.style.display = 'none';
    cardTitle.innerHTML = 'Ghana';
    cardText.innerHTML = 'Yellow fever kills thousands in Africa every year. Oracle HMS is powering 5.8 million yellow fever vaccinations, plus nationwide COVID-19 vaccines.';
    cardImage.style.display = 'flex';
    cardButton2.style.display = 'flex';
}

africaLeft.onclick =  function(){
    let x = getOffset(africaLeft).left;
    let y = getOffset(africaLeft).top;
    let popUp = document.getElementById('ora-custom-pop-up');
    popUp.style.display = 'flex';
    popUp.style.left = (x + 10)+'px';
    popUp.style.top = (y + 10)+'px';
    footerCaption.innerHTML = 'Africa Left';

    let customLabel = document.getElementById('custom-label');
    let cardTitle = document.getElementById('card-title');
    let cardText = document.getElementById('card-text');
    let cardImage = document.getElementById('card-image');
    let cardButton2 = document.getElementById('card-button-2');

    customLabel.style.display = 'none';
    cardTitle.innerHTML = 'Africa Left';
    cardText.innerHTML = 'Yellow fever kills thousands in Africa every year. Oracle HMS is powering 5.8 million yellow fever vaccinations, plus nationwide COVID-19 vaccines.';
    cardImage.style.display = 'flex';
    cardButton2.style.display = 'flex';
}

europe.onclick =  function(){
    let x = getOffset(europe).left;
    let y = getOffset(europe).top;
    let popUp = document.getElementById('ora-custom-pop-up');
    popUp.style.display = 'flex';
    popUp.style.left = (x + 10)+'px';
    popUp.style.top = (y + 10)+'px';
    footerCaption.innerHTML = 'Europe';

    let customLabel = document.getElementById('custom-label');
    let cardTitle = document.getElementById('card-title');
    let cardText = document.getElementById('card-text');
    let cardImage = document.getElementById('card-image');
    let cardButton2 = document.getElementById('card-button-2');

    customLabel.style.display = 'none';
    cardTitle.innerHTML = 'Europe';
    cardText.innerHTML = 'Yellow fever kills thousands in Africa every year. Oracle HMS is powering 5.8 million yellow fever vaccinations, plus nationwide COVID-19 vaccines.';
    cardImage.style.display = 'flex';
    cardButton2.style.display = 'flex';
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }