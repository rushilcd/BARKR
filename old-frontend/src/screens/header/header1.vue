<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-header>
      <nb-left> </nb-left>
      <nb-body>
        <nb-title>Account Details</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content padder>
         <nb-button :onPress="() => this.props.navigation.goBack()">
        <nb-text>Name</nb-text>
       
      <nb-button :onPress="() => this.props.navigation.goBack()">
        <nb-text>Email</nb-text>
      </nb-button>
      <nb-button :onPress="() => this.props.navigation.goBack()">
        <nb-text>Password</nb-text>
      </nb-button>
    </nb-content>
  </nb-container>
</template>
