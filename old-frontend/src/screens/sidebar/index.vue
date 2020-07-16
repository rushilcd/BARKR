<template>
  <nb-container>
    <nb-content class="sidebar-content-wrapper" :bounces="false">
      <image
        :source="drawerCover"
        class="drawer-cover"
        :style="stylesObj.drawerCoverObj"
      />
      <image
        :source="drawerImage"
        class="drawer-image"
        :style="stylesObj.drawerImageObj"
      />
      <nb-list>
        <nb-list-item
          v-for="data in datas"
          :key="data.route"
          button
          noBorder
          :onPress="() => handleListItemClick(data)"
        >
          <nb-left>
            <nb-icon
              active
              :name="data.icon"
              :style="{ color: '#777', fontSize: 26, width: 30 }"
            />
            <nb-text>
              {{ data.name }}
            </nb-text>
          </nb-left>
       
        </nb-list-item>
      </nb-list>
    </nb-content>
  </nb-container>
</template>

<script>
import { Dimensions, Platform } from "react-native";
import drawerCover from "../../../assets/drawer-cover.png";
import drawerImage from "../../../assets/logo-kitchen-sink.png";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {
  props: {
    navigation: {
      type: Object
    }
  },
  data() {
    return {
      drawerCover,
      drawerImage,
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
      datas: [
     
        {
          name: "Shop Masks!",
          route: "Actionsheet",
          icon: "easel",
          bg: "#C5F442"
        },
        {
          name: "Settings",
          route: "Header",
          icon: "phone-portrait",
          bg: "#477EEA",
          types: "10"
        },
        {
          name: "Footer",
          route: "Footer",
          icon: "phone-portrait",
          bg: "#DA4437",
          types: "4"
        },
    
     
        {
          name: "MaskMyFriends",
          route: "NHDeckSwiper",
          icon: "swap",
          bg: "#3591FA",
          types: "2"
        },
     
        
        {
          name: "Rewards Center",
          route: "NHIcon",
          icon: "information-circle",
          bg: "#bfe9ea",
          types: "4"
        },
       
        {
          name: "Contacts",
          route: "NHList",
          icon: "lock",
          bg: "#5DCEE2",
          types: "8"
        },
        // {
        //   name: "ListSwipe",
        //   route: "ListSwipe",
        //   icon: "swap",
        //   bg: "#C5F442",
        //   types: "3"
        // },
      
      ]
    };
  },
  methods: {
    handleListItemClick(dataObj) {
      this.navigation.navigate(dataObj.route);
    }
  }
};
</script>

<style>
.sidebar-content-wrapper {
  flex: 1;
  background-color: #fff;
}
.drawer-cover {
  flex: 1;
  align-self: stretch;
  position: relative;
  margin-bottom: 10;
}
.drawer-image {
  align-self: center;
  position: absolute;
  height: 75;
  width: 210;
}
.list-item-badge-container {
  border-radius: 3;
  height: 25;
  width: 72;
}
.list-item-badge-text {
  /* font-weight: 400; // not-working  */
  /* font-weight: bold; // working */
  text-align: center;
}
</style>
