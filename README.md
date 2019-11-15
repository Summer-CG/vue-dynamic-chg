# vue-dynamic-chg

#### Description
vue-dynamic-component

#### Software Architecture
vue 

#### Installation

1.  npm i vue-dynamic-chg

#### Instructions

##### 如何使用？
 ```html
<div id="app">
  <dynamic :options="options" />
</div>
```

```javascript
import Dynamic from 'vue-dynamic-chg/components/Dynamic'
export default {
        components: { Dynamic },
        data() {
          return {
            options:{
                //   options配置  例如
                data:{},
                ...
                dynamics:[],
            }
          }
        },
      }
```

##### options 数据配置：
```javascript
options:{
       //全局组件信息配置  一下 this 都指向 动态组件(dynamic) = 配置好后生成的组件
       data:function(){},  // 双向绑定数据
       lifecycle:{},   // 生命周期 继承 vue 生命提供的生命周期
       watch:{},       // 监听 绑定的数据
       computed:{},    // 计算函数
       methods:{},     // 函数方法
       components:{},   // 局部组件

       //动态配置
       dynamics:[
           dynamicItem:{},
       ],

       // 单项 的组件配置
       dynamicItem:{
    
            //基础配置项
            type:'',     // 组件名称，template 优先级 高于 type
            template:'',  //html 模板 字符串 最后通过 vue.compile 编译；注 这里需要使用包含 vue.compile 版本的 vue.js
            
            
            // 配置项
            // 关于this 指向： 函数类型的配置 this 都指向 》》》  当前这个动态组件 实例
            // renderOptions 下 第一层的 属性都支持 函数类型 配置
            renderOptions:{
               // 这里同 vue 函数 createElement 的 数据对象 配置
               // 参考资料：https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
            
                //示例 配置
               'class':{},//Object|Function
            }
            
            // 局部配置 同上 全局配置
            data:function(){},  // 双向绑定数据
            lifecycle:{},   // 生命周期 继承 vue 生命提供的生命周期
            
            //特殊配置 项：
            
            staticHtml:Function (createElement){},//类似 render(createElement)
            // 返回（return） vNode
            
            vIf:function(){}, // 判断当前节点是否显示
            
            vFor:function(){},
            // 返回（return） [vNode]
           
            // 子级 配置
            children:[
              dynamicItem 对象
            ]
    
       }
   }
```

##### tool库 提供函数
```
    1.formatComponent([Array],[Array]) 
    第一个参数 把配置 通过 children 连接起来，
    第二个参数 表示第一个参数最后一个 组件配置 的多个子级组件

    2.setSubordinate：([Array])
    根据 配置 生成 合并动态组件
    返回一个新的函数 用来快速生成 生成配置简化后的
    例如
    let elFormItem_elInput = setSubordinate(['el-form-item','el-input'])
    
    作用：
    配置简单化：返回的函数 会多接收 elFormItemProps、elInputProps，存放指定 组件的 props
    elFormItem_elInput({
        elFormItemProps:{},
        elInputProps:{}
    })
```
##### this 指向

#### Gitee Feature

主要是用来通过数据动态生成组件；

一、特点：
1. 通过数据配置，动态生成。
2. 可继承父级配置，达到继承效果。
3. 灵活性强，接受 render函数 参数配置，提供生命周期，data双向数据，methods，compile，watch。
4. 接受html标签，全局组件（后期将会支撑局部组件） 动态生成。

二、缺点：
1. 配置项 比较复杂需要时间入手，配置根据组件嵌套层级而提高配置复杂度。
2. 配置内的 data双向数据，methods，compile，watch 都属于 vue-dynamic-chg 组件,导致不能明显知道具体数据结构，导致属性或方法重名被替换。

三、使用常见问题：
1. 注意查看配置项 里面的 this 指向问题。

四、使用场景：
1. 生成动态表单