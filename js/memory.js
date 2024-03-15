export var game = function(){
    const back = '../resources/back.png';
    const resources = ['../resources/cb.png', '../resources/co.png', '../resources/sb.png','../resources/so.png', '../resources/tb.png','../resources/to.png'];
    const card = {
        current: back,
        clickable: true,
        goBack: function (){
            setTimeout(() => {
                this.current = back;
                this.clickable = true;
                this.callback();
            }, 1000);
        },
        goFront: function (){
            this.current = this.front;
            this.clickable = false;
            this.callback();
        },
        goBackEasy: function() {
            setTimeout(() => {
                this.current = back;
                this.clickable = true;
                this.callback();
            }, 2000);
        },
        goBackHard: function() {
            setTimeout(() => {
                this.current = back;
                this.clickable = true;
                this.callback();
            }, 500);
        }
    };

    var options = JSON.parse(localStorage.options)
    var lastCard;
    var pairs = options.pairs;
    var points = 100;

    return {
        
        init: function (call){
            var items = resources.slice(); // Copiem l'array
            items.sort(() => Math.random() - 0.5); // Aleatòria
            items = items.slice(0, pairs); // Agafem els primers
            items = items.concat(items);
            items.sort(() => Math.random() - 0.5); // Aleatòria

            var currentItem = items.map(item => Object.create(card, {front: {value:item}, callback: {value:call}}));


            for (var i = 0; i < currentItem.length; i++) {
                currentItem[i].pointer = $('#c'+i);
                currentItem[i].pointer.attr("src", currentItem[i].current);
                currentItem[i].goFront();
                currentItem[i].goBack();
            }

            return currentItem;

        },

        click: function (card){
            if (!card.clickable) return;
            card.goFront();
            if (lastCard){ // Segona carta
                if (card.front === lastCard.front){
                    pairs--;
                    if (pairs <= 0){
                        alert("Has guanyat amb " + points + " punts!");
                        window.location.replace("../");
                    }
                }
                else{

                    if (options.difficulty == "easy") {
                        [card, lastCard].forEach(c=>c.goBackEasy());

                       }else if (options.difficulty == "normal") {
                        [card, lastCard].forEach(c=>c.goBack());

                       }else if (options.difficulty == "hard") {
                        [card, lastCard].forEach(c=>c.goBackHard());
                       }


                    if (options.difficulty == "easy") {
                        points-=10;

                    }else if (options.difficulty == "normal") {
                        points-=25;

                    }else if (options.difficulty == "hard") {
                        points-=50;

                    }

                    if (points <= 0){
                        alert ("Has perdut");
                        window.location.replace("../");
                    }
                }
                lastCard = null;
            }
            else lastCard = card; // Primera carta
        }
    }
}();