js Error 错误上报字段

```js
{
  time:"", //客户端错误产生的时间
  type:"jsError",
  data:{ // 错误详细信息
    msg:"",// 错误提示
    stack:"", //错误堆栈
    url:""//  错误页面链接
    line:0, // 错误行
    col:0 //  错误列

  }
}
```
