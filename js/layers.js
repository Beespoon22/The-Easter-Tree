addLayer("egg", {
    name: "Eggs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#564C4C", // warm grey, overlaid by wide discord egg emote in theory
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Eggs", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('egg', 13)) mult = mult.times(upgradeEffect('egg', 13)) // sunny side up
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for eggs", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Scrambled Eggs",
            description: "The power of a simple breakfast doubles your point gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Omelet",
            description: "The more eggs, the better! Eggs boost point gain.",
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            cost: new Decimal(2),
        },
        13: {
            title: "Sunny Side Up",
            description: "You think there might be a joke here... Not sure what kind, though. Points boost egg gain.",
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(5)
        },
    },
    layerShown(){return true},
})
