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

        let files= null;
        const imageDefault = filepondImage.closest("[image-default]")
        if(imageDefault){
          const linkImage =  imageDefault.getAttribute("image-default");
          if(linkImage){
            files= [{
                source: linkImage,
            }]
          }
        }
          
        filePond[filepondImage.name] = FilePond.create(filepondImage, {
            labelIdle: "+",
            files: files
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

      const formData = new FormData();
      formData.append("name", name);
      formData.append("parent", parent);
      formData.append("position", position);
      formData.append("status", status);
      formData.append("avatar", avatar);
      formData.append("description", description);
      fetch(`/${pathAdmin}/category/create`, {
        method: "POST",
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if(data.code === "success"){
          alert(data.message);
          window.location.href = `/${pathAdmin}/category/list`;
        }
        else {
          alert(data.message);
        }
      })
  })
};

// End Category Create Form
// Tour Create Form 
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
      const stockChildren = event.target.stockChildren.value;
      const stockBaby = event.target.stockBaby.value;
      const locations = [];
      const time = event.target.time.value;
      const vehicle = event.target.vehicle.value;
      const departureDate = event.target.date.value;
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
      console.log(stockChildren);
      console.log(stockBaby);
      console.log(locations);
      console.log(time);
      console.log(vehicle);
      console.log(departureDate);
      console.log(information);
      console.log(schedules);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("position", position);        
      formData.append("status", status);
      formData.append("avatar", avatar);
      formData.append("priceAdult", priceAdult);
      formData.append("priceChildren", priceChildren);
      formData.append("priceBaby", priceBaby);
      formData.append("priceNewAdult", priceNewAdult);
      formData.append("priceNewChildren", priceNewChildren);  
      formData.append("priceNewBaby", priceNewBaby);
      formData.append("stockAdult", stockAdult);
      formData.append("stockChildren", stockChildren);
      formData.append("stockBaby", stockBaby);
      formData.append("locations", JSON.stringify(locations));
      formData.append("time", time);
      formData.append("vehicle", vehicle);
      formData.append("departureDate", departureDate);
      formData.append("information", information);
      formData.append("schedules", JSON.stringify(schedules));

      fetch(`/${pathAdmin}/tours/create`, {
        method: 'POST',
        body: formData
      })
      .then (res => res.json())
      .then (data => {
        if(data.code === "success"){
          alert(data.message);
          window.location.href = `/${pathAdmin}/tours/list`;
        }
        else {
          alert(data.message);
        }
      })

    })
  ;
}
// End Tour Create Form
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


// sider
const sider = document.querySelectorAll(".sider .inner-menu li a");
if(sider) {
  const pathNameUrl = window.location.pathname;
  const splitPathNameUrl = pathNameUrl.split("/");
  sider.forEach(item => {
    const href = item.getAttribute("href");
    const splitHref = href.split("/");
    if(splitPathNameUrl[1] == splitHref[1] && splitPathNameUrl[2] == splitHref[2]){
      item.classList.add("active");
    }
  }) 
}

// sider

// Logout
const btnLogout = document.querySelector(".inner-logout");
if(btnLogout){
  btnLogout.addEventListener("click", () => {
    fetch(`/${pathAdmin}/account/logout`,{
      method: "POST"
    })
    .then(res => res.json())
    .then(data => {
      if(data.code === "success"){
        window.location.href = `/${pathAdmin}/account/login`;
      }
    })
  })
}
// Logout
// Alert
const alertTime = document.querySelector("[alert-time]");
if(alertTime) {
  let time = alertTime.getAttribute("alert-time");
  time = time ? parseInt(time) : 4000;
  setTimeout(() => {
    alertTime.remove();
  }, time);
}
// End Alert

// edit category
const btnEditCategory =  document.querySelectorAll(".inner-edit");
if(btnEditCategory){
  btnEditCategory.forEach(btn => {
    btn.addEventListener("click", () => {
      const apiData = btn.getAttribute("api-data");
      fetch(apiData, {
        method:"PATCH",
        body: JSON.stringify({
          // Add the data you want to update here
        })
      })
    })
})
}
// end edit category

