// Menu mobile 
const buttonMenuMobile = document.querySelector(".header .inner-menu-mobile");
if(buttonMenuMobile){
    const buttonMenu = document.querySelector(".header .inner-menu");
    buttonMenuMobile.addEventListener("click", () => {
        buttonMenu.classList.add("active");
    });
    // Click vào overlay đóng menu 
    const overlay = document.querySelector(".header .inner-overlay");
    if (overlay){
        overlay.addEventListener("click", () => {
        buttonMenu.classList.remove("active");
        });
    }
    // Click vào icon mở sub menu 
    const listiconmenu = buttonMenu.querySelectorAll("ul > li > i");
    listiconmenu.forEach(button => {
        button.addEventListener("click", () => {
            button.parentNode.classList.toggle("active");
        })
    })
}
// End Menu mobile 
// // menuMobile-làm lại
// const buttonMenuMobile = document.querySelector(".header .inner-menu-mobile");
// if(buttonMenuMobile){
//     const menuMobile = document.querySelector(".header .inner-menu");
//     buttonMenuMobile.addEventListener("click", () => {
//         menuMobile.classList.add("active");
//     })
//     const overlay = document.querySelector(".header .inner-overlay");
//         overlay.addEventListener("click", () => {
//         menuMobile.classList.remove("active");   
//     })
//     const buttonDown = document.querySelectorAll(" ul > li > i");
//     buttonDown.forEach(button => {
//         button.addEventListener("click", () => {
//             button.parentNode.classList.toggle("active");
//         })
//         })
//     }

// // End menuMobile-làm lại



// Section-1 Boxx  Addres
const boxAddressSection1 = document.querySelector(".section-1 .inner-form .inner-address");
if(boxAddressSection1){
    const input = boxAddressSection1.querySelector(".inner-input");
    // console.log(input);
        input.addEventListener("focus", () => {
        boxAddressSection1.classList.add("active");
    })


    input.addEventListener("blur", () => {
        boxAddressSection1.classList.remove("active");
    })

    const allItem = boxAddressSection1.querySelectorAll(".inner-suggest-list .inner-item");
    allItem.forEach(item  => {
        item.addEventListener("mousedown" ,() => {
            const title = item.querySelector(".inner-item-title").innerHTML.trim();
            input.value = title;

        })
    })
}
//     const listItem = boxAddressSection1.querySelectorAll(".inner-suggest-list .inner-item");
//     if(listItem){
//         listItem.forEach(item => {
//             item.addEventListener("mousedown", () => {
//                 const title = item.querySelector(".inner-item-title").innerHTML.trim();
//                 input.value = title;
//             })
//         })
        

//     }

// }
// End Section-1 Boxx  Addres


