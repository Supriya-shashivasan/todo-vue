var Vue_app = new Vue({
  el: '#todo-list',
  data: {
    showingAddModal:false,
    showingEditModal:false,
    showingDeleteModal:false,
    errorMessage:"",
    successMessage:"",
    tasks: [],
    newTask: {title:"",comment:""},
    clickedTask : {}


  },
  mounted : function() {
    console.log("mounted");
    this.getAllTasks();
  },
  methods: {
    getAllTasks: function () {
      axios.get("http://localhost/todo/assets/api/api.php?action=read")
      .then(function(response){
        //console.log(response);
        if(response.data.error){
          Vue_app.errorMessage = response.data.message;
        }else{
          Vue_app.tasks = response.data.tasks;
        }
      });
    },
    saveTask: function(){
      //console.log(Vue_app.newTask);
      var formData = Vue_app.toFormData(Vue_app.newTask);
      axios.post("http://localhost/todo/assets/api/api.php?action=create", formData)
      .then(function(response){
        console.log(response);
        //Vue_app.newTask = {title: "", comment=""};
        if(response.data.error){
          Vue_app.errorMessage = response.data.message;
        }else{
          Vue_app.getAllTasks();
        }
    });
  },
  updateTask: function(){
    //console.log(Vue_app.newTask);
    var formData = Vue_app.toFormData(Vue_app.clickedTask);
    axios.post("http://localhost/todo/assets/api/api.php?action=update", formData)
    .then(function(response){
      console.log(response);
      Vue_app.clickedTask = {};
      if(response.data.error){
        Vue_app.errorMessage = response.data.message;
      }else{
        Vue_app.successMessage = response.data.message;
        Vue_app.getAllTasks();
      }
  });
},
deleteTask: function(){
  //console.log(Vue_app.newTask);
  var formData = Vue_app.toFormData(Vue_app.clickedTask);
  axios.post("http://localhost/todo/assets/api/api.php?action=delete", formData)
  .then(function(response){
    console.log(response);
    Vue_app.clickedTask = {};
    if(response.data.error){
      Vue_app.errorMessage = response.data.message;
    }else{
      Vue_app.successMessage = response.data.message;
      Vue_app.getAllTasks();
    }
});
},
selectTask(task){
  Vue_app.clickedTask = task;
},

  toFormData: function(obj){
    var form_data = new FormData();
    for( var key in obj){
      form_data.append(key,obj[key]);
    }
    return form_data;
  },

  clearMessage: function(){
    Vue_app.errorMessage = "";
    Vue_app.successMessage = "";
  }
  }
});
