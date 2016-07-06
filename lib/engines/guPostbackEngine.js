module.exports = function GuPostbackEngine() {
    let self = this;

    self.generic = function(){
        return {
            text: "Thank you for pressing the button! Your pressing is important to us"
        };
    };
    //Prototype
    return {
        process: function (payload) {
            let self = this;    
            //do cool stuff
            return self.generic();
        }
    };
};