// Box User section-1 
const boxUserSection1 = document.querySelector(".section-1 .inner-form .inner-user");
if(boxUserSection1){
    const inputUser = boxUserSection1.querySelector(".inner-input");
    // Hiển thị quantity 
    inputUser.addEventListener("click", () =>{
        boxUserSection1.classList.add("active");
    })
    //Đóng quantity 
    document.addEventListener("click", (event) =>{
        if(!boxUserSection1.contains(event.target)){
            
            boxUserSection1.classList.remove("active");
        }
    })
    // document.addEventListener("click", (event) => {

    //     if(!boxUserSection1.contains(event.target)){
    //         boxUserSection1.classList.remove("active");
    //     }
    // })
    // Thêm value vào ô input
    // Cách 1 
    const updateQuantityInput = () => {
        const listBoxNumber = boxUserSection1.querySelectorAll(".inner-count .inner-number");
        const input = document.querySelector(".inner-user .inner-input");
        const arrayNumber = [];
        listBoxNumber.forEach(buttonNumber => {
            const number = parseInt(buttonNumber.innerHTML);
            arrayNumber.push(number);
        })
        const value = `NL:${arrayNumber[0]}, TE: ${arrayNumber[1]}, EB: ${arrayNumber[2]}`;
        input.value = value;
        

    }
    // Cách 2 ChatGPT
    // const updateQuantityInput = () => {
    //     const listBoxNumber = document.querySelectorAll(".inner-count .inner-number");
    //     const input = document.querySelector(".inner-user .inner-input"); // Thay #yourInputId bằng ID của input
    
    //     if (!input) {
    //         console.error("Element with the specified ID not found.");
    //         return;
    //     }
    
    //     const arrayNumber = Array.from(listBoxNumber).map(buttonNumber =>
    //         parseInt(buttonNumber.innerHTML) || 0
    //     );
            // Array.from(listBoxNumber): Chuyển NodeList thành mảng.
            // .map(buttonNumber => parseInt(buttonNumber.innerHTML) || 0):
            // Duyệt từng phần tử, lấy giá trị nội dung (innerHTML) và chuyển thành số bằng parseInt().
            // Nếu giá trị không hợp lệ (NaN), mặc định sẽ là 0 (dùng || 0).

    //     const value = `NL: ${arrayNumber[0] ?? 0}, TE: ${arrayNumber[1] ?? 0}, EB: ${arrayNumber[2] ?? 0}`;
            // Sử dụng Template String (`) để tạo chuỗi theo định dạng yêu cầu.
            // arrayNumber[0] ?? 0:
            // Nếu arrayNumber[0] không tồn tại (undefined), mặc định sẽ là 0.
    //     input.value = value;
    // };
   




    // Bắt sự kiện button up 
    const listButtonUp = document.querySelectorAll(".inner-count .inner-up");
    listButtonUp.forEach(button => {
        button.addEventListener("click", () => {
            const parent = button.parentNode;
            const buttonNumber = parent.querySelector(".inner-number");
            const number = parseInt(buttonNumber.innerHTML);
            const numberUpdate = number + 1;
            buttonNumber.innerHTML = numberUpdate;
            updateQuantityInput();
        })

    })
    // Bắt sự kiện button down
    const listButtonDown = document.querySelectorAll(".inner-count .inner-down");
    listButtonDown.forEach(button => {
        button.addEventListener("click", () => {
            const parent = button.parentNode;
            const buttonNumber = parent.querySelector(".inner-number");
            const number = parseInt(buttonNumber.innerHTML);
            if(number > 0){
                const numberUpdate = number - 1;
                buttonNumber.innerHTML = numberUpdate;
                updateQuantityInput();
            }
            
        })

    })

}
// End Box User section-1 

// Clock exprie
const clockExpire = document.querySelector("[clock-expire]");
if(clockExpire){
    const dateTimeString = clockExpire.getAttribute("clock-expire");
    //Chuyển đổi thời gian thành đối tượng date
    const dateTimeMain = new Date (dateTimeString);
    // Cập nhật đồng hồ
    const updateClock = () => {
        const now = new Date();
        const remainingTime = dateTimeMain - now;
        if(remainingTime > 0){
            // Ngày 24*60*60*100
            const days = Math.floor(remainingTime / (24*60*60*1000));
            //console.log(days);
            // Giờ 60*60*1000
            const hours = Math.floor((remainingTime / (60*60*1000)) % 24);
            //console.log(hours);
            //const hours2 = Math.floor((remainingTime % (24*60*60*1000)) / (60*60*1000));
            //console.log(hours2);
            // Phút 60*1000
            const minutes = Math.floor((remainingTime / (60*1000)) % 60);
            //console.log(minutes);
            const seconds =  Math.floor((remainingTime / (1000)) % 60);
            const listBoxNumber = clockExpire.querySelectorAll(".inner-number");
            listBoxNumber[0].innerHTML =`${days}`.padStart(2, "0");
            listBoxNumber[1].innerHTML =`${hours}`.padStart(2, "0");
            listBoxNumber[2].innerHTML =`${minutes}`.padStart(2, "0");
            listBoxNumber[3].innerHTML =`${seconds}`.padStart(2, "0");
        }else {
            clearInterval(functionUpdate);
        }
    };

    const functionUpdate = setInterval(updateClock, 1000);

}

// End Clock exprie
// Box filter
const boxFilter = document.querySelector(".section-9 .inner-right .inner-filter-mobile");
if(boxFilter){
    const boxLeft = document.querySelector(".section-9 .inner-left")
    boxFilter.addEventListener("click", () => {
    boxLeft.classList.add("active");
})
const overlay = document.querySelector(".section-9 .inner-left .inner-overlay");
overlay.addEventListener("click", () => {
    boxLeft.classList.remove("active");
})
}
// End Box filter

