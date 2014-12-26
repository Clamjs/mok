#api : a.json
---------

adfladsjklajd

字段 | 类型 | 名称 | 描述 | 规则 | 详情
---|------|------|------|------|---
 code  |  number  |  zhengchauaga  |  -  |  -  |  - 
 msg  |  string  |  tishi  |  -  |  -  |  - 
 data  |  object  |  fan  |  -  |  -  | @link {ObjectMap} data


* data["model"]["child"]的描述

字段 | 类型 | 名称 | 描述 | 规则 | 详情
---|------|------|------|------|---
 name  |  string  |  child1  |  -  |  -  |  - 

* data["model"]的描述

字段 | 类型 | 名称 | 描述 | 规则 | 详情
---|------|------|------|------|---
 id  |  number  |  user id  |  -  |  -  |  - 
 name  |  number  |  username  |  -  |  -  |  - 
 age  |  string  |  user age  |  -  |  -  |  - 
 child  |  array  |  user children  |  -  |  -  | @link {[string]} data["model"]["child"]

* data的描述

字段 | 类型 | 名称 | 描述 | 规则 | 详情
---|------|------|------|------|---
 model  |  object  |  real data  |  -  |  -  | @link {ObjectMap} data["model"]

*----------------Powered By MockDoc----------------------*
