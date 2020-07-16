<template>


  <nb-container :style="{ backgroundColor: '#FFFFFF' }">
    <nb-header>
      <nb-left>
        <nb-button
          transparent
          :onPress="() => this.props.navigation.openDrawer()"
        >
          <nb-icon name="menu" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Shopping</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content padder>
      <nb-button :onPress="handleBtnPress">
        <nb-text>Buy a Mask</nb-text>
      </nb-button>
    </nb-content>
    <image
        :source="drawerImage"
        class="drawer-image"
        :style="stylesObj.drawerImageObj"
      />

  </nb-container>
</template>

<script>
import React, {Component} from 'react';


import { Dimensions, Platform } from "react-native";
import drawerImage from "../../../assets/mask.png";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

import { ActionSheet } from "native-base";
import { WebView, Linking } from 'react-native';
export default {
  data() {
    return {
      drawerImage,
      btnOptions: ["Shop Cloth Masks ", "Shop Disposable Masks ", "Cancel"],
      optionCancelIndex: 4,
      optionDestructiveIndex: 3,
      clicked: 0,
      stylesObj: {
        drawerCoverObj: {
          height: deviceHeight / 3.5
        },
        drawerImageObj: {
          left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
          top:
            Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
          resizeMode: "cover"
        },
        badgeText: {
          fontSize: Platform.OS === "android" ? 11 : 13,
          marginTop: Platform.OS === "android" ? -3 : 0,
          fontWeight: "400"
        }
      },
    };
  },
  methods: {
    handleBtnPress() {
      ActionSheet.show(
        {
          options: this.btnOptions,
          cancelButtonIndex: this.optionCancelIndex,
          destructiveButtonIndex: this.optionDestructiveIndex,
          title: "Select An Option"
        },
        buttonIndex => {
          this.clicked = this.btnOptions[buttonIndex];
          //   this.optionCancelIndex = this.clicked;
        }
      );
   
      const uri = 'https://www.medicalexpo.com/medical-manufacturer/disposable-respirator-51931.html';
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ uri }}
        onNavigationStateChange={(event) => {
      
            this.webview.stopLoading();
            Linking.openURL(event.uri);
          
        }}
      />
    
    }
  }
};
</script>
<style>
.drawer-image {
  align-self: center;
  position: absolute;
  height: 150;
  width: 250;
  marginTop: 250;
  marginLeft: 33;
}
</style>
