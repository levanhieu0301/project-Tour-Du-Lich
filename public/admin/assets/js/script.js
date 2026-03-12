//Menu Mobile
const buttonMenuMobile = document.querySelector(".header .inner-button-menu");
if (buttonMenuMobile){
    const sider = document.querySelector(".sider");
    const siderOverlay = document.querySelector(".sider-overlay");
    buttonMenuMobile.addEventListener("click", () => {
        sider.classList.add("active");
        siderOverlay.classList.add("active");
    })
    siderOverlay.addEventListener("click", ()=>{
        sider.classList.remove("active");
        siderOverlay.classList.remove("active");
    })
}
//End Menu Mobile  

// Schedule Section-8 
const scheduleSection8 = document.querySelector(".section-8 .inner-schedule");

if (scheduleSection8){
    const buttonCreate = scheduleSection8.querySelector(".inner-schedule-create");
    const scheduleList = scheduleSection8.querySelector(".inner-schedule-list");
    buttonCreate.addEventListener("click", () =>{
        const firstItem = scheduleList.querySelector(".inner-schedule-item");
        const cloneItem = firstItem.cloneNode(true);
        cloneItem.querySelector(".inner-schedule-head input").value = "";
        const body = cloneItem.querySelector(".inner-schedule-body");
        const id = `mce_${Date.now()}`;
        body.innerHTML = `<textarea textarea-mce id="${id}"></textarea>`;
        scheduleList.appendChild(cloneItem);
        initTinyMCE(`#${id}`);
    })
    scheduleList.addEventListener("click", (event) => {
        if(event.target.closest(".inner-more")){
            const parentItem = event.target.closest(".inner-schedule-item");
            if (parentItem){
                parentItem.classList.toggle("hidden");
            }
        }
        if(event.target.closest(".inner-remove")){
            const parentItem = event.target.closest(".inner-schedule-item");
            const totalItem = scheduleList.querySelectorAll(".inner-schedule-item").length;
            if (parentItem && totalItem > 1){
                parentItem.remove();
            }
        }

    })
    new Sortable(scheduleList, {
        handle: '.inner-move', // handle's class
        animation: 150,
        onStart: (event) =>  {
            const textarea = event.item.querySelector("[textarea-mce]");
            const id = textarea.id;
            tinymce.get(id).remove();
        },
        onEnd: (event) =>  {
            const textarea = event.item.querySelector("[textarea-mce]");
            const id = textarea.id;
            initTinyMCE(`#${id}`);
        },

    });
}

// End Schedule Section-8 
// upLoadFile
const listFilePondImage = document.querySelectorAll("[filepond-image]");
let filePond = {};
if (listFilePondImage.length > 0){
    listFilePondImage.forEach(filepondImage =>{
        FilePond.registerPlugin(FilePondPluginImagePreview);
        FilePond.registerPlugin(FilePondPluginFileValidateType);
          
        filePond[filepondImage.name] = FilePond.create(filepondImage, {
            labelIdle: "+"
        })
    })
    

}
// End upLoadFile
// Chart doanh thu
const revenueChart = document.querySelector("#revenue-chart");
if (revenueChart){
    new Chart(revenueChart, {
        type: 'line',
        data: {
            labels:["01", "02", "03", "03", "04", "05"],
            datasets: [
                {
                  label: 'Tháng 1',
                  data: [1000, 2000, 3000, 4000, 2300, 3363],
                  borderColor: "#36A1EA",        
                  boderWidth: 1.5        
                },
                {
                    label: 'Tháng 2',
                    data: [1040, 4600, 200, 44570, 8900, 1363],
                    borderColor: "#FE6383",
                    boderWidth: 1.5
                  }
                ]
        },
            options: {
                plugins: {
                    legend: {
                      position: 'bottom',
                    },
                },
                scales: {
                    x: {
                      display: true,
                      title: {
                        display: true,
                        text: 'Ngày',
                        color: '#911',
                      }
                    },
                    y: {
                        display: true,
                        title: {
                          display: true,
                          text: 'Doanh thu (VND)',
                          color: '#911',
                        }
                      }
                },
                maintainAspectRatio: false
        }
    }
   )};

