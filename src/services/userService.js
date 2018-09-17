import request from "../utils/request";

function upLoadHeadPicture(file) {
  return request({
    url: "/api/user/upLoadHeadPicture",
    method: "post",
    data: file
  });
}

function changeName(name) {
  return request({
    url: "/api/user/name",
    method: "post",
    data: {
      name
    }
  });
}

function getAuthCode() {
  return request({
    url: "/api/user/authCode",
    method: "post",
    data: {}
  });
}

function confirmAuthCode(authCode) {
  return request({
    url: "/api/user/confirmAuthCode",
    method: "post",
    data: {
      authCode
    }
  });
}

function getNewPhoneAuthCode(phoneNumber) {
  return request({
    url: "/api/user/newPhoneAuthCode",
    method: "post",
    data: {
      phoneNumber
    }
  });
}

function confirmNewPhoneAuthCode(authCode, phoneNumber) {
  return request({
    url: "/api/user/newPhoneConfirmAuthCode",
    method: "post",
    data: {
      authCode,
      phoneNumber
    }
  });
}

function updatePassword(newPassword, oldPassword = "") {
  return request({
    url: "/api/user/updatePassword",
    method: "post",
    data: {
      newPassword,
      oldPassword
    }
  });
}

function logout() {
  return request({
    url: "/api/user/logout",
    method: "post"
  });
}

function address(params, method) {
  if (!method) {
    method = params;
    params = {};
  }
  return request({
    url: "/api/user/address",
    method: method,
    data: params,
    params: method === "delete" ? params : ""
  });
}

export default {
  upLoadHeadPicture,
  changeName,
  getAuthCode,
  confirmAuthCode,
  getNewPhoneAuthCode,
  confirmNewPhoneAuthCode,
  updatePassword,
  logout,
  address
};
