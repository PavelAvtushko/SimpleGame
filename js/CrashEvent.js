class CrashEvent {
    crashAction(player, enemy, coins, underAtack) {
        //describe a crash between player and enemy
        if (this.crashWith(player, enemy)) {
            if (player.health > 0 && player.life > 0) {
                --player.health;
                underAtack.classList.add('atack');
            }
            
            else if (player.health === 0 && player.life > 0) {
                player.life--;
                player.health = player.healthDefault;
            }
        }
        else {
             underAtack.classList.remove('atack');
        }
        
        //describe a crash between player and coins
        for (let i = 0; i < coins.count; ++i) {
            if (this.crashWith(player, coins.arrayOfCoins[i])) {
                player.score++;
                coins.arrayOfCoins[i].deleteFromZone();     
            }   
        }
    }
        
    crashWith(mainObj, otherobj) {
        let myleft = mainObj.PositionX;
        let myright = mainObj.PositionX + mainObj.width * 0.7;
        let mytop = mainObj.PositionY;
        let mybottom = mainObj.PositionY + (mainObj.height * 0.7);
        let otherleft = otherobj.PositionX;
        let otherright = otherobj.PositionX + (otherobj.width * 0.7);
        let othertop = otherobj.PositionY;
        let otherbottom = otherobj.PositionY + (otherobj.height * 0.7);
        let crash = true;
        if  ((mybottom < othertop)  ||
            (mytop > otherbottom)   ||
            (myright < otherleft)   ||
            (myleft > otherright)) {       
            crash = false;
        }
        return crash;
    }
}
