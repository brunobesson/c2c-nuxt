<template>
  <section>
    <div class="columns">
      <div class="column is-12-mobile">
        <div class="subtitle">
          {{
            $t(
              `Camptocamp.org aims to facilitate information sharing between mountain addicts and contribute to the safety of mountain activities.`
            )
          }}
        </div>
        <div class="columns">
          <div class="column is-12-mobile">
            <div>
              <p>{{ $t('All in store for you:') }}</p>
              <ul>
                <li>
                  <IconDocument type="route" fixed-width />
                  <NuxtLink to="routes">{{ $t('Routes to explore') }}</NuxtLink>
                </li>
                <li>
                  <IconDocument type="outing" fixed-width />
                  <NuxtLink to="outings">
                    {{
                      $t('Outings, with the latest conditions in the mountains')
                    }}
                  </NuxtLink>
                </li>
                <li>
                  <IconDocument type="xreport" fixed-width />
                  {{ $t('Accidents/Incidents database:') }}
                  <NuxtLink to="serac">SERAC</NuxtLink>
                </li>
                <li>
                  <IconYeti fixed-width />
                  {{ $t('Avalanche risk evaluation tool:') }}
                  <NuxtLink to="yeti">YETI</NuxtLink>
                </li>
                <li class="with-circle">
                  {{ $t('Library:') }}
                  <IconDocument type="article" />
                  <NuxtLink to="articles">{{ $t('articles') }}</NuxtLink>
                  <!-- TODO use composition for i18n-->
                  {{ $t('and') }}
                  <IconBook />
                  <NuxtLink to="books">{{ $t('books') }}</NuxtLink>
                </li>
                <li>
                  <IconForum />
                  <NuxtLink to="forum">
                    {{
                      $t(
                        'Forum: a place to chat about technical matters, or just petty talk'
                      )
                    }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="column is-12-mobile">
            <p>
              <NuxtLink to="/article/106726">
                {{ $t('Camptocamp Association') }}
              </NuxtLink>
              <!-- TODO i18n composition -->
              {{
                $t(
                  'is a non profit organization, where volunteers manage the camptocamp.org website'
                )
              }}
            </p>
            <NuxtLink to="/article/106726" class="menu-brand has-text-centered">
              <img
                src="@/assets/img/logo_asso.svg"
                alt="Camptocamp Association"
                class="logo-association"
              />
            </NuxtLink>
            <ul>
              <li>
                <a
                  href="https://www.helloasso.com/associations/camptocamp-association"
                  :title="$t('Join us')"
                >
                  {{ $t('Want to take part or get involved? Join us!') }}
                </a>
              </li>
              <li>
                <FaIcon icon="heart" class="donate-icon" />
                <a
                  href="https://www.helloasso.com/associations/camptocamp-association"
                  :title="$t('Donate')"
                >
                  {{
                    $t(
                      'Want to contribute financially (hosting, developing...)? Donate!'
                    )
                  }}' >
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.intro-banner {
  padding-bottom: 40px;
  padding-top: 70px;
  color: #fff;
  width: 80%;
  min-width: 730px;
  height: 100%;
  margin: auto;
  align-items: center;
}

.title.is-4 {
  margin-top: 25px;
}

.with-circle {
  list-style: disc !important;
  margin-left: var(--bulma-size-3);
}

@include mixins.mobile {
  .intro-banner {
    width: 100%;
    min-width: auto;
    padding: 20px;
  }

  .title.is-4 {
    margin-top: 0;
  }
}

.logo-association {
  max-width: 35%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
