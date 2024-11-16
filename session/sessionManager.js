export class ChallengeSession {
    constructor() {
        this.activeChallenges = new Map()
    }

    createChallenge(userId, challengeData) {
        this.activeChallenges.set(userId, {
            ...challengeData,
            isActive: true,
            attemptCount: 0,
            startTime: Date.now(),
            maxAttempts: 5,
            timeLimit: 30 * 60 * 1000
        })
    }

    getChallenge(userId) {
        return this.activeChallenges.get(userId)
    }

    isActive(userId) {
        const challenge = this.activeChallenges.get(userId)
        if (!challenge) return false
        const timeElapsed = Date.now() - challenge.startTime

        if (timeElapsed > challenge.timeLimit) {
            this.deactivateChallenge(userId)
            return false
        }

        return challenge.isActive
    }

    deactivateChallenge(userId) {
        const challenge = this.activeChallenges.get()
    }
}
