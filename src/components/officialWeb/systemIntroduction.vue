<template>
  <div class="publicweb">
    <heador></heador>
    <div class="content">
      
    </div>
  </div>
</template>

<script>
import heador from './header'
  export default {
    components : {
      heador
    }
  }
</script>

<style scoped lang="less">
.publicweb {
  position: fixed;
  background: #f3f3f3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y:scroll; 
  .content {
    margin: 0.2rem auto;
    width: 6rem;
    padding: 0.2rem;
    height: 5rem;
    border-radius: 0.2rem;
    background:#fff;
    background-size: 100%;
  }
}
</style>