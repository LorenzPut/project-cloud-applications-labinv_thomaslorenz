/**
 * Created by Lorenz Put on 12-12-2015.
 */
function nospaces(t){


    if(t.value.match(/\s/g)){

        t.value=t.value.replace(/\s/g,'');

    }

}