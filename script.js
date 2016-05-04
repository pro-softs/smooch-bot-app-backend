'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Welcome to PRO icecream center!!!'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('!!!!!!HI Welcome to PRO icecream center!!!!!!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name'),
        receive: (bot, message) => {
            const name = message.text.trim();
            bot.setProp('name', name);
            return bot.say(`I'll call you ${name}! Great! \n So ${name}, We have following flavours- \n Vanilla -------- $6 \n Chocolate -------- $4 \n Mix --------$7 \n Which one would you like?`)
                .then(() => 'choice');
        }
    },

    choice: {
        receive: (bot, message) => {
            const choice = message.text.trim();
            bot.setProp('choice', choice);

            bot.setProp('pr_vanilla', '5');
            bot.setProp('pr_chocolate', '4');
            bot.setProp('pr_mixed', '7');

            if(choice === "Vanilla" || choice === "vanilla") {
                return bot.getProp('name')
                .then((name) => bot.say(`Nice choice ${name}. It's always in greater demand in our store!!! \n How many would you like to have ${name}?`))
                .then(() => 'total');
            } else if(choice === 'Chocolate' || choice === 'chocolate') {
                 return bot.getProp('name')
                     .then((name) => bot.say(`How many would you like to have ${name}?`))
                     .then(() => 'total');
            } else if(choice === 'Mix' || choice === 'mix') {
                return bot.getProp('name')
                    .then((name) => bot.say(`It seems you are lucky ${name}. This flavour is available for today only. \nHow many would you like to have {$name}?`))
                    .then(() => 'total');
            } else {
                return bot.getProp('name')
                    .then((name) => bot.say(`${name}, it seems You entered a wrong choice. Please Enter avalid choice.`))
                    .then(() => 'choice');
            }
        }
    },

    total: {
        receive: (bot, message) => {
            const num = Number(message.text.trim()); 
            var price = 0;
            var total = 0;
            var chc;

            return bot.getProp('choice').then((choice) => {
                console.log(choice);

                chc = choice;
                if(choice === 'vanilla' || choice === 'Vanilla')
                    bot.getProp('pr_vanilla').then((pr_vanilla) => {
                        price = Number(pr_vanilla);
                    });

                else if(choice === 'chocolate' || choice === 'Chocolate')
                    bot.getProp('pr_chocolate').then((pr_chocolate) => {
                        price = Number(pr_chocolate);
                    });

                else if(choice === 'mix' || choice === 'Mix')
                    bot.getProp('pr_mixed').then((pr_mixed) => {
                        price = Number(pr_mixed);
                    });
            }).then(() => {
                total = price*num;
            }).then(() => bot.say(`Your order for ${num} ${chc} icecream is ready.
                 \n Your total is ${total}. \n Please pay at the counter.
                        \n Hope to serve you again..`));
        }
    }
});
