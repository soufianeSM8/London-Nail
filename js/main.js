//start nav menu
var menu = document.querySelector('.menu'),
    close_nav = document.querySelector('.nav_close'),
    nav_box = document.querySelectorAll('.nav_box');

menu.addEventListener ('click',() => {
    for(var i = 0 ; i<nav_box.length;i++){
     nav_box[i].classList.remove('prt'+(i+1)+'_close');
     nav_box[i].classList.add('prt'+(i+1)+'_show')
    }
})
close_nav.addEventListener('click' , () => {
    for(var i = 0 ; i<nav_box.length;i++){
        nav_box[i].classList.remove('prt'+(i+1)+'_show');
        nav_box[i].classList.add('prt'+(i+1)+'_close');
       }

})
// end menu nav

// start search bar
var btn_search = document.querySelector('.search'),
    search_bar = document.querySelector('.srh'),
    srh_back = document.querySelector('.srh_b'),
    headerHeight = (document.querySelector('header').clientHeight +
                   document.querySelector('.sticky_header').clientHeight),
    close_srh =  document.querySelector('.close_srh');

btn_search.addEventListener('click', () => {
    search_bar.classList.add('show_srh');
    srh_back.classList.add('srh_back');
    stickyBack()
   this.addEventListener('scroll',stickyBack)
})
function stickyBack() {
 if(this.scrollY >= 45){
  srh_back.style = `top:${document.querySelector('.sticky_header').clientHeight}px;`
 }
 else {
  srh_back.style = `top:${headerHeight}px;`
 }

}

close_srh.addEventListener('click',()=>{
 search_bar.classList.remove('show_srh');
 srh_back.classList.remove('srh_back');

})

// end search bar

// start play vid
var img_vid = document.querySelector('.img_vid');
img_vid.addEventListener('click' , () => {
    img_vid.style.visibility = 'hidden';
    document.querySelector('.vid').style = `z-index : 0;`
})
// end play vid)

// start Best Selling
var slider_containerBox = document.querySelector('.slider_container'),
    sld_s = document.querySelectorAll('.box_nail'),
    btn_left = document.querySelector('.btn_left'),
    btn_right = document.querySelector('.btn_right'),
    step = 0,
    fullCss = getComputedStyle(sld_s[0]),
    margin_left = parseInt(fullCss.marginLeft),
    margin_right = parseInt(fullCss.marginRight);

 // start product slider

     //sld_box_width =>  width of item
  let sld_box_width = parseInt(sld_s[0].clientWidth + margin_left + margin_left),
      pushCount = sld_box_width // transform value


    btn_left.addEventListener( 'click', () => {
        if(this.outerWidth > 1024 &&   // pc
           step < sld_s.length-4 ||
           this.outerWidth > 767 &&    // tablet
           this.outerWidth <= 1024 &&  //  tablet
           step < sld_s.length-3 ||
           this.outerWidth > 480 &&     //  mobile medium
           this.outerWidth <= 767  &&   //  mobile medium
           step < sld_s.length-2 ||
           this.outerWidth >= 320 &&  // for mobile
           this.outerWidth <= 480 &&  // for mobile
           step < sld_s.length-1){
                     slider_containerBox.style.transform = `translateX(-${pushCount}px)`
                     step++
                     pushCount+=sld_box_width
        }

            })
    btn_right.addEventListener('click', () => {

        if(this.outerWidth > 1024 &&   // pc
           step > 0 ||
           this.outerWidth > 767 &&    // tablet
           this.outerWidth <= 1024 &&  //  tablet
           step > 0 ||
           this.outerWidth > 480 &&     //  mobile medium
           this.outerWidth <= 767  &&   //  mobile medium
           step > 0 ||
           this.outerWidth >= 320 &&  // for mobile
           this.outerWidth <= 480 &&  // for mobile
           step > 0){
                    pushCount-=sld_box_width
                    slider_containerBox.style.transform = `translateX(-${pushCount-sld_box_width}px)`
                    step--
                  }


             })


     // end product slider

    // start reviews



    var review_items = document.querySelectorAll('.review'),
        review_box = document.querySelector('.reviews'),
        review_btn_l = document.querySelector('.left_btn_review'),
        review_btn_r = document.querySelector('.right_btn_review'),
        steps = 0,
        counter=0;

  function SldAction(){
    for(var i = 0 ; i< review_items.length ; i++){
        review_items[i].style.transform = `translateX(-${counter}px)`
       }

  }
    review_btn_l.addEventListener('click' , () => {
        if(steps != review_items.length-1){
            counter+= review_box.clientWidth;
            SldAction()
            steps++;
        }
    })

    review_btn_r.addEventListener('click' , () => {
        if(steps != 0){
            counter-=review_box.clientWidth;
            SldAction()
             steps--;
        }
    })

// end review slider

this.addEventListener('resize',()=>{
    sld_box_width = sld_s[0].clientWidth
    pushCount = sld_box_width
    step = 0;
    slider_containerBox.style.transform = `translateX(-${0}px)`
    steps = 0
    counter=0
    SldAction()
})

