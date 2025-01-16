<template>
  <Card :pt="{ body: 'p-0' }">
    <template #content>
      <NuxtLink :to="`${documentType}s/${item.document.document_id}`">
        <div class="flex flex-col hover:duration-200 hover:bg-hover">
          <CardRow flex>
            <MarkerDocumentType :document-type="documentType" class="float-left text-2xl" />
            <DocumentTitle :document="item.document" class="grow pl-2 font-semibold" />
            <span v-if="dates" class="float-right pl-2">{{ dates }}</span>
          </CardRow>
          <CardRow v-if="summary" flex>
            <p class="line-clamp-3 text-ellipsis">{{ summary }}</p>
          </CardRow>
          <CardRow v-if="images.length">TODO images</CardRow>
          <CardRow class="!block">
            <NuxtImg
              v-if="!useDefautlAvatarIcon"
              :src="`${forumAvatarUrl}${item.user.forum_username}/36/1_1.pngs`"
              class="inline-block rounded-full w-[24px] h-[24px]"
              loading="lazy"
              @error="useDefautlAvatarIcon = true"
              alt="Avatar" />
            <Avatar v-else shape="circle" :label="avatarLetter" />
            {{ $t(`feed.change.${item.change_type}.${documentType}`, { user: item.user.name }) }}
          </CardRow>
          <CardRow v-if="!['article', 'book', 'xreport'].includes(documentType)" flex>
            <span v-if="['outing', 'route'].includes(documentType)">
              <IconRatings />&nbsp;<DocumentRating :fields="item.document" />
            </span>

            <CardElevation
              v-if="isRouteListing(item.document) || isOutingListing(item.document)"
              :elevation="item.document.elevation_max"
              class="text-ellipsis" />

            <span
              v-if="(isRouteListing(item.document) || isOutingListing(item.document)) && !!item.document.height_diff_up"
              :title="$t('fields.height_diff_up.label')">
              <IconHeightDiffUp />
              {{ item.document.height_diff_up }}&nbsp;m
            </span>

            <span
              v-if="
                (isRouteListing(item.document) || isOutingListing(item.document)) &&
                !!item.document.height_diff_difficulties
              "
              :title="$t('fields.height_diff_difficulties.label')">
              <Icon icon="arrows-alt-v" />
              {{ item.document.height_diff_difficulties }}&nbsp;m
            </span>

            <CardElevation v-if="isWaypoint(item.document)" :elevation="item.document.elevation" />

            <span v-if="isWaypoint(item.document)">
              <IconWaypointType :type="item.document.waypoint_type" />
              <span>{{ capitalize($t(`waypoint_type-values.${item.document.waypoint_type}`)) }}</span>
            </span>
          </CardRow>
          <CardRow flex>
            <CardRegion :document="item.document" />
            <CardActivities
              v-if="
                isArticleListing(item.document) ||
                isBookListing(item.document) ||
                isOutingListing(item.document) ||
                isProfileListing(item.document)
              "
              :activities="item.document.activities" />
            <span class="flex flex-nowrap justify-end items-center gap-[0.1rem] min-w-20">
              <MarkerSoftMobility v-if="isOutingListing(item.document) && item.document.public_transport" />
              <MarkerImageCount v-if="isOutingListing(item.document)" :image-count="item.document.img_count" />
              <MarkerGpsTrace
                v-if="
                  (isOutingListing(item.document) || isRouteListing(item.document)) &&
                  item.document.geometry.has_geom_detail
                " />
              <MarkerCondition
                v-if="isOutingListing(item.document) && item.document.condition_rating"
                :condition="item.document.condition_rating" />
              <MarkerQuality :quality="item.document.quality" />
            </span>
          </CardRow>
        </div>
      </NuxtLink>
    </template>
  </Card>
</template>

<script setup lang="ts">
import * as v from 'valibot';
import type { FeedItem } from '../../api/c2c.js';
import {
  ArticleListing,
  BookListing,
  isArticleListing,
  isBookListing,
  isOutingListing,
  isProfileListing,
  isRouteListing,
  isWaypoint,
  OutingListing,
  RouteListing,
  WaypointListing,
} from '../../api/c2c.js';

const { item } = defineProps<{ item: FeedItem }>();
const { locale: lang, t } = useI18n();

const { outingDates } = useDate(lang);
const dates = computed(() =>
  isOutingListing(item.document) ? outingDates(item.document.date_start, item.document.date_end) : undefined,
);

const { documentType } = useDocument(item.document);
const locale = computed(() => useDocumentLocale().getLocaleSmart(item.document, lang.value));
const summary = computed(() => {
  const lv = locale.value;
  if (
    v.is(
      v.union([
        ArticleListing.entries.locales.item,
        BookListing.entries.locales.item,
        OutingListing.entries.locales.item,
        RouteListing.entries.locales.item,
        WaypointListing.entries.locales.item,
      ]),
      lv,
    ) &&
    lv.summary
  ) {
    return stripMarkdown(lv.summary);
  }
  return undefined;
});

const images = computed(() => {
  return [item.image1, item.image2, item.image3].filter(truthy);
});

const { forumAvatarUrl } = useForumApi();
const useDefautlAvatarIcon = ref(false);
const avatarLetter = computed(() => item.user.name.charAt(0).toUpperCase());
</script>
