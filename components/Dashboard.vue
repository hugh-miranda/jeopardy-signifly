<template>
  <div class="dashboard">
    <div class="scoreboard">
      <!-- SCOREBOARD -->
      <div :class="`team ${teams[0].name === currentTeam ? 'team--active' : ''}`">
        <p class="team--name">TEAM {{teams[0].name}}</p>
        <p class="team--score">{{teams[0].score}}</p>
      </div>
      <Signifly class="logo" />
      <div :class="`team ${teams[1].name === currentTeam ? 'team--active' : ''}`">
        <p class="team--name">TEAM {{teams[1].name}}</p>
        <p class="team--score">{{teams[1].score}}</p>
      </div>
    </div>
    <div class="dashboard__grid">
      <template v-for="(category, index) in categories">
        <div class="item item--title" :key="category + index">{{ category.name }}</div>
        <template v-for="item in category.items">
          <div
            :id="`category-${index}-${item.cost}`"
            :key="`category-${index}-${item.cost}`"
            @click="handleItemClick(item, `category-${index}-${item.cost}`)"
            class="item item--question">
            {{ item.cost }}
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    categories: [
      {
        name: 'Signifly',
        items: [
          {
            cost: 100,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 200,
            question: 'What is our office address?',
            answer: ''
          },
          {
            cost: 300,
            question: 'What',
            answer: 'This'
          },
          {
            cost: 400,
            question: 'How much does a chicken poutine costs at Campo (before tax)?',
            answer: '$14.49'
          },
          {
            cost: 500,
            question: 'What?',
            answer: 'This'
          }
        ]
      },
      {
        name: '2021 Events',
        items: [
          {
            cost: 100,
            question: 'What was the name of the team trip climbing trail?',
            answer: 'Via Ferrata'
          },
          {
            cost: 200,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 300,
            question: 'What?',
            answer: 'This is'
          },
          {
            cost: 400,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 500,
            question: 'What?',
            answer: 'This'
          }
        ]
      },
      {
        name: 'Category 3',
        items: [
          {
            cost: 100,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 200,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 300,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 400,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 500,
            question: 'What?',
            answer: 'This'
          }
        ]
      },
      {
        name: 'Category 4',
        items: [
          {
            cost: 100,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 200,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 300,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 400,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 500,
            question: 'What?',
            answer: 'This'
          }
        ]
      },
      {
        name: 'Category 5',
        items: [
          {
            cost: 100,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 200,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 300,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 400,
            question: 'What?',
            answer: 'This'
          },
          {
            cost: 500,
            question: 'What?',
            answer: 'This'
          }
        ]
      }
    ]
  }),
  computed: {
    ...mapGetters({
      teams: 'teams',
      currentTeam: 'currentTeam'
    })
  },
  methods: {
    handleItemClick (item, id) {
      this.$store.commit('setOverlay', {active: true, item: item})
      document.querySelector(`#${id}`).classList.add('item--done')
    }
  }
}
</script>

<style lang="scss" scoped>

.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding: 0 50px;
  background: linear-gradient(45deg, #000000, #222222);

  .scoreboard {
    color: white;
    display: flex;
    // justify-content: space-between;
    justify-content: center;
    align-items: center;
    padding: 10px;

    .team {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      // border: white 1px solid;
      border-radius: 5px;
      padding: 10px;
      // background: white;
      background: radial-gradient(#f7f774, yellow, #c0c02f);
      font-weight: 600;
      margin: 0 10px;
      opacity: 0.25;
      color: #464646;
      cursor: default;

      &--name,
      &--score {
        text-transform: uppercase;
      }

      &--score {
        font-size: 30px;
      }

      &--active {
        opacity: 1;
        color: black;
        // box-shadow: 0 0 25px white;
        box-shadow: 0 0 25px yellow;
      }
    }

    .active {
      background: greenyellow;
      background: red;
      border-radius: 50%;
      height: 10px;
      width: 10px;
      margin: 10px;
      // border: black 1px solid;
    }

    .logo {
      width: 100px;
      margin: 0 25px;
    }
  }

  &__grid {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 10px;
    width: 100%;
    height: 85%;

    .item {
      background: linear-gradient(45deg, #1c1c94, #0303f7);
      background-size: 100%;
      color: white;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      // transition: all 0.5s;
      text-transform: uppercase;
      font-weight: 900;

      &--title {
        font-size: 20px;
        cursor: default;
      }

      &--question {
        color: yellow;
        font-size: 75px;
      }

      &--done {
        opacity: 0;
        cursor: unset;
        pointer-events: none;
      }

      &:not(.item--title):hover {
        color: #0303f7;
        background: linear-gradient(45deg, #b9b92a, yellow);
        // background-position: -50px;
        // background-size: 150%;
      }
    }
  }
}
</style>
