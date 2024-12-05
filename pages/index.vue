<template>
  <div clas="section">
    <div class="columns">
      <div
        class="column is-12-mobile"
        :class="
          feed
            ? 'is-7-tablet is-7-desktop is-8-widescreen is-9-fullhd'
            : 'is-7 is-8-fullhd'
        "
      >
        <!-- Association and website introduction -->
        <div class="box intro">
          <div class="feed-title has-cursor-pointer">
            <span class="title is-4" :class="{ 'is-marginless': !visible }">
              {{ $t('Welcome to Camptocamp, the mountain sports community!') }}
            </span>
            <FaIcon
              class="is-size-6 no-print accordion-icon mt-2"
              icon="angle-down"
              :rotation="visible ? 180 : undefined"
              @click="visible = !visible"
            />
          </div>
          <HomeBanner v-show="visible" />
          <BoardAnnouncementWidget v-if="isMobile" /><!-- TODO -->
          <DfmAdSmall v-if="isMobile" /><!-- TODO -->
          <!-- Switchs -->
          <div class="field">
            <span>
              <input
                id="c2c-mode"
                class="toggleCheckbox"
                type="checkbox"
                v-model="feed"
              />
              <label class="toggleContainer" for="c2c_mode">
                <span :class="{ 'is-active': !feed }" @click="feed = !feed">{{
                  $t('Dashboard')
                }}</span>
                <span :class="{ 'is-active': feed }" @click="feed = !feed">{{
                  $t('Activity feed')
                }}</span>
              </label>
            </span>
            <span class="preference-switch">
              <span v-if="isLogged">
                <input
                  id="c2c-personal-feed"
                  :class="{ 'switch is-rtl is-rounded': !isMobile }"
                  type="checkbox"
                  v-model="isPersonal"
                  @click="isPersonal = !isPersonal"
                />
                <label
                  for="c2c-personal-feed"
                  :title="
                    isPersonal
                      ? $t('Personal feed on')
                      : $t('Personal feed off')
                  "
                >
                  <span>{{ $t('Load my preferences') }}</span>
                </label>
              </span>
              <NuxtLink
                to="preferences"
                class="has-text-normal"
                :title="$t('My preferences')"
              >
                <FaIcon icon="gears" />
              </NuxtLink>
            </span>
          </div>
          <!-- Feed/Dashboard -->
          <div class="feed-view" v-if="feed">
            <!-- TODO component -->
            <FeedWidget
              :type="isPersonal && isLogged ? 'personal' : 'default'"
              hide-empty-documents
            />
          </div>
          <div v-if="!feed">
            <DashboardImagesGallery v-if="!isMobile" /><!-- TODO-->
            <DashboardOutingsList :is-personal="isPersonal" /><!-- TODO-->
            <DashboardImagesGallery v-if="isMobile" /><!-- TODO-->
            <DashboardRoutesList />
            <DashboardArticlesList v-if="isMobile" />
            <UsefulLinks v-if="isMobile" /><!-- TODO-->
            <ForumWidget :message-count="20" v-if="isMobile" /><!-- TODO-->
          </div>
        </div>
      </div>
      <div
        v-if="!isMobile"
        class="column"
        :class="
          feed
            ? 'is-5-tablet is-5-desktop is-4-widescreen is-3-fullhd'
            : 'is-5 is-4-fullhd'
        "
      >
        <BoardAnnouncementWidget /><!-- TODO-->
        <DfmAdSmall /><!-- TODO-->
        <HomeLinks />
        <HomeForum :message-count="20" />
        <DashboardArticlesList v-if="!feed" /><!-- TODO-->
      </div>
    </div>
  </div>

  <!-- TODO cleanup -->
  <button class="button is-primary">
    {{ $t('welcome', { toto: 'toto' }) }} -
    {{ $t('welcome', { toto: 'tata' }) }} - {{ $t('bananas', 0) }} -
    {{ $t('bananas', 1) }} -
    {{ $t('bananas', 10) }}
    <FaIcon :icon="['activity', 'hiking']"></FaIcon
    ><FaIcon icon="users"></FaIcon>
  </button>
</template>

<script setup lang="ts">
const { isMobile } = import.meta.client ? useScreen() : { isMobile: true };
const feed = ref(true); // TODO
const visible = ref(true); // TODO
const isPersonal = ref(false); // TODO
const isLogged = ref(false); // TODO
</script>

<style lang="scss" scoped>
@include mixins.mobile {
  .feed-view {
    padding-left: 0;
    padding-right: 0;

    .feed-title {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .field {
    flex-direction: column;
  }

  .preference-switch {
    margin-top: 0.3rem;
    margin-left: 0.3rem;
    display: flex;

    & > span {
      display: flex;
      flex-direction: row-reverse;

      & > * {
        margin-right: 0.3rem;
      }
    }
  }
}

@include mixins.tablet {
  .feed-view {
    margin-top: var(--bulma-size-3);
  }

  .field {
    justify-content: space-between;
    align-items: baseline;
  }
}

.feed-title {
  display: flex;

  span:first-child {
    flex-grow: 1;
  }
}

.intro {
  margin-bottom: var(--bulma-size-6);
}

.switch[type='checkbox']:checked + label::before {
  background: $color-base-c2c;
}

.toggleCheckbox {
  display: none;
}

.toggleContainer {
  position: relative;
  border-radius: 20px;
  background: white;
  border: 1px solid $color-base-c2c;
  padding: 5px 2px;
  cursor: pointer;
}

.is-active {
  color: white;
  border-radius: 20px;
  background: $color-base-c2c;
  transition: color 0.3s;
}

.toggleContainer span {
  padding: 3px 10px;
  text-align: center;
  z-index: 100;
}

.field {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.ams-ad {
  margin-bottom: var(--bulma-size-7);
}
</style>
