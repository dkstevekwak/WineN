app.animation('.menu-animation',function(){
    return{
        beforeAddClass: function(element,className,done){
            if(className=='highlight'){
                TweenLite.to(element,0.2,{
                    width:'100%',
                    onComplete: done
                })
            }
            else{
                done();
            }
        },
        beforeRemoveClass: function(element,className,done){
            if(className=='highlight'){
                TweenLite.to(element,0.2,{
                    width:'40%',
                    onComplete: done
                })
            }
            else{
                done();
            }
        }
    }
})