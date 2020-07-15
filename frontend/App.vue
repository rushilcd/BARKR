
<template>
  <view class="container">
    <Statusbar color = "#FFCEE"/> 
    <Header title="MaskMe" />
    <image
    :style="{width: 250, height: 250, marginTop: 140, marginLeft: 60}"
          :source="{uri: 'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_3333,w_5000,x_0,y_0/c_limit,dpr_3.0,f_auto,fl_lossy,q_80,w_500/masks_ebawwg.png'}"

    />
    <button
        :on-press="Login"
        title="Login"
        color="#841584"
        accessibility-label="user name + password"
    />
 
  <button
        :on-press="SignUp"
        title="Sign Up"
        color="#841584"
        accessibility-label="user name + password"
    />




        
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
  },
 methods: {
        Login: function() {
            
        },
        SignUp: function(){

        }
    }




}
