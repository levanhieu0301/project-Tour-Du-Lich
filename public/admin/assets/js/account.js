// login-form 
const loginForm = document.querySelector("#login-form");
if(loginForm) {
    const validation = new JustValidate('#login-form');

    validation
        .addField('#email', [
        {
            rule: 'required',
            errorMessage: 'Vui lòng nhập email của bạn!',
        },
        {
            rule: 'email',
            errorMessage: 'Email không đúng định dạng!',
        },
        ])
        .addField('#password', [
        {
            rule: 'required',
            errorMessage: 'Vui lòng nhập mật khẩu!',
        },
        ])
        .onSuccess((event) => {
            const email = event.target.email.value;
            const password = event.target.password.value;
            const rememberPassword = event.target.rememberPassword.checked;
  
            const dataFinal = {
              email: email,
              password: password,
              rememberPassword: rememberPassword
            };
            fetch(`/${pathAdmin}/account/login`, {
              method: "POST",
              headers: {  
                "Content-Type": "application/json"
              },
              body: JSON.stringify(dataFinal)
            })
            .then(res => res.json())
            .then(data => {
              if(data.code === "success"){
                alert(data.message);
                window.location.href = `/${pathAdmin}/dashboard`;
              } else {
                alert(data.message);
              }
        });
})
}

// End login-form 

// Register-form 
const registerForm = document.querySelector("#register-form"); 
if(registerForm) {
    const validation = new JustValidate('#register-form');

    validation
        .addField('#fullName', [
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
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Vui lòng nhập email của bạn!',
            },
            {
                rule: 'email',
                errorMessage: 'Email không đúng định dạng!',
            }
            ])
        .addField('#password', [
            {
                rule: 'required',
                errorMessage: 'Vui lòng nhập mật khẩu!',
            },
            {
            validator: (value) => value.length >= 8,
            errorMessage: 'Mật khẩu phải chứa ít nhất 8 ký tự!',
            },
            {
            validator: (value) => /[A-Z]/.test(value),
            errorMessage: 'Mật khẩu phải chứ ít nhất một chữ cái in hoa!',
            },
            {
            validator: (value) => /[a-z]/.test(value),
            errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
            },
            {
            validator: (value) => /\d/.test(value),
            errorMessage: 'Mật khẩu phải chứa ít nhất một chữ số!',
            },
            {
            validator: (value) => /[@$!%*?&]/.test(value),
            errorMessage: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!',
            },
        ])
        .addField('#agree', [
            {
                rule: 'required',
                errorMessage: 'Bạn phải đồng ý với các điều khoản và điều kiện!',
            },
        ])
        .onSuccess((event) => {
            const fullName = event.target.fullName.value;
            const email = event.target.email.value;
            const password = event.target.password.value;
            const agree = event.target.agree.checked;

          if (agree){
            const dataFinal = {
              fullName: fullName,
              email: email,
              password: password,
            };
            fetch(`/${pathAdmin}/account/register`, { 
              method:"POST", 
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(dataFinal)
            })
            .then(res => res.json())
            .then(data => {
              if(data.code === "success"){
                alert(data.message);
                window.location.href = `/${pathAdmin}/account/login`;
              } else {
                alert(data.message);
              }
            })
          }
        })
    ;
}

// End Register-form 

// forgot-password-form 
const forgotPasswordForm = document.querySelector("#forgot-password-form");
if(forgotPasswordForm) {
  const validation = new JustValidate('#forgot-password-form');

  validation
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email của bạn!',
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!',
      },
    ])
    .onSuccess((event) => {
      const email = event.target.email.value;
     
      const dataFinal = {
        email: email,
        
      };
      fetch(`/${pathAdmin}/account/forgot-password`, {
        method: "POST",
        headers: {  
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataFinal)
      })
      .then(res => res.json())
      .then(data => {
        if(data.code === "success"){
          alert(data.message);
          window.location.href = `/${pathAdmin}/account/otp-password?email=${email}`;
        } else {
          alert(data.message);
        }
  });
    })
  ;
}
// End forgot-password-form 


// OTP Password Form
const otpPasswordForm = document.querySelector("#otp-password-form");
if(otpPasswordForm) {
  const validation = new JustValidate('#otp-password-form');

  validation
    .addField('#otp', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mã OTP!',
      },
    ])
    .onSuccess((event) => {
      const otp = event.target.otp.value;

      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get('email');
  
      const dataFinal = {
        otp: otp,
        email: email
      };
      fetch(`/${pathAdmin}/account/otp-password`, {
        method: "POST",
        headers: {  
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataFinal)
      })
      .then(res => res.json())
      .then(data => {
        if(data.code === "success"){
          alert(data.message);
          window.location.href = `/${pathAdmin}/account/reset-password`;
        } else {
          alert(data.message);
        }
  });

    })
  ;
}
// End OTP Password Form


