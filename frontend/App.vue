<template>
  <view class="container">
    <Statusbar color = "#FFCE00"/> 
    <Header title="MaskMe" />
  </view>
</template>

<script>
import Statusbar from './components/Statusbar';
import Header from './components/Header';
export default {
  components:
  {
    Statusbar,
    Header
  }
}
</script>




<style>
.container {
  background-color: white;
  flex: 1;
}


.text-color-primary {
  color: lightgray;
  height: 20px;
}
</style>
