const helper = require('../helper');

module.exports = {
    tryExecute(time) {
        const eligableHours = { startHour: 7, endHour: 24 }

        const realityCheckFrequency = 30;

        if(time.hour < eligableHours.startHour && time.hour > eligableHours.endHour)
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