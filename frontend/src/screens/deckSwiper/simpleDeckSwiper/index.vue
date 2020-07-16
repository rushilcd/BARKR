<template>
  <nb-container :style="{ backgroundColor: '#C9C9FE' }">
    <nb-header>
      <nb-left>
        <nb-button transparent :onPress="() => this.props.navigation.goBack()">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Friends!</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <view :style="{ flex: 1, padding: 12 }">
      <nb-deck-swiper
        :dataSource="cardItemsArr"
        :looping="isLoopingRequired"
        :renderEmpty="handleCardEmpty"
        :renderItem="handleCardRendering"
      >
      </nb-deck-swiper>
    </view>
  </nb-container>
</template>

<script>
import React from "react";
import { View, Text } from "react-native";
import cardOne from "../../../../assets/p1.png";
import cardTwo from "../../../../assets/p2.png";
import cardThree from "../../../../assets/p3.png";
import cardFour from "../../../../assets/p4.png";

import CardComponent from "../common/card";

export default {
  data() {
    return {
      cardItemsArr: [
        {
          text: "Anny shared a MaskMe!",
          name: "+1 maskPoints",
          image: cardOne
        },
        {
          text: "Grace shared a MaskMe!",
          name: "+2 maskPoints",
          image: cardTwo
        },
        {
          text: "Susan shared a MaskMe!",
          name: "+3 maskPoints",
          image: cardThree
        },
        {
          text: "Elssa shared a MaskMe!",
          name: "+4 maskPoints",
          image: cardFour
        }
      ],
      isLoopingRequired: false
    };
  },
  methods: {
    handleCardEmpty() {
      return (
        <View>
    
        </View>
      );
    },
    handleCardRendering(item) {
      return <CardComponent item={item} />;
    }
  }
};
</script>