// Category edit Form
const categoryEditForm = document.querySelector("#category-edit-form");
if(categoryEditForm) {
  const validation = new JustValidate('#category-edit-form');

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập tên danh mục!'
      }
    ])
    .onSuccess((event) => {
      const id = event.target.id.value;
      const name = event.target.name.value;
      const parent = event.target.parent.value;
      const position = event.target.position.value;
      const status = event.target.status.value;
      const avatars = filePond.avatar.getFiles(); 
      let avatar = null;
      if(avatars.length > 0) {
        avatar = avatars[0].file;
        const elementImageDefault = event.target.avatar.closest("[image-default]");
        if(elementImageDefault) {
          const imageDefault = elementImageDefault.getAttribute("image-default");
          if(imageDefault.includes(avatar.name)) {
            avatar = null;
          }
        }
      }

    const description = tinymce.get("description").getContent();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("parent", parent);
      formData.append("position", position);
      formData.append("status", status);
      formData.append("avatar", avatar);
      formData.append("description", description);
      fetch(`/${pathAdmin}/category/edit/${id}`, {
        method: "PATCH",
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if(data.code === "success"){
          alert(data.message);
        }
        else {
          alert(data.message);
        }
      })
  })
};

// End Category edit Form

// Button Delete
const listButtonDelete = document.querySelectorAll("[button-delete]");

if(listButtonDelete.length > 0) {
  listButtonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const dataApi = button.getAttribute("data-api");

      fetch(dataApi, {
        method: "PATCH"
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error") {
            alert(data.message);
          }

          if(data.code == "success") {
            window.location.reload();
          }
        })
    })
  })
}
// End Button Delete
// Lọc theo status
const filterStatus = document.querySelector("[filter-status]");
if(filterStatus){
  const url = new URL(window.location.href); 
  filterStatus.addEventListener("change", () => {
    const value = filterStatus.value;
    if(value){
      url.searchParams.set("status", value);
    }       
    else {    
      url.searchParams.delete("status");
    }
    window.location.href = url.href;     
  })
  // Hiển thị mặc định
  const currentValue = url.searchParams.get("status");
  if(currentValue){
    filterStatus.value = currentValue;
  }
}
// end Lọc theo status

// Filter Created By
const filterCreatedBy = document.querySelector("[filter-created-by]");
if(filterCreatedBy) {
  const url = new URL(window.location.href);

  // Lắng nghe thay đổi lựa chọn
  filterCreatedBy.addEventListener("change", () => {
    const value = filterCreatedBy.value;
    if(value) {
      url.searchParams.set("createdBy", value);
    } else {
      url.searchParams.delete("createdBy");
    }
    window.location.href = url.href;
  })

  // Hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("createdBy");
  if(valueCurrent) {
    filterCreatedBy.value = valueCurrent;
  }
}
// End Filter Created By
// Filter Start Date
const filterStartDate = document.querySelector("[filter-start-date]");
if(filterStartDate) {
  const url = new URL(window.location.href);

  // Lắng nghe thay đổi lựa chọn
  filterStartDate.addEventListener("change", () => {
    const value = filterStartDate.value;
    if(value) {
      url.searchParams.set("startDate", value);
    } else {
      url.searchParams.delete("startDate");
    }
    window.location.href = url.href;
  })

  // Hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("startDate");
  if(valueCurrent) {
    filterStartDate.value = valueCurrent;
  }
}
// End Filter Start Date

// Filter End Date
const filterEndDate = document.querySelector("[filter-end-date]");
if(filterEndDate) {
  const url = new URL(window.location.href);

  // Lắng nghe thay đổi lựa chọn
  filterEndDate.addEventListener("change", () => {
    const value = filterEndDate.value;
    if(value) {
      url.searchParams.set("endDate", value);
    } else {
      url.searchParams.delete("endDate");
    }
    window.location.href = url.href;
  })

  // Hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("endDate");
  if(valueCurrent) {
    filterEndDate.value = valueCurrent;
  }
}
// End Filter End Date

