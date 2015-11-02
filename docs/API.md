##1、根据商品名搜索

**GET /item/search/**

参数：`keywords`

返回：

```
{
    success : true,
    data : {
        items : [
            {
                name : "自行车",//商品名
                price : "200",//价格
                id : 1232190124,//商品ID
                seller : "某某某",//卖家姓名
                tel : "13300000000",//联系方式
                time : "2015-08-31 13 : 05 : 28",//发布时间，用GMT时间也可以
                photo : "http : //a.com/123456"//物品照片的URL
                location : "复旦本部"//交易地点
                ......//数据库中这个条目的其他字段
            },
            {
               ......//同上
            }
        ],
        
    }
}
```
范例：`/item/search/?keywords=自行车`


----------


##2、根据商品ID返回商品详细信息

**GET /item/**

参数 `id`

返回：

```
{
    success : true,
    data : {
            name : "自行车",//商品名
            price : "200",//价格
            id : 1232190124,//商品ID
            seller : "某某某",//卖家姓名
            tel : "13300000000",//联系方式
            time : "2015-08-31 13 : 05 : 28",//发布时间，用GMT时间也可以
            photo : "http : //a.com/123456"//物品照片的URL
            location : "复旦本部"//交易地点
            ......//数据库中这个条目的其他字段
        }
}
```
范例：`/item/?id=1234567`


----------

##3、发布商品

**POST /item/**

参数(form data)：

`name` 商品名

`price` 价格

`seller` 卖家姓名

`tel` 联系方式

`photo` 物品照片的URL

`location` 交易地点 

返回：

```
{
    success : true,
    id : 12345678  //商品ID
}
```

------


##4、返回最新发布的商品集合(用于瀑布流)

GET /item/collection/


返回：

```
{
    success : true,
    data : {
        items : [
            {
                name : "自行车",//商品名
                price : "200",//价格
                id : 1232190124,//商品ID
                seller : "某某某",//卖家姓名
                tel : "13300000000",//联系方式
                time : "2015-08-31 13 : 05 : 28",//发布时间，用GMT时间也可以
                photo : "http : //a.com/123456"//物品照片的URL
                location : "复旦本部"//交易地点
                ......//数据库中这个条目的其他字段
            },
            {
               ......//同上
            }
        ],
        
    }
}
```

------


##5、上传图片

POST(content-type  :  multipart/form-data) /picture/ 

返回：

```
{
    success : true,
    picture_url : 'www.xxx.com/.....'
}
```

