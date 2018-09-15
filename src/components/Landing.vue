<template>
  <div>
<!-- Success -->
<b-alert :show="dismissCountDown" dismissible variant="success" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
      <p>Success! alert will dismss after {{dismissCountDown}} seconds...</p>
</b-alert>
    <!-- register modal -->
    <b-modal @ok="registerAccount" style="text-align:left" ref="registerModal" title="Register">
      <!-- name -->
      <b-form-group id="fieldset1" label="Name"
        label-for="input1" :invalid-feedback="invalidName" :valid-feedback="validName"  :state="stateName">
        <b-form-input id="input1" type="text" placeholder="Enter your name" :state="stateName" v-model.trim="displayName"></b-form-input>
      </b-form-group>
      <!-- email -->
      <b-form-group id="fieldset1" label="Email"
        label-for="input1" :invalid-feedback="invalidEmail" :valid-feedback="validEmail"  :state="stateEmail">
        <b-form-input id="input1" type="email" placeholder="Enter your email" :state="stateEmail" v-model.trim="email"></b-form-input>
      </b-form-group>
      <!-- password -->
      <b-form-group id="fieldset1" label="Password"
        label-for="input1" :invalid-feedback="invalidPassword" :valid-feedback="validPassword"  :state="statePassword">
        <b-form-input id="input1" type="password" placeholder="Enter your password" :state="statePassword" v-model.trim="password"></b-form-input>
     </b-form-group>
     <b-button variant="submit" @click="goLogin">Have account? Login</b-button>
    </b-modal>
    
    <!-- detail modal -->
    <b-modal ref="detailModal" title="Aspiration for KM IPB 2019">
      <p>from <b>{{detailAspiration.name}}</b></p>
      <p>"{{detailAspiration.aspiration}}"</p>
    </b-modal>
    <!-- login modal -->
    <b-modal @ok="login" style="text-align:left" ref="loginModal" title="Login">
      <!-- name -->
      <!-- email -->
      <b-form-group id="fieldset1" label="Email"
        label-for="input1" :invalid-feedback="invalidEmail" :valid-feedback="validEmail"  :state="stateEmail">
        <b-form-input id="input1"  type="email" placeholder="Enter your email" :state="stateEmail" v-model.trim="email"></b-form-input>
      </b-form-group>
      <!-- password -->
      <b-form-group id="fieldset1" label="Password"
        label-for="input1" :invalid-feedback="invalidPassword" :valid-feedback="validPassword"  :state="statePassword">
        <b-form-input id="input1" type="password" placeholder="Enter your password" :state="statePassword" v-model.trim="password"></b-form-input>
     </b-form-group>
    </b-modal>

    <h3>Registration</h3>
    <Countdown deadline="September 18, 2018"></Countdown>
    <h3>Pemira Day</h3>
    <Countdown end="October 19, 2018"></Countdown>
    <h3 v-if="displayName == ''">Hi <b>Anonymous!</b><br> One aspiration from you will be contribution for <b>KM IPB 2019</b></h3>
    <h3 v-else>Hi <b>{{displayName}}!</b><br> One aspiration from you will be contribution for <b>KM IPB 2019</b></h3>
    <div style="margin:auto;width:60%;text-align:center">
        <b-form-textarea id="textarea1" v-model="aspiration" placeholder="Tuliskan aspirasimu" :rows="5" :max-rows="7">
        </b-form-textarea>
        <br>
        <b-button v-if="aspiration != '' && cat !=''" @click="createAspiration" :size="'sm'" :variant="'primary'">Submit</b-button>
        <b-button v-else disabled @click="createAspiration" :size="'sm'" :variant="'primary'">Submit</b-button>
        <br>
        <p>*Pick your favourite cat<br><b>{{cat}}</b></p>
        <img v-on:click="pickCats('Momo','https://www.kucinglucu.net/wp-content/uploads/2018/05/FB_IMG_14534576999633437.jpg')" class="cats" style="width:150px;height:150px;border-radius:15px" src="https://www.kucinglucu.net/wp-content/uploads/2018/05/FB_IMG_14534576999633437.jpg">
        <img v-on:click="pickCats('Miyaw','https://i0.wp.com/www.meongku.com/wp-content/uploads/2015/01/foto-kucing-lucu-2.jpg?w=600&ssl=1')" class="cats" style="width:150px;height:150px;border-radius:15px" src="https://i0.wp.com/www.meongku.com/wp-content/uploads/2015/01/foto-kucing-lucu-2.jpg?w=600&ssl=1">
        <img v-on:click="pickCats('Kim','https://4.bp.blogspot.com/-KgcJg-uZg_s/VN04RsuaKiI/AAAAAAAADeY/g5Vk2zTUq38/s1600/gambar-kucing-lucu-pemanasan-olahraga.jpg')" class="cats" style="width:150px;height:150px;border-radius:15px" src="https://4.bp.blogspot.com/-KgcJg-uZg_s/VN04RsuaKiI/AAAAAAAADeY/g5Vk2zTUq38/s1600/gambar-kucing-lucu-pemanasan-olahraga.jpg">
        <img v-on:click="pickCats('Nou','http://ganlob.com/wp-content/uploads/2018/03/luhu2-730x480_c.jpg')" class="cats" style="width:150px;height:150px;border-radius:15px" src="http://ganlob.com/wp-content/uploads/2018/03/luhu2-730x480_c.jpg">
        <img v-on:click="pickCats('Tensen','https://www.petlican.com/wp-content/uploads/2016/02/Kedilerin-Duygular%C4%B1n%C4%B1-Nas%C4%B1l-Anlar%C4%B1z.jpg')" class="cats" style="width:150px;height:150px;border-radius:15px" src="https://www.petlican.com/wp-content/uploads/2016/02/Kedilerin-Duygular%C4%B1n%C4%B1-Nas%C4%B1l-Anlar%C4%B1z.jpg">
        <img v-on:click="pickCats('Grin','http://img.mp.itc.cn/upload/20170606/d102b503081f4ae39f482b96d0aac775_th.jpg')" class="cats" style="width:150px;height:150px;border-radius:15px" src="http://img.mp.itc.cn/upload/20170606/d102b503081f4ae39f482b96d0aac775_th.jpg">
        <img v-on:click="pickCats('Piya','https://hewanpeli.com/wp-content/uploads/2017/11/anjing-chihuahua.jpg')" class="cats" style="width:150px;height:150px;border-radius:15px" src="https://hewanpeli.com/wp-content/uploads/2017/11/anjing-chihuahua.jpg">
        <img v-on:click="pickCats('Hacida','https://4.bp.blogspot.com/-U9ibyoOAJBY/VN04PmbTwpI/AAAAAAAADds/fq5elQR4O2E/s1600/gambar-hewan-lucu-foto-kucing.jpg')" class="cats" style="width:150px;height:150px;border-radius:15px" src="https://4.bp.blogspot.com/-U9ibyoOAJBY/VN04PmbTwpI/AAAAAAAADds/fq5elQR4O2E/s1600/gambar-hewan-lucu-foto-kucing.jpg">
        <img v-on:click="pickCats('Bim','https://www.anipedia.net/imagenes/videos-gatos-800x375.jpg')" class="cats" style="width:150px;height:150px;border-radius:15px" src="https://www.anipedia.net/imagenes/videos-gatos-800x375.jpg">
        <img v-on:click="pickCats('Benci','https://www.maxnyoos.com/upload/media/entries/2018-01/31/882-9-eabb1eb2f95de1c505a9008eb1f665ad.jpg')" class="cats" style="width:150px;height:150px;border-radius:15px" src="https://www.maxnyoos.com/upload/media/entries/2018-01/31/882-9-eabb1eb2f95de1c505a9008eb1f665ad.jpg">
    </div>
      <div style="height:30px;background-color:black;margin:50px 0px"></div>
    <h1><b>Aspiration for KM IPB 2019</b></h1>(click for detail)
    <div style="width:90%;margin:5%;">
      <b-card-group deck>
       <b-row>
            <b-col cols="6" md="3" v-for="asp in this.aspirationList" :key="asp.id">
              <b-card v-on:click="detail(asp)" class="cards" :img-src="asp.catUrl" img-alt="Card image" img-top border-variant="primary">
                  <p>from: <b>{{asp.name}}</b></p>
                  <p class="card-text">
                      "{{asp.aspiration}}""
                  </p>
              </b-card>
            </b-col>
       </b-row>
      </b-card-group>
    </div>
    <h3 v-if="isLoggedIn == 'true'" style="cursor:pointer" v-on:click="logout"><b>Logout</b></h3>
  </div>

