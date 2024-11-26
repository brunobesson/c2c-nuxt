<template>
  <div class="root">
    <SideMenu />
    <div class="wrapper">
      <Navigation />
      <div class="content">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.root {
  display: grid;
  grid-template-columns: 100px auto;
}

.wrapper {
  display: grid;
  grid-template-rows: 100px max-content;
}

.content {
  background-color: green;
}
</style>
