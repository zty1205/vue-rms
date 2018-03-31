<template xmlns:v-on="http://www.w3.org/1999/xhtml">

  <div>
    <input class="my-input" v-model="inputContent" placeholder="Take to do" v-on:keyup.enter="add"/>
    <Table border :columns="columns" :data="listContents" :no-data-text="noDATA"></Table>
  </div>

</template>

<script>
  // 记事本
  import Store from './store'
  export default {
    data(){
      return{
        columns:[
          {
          title: 'Time',
          key: 'time',  // 和存储的json数据的key要相同
          width: 160
          },
          {
            title: 'Content',
            key: 'content',
            ellipsis: true // 文本不换行 超过的部分显示为省略号
          },
          {
            title: 'Action',
            key: 'action',
            width: 140,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, 'View'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, 'Delete')
              ]);
            }
          }
        ],
        noDATA: '没有需要记录的事件...',
        listContents: Store.fetch(),
        inputContent:''
      }
    },
    watch: {
      listContents: {  //观察myData的变化 并处理
        handler: function (items) {
          Store.save(items)
        },
        deep: true  //必须的 深层存储 现改现存
      }
    },
    methods: {
      add:function(){
        if(this.inputContent!=''){
          let nowDate = new Date()
          let listContent={time: nowDate.toLocaleString(), content:this.inputContent};
          this.listContents.push(listContent);
          this.inputContent='';
        }
      },
      show (index) {
        this.$Modal.info({
          title: 'NotePad',
          content: `Time：${this.listContents[index].time}<br>Content：${this.listContents[index].content}`
        })
      },
      remove (index) {
        this.listContents.splice(index, 1);
      }
    }
  }
</script>

<style scoped>

  .my-input{
    line-height:28px;
    border:1px solid #ccc;
    border-radius:6px;
    width:98%;
    padding:5px;
    margin: 10px auto;
  }

</style>

