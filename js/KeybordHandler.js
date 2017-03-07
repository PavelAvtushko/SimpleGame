class KeybordHandler {
    checkKeyPress(e, player) {
        switch (e.key.toLowerCase()) {
            case "w":
                player.moveUp = true;
                break;
            case "s":
                player.moveDown = true;
                break;
            case "d":
                player.moveRight = true;
                break;
            case "a":
                player.moveLeft = true;
                break;          
        }
    }
    
    checkKeyUnpress(e, player) {   
        switch (e.key.toLowerCase()) {
            case "w":
                player.moveUp = false;
                break;
            case "s":
                player.moveDown = false;
                break;
            case "d":
                player.moveRight = false;
                break;
            case "a":
                player.moveLeft = false;
                break;          
        }
    }  
}