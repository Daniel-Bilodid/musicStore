const button = document.querySelector('#subBtn');
const modal = document.querySelector('.modal-window');
const modalTrigger = document.querySelector('[data-close]');
const modalThankTrigger = document.querySelector('[data-closes]');
const thanksModal = document.querySelector('#modal_2');
const inputs = document.querySelectorAll('input');
const form = document.querySelectorAll('form');
const menuImg = document.querySelector('#menu-img');
const hamburger = document.querySelector('.hamburger');
const hamburgerClose = document.querySelector('.hamburger__close');



// button.addEventListener('click', () => {
//     openModal();
//     thanksModal.style.display = 'none';
// });




// function openModal() {
//     modal.style.display = 'block';
//     document.body.style.overflow = "hidden";
//     HamClose();
// } 


// }
// function thankModal() {
//     
//     closeModal();
    
// }
(function() {
    
  
    const backdrop = document.querySelector('#modal-backdrop');
    document.addEventListener('click', modalHandler);
  
    function modalHandler(evt) {
      const modalBtnOpen = evt.target.closest('.js-modal');
      if (modalBtnOpen) { // open btn click
        const modalSelector = modalBtnOpen.dataset.modal;
        showModal(document.querySelector(modalSelector));
      }
  
      const modalBtnClose = evt.target.closest('.modal__close');
      if (modalBtnClose) {
        evt.preventDefault();
        hideModal(modalBtnClose.closest('.modal-window'));
      }
      const modalBtnSubmit = evt.target.closest('.modal-close');
      if (modalBtnSubmit) {
        hideModal(modalBtnSubmit.closest('.modal-window'));
        showModal(thanksModal)
        
      }
      
     
  
      if (evt.target.matches('#modal-backdrop')) { // backdrop click
        hideModal(document.querySelector('.modal-window.show'));
      }
    }
  
    function showModal(modalElem) {
      modalElem.classList.add('show');
      backdrop.classList.remove('hidden');
      
    }
  
    function hideModal(modalElem) {
      modalElem.classList.remove('show');
      backdrop.classList.add('hidden');
      
    }
  })();

 
  
function formClear() {
    inputs.forEach(input => input.value = '');
}



form.forEach(item => {
    bindPostData(item);
    });

    const postData = async (url, data) => { // функция которая постит дату
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        
        return await res.json();
        };
        
        // async function getResource(url) {
        // let res = await fetch(url);
        
        // if (!res.ok) {
        //     throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        // }
        
        // return await res.json();
        // }

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            thankModal();
        }).finally(() => {
            form.reset();
        });
}
)};

// Hamburger

menuImg.addEventListener('click', () => {
    openHamburger();
});

function openHamburger() {
    hamburger.style.display = 'block';
    closeModal();
}

hamburgerClose.addEventListener('click', () => {
    HamClose();
});

function HamClose() {
    hamburger.style.display = 'none';
};

// Slider 

const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider')
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width;

// showSlides(slideIndex);

let slideIndex = 1;
let offset = 0;



slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';
slides.forEach(slide => {
    slide.style.width = width;
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'),
    dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = 
    `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
    slider.append(indicators);

for(let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = 
    `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `
    if( i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
}

function dotFilter() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex -1].style.opacity = 1;
};

next.addEventListener('click', ()=> {
    if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)){
        offset = 0;
     }else {
         offset += +width.slice(0, width.length - 2);
     }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if(slideIndex == slides.length) {
        slideIndex = 1;
    }else {
        slideIndex++;
    }


    dotFilter();
});

prev.addEventListener('click', ()=> {
    if(offset == 0){
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
     }else {
         offset -= +width.slice(0, width.length - 2);
     }
     slidesField.style.transform = `translateX(-${offset}px)`;

     if(slideIndex == 1) {
        slideIndex = slides.length;
    }else {
        slideIndex--;
    }

    dotFilter();
});



dots.forEach(dot => {
    dot.addEventListener('click', (e) =>{
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = +width.slice(0, width.length - 2) * (slideTo - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
     

        dotFilter();
     });
})
// function showSlides(n) {
//     if(n > slides.length) {
//         slideIndex = 1;
//     }
//     if(n < 1) {
//         slideIndex = slides.length;
//     }

//     slides.forEach(item => item.style.display = 'none');

//     slides[slideIndex - 1].style.display = 'block';
    
// }

// function plusSlides(n) {
//     showSlides(slideIndex += n);
// }

// next.addEventListener('click', ()=> {
//     plusSlides(1);
// });

// prev.addEventListener('click', ()=> {
//     plusSlides(-1);
// });


// Tabs
const tabs = document.querySelectorAll('.tabs')
const tab = document.querySelectorAll('.tab')
const all = document.querySelector('.all')


// indiTab.addEventListener('click', () => {
//     removeTabs(tab);
//     tab.forEach(item => {
//         if(item.className === 'tab indi') {
//             item.style.display = 'block'
//         }
//     })
// });





    tabs.forEach(item => {
        item.addEventListener('click', () => {
            if(item.className === 'tabs indi') {
                removeTabs(tab);
                tab.forEach(item => {
                    if(item.className === 'tab indi') {
                        item.style.display = 'block'
                    }
                    
                });
            }
            if(item.className === 'tabs rock') {
                removeTabs(tab);
                tab.forEach(item => {
                    if(item.className === 'tab rock') {
                        item.style.display = 'block'
                    }
                    
                });
            }
            if(item.className === 'tabs ourRock') {
                removeTabs(tab);
                tab.forEach(item => {
                    if(item.className === 'tab ourRock') {
                        item.style.display = 'block'
                    }
                    
                });
            }
            if(item.className === 'tabs all') {
                tab.forEach(item => {
                    item.style.display = 'block'
                });
            }
            
        });
        
    })


function removeTabs (e) {
    e.forEach(e => {
        e.style.display = 'none';
    })
}