// Reset Password Form
const resetPasswordForm = document.querySelector("#reset-password-form");
if(resetPasswordForm) {
  const validation = new JustValidate('#reset-password-form');

  validation
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mật khẩu!',
      },
      {
        validator: (value) => value.length >= 8,
        errorMessage: 'Mật khẩu phải chứa ít nhất 8 ký tự!',
      },
      {
        validator: (value) => /[A-Z]/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái in hoa!',
      },
      {
        validator: (value) => /[a-z]/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
      },
      {
        validator: (value) => /\d/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một chữ số!',
      },
      {
        validator: (value) => /[@$!%*?&]/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!',
      },
    ])
    .addField('#confirm-password', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng xác nhận mật khẩu!',
      },
      {
        validator: (value, fields) => {
          const password = fields["#password"].elem.value;
          return value == password;
        },
        errorMessage: 'Mật khẩu xác nhận không khớp!',
      },
    ])
    .onSuccess((event) => {
      const password = event.target.password.value;
      const dataFinal = {
        password: password
      };
      fetch(`/${pathAdmin}/account/reset-password`, {
        method: "POST",
        headers: {  
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataFinal)
      })
      .then(res => res.json())
      .then(data => {
        if(data.code === "success"){
          alert(data.message);
          window.location.href = `/${pathAdmin}/account/login`;
          
        } else {
          alert(data.message);
        }
  });
    })
  ;
}
// End Reset Password Form


// // Setting Account Admin Create Form
// const settingAccountAdminCreateForm = document.querySelector("#setting-account-admin-create-form");
// if(settingAccountAdminCreateForm) {
//   const validation = new JustValidate('#setting-account-admin-create-form');

//   validation
//     .addField('#name', [
//       {
//         rule: 'required',
//         errorMessage: 'Vui lòng nhập họ tên!'
//       },
//       {
//         rule: 'minLength',
//         value: 5,
//         errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
//       },
//       {
//         rule: 'maxLength',
//         value: 50,
//         errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
//       },
//     ])
//     .addField('#email', [
//       {
//         rule: 'required',
//         errorMessage: 'Vui lòng nhập email!'
//       },
//       {
//         rule: 'email',
//         errorMessage: 'Email không đúng định dạng!',
//       },
//     ])
//     .addField('#phone', [
//       {
//         rule: 'required',
//         errorMessage: 'Vui lòng nhập số điện thoại!'
//       },
//       {
//         rule: 'customRegexp',
//         value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
//         errorMessage: 'Số điện thoại không đúng định dạng!'
//       },
//     ])
//     .addField('#positionCompany', [
//       {
//         rule: 'required',
//         errorMessage: 'Vui lòng nhập chức vụ!'
//       },
//     ])
//     .addField('#password', [
//       {
//         rule: 'required',
//         errorMessage: 'Vui lòng nhập mật khẩu!',
//       },
//       {
//         validator: (value) => value.length >= 8,
//         errorMessage: 'Mật khẩu phải chứa ít nhất 8 ký tự!',
//       },
//       {
//         validator: (value) => /[A-Z]/.test(value),
//         errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái in hoa!',
//       },
//       {
//         validator: (value) => /[a-z]/.test(value),
//         errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
//       },
//       {
//         validator: (value) => /\d/.test(value),
//         errorMessage: 'Mật khẩu phải chứa ít nhất một chữ số!',
//       },
//       {
//         validator: (value) => /[@$!%*?&]/.test(value),
//         errorMessage: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!',
//       },
//     ])
//     .onSuccess((event) => {
//       const fullName = event.target.name.value;
//       const email = event.target.email.value;
//       const phone = event.target.phone.value;
//       const role = event.target.role.value;
//       const positionCompany = event.target.positionCompany.value;
//       const status = event.target.status.value;
//       const password = event.target.password.value;
//       const avatars = filePond.logo.getFiles();
//       let logo = null;
//       if(avatars.length > 0) {
//         logo = avatars[0].file;
//       }

//       console.log(fullName);
//       console.log(email);
//       console.log(phone);
//       console.log(role);
//       console.log(positionCompany);
//       console.log(status);
//       console.log(password);
//       console.log(logo);
//        const formData = new FormData();
//       formData.append("fullName", fullName);
//       formData.append("email", email);
//       formData.append("phone", phone);
//       formData.append("role", role);
//       formData.append("positionCompany", positionCompany);
//       formData.append("status", status);
//       formData.append("password", password);
//       formData.append("logo", logo);

//       fetch(`/${pathAdmin}/setting/create-account-admin`, {
//         method: "POST",
//         body: formData,
//       })
//         .then(res => res.json())
//         .then(data => {
//           if(data.code == "error") {
//             alert(data.message);
//           }

