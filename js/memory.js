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
        }
    };

    var lastCard;
    var pairs = 2;
    var points = 100;
    var items = [];

    return {
        
        init: function (call){

            items = resources.slice(); // Copiem l'array
            items.sort(() => Math.random() - 0.5); // Aleatòria
            items = items.slice(0, pairs); // Agafem els primers
            items = items.concat(items);
            items.sort(() => Math.random() - 0.5); // Aleatòria

            items.forEach((item, index) => {
                const currentItem = Object.create(card, {front: {value: item}, callback: {value: call}});
                setTimeout(() => {
                    currentItem.goFront(); // Mostrar la carta
                    currentItem.goBack(); // Ocultar la carta después de un segundo
                }, (index + 1) * 1000); // Ajustamos el tiempo para que cada carta se muestre por un segundo
            });
        
            // Después de que todas las cartas se muestren, llamamos a la función call para continuar con el juego
            setTimeout(call, (items.length + 1) * 1000);
        


            return items.map(item => Object.create(card, {front: {value:item}, callback: {value:call}}));

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
                    [card, lastCard].forEach(c=>c.goBack());
                    points-=25;
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