//  End Chart doanh thu  
// Category Create Form
const categoryCreateForm = document.querySelector("#category-create-form");
if(categoryCreateForm) {
  const validation = new JustValidate('#category-create-form');

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên danh mục!'
      }
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const parent = event.target.parent.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatars = filePond.avatar.getFiles();
      let avatar = null;
      if(avatars.length > 0) {
        avatar = avatars[0].file;
      }
    const description = tinymce.get("description").getContent();

      console.log(name);
      console.log(parent);
      console.log(position);
      console.log(status);
      console.log(avatar);
    console.log(description);
    })
  ;
}
// End Category Create Form
// Category Create Form
const tourCreateForm = document.querySelector("#tour-create-form");
if(tourCreateForm) {
  const validation = new JustValidate('#tour-create-form');

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên tour!'
      }
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const category = event.target.category.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatars = filePond.avatar.getFiles();
      let avatar = null;
      if(avatars.length > 0) {
        avatar = avatars[0].file;
      }
      const priceAdult = event.target.priceAdult.value;
      const priceChildren = event.target.priceChildren.value;
      const priceBaby = event.target.priceBaby.value;
      const priceNewAdult = event.target.priceNewAdult.value;
      const priceNewChildren = event.target.priceNewChildren.value;
      const priceNewBaby = event.target.priceNewBaby.value;
      const stockAdult = event.target.stockAdult.value;
      //const stockChildren = event.target.stockChildren.value;
      const stockBaby = event.target.stockBaby.value;
      const locations = [];
      const time = event.target.time.value;
      const vehicle = event.target.vehicle.value;
      //const departureDate = event.target.departureDate.value;
      const information = tinymce.get("information").getContent();
      const schedules = [];
      // locations
      const listElementLocation = document.querySelectorAll(`input[name="location"]:checked`);
      listElementLocation.forEach(input => {
        locations.push(input.value);
      })
      // End locations
       // schedules
       const listElementScheduleItem = tourCreateForm.querySelectorAll(".inner-schedule-item");
       listElementScheduleItem.forEach(scheduleItem => {
         const input = scheduleItem.querySelector("input");
         const title = input.value;
 
         const textarea = scheduleItem.querySelector("textarea");
         const idTextarea = textarea.id;
         const description = tinymce.get(idTextarea).getContent();
 
         schedules.push({
           title: title,
           description: description
         });
       })
       // End schedules
 
      console.log(name);
      console.log(parent);
      console.log(position);
      console.log(status);
      console.log(avatar);
      console.log(priceAdult);
      console.log(priceChildren);
      console.log(priceBaby);
      console.log(priceNewAdult);
      console.log(priceNewChildren);
      console.log(priceNewBaby);
      console.log(stockAdult);
      //console.log(stockChildren);
      console.log(stockBaby);
      console.log(locations);
      console.log(time);
      console.log(vehicle);
      //console.log(departureDate);
      console.log(information);
      console.log(schedules);

    })
  ;
}
// End Category Create Form
// Order Edit Form
const orderEditForm = document.querySelector("#order-edit-form");
if(orderEditForm) {
  const validation = new JustValidate('#order-edit-form');

  validation
    .addField('#fullName', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập họ tên!'
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
      },
    ])
    .addField('#phone', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập số điện thoại!'
      },
      {
        rule: 'customRegexp',
        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        errorMessage: 'Số điện thoại không đúng định dạng!'
      },
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value;
      const phone = event.target.phone.value;
      const note = event.target.note.value;
      const paymentMethod = event.target.paymentMethod.value;
      const paymentStatus = event.target.paymentStatus.value;
      const status = event.target.status.value;

      console.log(fullName);
      console.log(phone);
      console.log(note);
      console.log(paymentMethod);
      console.log(paymentStatus);
      console.log(status);
    })
  ;
}
// End Order Edit Form
// Setting Website Info Form
const settingWebsiteInfoForm = document.querySelector("#setting-website-info-form");
if(settingWebsiteInfoForm) {
  const validation = new JustValidate('#setting-website-info-form');

  validation
    .addField('#create-web', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên website!'
      },
    ])
    .addField('#email', [
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!',
      },
    ])
    .onSuccess((event) => {
      const createWebsite = event.target.create-web.value;
      const phone = event.target.phone.value;
      const email = event.target.email.value;
      const address = event.target.address.value;
      const logos = filePond.logo.getFiles();
      let logo = null;
      if(logos.length > 0) {
        logo = logos[0].file;
      }
      const favicons = filePond.favicon.getFiles();
      let favicon = null;
      if(favicons.length > 0) {
        favicon = favicons[0].file;
      }

      console.log(createWebsite);
      console.log(phone);
      console.log(email);
      console.log(address);
      console.log(logo);
      console.log(favicon);
    })
  ;
}
// End Setting Website Info Form



