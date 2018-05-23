<template>
  <div class="hello">
  
      <qrcode :value="msg" :options="{
       background: 'green',
  backgroundAlpha: 0.5,
  foreground: 'blue',
  foregroundAlpha: 0.8,
  level: 'H',
  size: 200	}" tag="img"></qrcode>



  </div>
</template>

<script>
import VueQrcode from '@xkeshi/vue-qrcode'

export default {
  name: 'HelloWorld',
  components: {
    qrcode: VueQrcode
  },
  data () {
    return {
      msg: 'https://vuejs.org?Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
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
</style>
