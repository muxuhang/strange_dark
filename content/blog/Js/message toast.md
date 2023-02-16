---
title: js message.toast
date: "2022-07-13 10:30"
description: "js message"
---

```js
const message = (() => {
  const success = function (params) {
    createModal(params, 'has-background-success')
  };
  const info = function (params) {
    createModal(params, 'has-background-info')
  };
  const warning = function (params) {
    createModal(params, 'has-background-warning')
  }
  const error = function (params) {
    createModal(params, 'has-background-danger')
  };
  const createModal = (title, type) => {
    let messageModal = document.getElementById('message-modal')
    if (!messageModal) {
      const newMessageModal = document.createElement('div')
      newMessageModal.id = 'message-modal'
      newMessageModal.className = 'modal is-justify-content-flex-start'
      messageModal = newMessageModal
      // messageModal.parentElement.removeChild(oldCanvas)
      document.body.appendChild(messageModal)
    }
    messageModal.style.bottom = 'auto'
    messageModal.style.top = '0'
    messageModal.style.right = 'auto'
    messageModal.style.left = '50%'
    messageModal.style.marginTop = '20px'
    messageModal.style.transform = 'translateX(-50%)'
    messageModal.classList.remove('is-active')
    messageModal.innerHTML = `
      <div class='box ${type}' style='
        max-width:50%;
        min-width:300px;
        padding:0.6rem 1rem;
        color:#fff;
      '>${title}</div>
    `
    messageModal.classList.add('is-active')
    setTimeout(() => {
      messageModal.classList.remove('is-active')
    }, 1500);
  }
  return {
    success,
    error,
    warning,
    info
  }
})();

// 使用
message.success('测试')
```