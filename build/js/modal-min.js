"use strict";!function(){var e=bodyScrollLock.disableBodyScroll,t=bodyScrollLock.enableBodyScroll,o=function(){var e=f.value,t=L.value,o=y.value,s=new XMLHttpRequest;s.addEventListener("load",function(){200===s.status&&a()}),s.open("POST","http://rest.learncode.academy/api/afrianska/form",!0),s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify({name:e,email:t,message:o}))},a=function(){m.classList.remove("modal--show"),u.classList.add("modal--show"),t(r),setTimeout(function(){u.classList.add("modal--reveal"),m.classList.remove("modal--reveal")},100),setTimeout(function(){u.classList.remove("modal--reveal")},1500),setTimeout(function(){r.classList.remove("modal--show"),u.classList.remove("modal--show")},2500)},s=function(e){c.contains(e.target)||(e.preventDefault(),i())},l=function(e){27===e.keyCode&&(e.preventDefault(),i())},n=function(){r.classList.add("modal--show"),m.classList.add("modal--show"),setTimeout(function(){m.classList.add("modal--reveal")},100),e(r),window.addEventListener("keydown",l),r.addEventListener("click",s)},i=function(){m.classList.remove("modal--reveal"),setTimeout(function(){r.classList.remove("modal--show"),m.classList.remove("modal--show")},600),t(r),window.removeEventListener("keydown",l),r.removeEventListener("click",s)},d=document.querySelector("#open-modal"),r=document.querySelector(".modal"),c=document.querySelector(".modal__wrapper"),m=document.querySelector(".modal__form"),u=document.querySelector(".modal__success"),v=document.querySelector("#form");if(v){var f=v.querySelector("#name"),L=v.querySelector("#email"),y=v.querySelector("#message");v.addEventListener("submit",function(e){e.preventDefault(),f.validity.valid&&L.validity.valid&&y.validity.valid&&o()})}d&&r&&c&&d.addEventListener("click",function(e){e.preventDefault(),n()})}();