//           if(data.code == "success") {
//             window.location.href = `/${pathAdmin}/setting/list-account-admin`;
//           }
//         })

//     })
//   ;
// }
// // End Setting Account Admin Create Form



// // Setting Role Create Form
// const RoleCreateForm = document.querySelector('#setting-create-role'); 
// console.log(RoleCreateForm);
// if(RoleCreateForm) {
//   const validation = new JustValidate('#setting-create-role');

//   validation
//     .addField('#name', [
//       {
//         rule: 'required',
//         errorMessage: 'Vui lòng nhập tên nhóm quyền!'
//       },
//     ])
//     .onSuccess((event) => {
//        event.preventDefault();
//       const name = event.target.name.value;
//       const description = event.target.description.value;
//       const permissions = [];

//       // permissions
//       const listElementPermission = RoleCreateForm.querySelectorAll('input[name="permissions"]:checked');
//       listElementPermission.forEach(input => {
//         permissions.push(input.value);
//       });
//       // End permissions
//       console.log(name);
//       console.log(description);
//       console.log(permissions);

//       const dataFinal = {
//         name: name,
//         description: description,
//         permissions: permissions
//       };

//       fetch(`/${pathAdmin}/setting/roleCreate`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(dataFinal),
//       })
//         .then(res => res.json())
//         .then(data => {
//           if(data.code == "error") {
//             alert(data.message);
//           }

//           if(data.code == "success") {
//             window.location.href = `/${pathAdmin}/setting/list-role`;
//           }
//         })

//     })
//   ;
// }

// // End Setting Role Create Form

// // Setting Role Edit Form
// const settingRoleEditForm = document.querySelector("#setting-role-edit-form");
// if(settingRoleEditForm) {
//   const validation = new JustValidate('#setting-role-edit-form');

//   validation
//     .addField('#name', [
//       {
//         rule: 'required',
//         errorMessage: 'Vui lòng nhập tên nhóm quyền!'
//       },
//     ])
//     .onSuccess((event) => {
//       const id = event.target.id.value;
//       const name = event.target.name.value;
//       const description = event.target.description.value;
//       const permissions = [];

//       // permissions
//       const listElementPermission = settingRoleEditForm.querySelectorAll('input[name="permissions"]:checked');
//       listElementPermission.forEach(input => {
//         permissions.push(input.value);
//       });
//       // End permissions

//       const dataFinal = {
//         name: name,
//         description: description,
//         permissions: permissions
//       };

//       fetch(`/${pathAdmin}/setting/role/edit/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(dataFinal),
//       })
//         .then(res => res.json())
//         .then(data => {
//           if(data.code == "error") {
//             alert(data.message);
//           }

//           if(data.code == "success") {
//             window.location.reload();
//           }
//         })
//     })
//   ;
// }
// // End Setting Role Edit Form



// Profile Edit Form
const profileEditForm = document.querySelector("#profile-edit-form");
if(profileEditForm) {
  const validation = new JustValidate('#profile-edit-form');

  validation
    .addField('#name', [
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
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập email!'
      },
      {
        rule: 'email',
        errorMessage: 'Email không đúng định dạng!',
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
      const fullName = event.target.name.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const avatars = filePond.avatar.getFiles();
      let avatar = null;
      if(avatars.length > 0) {
        avatar = avatars[0].file;
      }

      console.log(fullName);
      console.log(email);
      console.log(phone);
      console.log(avatar);
    })
  ;
}
// End Profile Edit Form


// Profile Change Password Form
const profileChangePasswordForm = document.querySelector("#profile-change-password-form");
if(profileChangePasswordForm) {
  const validation = new JustValidate('#profile-change-password-form');

  validation
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng nhập mật khẩu!',
      },
      {
        validator: (value) => value.length >= 8,
        errorMessage: 'Mật khẩu phải chứa ít nhất 8 ký tự!',
      },
      {
        validator: (value) => /[A-Z]/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái in hoa!',
      },
      {
        validator: (value) => /[a-z]/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
      },
      {
        validator: (value) => /\d/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một chữ số!',
      },
      {
        validator: (value) => /[@$!%*?&]/.test(value),
        errorMessage: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!',
      },
    ])
    .addField('#confirmPassword', [
      {
        rule: 'required',
        errorMessage: 'Vui lòng xác nhận mật khẩu!',
      },
      {
        validator: (value, fields) => {
          const password = fields['#password'].elem.value;
          return value == password;
        },
        errorMessage: 'Mật khẩu xác nhận không khớp!',
      }
    ])
    .onSuccess((event) => {
      const password = event.target.password.value;
      console.log(password);
    })
  ;
}
// End Profile Change Password Form