// Filter Reset
const filterReset = document.querySelector("[filter-reset]");
if(filterReset) {
  const url = new URL(window.location.href);

  filterReset.addEventListener("click", () => {
    // console.log(url) // in ra cảm nhận url
    url.search = "";
    window.location.href = url.href;
  })
}
// End Filter Reset

// Check All
const checkAll = document.querySelector("[check-all]");
if(checkAll) {
  checkAll.addEventListener("click", () => {
    const listCheckItem = document.querySelectorAll("[check-item]");
    listCheckItem.forEach(item => {
      item.checked = checkAll.checked;
    })
  })
}
// End Check All

// Change Multi
const changeMulti = document.querySelector("[change-multi]");
if(changeMulti) {
  const select = changeMulti.querySelector("select");
  const button = changeMulti.querySelector("button");

  button.addEventListener("click", () => {
    const option = select.value;
    const listInputChecked = document.querySelectorAll(`[check-item]:checked`);
    if(option && listInputChecked.length > 0) {
      const ids = [];
      listInputChecked.forEach(item => {
        const id = item.getAttribute("check-item");
        ids.push(id);
      })

      const dataFinal = {
        option: option,
        ids: ids
      };

      const dataApi = changeMulti.getAttribute("data-api");

      fetch(dataApi, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataFinal)
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error") {
            alert(data.message);
          }

          if(data.code == "success") {
            window.location.reload();
          }
        })
    }
  })
}
// End Change Multi
// Search
const inputSearch = document.querySelector("[search]");
if(inputSearch) {
  const url = new URL(window.location.href);

  // Lắng nghe bấm enter thì tìm kiếm
  inputSearch.addEventListener("keyup", (event) => {
    if(event.code == "Enter") {
      const value = inputSearch.value;
      if(value) {
        url.searchParams.set("keyword", value);
      } else {
        url.searchParams.delete("keyword");
      }
      window.location.href = url.href;
    }
  })

  // Hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("keyword");
  if(valueCurrent) {
    inputSearch.value = valueCurrent;
  }
}
// End Search
// Pagination
const pagination = document.querySelector("[pagination]");
if(pagination) {
  const url = new URL(window.location.href);

  // Lắng nghe sự kiện change
  pagination.addEventListener("change", () => {
    const value = pagination.value;
    if(value) {
      url.searchParams.set("page", value);
    } else {
      url.searchParams.delete("page");
    }
    window.location.href = url.href;
  })

  // Hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("page");
  if(valueCurrent) {
    pagination.value = valueCurrent;
  }
}
// End Pagination


// Lọc theo status tour

const selectStatus = document.querySelector("[select-status]");
if(selectStatus) {
  const url = new URL(window.location.href);
  selectStatus.addEventListener("change", () => {
    const value  = selectStatus.value;
    if(value){
      url.searchParams.set("status", value);
    }else {
      url.searchParams.delete("status");
    }
    window.location.href = url.href
  })
  const valuCurrent = url.searchParams.get("status");
  if(valuCurrent) {
    selectStatus.value = valuCurrent;
  }
}



// TOUR 
// End Lọc theo status tour

// Filter Created By
const createdBy = document.querySelector("[createdBy]");
if(createdBy) {
  const url = new URL(window.location.href);

  // Lắng nghe thay đổi lựa chọn
  createdBy.addEventListener("change", () => {
    const value = createdBy.value;
    if(value) {
      url.searchParams.set("createdBy", value);
    } else {
      url.searchParams.delete("createdBy");
    }
    window.location.href = url.href;
  })

  // Hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("createdBy");
  if(valueCurrent) {
    createdBy.value = valueCurrent;
  }
}
// End Filter Created By

// Lọc theo ngày tạo
// Filter Start Date
const StartDate = document.querySelector("[start-date]");
if(StartDate) {
  const url = new URL(window.location.href);

  // Lắng nghe thay đổi lựa chọn
  StartDate.addEventListener("change", () => {
    const value = StartDate.value;
    if(value) {
      url.searchParams.set("startDate", value);
    } else {
      url.searchParams.delete("startDate");
    }
    window.location.href = url.href;
  })

  // Hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("startDate");
  if(valueCurrent) {
    StartDate.value = valueCurrent;
  }
}
// End Filter Start Date

