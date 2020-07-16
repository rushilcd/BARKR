<template>
  <nb-container :style="{ backgroundColor: white }">
    <nb-header>
      <nb-left>
        <nb-button transparent :onPress="() => this.props.navigation.goBack()">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Shopping</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content padder>
      <nb-button :onPress="handleBtnPress">
        <nb-text>Shopping</nb-text>
      </nb-button>
    </nb-content>
  </nb-container>
</template>

<script>
import { ActionSheet } from "native-base";

export default {
  data() {
    return {
      btnOptions: [
     
        { text: "Shop Cloth ", icon: "analytics", iconColor: "#f42ced" },
        { text: "Shop N95 Masks", icon: "aperture", iconColor: "#ea943b" },
      
        { text: "Cancel", icon: "close", iconColor: "#25de5b" }
      ],
      optionCancelIndex: 4,
      optionDestructiveIndex: 3,
      clicked: 0
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
        }
      );
    }
  }
};
</script>
