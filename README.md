该分页插件使用简单，适用于bootstrap4，通过接口调用，体积小，配合bootstrap使用，请先引入bootstrap     
使用方法如下：  


## 在页面上插入
```
<nav aria-label="Page navigation">
    <ul class="pagination">
    </ul>
</nav>
```

## 调用方法
```
$(function(){
	getAssetInfoList(1,10);
});

//获取列表
function getAssetInfoList(pageNum,pageSize){
	$.ajax({
	    type: "POST",
	    url: "/user/getAssetInfoList",
	    data: {pageNum:pageNum,pageSize:pageSize},
	    success: function (data) {
	    	//业务处理
	        $(".assert_tbody").empty();
	        let str = "";
	        let listData = data.data.list;
	        for(let i = 0; i < listData.length; i++){
	        	str += '<tr>'
	        		str += '<th scope="row">' + (i + 1) + '</th>'
	        		str += '<td>' + listData[i].asset_code + '</td>'
	        		str += '<td>' + listData[i].asset_name + '</td>'
	        		str += '<td>' + listData[i].memo + '</td>'
	        	str += '</tr>'
	        }
	        $(".assert_tbody").append(str);
	        //分页
	        $(".pagination").initPagination(
	        	function(pageNum,pageSize){getAssetInfoList(pageNum,pageSize)},
	        	data.data.pages,
	        	{pageNum: data.data.pageNum,pageSize: data.data.pageSize}
	        );
	    }
	});
}

``` 
    
## 参数说明
initPagination(func,pages,option)  
* func: 获取数据的方法
* pages：总页数
* pageNum：当前页数
* pageSize：每页数量

![](pic1.png)



