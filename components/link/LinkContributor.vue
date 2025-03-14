<template>
  <IconModerator v-if="isAssociationHistoryUser(contributor) && contributor.moderator" />
  <IconBlocked v-if="isAssociationHistoryUser(contributor) && contributor.blocked" />
  <IconRobot v-if="isAssociationHistoryUser(contributor) && contributor.robot" />
  <NuxtLink :to="{ name: 'profile', params: { id: contributor.user_id } }">{{ contributor.name }}</NuxtLink>
  (<NuxtLink :to="{ name: 'whatsnew', query: { u: contributor.user_id } }" rel="nofollow">c</NuxtLink>
  <template v-if="isAssociationHistoryUser(contributor)">
    &nbsp;|&nbsp;<a :href="`${baseUrl}users/${contributor.forum_username}/activity`">d</a></template
  >)
</template>

<script setup lang="ts">
import type { AssociationHistoryUser, WhatsnewUser } from '~/api/c2c.js';

defineProps<{ contributor: WhatsnewUser | AssociationHistoryUser | { name: string; user_id: number } }>();

const { baseUrl } = useForumApi();

const isAssociationHistoryUser = (
  contributor: WhatsnewUser | AssociationHistoryUser | { name: string; user_id: number },
): contributor is AssociationHistoryUser => 'robot' in contributor;
</script>
