# 接口文档
-------


## 接口描述


字段 | 类型 | 名称 | 描述 | 规则 | 详情
---|------|------|------|------|---
 name  |  string  |  testCase  |  An test json data with comments; name this is a name for test  |  -  |  - 
 version  |  string  |  the version  |  version is mok version  |  -  |  - 
 age  |  number  |  age  |  my age~~  |  -  |  - 
 content  |  array  |  api content  |  as you known~  |  -  | @link content

## 引用数据


* content["0"]的描述

字段 | 类型 | 名称 | 描述 | 规则 | 详情
---|------|------|------|------|---
 doc  |  boolean  |  yes, mok support a doc as markdown~  |  -  |  -  |  - 
 mock  |  boolean  |  yeap, mock must support  |  -  |  -  |  - 

* content的描述

字段 | 类型 | 名称 | 描述 | 规则 | 详情
---|------|------|------|------|---
 0  |  object  |  -  |  -  |  -  | @link content["0"]

*Powered By MockDoc* 
