const STORAGE_KEY='todo-list'
export default {
  fetch(){
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)|| '[]')  //get 存储在Application里的local store  取不到的话就是空数组
  },
  save(items){
    window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))   //set
  }
}
