export const state = () => ({
  overlay: { active: false, item: {} },
  teams: [
    {
      name: 'A',
      score: 0
    },
    {
      name: 'B',
      score: 0
    }
  ],
  currentTeam: 'A'
})

export const getters = {
  overlay: state => state.overlay,
  teams: state => state.teams,
  currentTeam: state => state.currentTeam,
}

export const mutations = {
  setOverlay (state, overlay) {
    state.overlay = overlay
  },
  setTeams (state, teams) {
    state.teams = teams
  },
  setCurrentTeam (state, currentTeam) {
    state.currentTeam = currentTeam
  },
  addScore (state, score) {
    state.teams.map(team => {
      if (team.name === state.currentTeam) {
        team.score += score
      }
    })
  },
  removeScore (state, score) {
    state.teams.map(team => {
      if (team.name === state.currentTeam) {
        team.score -= score
      }
    })
  }
}
