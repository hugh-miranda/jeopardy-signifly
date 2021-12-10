<template>
  <div class="overlay">
    <!-- <button @click="closeOverlay">CLOSE</button> -->
    <h1 class="team">TEAM {{currentTeam}}</h1>
    <p class="cost">{{ item.cost }}</p>
    <p class="time">{{ timeLeft }}</p>
    <div class="question">Q: {{ item.question }}</div>
    <div v-if="showAnswer" class="answer">
      <p>A: {{ item.answer }}</p>
      <div class="buttons">
        <button @click="removeScore(item.cost)" class="wrong">WRONG</button>
        <button v-if="timeLeft != 0" @click="addScore(item.cost)" class="right">RIGHT</button>
      </div>
    </div>
    <button v-else @click="showAnswer = true" class="show-answer">Answer</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    item: Object
  },
  data: () => ({
    showAnswer: false,
    timeLeft: 30,
    interval: undefined
  }),
  methods: {
    closeOverlay () {
      this.$store.commit('setOverlay', {active: false, item:{}})
    },
    addScore (cost) {
      this.$store.commit('addScore', cost)
      this.$store.commit('setCurrentTeam', this.currentTeam === 'A' ? 'B' : 'A')
      this.closeOverlay()
    },
    removeScore (cost) {
      this.$store.commit('removeScore', cost)
      this.$store.commit('setCurrentTeam', this.currentTeam === 'A' ? 'B' : 'A')
      this.closeOverlay()
    }
  },
  computed: {
    ...mapGetters({
      teams: 'teams',
      currentTeam: 'currentTeam'
    })
  },
  watch: {
    showAnswer () {
      clearInterval(this.interval)
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--
      } else {
        this.showAnswer = true
        clearInterval(this.interval)
      }
    }, 1000)
  },
  destroyed () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(black, 0.95);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: $regular;

  button {
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    transition: all 0.3;

    &:hover {
      opacity: 0.75;
    }
  }

  .team {
    position: fixed;
    top: 10px;
    left: 10px;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 30px;
  }

  .cost {
    position: fixed;
    top: 10px;
    right: 10px;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 30px;
    background: white;
    border-radius: 5px;
    color: black;
    padding: 0 10px;
  }

  .time {
    position: fixed;
    bottom: 10px;
    right: 10px;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 40px;
    border-radius: 5px;
    color: red;
    padding: 0 10px;
  }

  .question,
  .answer {
    text-align: center;
    max-width: 60vw;
    margin: 0 auto;
  }

  .question {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 50px;
    color: yellow;
    margin: 50px 0;
  }

  .answer {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // margin: 25px 0;
  }

  .show-answer {
    background: white;
    font-weight: 600;
  }

  .wrong {
    background: red;
    color: white;
    font-weight: 600;
  }

  .right {
    background: rgb(71, 248, 47);
    color: black;
    font-weight: 600;
  }
}
</style>