</template>
<script>
import Countdown from "vuejs-countdown";
import firebase from 'firebase'
import moment from 'moment'

export default {
  name: "Landing",
  components: { Countdown },
  data() {
    return {
      pageCount: 0,
      isLoggedIn: "",
      displayName: "",
      email:"",
      password:"",
      aspiration:"",
      aspirationList:"",
      detailAspiration:"",
      // Countdown
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      // cat
      cat:"",
      catUrl:""
    };
  },
  beforeMount: function() {
    this.getAspiration();
    this.currentUser = JSON.parse(localStorage.getItem("account"))
    this.isLoggedIn = localStorage.getItem("isLoggedIn")
    if(localStorage.getItem("displayName") !=null) {
      this.displayName = localStorage.getItem("displayName")
    }
    },
  mounted: function() {
    console.log("islog",localStorage.getItem("isLoggedIn"));
    if(this.isLoggedIn == "true"){
      this.getUser()
    }
  },
  methods: {
    pickCats(cat,url) {
      this.cat = cat
      this.catUrl = url
    },
    createAspiration() {
      if (!localStorage.getItem("isLoggedIn")) {
        this.$refs.registerModal.show();
      } else  {
        this.submitAspiration();
      }
    },
    randomId() {
          return Math.random().toString(30).substr(2)
    },
    detail(aspiration) {
      this.detailAspiration = aspiration;
      this.$refs.detailModal.show();
    },
    submitAspiration() {
        var unique = this.randomId()
        firebase.database().ref('aspiration/' + unique).set({
            aspiration: this.aspiration,
            status: "pending",
            tasksId: unique,
            name:this.displayName,
            cat:this.cat,
            catUrl:this.catUrl,
            created_at: moment(new Date()).local().format().toString(),
        }).then(success => {
            console.log("success create aspiration")
            this.showAlert()
            this.getAspiration()
        }, err => {
            console.log("failed save data", err)
        })
    },
    getAspiration() {
      firebase.database().ref('/aspiration/').once('value')
      .then(value => {
        if(value.val() != null) {
          this.aspirationList = value.val();
          console.log("aspiration list", this.aspirationList)
        }
      })
    },
    getUser() {
      firebase.database().ref('/users/' + this.currentUser.uid).once('value')
      .then(value => {
          var user = value.val();
          this.displayName = user.displayName
          console.log("x",this.displayName);
      })
    },
    goLogin() {
       this.$refs.loginModal.show();
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    registerAccount(e) {
       firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    console.log("New Account is :", user);
                    localStorage.setItem('account', JSON.stringify(user));
                    localStorage.setItem('displayName', this.displayName);
                    localStorage.setItem('isLoggedIn', 'true');
                    this.createUserData();

                    this.$router.push('/');
                    this.$refs.registerModal.hide();

                    this.showAlert()
                }, err => {
                    console.log("Failed to register", err.message);
                })
            e.preventDefault();

    },
     createUserData() {
       if(localStorage.getItem("account") != null) {
         var user = firebase.auth().currentUser
         console.log("user",user)
        firebase.database().ref("users/" + user.uid)
        .set({
            userId: user.uid,
            displayName: this.displayName,
            email: user.email,
          })
          .then(() => {
            // this.showAlert()
          });
       }
    },
    login(e) {
      firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(
              user => {
                  this.user = user
                  alert('Welcome, ' + this.user.email);
                  localStorage.setItem('account', JSON.stringify(this.user));
                  localStorage.setItem('isLoggedIn', 'true');
                  this.$router.push('/');
                  this.$refs.loginModal.hide();
                  location.reload()
                  this.showAlert()
              },
              err => {
                  alert(err.message);
              }
          );
      e.preventDefault();
     },
     logout() {
      firebase.auth().signOut().then(() => {
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("displayName")
        localStorage.removeItem("account")
        location.reload()
        alert("Thankyou for your contribution!")
      });
      }
  },
  computed: {
    stateName() {
      return this.displayName.length >= 3 ? true : false;
    },
    invalidName() {
      if (this.displayName.length > 3) {
        return "";
      } else if (this.displayName.length > 0) {
        return "Enter at least 3 characters";
      } else {
        return "Please enter something";
      }
    },
    validName() {
      return this.stateName === true ? "Nice!" : "";
    },
    stateEmail() {
      return this.email.length >= 3 ? true : false;
    },
    invalidEmail() {
      if (this.email.length > 3) {
        return "";
      } else if (this.email.length > 0) {
        return "Enter at least 3 characters";
      } else {
        return "Please enter something";
      }
    },
    validEmail() {
      return this.stateEmail === true ? "Nice!" : "";
    },
    statePassword() {
      return this.password.length >= 6 ? true : false;
    },
    invalidPassword() {
      if (this.password.length > 6) {
        return "";
      } else if (this.password.length > 0) {
        return "Enter at least 6 characters";
      } else {
        return "Please enter something";
      }
    },
    validPassword() {
      return this.statePassword === true ? "Nice!" : "";
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.cards {
  cursor:pointer;
  overflow: hidden;
  max-height: 500px;
  widows: 200px;
}
.cats:hover {
  border: solid;
}
.cats {
  cursor: pointer;
}
</style>
