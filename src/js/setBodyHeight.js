export function setHeight(){
    /*
        页面被压缩的原因就是页面高度设置的不是固定值，而是百分比或vh等。想要不被压缩就要设置成固定值

        通过获取浏览器窗口高度，设置高度为固定值，而不是100%
       
        这样，页面就能占满全屏，并且也不会因为弹出键盘而被压缩
    */
   const mainSearch = $('#main-search')
   mainSearch.height($(window).height())
}