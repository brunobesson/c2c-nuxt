<template>
  <div class="advertisement-fallback">PUB TODO</div>
</template>

<style scoped lang="scss">
.advertisement {
  width: 160px;
  height: 320px;
  position: relative;
  margin-left: auto;
  margin-right: auto;

  iframe {
    height: 320px;
    width: 160px;
  }

  .advertisement-fallback {
    display: block;
    position: aboslute;
    top: 0;
    left: 0;

    img {
      width: 160px;
      height: 320px;
    }
  }
}
</style>
