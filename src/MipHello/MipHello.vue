<template>
  <div>
    <div class="MipHello_test_bg">
      <i class="MipHello_test_i"></i>
      <span>{{msg}}</span>
    </div>
  </div>
</template>
<style>
  .MipHello_test_bg{
    background: green;
  }
  .MipHello_test_i{
    background: url('./image.png') repeat;
    display: block;
    width: 17px;
    height: 14px;
    left:130px;
    position: absolute;
  }
</style>
<script>
    export default{
        name: 'MipHello',
        data(){
            return{
                msg:'hello world !!!',
            }
        },
    }
</script>

