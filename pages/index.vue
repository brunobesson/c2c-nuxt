<template>
  Hello
  <button class="button is-primary">Button <span class="toto"></span></button>
</template>

<style lang="scss" scoped>
.toto {
  @include mixins.arrow(purple);
}
</style>