// Box Tour Info 
const boxTourInfo = document.querySelector(".box-tour-info");
if(boxTourInfo){
    const buttonReadMore = boxTourInfo.querySelector(".inner-read-more button");
    buttonReadMore.addEventListener("click", () => {
        boxTourInfo.classList.add("active");
    })
    new Viewer(boxTourInfo);
} 
// Cách khác
//const boxTourInfo = document.querySelector(".box-tour-info"); 
// if(boxTourInfo){
//     const buttonReadMore = boxTourInfo.querySelector(".inner-read-more button");
//     buttonReadMore.addEventListener("click", () => {
//         if (boxTourInfo.classList.contains("active")){
//             boxTourInfo.classList.remove("active");
//             buttonReadMore.innerHTML = "Xem tất cả"
//         }else{
//             boxTourInfo.classList.add("active");
//             buttonReadMore.innerHTML = "Ẩn bớt";
//         }
        
//     })
// }
// End Box Tour Info 


//AOS 
AOS.init();
//End AOS 

// Swiper-section-2 
const swiperSection2 = document.querySelector(".swiper-section-2");
if(swiperSection2){
    new Swiper(".swiper-section-2", {
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            992: {
              slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
              },
            }
      });
}
// End Swiper-section-2
// Swiper-section-3
const swiperSection3 = document.querySelector(".swiper-section-3");
if(swiperSection3){
    new Swiper(".swiper-section-3", {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        },

        breakpoints: {
            576: {
              slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
              },
            }
      });
}
// End Swiper-section-3

// swiper-box-images 
const boxImages = document.querySelector(".box-images");
if(boxImages){
    const swiperBoxImagesThumb = new Swiper(".swiper-box-images-thumb", {
        spaceBetween: 5,
        slidesPerView: 4,
        breakpoints: {
            576: {
                spaceBetween: 10,
            },
            
            }
      });
      const swiperBoxImagesMain = new Swiper(".swiper-box-images-main", {
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
            },
        spaceBetween: 10,
        thumbs: {
          swiper: swiperBoxImagesThumb,
        },
      });
}
// End swiper-box-images 

// viewer Joom Ảnh
const boxImagesMain = document.querySelector(".box-images .inner-images-main");
if (boxImagesMain){
    new Viewer(boxImagesMain);
}
// End viewer Joom Ảnh  
// email-form
const emailForm = document.querySelector("#email-form");
if(emailForm){
    const validator = new JustValidate('#email-form');
    validator
        .addField('#email-input', [
            {
              rule: 'required',
              errorMessage: 'Vui lòng nhập email của bạn',
            },
            {
                rule:'email',
                errorMessage: 'Email không đúng định dạng!',
            }
        ])
        .onSuccess(( event ) => {
            const email = event.target.email.value; 
            console.log(email);
       
    });
}
// End email-form
// coupon-form
const couponlForm = document.querySelector("#coupon-form");
if(couponlForm){
    const validator = new JustValidate('#coupon-form');
    validator
        .addField('#coupon-input', [
            {
              rule: 'required',
              errorMessage: 'Vui lòng nhập mã coupon!',
            }
        ])
        .onSuccess(( event ) => {
            const coupon = event.target.email.value; 
            console.log(coupon);
       
    });
}
// End coupon-form
// oder-form 
const oderForm = document.querySelector("#oder-form");
if(oderForm){
    const validator = new JustValidate('#oder-form');
    validator
        .addField('#full-name-input', [
            {
              rule: 'required',
              errorMessage: 'Vui lòng nhập họ tên!',
            },
            {
                rule: 'minLength',
                value: 5,
                errorMessage: 'Vui lòng nhập ít nhất 5 ký tự!',
            },
            {
                rule: 'maxLength',
                value: 50,
                errorMessage: 'Họ tên không vượt quá 50 ký tự!',
            }
        ])
        .addField('#phone-input', [
            {
              rule: 'required',
              errorMessage: 'Vui lòng nhập số điện thoại!',
            },
            {
                rule: 'customRegexp',
                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                errorMessage: 'Số điện thoại không đúng định dạng!',
            }
        ])
        .onSuccess(( event ) => {
            const fullName = event.target.fullName.value; 
            const phone = event.target.phone.value; 
            const note = event.target.note.value; 
            const method = event.target.method.value; 
            console.log(fullName);
            console.log(phone);
            console.log(note);
            console.log(method);
    });
    const listInputMethod = document.querySelectorAll(`input[name="method"]`);
    const inputBank = document.querySelector(".inner-info-bank");
    listInputMethod.forEach(inputMethod => {
        inputMethod.addEventListener("change",() => {
            if(inputMethod.value == "bank"){
                inputBank.classList.add("active");
            }else{
                inputBank.classList.remove("active");
            }
        })
    })

}
// End oder-form