// Filter End Date
const EndDate = document.querySelector("[end-date]");
if(EndDate) {
  const url = new URL(window.location.href);

  // Lắng nghe thay đổi lựa chọn
  EndDate.addEventListener("change", () => {
    const value = EndDate.value;
    if(value) {
      url.searchParams.set("endDate", value);
    } else {
      url.searchParams.delete("endDate");
    }
    window.location.href = url.href;
  })

  // Hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("endDate");
  if(valueCurrent) {
    EndDate.value = valueCurrent;
  }
}

// end Lọc theo ngày tạo

//Lọc theo danh mục 
const selectCategory = document.querySelector("[select-category]");
if(selectCategory) {
  const url = new URL(window.location.href);

  // Lắng nghe thay đổi lựa chọn
  selectCategory.addEventListener("change", () => {
    const value = selectCategory.value;
    if(value) {
      url.searchParams.set("category", value);
    } else {
      url.searchParams.delete("category");
    }
    window.location.href = url.href;
  })

  // Hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("category");
  if(valueCurrent) {
    selectCategory.value = valueCurrent;
  }
}

// end Lọc theo danh mục

// Filter Reset
const Reset = document.querySelector("[reset]");
if(Reset) {
  const url = new URL(window.location.href);

  Reset.addEventListener("click", () => {
    console.log(url) // in ra cảm nhận url
    url.search = "";
    window.location.href = url.href;

  })
}
// End Filter Reset

// Check all tour
const checkAllTour = document.querySelector("[check-all-tour]");
if(checkAllTour) {
  checkAllTour.addEventListener("click", () => {
    const listCheckItem = document.querySelectorAll("[check-item-tour]");
      listCheckItem.forEach(item => {
        item.checked = checkAllTour.checked;
      })
  })
}
// End Check all tour


// change multi tour
const changeMultiTour = document.querySelector("[change-multi-tour]");
if(changeMultiTour) {
  const select = changeMultiTour.querySelector("select");
  const button = changeMultiTour.querySelector("button");
  button.addEventListener("click", () => {
    const valueOption = select.value;
    const listInputChecked = document.querySelectorAll(`[check-item-tour]:checked`)
    if(valueOption && listInputChecked.length > 0) {
      const ids= [];
      listInputChecked.forEach(item => {
        const id = item.getAttribute("check-item-tour");
        ids.push(id);
      })
      const dataFinal = {
        option: valueOption,
        ids: ids
      };  
      const dataApi = changeMultiTour.getAttribute("data-api");
      fetch(dataApi, {
        method: "PATCH",
        headers: {          
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataFinal)
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error") {
            alert(data.message);
          } 
          if(data.code == "success") {
            window.location.reload();
          }     
        })
    }
  })

}

// end change multi tour
// Search
const Search = document.querySelector("[search]");
if(Search) {
  const url = new URL(window.location.href);

  // Lắng nghe bấm enter thì tìm kiếm
  Search.addEventListener("keyup", (event)=> {
    if(event.code == "Enter") {
      const value = Search.value;
      if(value) {
        url.searchParams.set("keyword", value);
      } else {
        url.searchParams.delete("keyword");
      }
      window.location.href = url.href;
    }
  })

  // Hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("keyword");
  if(valueCurrent) {
    Search.value = valueCurrent;
  }
}
// End Search

// Pagination
const paginationTour = document.querySelector("[pagination]");
if(paginationTour) {
  const url = new URL(window.location.href);

  // Lắng nghe sự kiện change
  paginationTour.addEventListener("change", () => {
    const value = paginationTour.value;
    if(value) {
      url.searchParams.set("page", value);
    } else {
      url.searchParams.delete("page");
    }
    window.location.href = url.href;
  })

  // Hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("page");
  if(valueCurrent) {
    paginationTour.value = valueCurrent;
  }
}
// End Pagination