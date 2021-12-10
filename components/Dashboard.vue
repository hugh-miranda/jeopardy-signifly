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
            question: 'What year did Signifly set up shop in Denmark?',
            answer: '2010'
          },
          {
            cost: 200,
            question: 'What is our current office address?',
            answer: '1275 Av. des Canadiens-de-Montréal, Montreal, QC'
          },
          {
            cost: 300,
            question: 'According to its website, how many awards has Signifly won for both design and development?',
            answer: '25'
          },
          {
            cost: 400,
            question: 'Campo became the go-to restaurant for the office. How much does a chicken poutine costs there (before tax)?',
            answer: '$14.49'
          },
          {
            cost: 500,
            question: `What did Signifly Montreal's Managing Director studied at Copenhagen Business School?`,
            answer: 'Master’s degree in Management of Innovation and Business Development'
          }
        ]
      },
      {
        name: '2021 Events',
        items: [
          {
            cost: 100,
            question: `What was the smokiest costume on Halloween?`,
            answer: `Mahendra's Shisha`
          },
          {
            cost: 200,
            question: 'Our boy Ziad made us proud by bringing home a medal from Copenhagen. What discipline was he competing in?',
            answer: 'Drinking 10 beers'
          },
          {
            cost: 300,
            question: 'What was the name of the team trip climbing trail?',
            answer: 'Via Ferrata'
          },
          {
            cost: 400,
            question: 'What is the name of the statutory holiday elevated this year, also known as Orange Shirt Day?',
            answer: 'National Day for Truth and Reconciliation'
          },
          {
            cost: 500,
            question: 'What day did the Montreal Canadiens advanced to the 2021 Stanley cup finals?',
            answer: 'June 24th, 2021 (Saint-Jean-Baptiste)'
          }
        ]
      },
      {
        name: 'Canada, eh',
        items: [
          {
            cost: 100,
            question: `What animal was given official status as an emblem of Canada?`,
            answer: 'Beaver'
          },
          {
            cost: 200,
            question: `What is the full name of current Canada's Prime Minister?`,
            answer: 'Justin Pierre James Trudeau'
          },
          {
            cost: 300,
            question: 'Founded in 1497, what is the oldest city in Canada?',
            answer: `St. John's, NL`
          },
          {
            cost: 400,
            question: `Canada's name derived from "kanata", a word in the language of the St. Lawrence Iroquoians. What does it mean?`,
            answer: 'Settlement or village'
          },
          {
            cost: 500,
            question: 'In 1947, a village in Yukon called Snag set the record for the lowest temperature ever recorded in Canada. What was the temperature?',
            answer: '-62.8° C'
          }
        ]
      },
      {
        name: 'Movies, Music & More',
        items: [
          {
            cost: 100,
            question: `What famous John Lennon's song was composed here in Montreal?`,
            answer: 'Give Peace a Chance'
          },
          {
            cost: 200,
            question: 'What is the highest grossing movie of all time?',
            answer: 'Avatar ($2,847,246,203)'
          },
          {
            cost: 300,
            question: 'On The Office tv show, this Seattle-born actor, who turns 56 next month, played a salesman and even directed a couple of episodes',
            answer: 'Rainn Wilson'
          },
          {
            cost: 400,
            question: `What's Up? by 4 Non Blondes became the Team Trip's hymn. In what year was this song released?`,
            answer: '1993'
          },
          {
            cost: 500,
            question: 'How many Oscars did the entire Lord of the Rings saga win?',
            answer: '17'
          }
        ]
      },
      {
        name: 'Random AF',
        items: [
          {
            cost: 100,
            question: 'What is the most bike-friendly city in the world?',
            answer: 'Copenhagen'
          },
          {
            cost: 200,
            question: `Complete the poem:
            I am currently broken, I have always been,
            though my purpose is to awoken, I try to be mean,
            at the 5th floor frozen, yours truly:`,
            answer: 'The coffee machine'
          },
          {
            cost: 300,
            question: 'With an average surface temperature of around 450°C, which is the hottest planet in the solar system?',
            answer: 'Venus (yeah, I know, I thought it was Mercury too)'
          },
          {
            cost: 400,
            question: 'Around 1 in 200 men (roughly 16 million) are direct descendants of _____',
            answer: 'Genghis Khan'
          },
          {
            cost: 500,
            question: 'What is the longest english word without a vowel?',
            answer: 'Rythm'
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
  background: linear-gradient(45deg, #111111, #222222);
  font-family: $regular;

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
        font-size: 24px;
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
