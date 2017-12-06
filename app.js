// Turbolinks的拦截页面跳转，替换之前的 window.onbeforeunload = function ...
// 取消提醒事件绑定参见 clear_page_change_notice_before_submit 方法
// 设置提醒只需page_change_need_confirm_notice=true
// 表单未提交，跳转触发
var page_change_need_confirm_notice = false,
    page_change_notice_content = null;
$(document).on('turbolinks:before-load', function () {
  page_change_need_confirm_notice = false
})
// 表单未提交，跳转触发
$(document).on("page:before-change turbolinks:before-visit", function() {
  if (page_change_need_confirm_notice) {
    if(confirm(page_change_notice_content||"该页面表单尚未提交，您确定要离开此页面吗?")){
      page_change_need_confirm_notice = false
      return true
    }else
      return false;
  }
});

//提交的时候不需要confirm
$(document).on('turbolinks:load', function () {
  $('input[type="submit"]').on('click',function(){
    page_change_need_confirm_notice = false
  })
})

// 离开页面增加提醒的confirm
function set_page_change_notice_content(content){
  page_change_need_confirm_notice = true
  page_change_notice_content = content
}

