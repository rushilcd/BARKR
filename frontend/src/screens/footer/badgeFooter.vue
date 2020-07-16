<template>

  <nb-container :style="{ backgroundColor: 'black' }">

    
    <nb-header>
      <nb-left>
        <nb-button transparent :onPress="() => this.props.navigation.goBack()">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Activities</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
       <image
        :source="drawerImage"
        class="drawer-image"
        :style="stylesObj.drawerImageObj"
      />

    <nb-content padder></nb-content>

    <nb-footer>
      <nb-footer-tab>
        <nb-button :active="tab1" :onPress="toggleTab1" vertical badge>
          <nb-badge>
            <nb-text>2</nb-text>
          </nb-badge>
          <nb-icon name="apps" :active="tab1" />
          <nb-text>News</nb-text>
        </nb-button>

        <nb-button :active="tab2" :onPress="toggleTab2">
          <nb-icon name="camera" :active="tab2" />
          <nb-text>Camera</nb-text>
        </nb-button>

        <nb-button :active="tab3" :onPress="toggleTab3" vertical badge>
          <nb-badge class="badge-3-bg">
            <nb-text>51</nb-text>
          </nb-badge>
          <nb-icon name="compass" :active="tab3" />
          <nb-text>Maps</nb-text>
        </nb-button>

        <nb-button :active="tab4" :onPress="toggleTab4">
          <nb-icon name="contact" :active="tab4" />
          <nb-text>MyPoints</nb-text>
        </nb-button>
      </nb-footer-tab>
    </nb-footer>
  </nb-container>
</template>

<script>

import { Dimensions, Platform } from "react-native";
import drawerImage from "../../../assets/p8.png";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  data() {
    return {
      drawerImage,
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
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
    toggleTab1() {
 
      this.tab1 = true;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = false;
    },
    toggleTab2() {
      this.tab1 = false;
      this.tab2 = true;
      this.tab3 = false;
      this.tab4 = false;
    },
    toggleTab3() {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = true;
      this.tab4 = false;
    },
    toggleTab4() {
      
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = true;

    }
  }
};
</script>

<style>
.drawer-image {
  align-self: center;
  position: absolute;
  height: 220;
  width: 250;
  margin-top: 200;
  margin-Left: 20;
}
.badge-3-bg {
  background-color: green;
}
</style>
