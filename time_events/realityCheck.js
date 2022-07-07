const helper = require('../helper');

module.exports = {
    eligableHours: { startHour: 7, endHour: 24 },

    tryExecute(time) {
        const realityCheckFrequency = 30;

        if(time.hour < this.eligableHours.startHour && time.hour > this.eligableHours.endHour)
            return;

        if(time.minute % realityCheckFrequency != 0)
            return;
        
        this.execute();
    },
    
    async execute() {
        const members = await helper.getMembersInRole('958396226565447723');


        for(const member of members) {
            member.user.send("Reality check time!");
        }
    }
}