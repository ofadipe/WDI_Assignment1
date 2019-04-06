<template>
<nav>
    <v-toolbar app dark class="deep-purple">
        <v-toolbar-side-icon  @click="drawer = !drawer" class="blue--text">

        </v-toolbar-side-icon>
        <v-toolbar-title>
            <span class="font-weight-light">Olu Fadipe</span>
            <span> Autoura</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn flat folor="grey">
            <span>Log Out</span>
            <v-icon right>exit_to_app</v-icon>
        </v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'home', text: 'Home', route: '/' },
        { icon: 'accessible', text: 'Accessible Places', route: '/accessiblepoi' },
        { icon: 'fastfood', text: 'Restaurants', route: '/restaurants' },
        { icon: 'done_all', text: 'Results', route: '/resultsn' },
      ]
    }
  }
}
</script>
